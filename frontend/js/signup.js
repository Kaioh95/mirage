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
    let url = fetchService.getBaseUrl+"/users/auth/register";

    const btnSubmit = document.getElementById('sign-in');
    btnSubmit.disable = true;
    setTimeout(() => btnSubmit.disable = false, 3000);

    const jsonSignFormData = fetchService.buildJsonFormData(form);

    const headers = fetchService.buildHeaders();

    const response = await fetchService.performPostHttpRequest(url, headers, jsonSignFormData);
    console.log(response)

    if(response.token){
        localStorage.setItem('token', response.token)
        window.location = "index.html"
    }
    else
        alert(response.msg)

}

