$(document).ready(function(){
    $(".btn-panier").on('click', function(e){
        e.preventDefault();
        let id = $(this).attr("id");
        console.log("hello world "+ id);
        $.post('/del_article_panier', {idcadeau:id}, function(data){
            window.location = data.link;
        });
    });
    $("input").val(1);
    $(".qte").text($("input").val());

    $("input").on('change', function(){
        console.log($(this));
        let qt = $(this).val();
        qt = qt <= 1 ? 1 : qt;
        $(this).val(qt);

        let id = $(this).attr('id');

        let str = "[name^=" +id+ "]"; 

        $(str).text($(this).val());
        
        let obj = $('input');
        let donne = [];
        for(var i = 0; i < obj.length; i++){
            donne.push({id:obj[i].id, qte:obj[i].value})
        }
        
        $.post('/panier_total',JSON.stringify(donne), function(data){
            $('.total').text('Total : ' + data.total)
        });
    });

    $('.valid-cart').on('click', function(){
        let obj = $('input');
        let donne = [];
        for(var i = 0; i < obj.length; i++){
            donne.push({id:obj[i].id, qte:obj[i].value})
        } 
        $.post('/valid_cart',JSON.stringify(donne), function(data){
            $(".success").remove();
            $(".error").remove();
            
            if (data.can_buy){
                console.log('succes');
               let success = $('<p class="myfont text-center success">Congratulations, Thank you for purchasing from our site</p>');
                success.css({color:"green"});
                success.insertAfter('.title-cart');
            }else{
                console.log('error');
                let error = $('<p class="myfont text-center error"> Sorry, you don\'t have that many points to purchase</p>');
                error.css({color:'red'});
                error.insertAfter('.title-cart');
            }
        });
    });
});