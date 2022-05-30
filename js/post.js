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
    console.log(largura + " " + altura + queryValues["pathImg"]);
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