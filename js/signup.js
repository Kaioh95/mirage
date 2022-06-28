//import FetchService from './service/FetchService';
//const fetchService = new FetchService();

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

    const response = await performPostHttpRequest(url, headers, jsonSignFormData);
    console.log(response)

    if(response){
        window.location = "index.html"
    }
    else
        alert(response.msg)

}

async function performPostHttpRequest(url, headers, body){
    const rawResponse = await fetch(url, {
        mode: 'no-cors',
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    });
    const content = await rawResponse.json();
    return content;
}

async function performPostHttpRequestt(url, body){
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function(){
        console.log(this.responseText)
    }

    return request.responseText
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

