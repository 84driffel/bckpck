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

chrome.storage.sync.get('preferences',function(result){
    //test if preferences has not been set
    console.log("event page get");
    console.log(result.preferences);
    if(result && Object.keys(result).length === 0 && result.constructor === Object){
        console.log('no saved settings');
        var preferences = {};
        preferences["default_ip"] = "";
        preferences["use_default_ip"] = true;
        preferences["chat_status"] = true;
        console.log(preferences);
        chrome.storage.sync.set({'preferences':preferences});
    }
});