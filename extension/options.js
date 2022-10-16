var stored_ip = "test";
chrome.storage.local.get(["default_ip"], function(result) {
    stored_ip = (result.default_ip.ip[0])
  });
var stored_ip = "test";
$('#SetServerIP').hide();
$('#defaultCheckbox').on('click', function(){
    if($('#defaultCheckbox').is(":checked")){
        $('#SetServerIP').hide();
        $('#default-ip').val(stored_ip);
    } else {
        $('#SetServerIP').show();
    }
    console.log('test');
});
