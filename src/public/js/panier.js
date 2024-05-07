$(document).ready(function(){
    $(".btn-panier").on('click', function(e){
        e.preventDefault();
        let id = $(this).attr("id");
        console.log("hello world "+ id);
        $.post('/del_article_panier', {idcadeau:id}, function(data){
            window.location = data.link;
        });
    });
});