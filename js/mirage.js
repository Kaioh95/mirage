var largura
var numeroColunas
var imagens = ["bird.jpg","cat-dog.jpg","cat.jpg",
            "catLol.jpg","catMeme.jpg","dog.jpg",
            "skCat.jpg" ]

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
    let lenImagens = imagens.length

    for(let ii = 0; ii < 20; ii++){
        let coluna = ii%numeroColunas
        let pathImg = imagens[ii%lenImagens]
    
    let elementoColuna = document.getElementById("coluna"+coluna)
    let img = new Image()
    img.src = `image/${pathImg}`
    
    let imgLargura = 240
    let proporcaoTamanho = Math.floor(240/img.width) 
    let imgAltura = proporcaoTamanho * img.height

    const innerString = `
        <a class="link-post" draggable="false" href="post.html?pathImg=${pathImg}">
        <div class="conteudo-post">
            <img id="img${ii}" src="imagens/${pathImg}" width=${imgLargura} height=${imgAltura}>
        </div>
        <div class="meta-dados-post">
            <h4 class="titulo-post">Título do Post</h4>
            <div class="info-post">
                <div class="info-icon-count">
                    <ion-icon name="heart-outline"></ion-icon>
                    <div class="info-count">90</div>
                </div>

                <div class="info-icon-count">
                    <ion-icon name="chatbubble-outline"></ion-icon>
                    <div class="info-count">120</div>
                </div>

                <div class="info-icon-count">
                    <ion-icon name="eye-outline"></ion-icon>
                    <div class="info-count">999</div>
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
    }
}

