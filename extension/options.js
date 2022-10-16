var user_ip;
var user_default_status;
var user_chat_status;

async function readSettings() {
    await chrome.storage.local.get(["default_ip"], function(result) {
        user_ip = (result.default_ip.ip[0])
      });

    await chrome.storage.local.get(["use_default_ip"], function(result) {
        user_default_status = (result.default_status)
      });

    await chrome.storage.local.get(["chat_filter"], function(result) {
        user_chat_status = (result.chat_status)
      });
    }

readSettings();
console.log(user_ip + " " + user_default_status + " " + user_chat_status)
$('#SetServerIP').hide();
$('#default-ip').text(user_ip);

// event handler for the default ip checkbox
$('#defaultCheckbox').on('click', function(){
    if($('#defaultCheckbox').is(":checked")){
        $('#SetServerIP').hide();
        $('#default-ip').show();
    } else {
        $('#SetServerIP').show();
        $('#default-ip').hide();
    }
    console.log('test');
});

// event handler for the save settings button
$('#setSettings').on('click', function(){
    var temp_ip = '';
    var default_status;
    if($('#defaultCheckbox').is(":checked")){
        temp_ip = user_ip;
        default_status = true;
    } else {
        temp_ip = $('#IP').val();
        default_status = false;
    }
    chrome.storage.local.set({default_ip: temp_ip},function(){
        console.log("Saved ip: " + temp_ip)
    });

    chrome.storage.local.set({use_default_ip: default_status}, function(){
        console.log("Using Default IP: " + default_status)
    });

    var chat_status = $('#chat-filter').is(':checked');
    chrome.storage.local.set({chat_filter: chat_status},function(){
        console.log("Chat filter: " + $('#chat-filter').is(':checked'));
    });
});

$('#domdom-hide').on('click', function(){
    chrome.tabs.executeScript(null, {file: 'hidecomments.js'});
})