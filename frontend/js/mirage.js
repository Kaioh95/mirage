import FetchService from './service/FetchService.js';
const fetchService = new FetchService();

var largura
var numeroColunas
var lastFiftyPost = []

document.addEventListener("DOMContentLoaded", onDocumentLoad);
window.addEventListener("resize", ajustarNumeroColunas)

async function onDocumentLoad(){
    let dropDownMenu = document.getElementById('icon-login-menu')
    dropDownMenu.onclick = function(){loginDropDown()}

    await getLastFiftyPost();
    ajustarNumeroColunas();

    const searchForm = document.getElementById("form-buscar");
    if(searchForm){
        searchForm.addEventListener("submit", function(e) {
            submitSearchForm(e, this);
        });
    }

    bindMenuTags()
}

async function getLastFiftyPost(){
    let url = fetchService.getBaseUrl()+"/posts/last-posts";
    let urlPostInfo = fetchService.getBaseUrl()+"/post-info/views-likes/"
    let urlComment = fetchService.getBaseUrl()+"/comments/comment-count/"

    const headers = fetchService.buildHeaders();
    const response = await fetchService.performGetHttpRequest(url, headers);

    lastFiftyPost = response.posts
}

function ajustarNumeroColunas(){
    largura = window.innerWidth
    let painel = document.getElementById("painel-posts")
    
    if(largura>=980){
        painel.innerHTML = ""
        numeroColunas = 4
        adicionarColunas(numeroColunas, painel)
        adicionarCartaoPosts(numeroColunas)
    }
    else if(largura>=768 && largura<980){
        painel.innerHTML = ""
        numeroColunas = 3
        adicionarColunas(numeroColunas, painel)
        adicionarCartaoPosts(numeroColunas)
    }
    else if(largura>=600 && largura<768){
        painel.innerHTML = ""
        numeroColunas = 2
        adicionarColunas(numeroColunas, painel)
        adicionarCartaoPosts(numeroColunas)
    }
    else if(largura<600){
        painel.innerHTML = ""
        numeroColunas = 1
        adicionarColunas(numeroColunas, painel)
        adicionarCartaoPosts(numeroColunas)
    }

    if(largura>860){
        let menu = document.getElementById("login-menu-dropdown");
        menu.style.display = null;
    }

}

function adicionarColunas(numeroColunas, painel){
    for (let ii = 0; ii<numeroColunas; ii++){
        let coluna = document.createElement("div")
        coluna.className = "grid-coluna"
        coluna.id = "coluna"+ii
        painel.appendChild(coluna)
    }
}

function adicionarCartaoPosts(numeroColunas){
    let lenImagens = lastFiftyPost.length

    for(let ii = 0; ii < lenImagens; ii++){
        let coluna = ii%numeroColunas
        let postAtual = lastFiftyPost[ii%lenImagens]
        let pathImg = postAtual.image
        let post_id = postAtual._id
        let titulo = postAtual.title
        let tags = postAtual.tags
        let descricao = postAtual.description
        let views = postAtual.views
        let likes = postAtual.likes
        let comments = postAtual.comments
    
        let elementoColuna = document.getElementById("coluna"+coluna)
        let img = new Image()
        img.src = fetchService.getBaseUrl()+`/images/posts/${pathImg}`

        //img.onload = function(){
        let imgLargura = 240
        let proporcaoTamanho = 240/img.width 
        let imgAltura = Math.floor(proporcaoTamanho * img.height)

        const innerString = `
            <a class="link-post" draggable="false" href="post.html?post=${post_id}">
            <div class="conteudo-post">
                <img id="img${ii}" src="${img.src}" width=${imgLargura} >
            </div>
            <div class="meta-dados-post">
                <h4 class="titulo-post">${titulo}</h4>
                <div class="info-post">
                    <div class="info-icon-count">
                        <ion-icon name="heart-outline"></ion-icon>
                        <div class="info-count">${likes}</div>
                    </div>

                    <div class="info-icon-count">
                        <ion-icon name="chatbubble-outline"></ion-icon>
                        <div class="info-count">${comments}</div>
                    </div>

                    <div class="info-icon-count">
                        <ion-icon name="eye-outline"></ion-icon>
                        <div class="info-count">${views}</div>
                    </div>
                </div>
            </div>
            </a>
        `

        let cartaoPost = document.createElement("div")
        cartaoPost.className = "cartao-post"
        cartaoPost.id = `cartaoPost${ii}`
        cartaoPost.innerHTML = innerString
        elementoColuna.appendChild(cartaoPost)
        //}
    }

}

async function submitSearchForm(e, form){
    e.preventDefault();
    let url = fetchService.getBaseUrl()+"/posts/post-by-title/";
    let urlPostInfo = fetchService.getBaseUrl()+"/post-info/views-likes/"
    let urlComment = fetchService.getBaseUrl()+"/comments/comment-count/"

    const btnBuscarSubmit = document.getElementById('btn-buscar');
    btnBuscarSubmit.disable = true;
    setTimeout(() => btnBuscarSubmit.disable = false, 2000);

    const jsonSearch = fetchService.buildJsonFormData(form);
    const headers = fetchService.buildHeaders();

    const response = await fetchService.performGetHttpRequest(url+jsonSearch.buscar, headers);
    lastFiftyPost = response.posts
    for(let ii = 0; ii < response.posts.length; ii++){
        let post_id = response.posts[ii]._id
        const responseInfo = await fetchService.performGetHttpRequest(urlPostInfo+post_id, headers);
        const responseComment = await fetchService.performGetHttpRequest(urlComment+post_id, headers);
        lastFiftyPost[ii]['views'] = responseInfo.views
        lastFiftyPost[ii]['likes'] = responseInfo.likes
        lastFiftyPost[ii]['comments'] = responseComment.commentsCount
    }
    ajustarNumeroColunas();
}

function bindMenuTags(){
    let btnPets = document.getElementById('btn-tag-pets')
    btnPets.onclick = function(){searchByTag(btnPets.value)}

    let btnMemes = document.getElementById('btn-tag-memes')
    btnMemes.onclick = function(){searchByTag(btnMemes.value)}

    let btnGame = document.getElementById('btn-tag-game')
    btnGame.onclick = function(){searchByTag(btnGame.value)}
}

async function searchByTag(btnTag){
    let url = fetchService.getBaseUrl()+"/posts/post-by-tag/";
    let urlPostInfo = fetchService.getBaseUrl()+"/post-info/views-likes/"
    let urlComment = fetchService.getBaseUrl()+"/comments/comment-count/"

    const headers = fetchService.buildHeaders();

    const response = await fetchService.performGetHttpRequest(url+btnTag, headers);
    lastFiftyPost = response.posts
    for(let ii = 0; ii < response.posts.length; ii++){
        let post_id = response.posts[ii]._id
        const responseInfo = await fetchService.performGetHttpRequest(urlPostInfo+post_id, headers);
        const responseComment = await fetchService.performGetHttpRequest(urlComment+post_id, headers);
        lastFiftyPost[ii]['views'] = responseInfo.views
        lastFiftyPost[ii]['likes'] = responseInfo.likes
        lastFiftyPost[ii]['comments'] = responseComment.commentsCount
    }
    ajustarNumeroColunas();
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


