console.log("test event");
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.todo == "showPageAction"){
        chrome.tabs.query({active:true,currentWindow:true},function(tabs){
            chrome.pageAction.show(tabs[0].id);
        });
    }
})

// chrome.webNavigation.onCompleted.addListener(function(){
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, {todo: "test"});
//       });
// });