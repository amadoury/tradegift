$(document).ready(function(){
    $('.row-present').hide().fadeIn('slow');

    $(document).on('click', '.btn-cart' ,function(){
        let id = $(this).attr('id');
        let ob = $(this);
        $.post('/panier', {idcadeau:id}, function(data){  
            let reinit = () => {
                ob.text('ADD TO CART');
                ob.css({color:'white'});
                ob.hover(() => {
                    ob.css({color:"#264F0B"});
                }, () => {
                    ob.css({color:"white"});
                })
            };

            if (data.status){
                ob.text("ITEM ADDED");
                ob.css({
                    color:"#381a3c"
                });
                setTimeout(reinit, 1500);
            }else{
                ob.text("ITEM NOT ADDED");
                ob.css({
                    color:'red'
                });
                setTimeout(reinit, 1500);
            }
        });
    });

    if ($('.congrat-main').length != 0){
        $.getScript('../js/congrat.js');
    }

    setInterval(() => {
        $('.confetti-container').remove();
    }, 5000);
});