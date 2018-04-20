let remover, mouseX, mouseY, style, displayValue
let index = 0
// two arrays for keeping history
let elementHistory = []
let displayHistory = [] // display attribute can change with elements, ex: inline, block, inline-block

document.addEventListener('mousedown', function(e){
    if( e.button == 2 ) remover = e.target  })
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    index++
    elementHistory[index] = remover
    style = window.getComputedStyle(remover)
    displayHistory[index] = style.getPropertyValue('display')
    remover.style.setProperty ("display", "none")
    document.body.style.setProperty ("overflow", "scroll", "important") // force scrolling on pages that disable it
})

document.addEventListener("mousemove", function(e){
    mouseX = e.clientX
    mouseY = e.clientY
})

function KeyPress(e) {
    // remove element with alt+q
    if (e.keyCode == 81 && e.altKey) {
        remover = document.elementFromPoint(mouseX, mouseY) // get element with coordinates
        index++
        elementHistory[index] = remover
        // get display value for undo and save it in array
        style = window.getComputedStyle(remover)
        displayHistory[index] = style.getPropertyValue('display')
        remover.style.setProperty ("display", "none")
        document.body.style.setProperty ("overflow", "scroll", "important")
       // remover.parentElement.removeChild(remover) // completely remove element
    }
    // undo last remove with alt+w
    if (e.keyCode == 87 && e.altKey && index > 0) {
        elementHistory[index].style.setProperty ("display", displayHistory[index])
        index--
    }
}

document.onkeydown = KeyPress;