document.addEventListener("DOMContentLoaded", themeLayout);

function themeLayout(){
    changeTheme()
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