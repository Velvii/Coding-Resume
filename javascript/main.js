console.clear()
let filename = (window.location.pathname).split('/').pop();
function loadCSS(filePath) {
    const existingLink = document.querySelector(`link[href="${filePath}"]`)
    if (existingLink) {
        return
    }

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = filePath
    document.head.appendChild(link)
}

async function loadComponent(className, htmlFilePath, cssFilePath) {
    const targetDiv = document.getElementsByClassName(className)[0]
    if (!targetDiv) {
        return
    }

    const response = await fetch(htmlFilePath)
    if (!response.ok) {
        throw new Error(`Failed to load component HTML: ${htmlFilePath}`)
    }

    targetDiv.innerHTML = await response.text()
    loadCSS(cssFilePath)
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadComponent('header', '/html/components/header.html', '/css/components/header.css')
        injectHeaderFunc()
    }
    catch (error) {
        console.error(error)
    }

    if (document.getElementsByClassName("naviBar")[0]) {
        try {
            await loadComponent("naviBar", "/html/components/naviBar.html", "/css/components/naviBar.css")
            injectNaviBarFunc()
        }
        catch (error) {
            console.error(error)
        }
    }
})
for (let i = 0; i < document.getElementsByClassName("redirect").length;i++){
    let button = document.getElementsByClassName("redirect")[i]
    if (button.id == "about"){
        button.onclick = function(){

        }
    }
}

function injectHeaderFunc(){
    const header = document.getElementsByClassName("header")[0]
    if (!header) {
        return
    }

    const headerButton = header.getElementsByTagName("button")[0]
    if (!headerButton) {
        return
    }

    const headerImg = headerButton.getElementsByTagName("img")[0]
    if (!headerImg) {
        return
    }

    if (filename == "index.html"){
            headerImg.style.background = "#59E3A5"
    }
    else if (filename == "projects.html"){
            headerImg.style.background = "#e38e59"
    }
}
function injectNaviBarFunc(){
    if (document.getElementsByClassName("naviBar")[0] != null){
    console.log()
    let naviBar = document.getElementsByClassName("naviBar")[0]
    let homeButton = document.getElementById("homeButton")
    if (!homeButton) {
        return
    }
    homeButton.onclick = function(){
        console.log("AHH")
        window.location.href = "/index.html"
    }
    let rightButton = document.getElementById("rightButton")
    let leftButton = document.getElementById("leftButton")
    }
}

if (filename == "index.html"){
    if (document.getElementById("projectsButton") != null){
        document.getElementById("projectsButton").onclick = function(){
            window.location = "/html/pages/projects.html"
        }
    }
}