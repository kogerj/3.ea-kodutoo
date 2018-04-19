
chrome.contextMenus.create({
	"title": "Remove",
	"id": "Removestuff",
	"contexts": ["all"]
})

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "removeit")
    })
})
