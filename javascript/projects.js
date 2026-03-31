console.clear()
const delay = ms => new Promise(res => setTimeout(res, ms*1000));
let tempDelay = .001
let closeButton
let miniProjectsDiv
let miniProjectsPreview
let miniProjectsPreviewsArray
let largeProjectsButton





if (document.getElementById("miniProjectsDiv") != null){
    miniProjectsDiv = document.getElementById("miniProjectsDiv")
    miniProjectsPreviewsArray = miniProjectsDiv.children;
}

if (document.getElementById("miniProjects").getElementsByTagName("button")[0] != null){
    miniProjectsPreview = document.getElementById("miniProjects").getElementsByTagName("button")[0]
    miniProjectsPreview.onclick = async function(){
        miniProjectsDiv.style.opacity = "1"
        closeButton.style.opacity = "1"
        miniProjectsDiv.style.pointerEvents = "all"
        closeButton.style.pointerEvents = "all"
        miniProjectsDiv = document.getElementById("miniProjectsDiv")
        miniProjectsPreviewsArray = miniProjectsDiv.children;
        miniProjectsDiv.style.pointerEvents = "none";
        document.getElementById("closeButton").style.pointerEvents = "none";
        (async () => {
            for (const projectPreview of miniProjectsPreviewsArray) {
                await delay(tempDelay)
                projectPreview.style.visibility = "visible"
                projectPreview.style.animation = "miniProjectsPreview .4s cubic-bezier(0.33, 1, 0.68, 1)"
            }
        })()
        await delay(miniProjectsPreviewsArray.length/40)
        miniProjectsDiv.style.pointerEvents = "all"
        document.getElementById("closeButton").style.pointerEvents = "all"
    }
}

const largeProjectsDiv = document.getElementById("largeProjectsDiv")
const largeProjectCards = document.querySelectorAll("#largeProjectsDivContainer > div")


if (largeProjectsDiv != null && largeProjectCards.length > 0){
    let snapTicking = false

    const updateSnappedCard = () => {
        const viewportCenter = largeProjectsDiv.getBoundingClientRect().left + (largeProjectsDiv.clientWidth / 2)
        let closestCard = null
        let closestDistance = Infinity

        largeProjectCards.forEach(card => {
            const cardRect = card.getBoundingClientRect()
            const cardCenter = cardRect.left + (cardRect.width / 2)
            const distance = Math.abs(cardCenter - viewportCenter)

            if (distance < closestDistance){
                closestDistance = distance
                closestCard = card
            }
        })

        largeProjectCards.forEach(card => card.classList.remove("is-snapped", "is-snapped-left", "is-snapped-right"))
        if (closestCard != null){
            closestCard.classList.add("is-snapped")

            const snappedIndex = Array.from(largeProjectCards).indexOf(closestCard)
            const leftCard = largeProjectCards[snappedIndex - 1]
            const rightCard = largeProjectCards[snappedIndex + 1]

            if (leftCard != null){
                leftCard.classList.add("is-snapped-left")
            }
            if (rightCard != null){
                rightCard.classList.add("is-snapped-right")
            }
        }
    }

    largeProjectsDiv.addEventListener("scroll", () => {
        if (snapTicking){
            return
        }
        snapTicking = true
        requestAnimationFrame(() => {
            updateSnappedCard()
            snapTicking = false
        })
    }, { passive: true })

    window.addEventListener("resize", updateSnappedCard)
    updateSnappedCard()
}


if (document.getElementById("largeProjects").getElementsByTagName("Button")[0] != null){
    largeProjectsButton = document.getElementById("largeProjects").getElementsByTagName("Button")[0]
    largeProjectsButton.onclick = function(){
        largeProjectsDiv.style.opacity = "1"
        largeProjectsDiv.style.pointerEvents = "all"
        closeButton.style.opacity = "1"
        closeButton.style.pointerEvents = "all"
    }
}

if (document.getElementById("closeButton") != null){
    closeButton = document.getElementById("closeButton")
    closeButton.onclick = function(){
        miniProjectsDiv.style.opacity = "0"
        closeButton.style.opacity = "0"
        miniProjectsDiv.style.pointerEvents = "none"
        closeButton.style.pointerEvents = "none"
        largeProjectsDiv.style.opacity = "0"
        largeProjectsDiv.style.pointerEvents = "none"
        Array.from(miniProjectsPreviewsArray).forEach(projectPreview => {
            projectPreview.style.visibility = "hidden"
            projectPreview.style.animation = "none"
        })
    }
}
async function handleCautionTape(){
    var cautionTape1
    if (document.getElementById("cautionTape1") != null){
        cautionTape1 = document.getElementById("cautionTape1")
        cautionTape1.style.animation = "cautionTapeIntro 1s cubic-bezier(0.33, 1, 0.48, 1)"
    }
    var cautionTape2
    if (document.getElementById("cautionTape2") != null){
        cautionTape2 = document.getElementById("cautionTape2")
        cautionTape2.style.animation = "cautionTapeIntro 1s cubic-bezier(0.33, 1, 0.68, 1)"
    }
    var cautionTape3
    if (document.getElementById("cautionTape3") != null){
        cautionTape3 = document.getElementById("cautionTape3")
        cautionTape3.style.animation = "cautionTapeIntro 1s cubic-bezier(0.33, 1, 0.88, 1)"
    }

     await delay(1)
     cautionTape1.style.animation = "cautionTapeIdle 10s linear infinite"
     cautionTape2.style.animation = "cautionTapeIdle 10s linear infinite"
     cautionTape3.style.animation = "cautionTapeIdle 10s linear infinite"
}

handleCautionTape()