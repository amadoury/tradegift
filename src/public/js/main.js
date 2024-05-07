$(document).ready(function(){
    $('.btn').on('click', function(){
        console.log("button cliqué");
        let id = $(this).attr('id');
        $.post('/panier', {idcadeau:id}, function(data){   
        });
    });
});