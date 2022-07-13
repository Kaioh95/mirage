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

    let url = "http://localhost:5000/posts/post/";
    let urlPostImage = "http://localhost:5000/images/posts/"

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
}

async function darLike(){
    let likeBtn = document.getElementById('like-btn')
    let likesAtual = document.getElementById("likes-atual");
    let numLikes = parseInt(likesAtual.textContent.trim().slice(" ")[0], 10)

    let url = "http://localhost:5000/post-info/edit/";
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
    let url = "http://localhost:5000/post-info/create/"

    const token = localStorage.getItem('token')
    if(!token){
        return null
    }
    const headers = fetchService.buildHeaders(`Bearer ${token}`);
    const responseInfo = await fetchService.performPostHttpRequestNoBody(url+post_id, headers);
    console.log(responseInfo)
}

async function atualizaInfoPost(response, post_id){
    let urlPostInfo = "http://localhost:5000/post-info/views-likes/"
    
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
    let urlPostInfoByUser = "http://localhost:5000/post-info/views-likes-by-user/"

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

var r = document.querySelector(':root')
const toggleTema = document.getElementById("toggle-tema")
toggleTema.onclick = () => {
    if (toggleTema.checked){
        r.style.setProperty('--cor-primaria', '#1C0C5B')
        r.style.setProperty('--cor-secundaria', '#2C2F49')
        r.style.setProperty('--cor-terciaria', '#13132C')
        r.style.setProperty('--cor-fundo', '#08041C')
        r.style.setProperty('--cor-texto', '#9F94F5')
    }
    else{
        r.style.setProperty('--cor-primaria', 'rgba(28, 12, 91, 1)')
        r.style.setProperty('--cor-secundaria', 'rgba(145, 107, 191, 0.5)')
        r.style.setProperty('--cor-terciaria', '#504382')
        r.style.setProperty('--cor-fundo', 'rgba(218, 212, 241, 0.5)')
        r.style.setProperty('--cor-texto', '#1C0C5B')
    }
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