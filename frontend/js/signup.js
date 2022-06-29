import FetchService from './service/FetchService.js';
const fetchService = new FetchService();

const signForm = document.querySelector("#form-signup");
if(signForm){
    signForm.addEventListener("submit", function(e) {
        submitSignForm(e, this);
    });
}

async function submitSignForm(e, form){
    e.preventDefault();
    let url = "http://localhost:5000/users/auth/register";

    const btnSubmit = document.getElementById('sign-in');
    btnSubmit.disable = true;
    setTimeout(() => btnSubmit.disable = false, 3000);

    const jsonSignFormData = buildJsonFormData(form);

    const headers = buildHeaders();

    const response = await fetchService.performPostHttpRequest(url, headers, jsonSignFormData);
    console.log(response)

    if(response.token){
        localStorage.setItem('token', response.token)
        window.location = "index.html"
    }
    else
        alert(response.msg)

}

function buildHeaders(authorization = null){
    const headers = {
        "Content-type": "application/json",
        "Authorization": (authorization)? authorization : "Bearer TOKEN_MISSING"
    }
    return headers
}

function buildJsonFormData(form){
    const jsonFormData = { };
    for(const pair of new FormData(form)){
        jsonFormData[pair[0]] = pair[1];
    }
    return jsonFormData;
}

