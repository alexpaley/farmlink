$(document).ready( function () {
    $('.get-in-touch').click(function() {
        $('#email').animate({
            'background-color': '#f4f19c'
        }, 2000, 'ease-in-out', function() {
            $('#email').animate({
                'background-color': '#e6e6e6'
            }, 2000, 'ease-in-out');
        });
    });
});
