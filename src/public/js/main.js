$(document).ready(function(){
    $('.btn').on('click', function(){
        console.log("button cliqué");
        let id = $(this).attr('id');
        $.post('/panier', {idcadeau:id}, function(data){   
        });
    });

    if ($('.congrat-main').length != 0){
        $.getScript('../js/congrat.js');
    }

    setInterval(() => {
        $('.confetti-container').remove();
    }, 5000);
});