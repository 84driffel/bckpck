chrome.runtime.sendMessage({todo:"showPageAction"});

var visible = true;
var commentList;
var mainCommentDiv;
console.log(document.URL);

(async function run(){
var navbutton = document.createElement("div");
navbutton.style.zIndex = "100";
navbutton.style.position = "fixed";
navbutton.style.bottom = "0px";
navbutton.style.right = "0px";
navbutton.style.background = "grey";
navbutton.style.height = "70px";
navbutton.style.width = "70px";
var navtext = document.createElement("p");
navtext.textContent = "Click Me";
navbutton.appendChild(navtext);
document.body.append(navbutton);

navbutton.addEventListener('click',function(){
console.log('click');
var commentList2 = getComments()


})
})();

function genComments2(commentListLocal){
    console.log(commentListLocal);
    let main_div = document.createElement('div');
    let inputText = document.createElement('input');
    inputText.type="Text";
    let inputBtn = document.createElement('input');
    inputBtn.type="button";
    inputBtn.value = "submit";
    inputBtn.addEventListener('click',function(){
        console.log('submit pressed');
        postComment(['5ABCE',inputText.value])
    })
    main_div.appendChild(inputText);
    main_div.appendChild(inputBtn);
    main_div.id = "bckpck-comment-container";
    main_div.className = "bckpck-comment";
    for(var i = 0; i < commentListLocal.length; i++){
        let secondary = document.createElement('div')
        secondary.id = "bckpck-comment";
        secondary.className = "bkcpck-comment"
        secondary.margin = "10%";
        let name = document.createElement('p');
        name.textContent = commentListLocal[i][0];
        name.className = "bckpck-name";
        let time = document.createElement('p');
        time.textContent = commentListLocal[i][2];
        time.className = "bckpck-time";
        let break_1 = document.createElement('br');
        let content = document.createElement('p');
        content.textContent = commentListLocal[i][3];
        content.className = "bckpck-time";
        let hash = document.createElement('p');
        hash.textContent = commentListLocal[i][4];
        hash.style.visiblity = 'hidden';
        secondary.appendChild(name);
        secondary.appendChild(time);
        secondary.appendChild(break_1);
        secondary.appendChild(content);
        secondary.appendChild(hash);
        main_div.appendChild(secondary);
    }
    main_div.style.visibility = true;
    var comms = document.body.appendChild(main_div);
    //comms.parentNode.insertBefore(main_div,comms);
    mainCommentDiv = main_div;
    return main_div
}


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

async function makePostRequest(url, data){
    const otherParam={
        mode: 'cors',
        headers:{
          "content-type":"application/json;"
        },
        body: JSON.stringify(data),
        method: "POST"
      };
    const response = await fetch(url, otherParam)
    const content = await response.json();
    console.log(content);
    return content;
}

async function postComment(data){
    await makePostRequest("https://bckpck.xyz:444/post-comment",{url:document.URL,user_id:"51ACD",content:data[1]})
    //if(document.getElementById('bkcpk-comment-container') != undefined){
     //   console.log("reset")
     //   document.getElementById('bkcpk-comment-container').remove();
    //}
    //document.getElementById('bckpck-button').click;
    //commentList = await getComments();

}

var createAdFlag = false;

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
});

(async function run(){
    var ip = await makeGetRequest("https://bckpck.xyz/node/default")
    commentList = await getComments();
    console.log(commentList);
    //var mainCommentDiv = genComments(commentList);
    pollComments(commentList);

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

function pollComments(commentList){
    const com = document.getElementsByTagName('ytd-comments-header-renderer')[0];
    //console.log(document.getElementById('message').children[0].innerHTML)
    console.log('poll')
    console.log(commentList);
    
    if(com){
        modifyDOM(commentList);
    }
    else if(document.getElementById('message')!=undefined && document.getElementById('message').children[0].innerHTML == "Comments are turned off. "){
        modifyDOM2(commentList);
    }
    else {
        console.log('running...');
        setTimeout(function() {
            pollComments(commentList)}, 5000);
    }
}

//pollComments();

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

function genComment(data){
    let main_d = document.createElement('div')
    let name = document.createElement('p');
    name.textContent = data[1];
    let time = document.createElement('p');
    name.textContent = data[2];
    let break_1 = document.createElement('br');
    let content = document.createElement('p');
    content.textContent = data[3];
    let hash = document.createElement('p');
    hash.textContent = data[4];
    hash.style.visiblity = false;

}

function genComments(commentListLocal){
    console.log(commentListLocal);
    let main_div = document.createElement('div');
    let inputText = document.createElement('input');
    inputText.type="Text";
    let inputBtn = document.createElement('input');
    inputBtn.type="button";
    inputBtn.value = "submit";
    inputBtn.addEventListener('click',function(){
        console.log('submit pressed');
        postComment(['5ABCE',inputText.value])
    })
    main_div.appendChild(inputText);
    main_div.appendChild(inputBtn);
    main_div.id = "bckpck-comment-container";
    main_div.className = "bckpck-comment";
    for(var i = 0; i < commentListLocal.length; i++){
        let secondary = document.createElement('div')
        secondary.id = "bckpck-comment";
        secondary.className = "bckpck-comment"
        secondary.margin = "10%";
        let name = document.createElement('p');
        name.textContent = commentListLocal[i][3];
        name.className = "bckpck-name";
        let time = document.createElement('p');
        time.textContent = commentListLocal[i][0];
        time.className = "bckpck-time";
        let break_1 = document.createElement('br');
        let content = document.createElement('p');
        //content.textContent = commentListLocal[i][1];
        content.className = "bckpck-time";
        let hash = document.createElement('p');
        //hash.textContent = commentListLocal[i][4];
        hash.style.visiblity = 'hidden';
        secondary.appendChild(name);
        secondary.appendChild(time);
        secondary.appendChild(break_1);
        secondary.appendChild(content);
        secondary.appendChild(hash);
        main_div.appendChild(secondary);
    }
    main_div.style.visibility = true;
    var comms = document.getElementById('spinner-container').appendChild(main_div);
    //comms.parentNode.insertBefore(main_div,comms);
    mainCommentDiv = main_div;
    return main_div
}

async function getComments(){
    var commentListLocal = await makePostRequest("https://bckpck.xyz:444/get-comments",{url:document.URL})
    console.log(commentListLocal);
    return commentListLocal;
}

function modifyDOM(commentList){
    let comments = document.querySelector('#comments').querySelector('#title');
    console.log(comments);
    //console.log('modifyDom');
    //console.log(commentList);

    var tabs_div = document.createElement('div');
    tabs_div.className = 'tab';
    
    var bckpck_tab = document.createElement('input');
    bckpck_tab.id = "bckpck-button";
    bckpck_tab.type = 'button'
    bckpck_tab.value = 'BckPck'
    bckpck_tab.style.width = "5vw";
    bckpck_tab.style.margin = "1vw";
    bckpck_tab.className = 'tablinks';
    tabs_div.appendChild(bckpck_tab);
    comments.append(tabs_div);
    bckpck_tab.addEventListener('click', function(){
    //bckpck_tab.addEventListener('click',bkcpckClick, false);
    //bckpck_tab.myParam = commentList;
    //console.log(bckpck_tab.myParam);
    //function bkcpckClick(evt){
        //console.log('click');
        //console.log(commentList);
        console.log(document.getElementById('bckpck-comment-container'));
        if(document.getElementById('bckpck-comment-container') == null){
            console.log("redraw");
            //commentList = getComments(); 
            genComments(commentList);
        }
        let contents = document.getElementById("contents");
        if (visible){
            contents.style.visibility = 'hidden';
            if(document.getElementById('bckpck-comment-container')!= undefined){
                document.getElementById('bckpck-comment-container').style.visibility = 'visible';
            }
            visible = false;
            bckpck_tab.value = "YouTube";
        }
        else{
            contents.style.visibility = 'visible';
            visible = true;
            bckpck_tab.value = "BckPck";
            if(document.getElementById('bckpck-comment-container')!= undefined){
                document.getElementById('bckpck-comment-container').style.visibility = 'hidden';
            }
        }
    },false);
}


    function modifyDOM2(commentList){
        let comments = document.getElementById('comments');
        console.log(comments);
        //console.log('modifyDom');
        //console.log(commentList);

        var tabs_div = document.createElement('div');
        tabs_div.className = 'tab';
        
        var bckpck_tab = document.createElement('input');
        bckpck_tab.type = 'button'
        bckpck_tab.value = 'BckPck'
        bckpck_tab.style.width = "5vw";
        bckpck_tab.style.margin = "1vw";
        bckpck_tab.className = 'tablinks';
        tabs_div.appendChild(bckpck_tab);
        comments.append(tabs_div);
        bckpck_tab.addEventListener('click', function(){
        //bckpck_tab.addEventListener('click',bkcpckClick, false);
        //bckpck_tab.myParam = commentList;
        //console.log(bckpck_tab.myParam);
        //function bkcpckClick(evt){
            //console.log('click');
            //console.log(commentList);
            console.log(document.getElementById('bckpck-comment-container'));
            if(document.getElementById('bckpck-comment-container') == undefined){
                genComments(commentList);
            }
            let contents = document.getElementById("contents");
            if (visible){
                contents.style.visibility = 'hidden';
                if(document.getElementById('bckpck-comment-container')!= undefined){
                    document.getElementById('bckpck-comment-container').style.visibility = 'visible';
                }
                visible = false;
                bckpck_tab.value = "YouTube";
            }
            else{
                contents.style.visibility = 'visible';
                visible = true;
                bckpck_tab.value = "BckPck";
                if(document.getElementById('bckpck-comment-container')!= undefined){
                    document.getElementById('bckpck-comment-container').style.visibility = 'hidden';
                }
            }
        },false);
    }

     
    

