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
    //chrome.storage.local.set({default_ip: ip}, function() {
    //    console.log('Value is set to ' + ip);
    //  });


    //chrome.tabs.executeScript(null, {file: 'modifyDOM.js'});
    //document.getElementById('comments').style.visibility = 'hidden';



})();

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    if(request.todo == "test"){
        console.log("test message");
        var video = document.getElementsByClassName("video-stream")[0];
        video.currentTime = 50;
    }
});

function pollComments(){
    const com = document.getElementsByTagName('ytd-comments-header-renderer')[0];

    if(com){
        modifyDOM();
    } else {
        console.log('running...');
        setTimeout(pollComments, 5000);
    }
}

pollComments();

// waitForElement('comment', function(){
//     let comments = document.getElementById('comments');
//     //let comments_html = comments.outerHTML;
//     //console.log(comments);
//     var tabs_div = document.createElement('div');
//     var tabs = document.createElement('button');
//     tabs.innerHTML = 'BckPck';
//     tabs_div.appendChild(tabs);
//     comments.prepend(tabs_div);

//     console.log(document.getElementById('comments'));
// });
//document.addEventListener('DOMContentLoaded', modifyDOM());
//window.onload = modifyDOM();
//document.body.style.backgroundColor = 'yellow';
//chrome.tabs.executeScript(null, {file: 'modifyDOM.js'});

function modifyDOM(){
    let comments = document.querySelector('#comments').querySelector('#title');
    console.log(comments);

    var tabs_div = document.createElement('div');
    tabs_div.className = 'tab';
    
    var bckpck_tab = document.createElement('input');
    bckpck_tab.type = 'button'
    bckpck_tab.value = 'BckPck'
    bckpck_tab.className = 'tablinks';
    tabs_div.appendChild(bckpck_tab);
    comments.append(tabs_div);

    console.log(document.getElementById('comments'));
}


