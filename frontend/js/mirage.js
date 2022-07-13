import FetchService from './service/FetchService.js';
const fetchService = new FetchService();

var largura
var numeroColunas
var lastFiftyPost

document.addEventListener("DOMContentLoaded", onDocumentLoad);
window.addEventListener("resize", ajustarNumeroColunas)

async function onDocumentLoad(){
    await getLastFiftyPost();
    ajustarNumeroColunas();
    changeTheme();

    let btnlogout = document.getElementById('button-log-out')
    if(btnlogout){
        btnlogout.onclick = () => {logout()}
    }

    let dropDownMenu = document.getElementById('icon-login-menu')
    dropDownMenu.onclick = function(){loginDropDown()}
}

function logout(){
    localStorage.removeItem('token')
    window.location = "index.html"
}

async function getLastFiftyPost(){
    let url = "http://localhost:5000/posts/last-posts";
    let urlPostInfo = "http://localhost:5000/post-info/views-likes/"

    const headers = fetchService.buildHeaders();
    const response = await fetchService.performGetHttpRequest(url, headers);

    lastFiftyPost = response.posts
    for(let ii = 0; ii < response.posts.length; ii++){
        let post_id = response.posts[ii]._id
        const responseInfo = await fetchService.performGetHttpRequest(urlPostInfo+post_id, headers);
        lastFiftyPost[ii]['views'] = responseInfo.views
        lastFiftyPost[ii]['likes'] = responseInfo.likes
    }
}

function changeTheme(){
    let r = document.querySelector(':root')
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

    let menu = document.getElementById("login-menu-dropdown");
    if(largura>860){
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
    
        let elementoColuna = document.getElementById("coluna"+coluna)
        let img = new Image()
        img.src = `http://localhost:5000/images/posts/${pathImg}`

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
                        <div class="info-count">2</div>
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

function loginDropDown() {
    let menu = document.getElementById("login-menu-dropdown");

    if(menu.style.display === 'block'){
        menu.style.display = 'none'
    }
    else{
        menu.style.display = 'block'
    }
}


