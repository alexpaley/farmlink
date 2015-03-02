$(document).ready( function () {
    var $form = $('#emailForm');
    $('#signupButton').bind('click', function (event) {
        event.preventDefault();
        console.log($form.serialize());
        if($('#signupButton').hasClass('red-background')) {
            $('#signupButton').removeClass('red-background');
        }

        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize(),
            cache : false,
            //dataType : 'json',
            //contentType : "application/json; charset=utf-8",
            error : function(xhr, err, err2) {
                alert("Could not connect to the registration server. Please try again later." + err);
            },
            success : function(data) {
                if (data.Code != "0") {
                    $('#signupButton').text('Try Again');
                    $('.btn-action').addClass('red-background');
                } else {
                    $('#signupButton').text('Requested');
                    $('.btn-action').addClass('green-background');
                   }
            }
        });
    });
});
