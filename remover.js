let remover
document.addEventListener('mousedown', function(e){
    if( e.button == 2 ) { remover = e.target } })
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
   remover.parentElement.removeChild(remover)
        document.body.style.overflow = "scroll; !important"
     })