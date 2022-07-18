import FetchService from './service/FetchService.js';
const fetchService = new FetchService();

document.addEventListener("DOMContentLoaded", onDocLoad);

async function onDocLoad(){
    await onLogUser()

    let btnlogout = document.getElementById('button-log-out')
    if(btnlogout){
        btnlogout.onclick = () => {logout()}
    }
}

const loginForm = document.querySelector("#form-login");
if(loginForm){
    loginForm.addEventListener("submit", function(e) {
        submitLoginForm(e, this);
    });
}

async function submitLoginForm(e, form){
    e.preventDefault();
    let url = fetchService.getBaseUrl()+"/users/auth/login";

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

async function onLogUser(){
    const token = localStorage.getItem('token')

    if(!token){
        return null
    }
    const urlUser = fetchService.getBaseUrl()+"/users/checkuser";

    console.log(token)
    const headers = fetchService.buildHeaders(`Bearer ${token}`);
    const response = await fetchService.performGetHttpRequest(urlUser, headers);
    console.log(response)

    const name = response.name
    const email = response.email
    const uId = response._id

    let loginarea = document.getElementById("login-menu-dropdown")
    loginarea.innerHTML = `
        <div class="usuario">
            <label id="nome-usuario">${name}</label>                    
            <a class="avatar" href="index.html">
                <div id="avatar-usuario"><h2>${name.charAt(0).toUpperCase()}</h2></div>
            </a>
        </div>
        <div id="tema">
            <ion-icon name="sunny-outline" style="width: 16px; height: 16px;"></ion-icon>
            <label class="switch" for="toggle-tema">
                <input type="checkbox" id="toggle-tema" name="toggle-tema">
                <span class="slider"></span>
            </label>
            <ion-icon name="moon-outline" style="width: 16px; height: 16px;"></ion-icon>
        </div>

        <a href="#"><button id="button-log-out" onclick="logout()">Log out</button></a>
    `
    changeTheme();
}

function changeTheme(){
    let r = document.querySelector(':root')
    const toggleTema = document.getElementById("toggle-tema")
    let theme = localStorage.getItem("theme")
    if(!theme){
        localStorage.setItem("theme", "light")
        theme = "light"
    }

    if (theme === "dark"){
        toggleTema.checked = true
        localStorage.setItem("theme", "dark")
        r.style.setProperty('--cor-primaria', '#1C0C5B')
        r.style.setProperty('--cor-secundaria', '#2C2F49')
        r.style.setProperty('--cor-terciaria', '#13132C')
        r.style.setProperty('--cor-fundo', '#08041C')
        r.style.setProperty('--cor-texto', '#9F94F5')
    }
    else{
        toggleTema.checked = false
        localStorage.setItem("theme", "light")
        r.style.setProperty('--cor-primaria', 'rgba(28, 12, 91, 1)')
        r.style.setProperty('--cor-secundaria', 'rgba(145, 107, 191, 0.5)')
        r.style.setProperty('--cor-terciaria', '#504382')
        r.style.setProperty('--cor-fundo', 'rgba(218, 212, 241, 0.5)')
        r.style.setProperty('--cor-texto', '#1C0C5B')
    }

    toggleTema.onclick = () => {
        if (toggleTema.checked){
            localStorage.setItem("theme", "dark")
            r.style.setProperty('--cor-primaria', '#1C0C5B')
            r.style.setProperty('--cor-secundaria', '#2C2F49')
            r.style.setProperty('--cor-terciaria', '#13132C')
            r.style.setProperty('--cor-fundo', '#08041C')
            r.style.setProperty('--cor-texto', '#9F94F5')
        }
        else{
            localStorage.setItem("theme", "light")
            r.style.setProperty('--cor-primaria', 'rgba(28, 12, 91, 1)')
            r.style.setProperty('--cor-secundaria', 'rgba(145, 107, 191, 0.5)')
            r.style.setProperty('--cor-terciaria', '#504382')
            r.style.setProperty('--cor-fundo', 'rgba(218, 212, 241, 0.5)')
            r.style.setProperty('--cor-texto', '#1C0C5B')
        }
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

function logout(){
    localStorage.removeItem('token')
    window.location = "index.html"
}

//await onLogUser();