// (async function run(){
//     await readSettings();
//     //sleep(2000);
//     //console.log(user_ip + " " + user_default_status + " " + user_chat_status);
//     //$('#SetServerIP').hide();
//     //$('#default-ip').text(user_ip);
// })()
readSettings()

$('#SetServerIP').hide();
$('#defaultCheckbox').prop('checked', true);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//TODO: This shit busted, fix later
function readSettings() {
    chrome.storage.sync.get('preferences', function(result){
        console.log(result.preferences);
        console.log(result.preferences["default_ip"]);
        console.log(result.preferences["use_default_ip"]);
        console.log(result.preferences["chat_status"]);
        document.getElementById("ip").value = result.preferences["default_ip"];
        if (result.preferences["use_default_ip"] === true){
            $('#defaultCheckbox').prop('checked', true);
        }
        else{
            $('#defaultCheckbox').prop('checked', false);
        }
        if (result.preferences["chat_status"] === true){
            $('#chat-filter').prop('checked', true);
        }
        else{
            $('#chat-filter').prop('checked', false);
        }
    });

      //if (user_ip == undefined){
      //  user_ip = "bckpck.xyz"
      //} 
}



// event handler for the default ip checkbox
 $('#defaultCheckbox').on('click', function(){
     if($('#defaultCheckbox').is(":checked")){
         $('#SetServerIP').hide();
         $('#default-ip').show();
     } else {
         $('#SetServerIP').show();
         $('#default-ip').hide();
     }
     //console.log('test');
 });

// event handler for the save settings button
$('#setSettings').on('click', function(){
    chrome.storage.sync.get('preferences', function(result){
        if($('#defaultCheckbox').is(':checked')){
            result.preferences["default_ip"] = 'https://bckpck.xyz/node/default';
        } else {
            result.preferences["default_ip"] = $('#ip').val();
        }
        console.log("Saved ip: " + result.preferences["default_ip"]);

        result.preferences["use_default_ip"] = document.getElementById('defaultCheckbox').checked;
        console.log("Using Default IP: " + result.preferences["use_default_ip"]);

        result.preferences["chat_status"] = document.getElementById('chat-filter').checked;
        console.log("Chat filter: " + result.preferences["chat_status"]);
        chrome.storage.sync.set({'preferences':result.preferences});
    });
});

//$('#domdom-hide').on('click', function(){
//    chrome.tabs.executeScript(null, {file: 'hidecomments.js'});
//})
