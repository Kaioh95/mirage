const tamanhoPadraoPost = 595

document.addEventListener("DOMContentLoaded", onDocumentLoad);
function onDocumentLoad(){
    let queryValues = getQueryStrings();

    let img = new Image();
    img.src = `imagens/${queryValues["pathImg"]}`;
    
    let largura = img.width;
    let altura = img.height;
    let proporcao = tamanhoPadraoPost / largura;

    if(proporcao >=0 && proporcao <= 1){
        largura = tamanhoPadraoPost;
        altura = Math.floor(proporcao * altura);
    }

    let areaImagem = document.getElementById("imagem-post");
    areaImagem.innerHTML = `<img src="imagens/${queryValues["pathImg"]}" width=${largura} height=${altura}>`;
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