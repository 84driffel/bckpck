var stored_ip = "test";
chrome.storage.local.get(["default_ip"], function(result) {
    stored_ip = (result.default_ip.ip[0])
  });
var stored_ip = "test";
$('#SetServerIP').hide();
$('#default-ip').text(stored_ip);

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
