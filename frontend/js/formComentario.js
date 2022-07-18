import FetchService from './service/FetchService.js';
const fetchService = new FetchService();

const commentForm = document.querySelector("#form-comentario");
if(commentForm){
    commentForm.addEventListener("submit", function(e) {
        submitCommentForm(e, this);
    });
}

async function submitCommentForm(e, form){
    e.preventDefault();
    let url = fetchService.getBaseUrl+"/comments/create/";
    let queryValues = getQueryStrings();

    if(!queryValues["post"]){
        console.log("Operação inválida")
        return
    }

    const btnSubmit = document.getElementById('btn-comentario');
    btnSubmit.disable = true;
    setTimeout(() => btnSubmit.disable = false, 3000);

    const jsonCommentFormData = fetchService.buildJsonFormData(form);

    const token = localStorage.getItem('token')
    if(!token){
        return null
    }
    const headers = fetchService.buildHeaders(`Bearer ${token}`);

    const response = await fetchService.performPostHttpRequest(
        url+queryValues["post"],
        headers,
        jsonCommentFormData
    );
    
    window.location = `post.html?post=${queryValues["post"]}`
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