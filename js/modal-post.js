let imagem = document.getElementById('imagem-modal');
let arquivo = document.getElementById('input');

imagem.addEventListener('click', () => { 
    arquivo.click();
});

arquivo.addEventListener('change', (e) => {
    let leitor = new FileReader();

    leitor.onload = () => {
        imagem.src = leitor.result;
    }

    leitor.readAsDataURL(arquivo.files[0]);
});

