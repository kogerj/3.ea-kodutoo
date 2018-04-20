let remover, mouseX, mouseY, style, displayValue
document.addEventListener('mousedown', function(e){
    if( e.button == 2 ) { remover = e.target } })
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
   remover.parentElement.removeChild(remover)
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
        console.log(remover)
        // get display value for undo
        style = window.getComputedStyle(remover)
        displayValue = style.getPropertyValue('display')
        remover.style.setProperty ("display", "none")
        document.body.style.setProperty ("overflow", "scroll", "important")
       // remover.parentElement.removeChild(remover) // completely remove element
    }
    // undo last remove with alt+w
    if (e.keyCode == 87 && e.altKey) {
        remover.style.setProperty ("display", displayValue)
    }
}
document.onkeydown = KeyPress;