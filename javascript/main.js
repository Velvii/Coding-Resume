console.clear()
const mainScript = document.querySelector('script[src$="main.js"]')
const scriptUrl = new URL(mainScript?.getAttribute('src') || './javascript/main.js', window.location.href)
const appBaseUrl = new URL('../', scriptUrl)

function resolvePath(path) {
    return new URL(path.replace(/^\//, ''), appBaseUrl).href
}

let filename = (window.location.pathname).split('/').pop();
function loadCSS(filePath) {
    const resolvedCssPath = resolvePath(filePath)
    const existingLink = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).find(link => link.href === resolvedCssPath)
    if (existingLink) {
        return
    }

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = resolvedCssPath
    document.head.appendChild(link)
}

async function loadComponent(className, htmlFilePath, cssFilePath) {
    const targetDiv = document.getElementsByClassName(className)[0]
    if (!targetDiv) {
        return
    }

    const response = await fetch(resolvePath(htmlFilePath))
    if (!response.ok) {
        throw new Error(`Failed to load component HTML: ${htmlFilePath}`)
    }

    targetDiv.innerHTML = await response.text()
    loadCSS(cssFilePath)
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadComponent('header', 'html/components/header.html', 'css/components/header.css')
        injectHeaderFunc()
    }
    catch (error) {
        console.error(error)
    }

    if (document.getElementsByClassName("naviBar")[0]) {
        try {
            await loadComponent("naviBar", "html/components/naviBar.html", "css/components/naviBar.css")
            injectNaviBarFunc()
        }
        catch (error) {
            console.error(error)
        }
    }
})
for (let i = 0; i < document.getElementsByClassName("redirect").length;i++){
    let button = document.getElementsByClassName("redirect")[i]
    if (button.id == "projectsButton"){
        button.onclick = function(){
            window.location.href = resolvePath("html/pages/projects.html")
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

    if (filename == "index.html" || filename == "" || filename == null){
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
        window.location.href = resolvePath("index.html")
    }
    let rightButton = document.getElementById("rightButton")
    let leftButton = document.getElementById("leftButton")
    }
}

if (filename == "index.html" || filename == "" || filename == null){
    if (document.getElementById("projectsButton") != null){
        document.getElementById("projectsButton").onclick = function(){
            window.location.href = resolvePath("html/pages/projects.html")
        }
    }
    if (document.getElementById("contactButton") != null){
        document.getElementById("contactButton").onclick = function(){
            document.getElementById("outerContactPopup").style.opacity = "1"
            document.getElementById("outerContactPopup").style.pointerEvents = "all"
            document.getElementsByClassName("bottom-image1")[0].style.transform = "translateX(-116%)"
            document.getElementsByClassName("bottom-image2")[0].style.transform = "translateX(36%)scaleX(-1)scale(.8)translateY(30%)"
            document.getElementById("innerContactPopup").style.animation = "none"
            document.getElementById("innerContactPopup").offsetHeight
            document.getElementById("innerContactPopup").style.animation = null
        }
        if (document.getElementById("contactCloseButton") != null){
            document.getElementById("contactCloseButton").onclick = function(){
                document.getElementById("outerContactPopup").style.opacity = "0"
                document.getElementById("outerContactPopup").style.pointerEvents = "none"
                document.getElementsByClassName("bottom-image1")[0].style.transform = "translateX(-95%)"
                document.getElementsByClassName("bottom-image2")[0].style.transform = "translateX(10%)scaleX(-1)scale(.8)translateY(30%)"
            }
        }
    }
}