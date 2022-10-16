chrome.runtime.sendMessage({todo:"showPageAction"});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function makePostRequest(data, endPoint){
    const otherParam={
      //mode: 'cors',
      //credentials: 'same-origin',
      //headers:{
      //  "content-type":"application/json; charset=UTF-8"
      //},
      body: JSON.stringify(data),
      method: "POST"
    };
    const response = await fetch("https://www.workoutdev.org:9000/" + endPoint,otherParam)
    const content = await response.json();
    console.log(content);
    return content;
}

async function makeGetRequest(url){
    const otherParam={
        mode: 'cors',
        headers:{
          "content-type":"application/json;"
        },
        method: "GET"
      };
    const response = await fetch(url, otherParam)
    const content = await response.json();
    //console.log(content);
    return content;
}

var createAdFlag = false;

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
});

(async function run(){

    var ip = await makeGetRequest("https://bckpck.xyz/node/default")
    //console.log(ip)
    chrome.storage.local.set({default_ip: ip}, function() {
        console.log('Value is set to ' + ip);
      });
})();

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    if(request.todo == "test"){
        console.log("test message");
        var video = document.getElementsByClassName("video-stream")[0];
        video.currentTime = 50;
    }
});