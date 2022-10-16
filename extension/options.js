var stored_ip = "test";
chrome.storage.local.get(["default_ip"], function(result) {
    stored_ip = (result.default_ip.ip[0])
  });
var stored_ip = "test";
$('#SetServerIP').hide();
$('#default-ip').text(stored_ip);

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
    if($('#defaultCheckbox').is(":checked")){
        temp_ip = stored_ip;
    } else {
        temp_ip = $('#IP').val();
    }
    console.log(temp_ip);
    console.log("Chat filter: " + $('#chat-filter').is(':checked'));
});

$('#domdom-hide').on('click', function(){
    chrome.tabs.executeScript(null, {file: 'hidecomments.js'});
})