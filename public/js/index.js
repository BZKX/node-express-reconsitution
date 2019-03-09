$(function () {
    $.ajax({
        url: 'search',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $('#text').text('userName'+data[0].email +'  pwd:'+ data[0].password);
        }
    });

    $('#login').on('submit',function (e) {
        e.preventDefault();
        // alert(1);
        $.ajax({
            url: '/dologin',
            type: 'post',
            dataType: 'json',
            data:$('#login').serialize(),
            success:function (data) {
                console.log(data);
            }
        })
    })
});