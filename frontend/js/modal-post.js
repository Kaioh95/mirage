import FetchService from './service/FetchService.js';
const fetchService = new FetchService();

let imagem = document.getElementById('imagem-modal');
let arquivo = document.getElementById('input-post-image');

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

const createPostForm = document.querySelector("#create-post-form");
if(createPostForm){
    createPostForm.addEventListener("submit", function(e) {
        submitCreatePostForm(e, this);
    });
}

async function submitCreatePostForm(e, form){
    e.preventDefault();
    let url = fetchService.getBaseUrl()+"/posts/create";
    const btnPostar = document.getElementById('btn-postar');
    let arquivoPost = document.getElementById('input-post-image');
    const token = localStorage.getItem('token')

    btnPostar.disable = true;
    setTimeout(() => btnPostar.disable = false, 3000);

    let data = new FormData(form)
    data.append('image', arquivoPost.files[0])

    //const jsonPostFormData = fetchService.buildJsonFormData(form);
    const headers = fetchService.buildHeadersFile(`Bearer ${token}`);

    const response = await fetchService.performPostHttpRequestFile(url, headers, data);

    if(response.msg){
        alert(response.msg)
    }

    window.location = "index.html"
}
