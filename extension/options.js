$('#SetServerIP').hide();
$('#defaultCheckbox').on('click', function(){
    if($('#defaultCheckbox').is(":checked")){
        $('#SetServerIP').hide();
    } else {
        $('#SetServerIP').show();
    }
    console.log('test');
});