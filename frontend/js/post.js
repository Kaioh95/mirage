import FetchService from './service/FetchService.js';
const fetchService = new FetchService();
const tamanhoPadraoPost = 595

document.addEventListener("DOMContentLoaded", onDocumentLoad);
window.addEventListener("resize", ajustaElementos);

async function onDocumentLoad(){
    let dropDownMenu = document.getElementById('icon-login-menu')
    dropDownMenu.onclick = function(){loginDropDown()}

    let likeBtn = document.getElementById('like-btn')
    likeBtn.onclick = function(){darLike()}

    let url = fetchService.getBaseUrl+"/posts/post/";
    let urlPostImage = fetchService.getBaseUrl+"/images/posts/"

    let queryValues = getQueryStrings();

    const headers = fetchService.buildHeaders();
    const response = await fetchService.performGetHttpRequest(url+queryValues["post"], headers);

    let img = new Image();
    img.src = urlPostImage+response.post.image;

    img.onload = () => {
        let largura = img.width;
        let altura = img.height;
        let proporcao = tamanhoPadraoPost / largura;

        if(proporcao >=0 && proporcao <= 1){
            largura = tamanhoPadraoPost;
            altura = Math.floor(proporcao * altura);
        }

        let areaImagem = document.getElementById("imagem-post");
        areaImagem.innerHTML = `<img src="${img.src}" width=${largura} height=${altura}>`;
    }

    await atualizaView(queryValues["post"])
    await atualizaInfoPost(response, queryValues["post"])
    await atualizaInfoByUser(queryValues["post"])
    await atualizaComments(queryValues["post"])

    document.querySelectorAll('ion-icon[name="trash-outline"]').forEach(element => {
        element.addEventListener('click', (e) => {
            removeComment(e.target.id)
        });
    });
}

async function darLike(){
    let likeBtn = document.getElementById('like-btn')
    let likesAtual = document.getElementById("likes-atual");
    let numLikes = parseInt(likesAtual.textContent.trim().slice(" ")[0], 10)

    let url = fetchService.getBaseUrl+"/post-info/edit/";
    let queryValues = getQueryStrings();

    const token = localStorage.getItem('token')
    if(!token){
        return null
    }
    const headers = fetchService.buildHeaders(`Bearer ${token}`);
    const response = await fetchService.performPatchHttpRequestNoBody(url+queryValues["post"], headers);
    
    if(response.data.like){
        likesAtual.innerHTML = `${numLikes+1} Likes`
        likeBtn.name = "heart"
    }
    else{
        likesAtual.innerHTML = `${numLikes-1} Likes`
        likeBtn.name = "heart-outline"
    }
}

async function atualizaView(post_id){
    let url = fetchService.getBaseUrl+"/post-info/create/"

    const token = localStorage.getItem('token')
    if(!token){
        return null
    }
    const headers = fetchService.buildHeaders(`Bearer ${token}`);
    const responseInfo = await fetchService.performPostHttpRequestNoBody(url+post_id, headers);
    console.log(responseInfo)
}

async function atualizaInfoPost(response, post_id){
    let urlPostInfo = fetchService.getBaseUrl+"/post-info/views-likes/"
    
    const headers = fetchService.buildHeaders();
    const responseInfo = await fetchService.performGetHttpRequest(urlPostInfo+post_id, headers);

    let avatarDonoPost = document.getElementById("avatar-dono-post");
    let nomeDonoPost = document.getElementById("nome-dono-post");
    let tituloAtual = document.getElementById("titulo-atual");
    let viewsAtual = document.getElementById("views-atual");
    let likesAtual = document.getElementById("likes-atual");

    avatarDonoPost.innerHTML = `<h2>${response.post.user.name.charAt(0).toUpperCase()}</h2>`
    nomeDonoPost.innerHTML = response.post.user.name
    tituloAtual.innerHTML = response.post.title
    viewsAtual.innerHTML = `${responseInfo.views} Views`
    likesAtual.innerHTML = `${responseInfo.likes} Likes`
}

async function atualizaInfoByUser(post_id){
    let likeBtn = document.getElementById('like-btn')
    let urlPostInfoByUser = fetchService.getBaseUrl+"/post-info/views-likes-by-user/"

    const token = localStorage.getItem('token')
    if(!token){
        return null
    }
    const hdUser = fetchService.buildHeaders(`Bearer ${token}`)
    const resUser = await fetchService.performGetHttpRequest(urlPostInfoByUser+post_id, hdUser);
    
    if(resUser.data.like){
        likeBtn.name = "heart"
    }
    else{
        likeBtn.name = "heart-outline"
    }
}

async function atualizaComments(post_id){
    let urlComment = fetchService.getBaseUrl+"/comments/comment-by-post/"

    const headers = fetchService.buildHeaders()
    const response = await fetchService.performGetHttpRequest(urlComment+post_id, headers)
    
    document.getElementById("comment-count").innerHTML = `<span>${response.comments.length} COMENTÁRIOS</span>`
    let commentList = document.getElementById("comment-list")
    commentList.innerHTML = ""

    response.comments.forEach(element => {
        let userName = element.user.name
        let userAvatar = userName.charAt(0).toUpperCase()
        let idadeComment = calcularIdadeComentario(new Date(element.createdAt))
        commentList.innerHTML += `
            <div class="meta-comentario">
                <ion-icon id="${element._id}" style="float: right;" name="trash-outline"></ion-icon>
                <div class="dono-comentario">
                    <a class="avatar" href="index.html">
                        <div class="avatar-dono-comentario"><h3>${userAvatar}</h3></div>
                    </a>
                    <a class="nome-dono-comentario" title="Dono do Comentario">
                        ${userName}
                    </a>
                    <span>&nbsp;&#9830;&nbsp;</span>
                    <span>${idadeComment} atrás</span>
                </div>
                <div class="texto-comentario">
                    <span>${element.text}</span>
                </div>
            </div>
        `
    });
}

async function removeComment(commentId){
    let urlComment = fetchService.getBaseUrl+"/comments/delete/"
    const token = localStorage.getItem('token')
    if(!token){
        return null
    }

    const headers = fetchService.buildHeaders(`Bearer ${token}`)
    const response = await fetchService.performDeleteHttpRequest(urlComment+commentId, headers)
    alert(response.msg)
    window.location.reload()
}

function getQueryStrings(){
    let queryValues = {};
    let decode = function(s) {return decodeURIComponent(s.replace(/\+/g, " ")); };
    let queryString = location.search.substring(1);
    let keyValues = queryString.split('&');

    for(let i in keyValues){
        let key = keyValues[i].split("=");
        if(key.length > 1){
            queryValues[decode(key[0])] = decode(key[1]);
        }
    }
    return queryValues;
}

function loginDropDown() {
    let menu = document.getElementById("login-menu-dropdown");

    if(menu.style.display === 'block'){
        menu.style.display = 'none'
    }
    else{
        menu.style.display = 'block'
    }
}

function ajustaElementos(){
    let menu = document.getElementById("login-menu-dropdown");
    let largura = window.innerWidth;
    if(largura>860){
        menu.style.display = null;
    }
}

function calcularIdadeComentario(timeComment){
    let timeAtual = new Date();
    let diferenca = timeAtual - timeComment

    let years = Math.floor(diferenca /1000/60/60/24/30.33/12),
    days = Math.floor(diferenca /1000/60/60/24),
    hours = Math.floor(diferenca /1000/60/60),
    minutes = Math.floor(diferenca /1000/60),
    seconds = Math.floor(diferenca /1000);

    if(seconds<60)
        return seconds + "s"
    else if(minutes<60)
        return minutes + "min"
    else if(hours<24)
        return hours + "h"
    else if(days<365)
        return days + "d"
    else
        return years + " anos"
}