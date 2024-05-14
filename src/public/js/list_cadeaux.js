$(document).ready(function(){
    $(".btn-delete").on("click", function(){
        let id = $(this).attr("id");
        $.get('/delete_cadeau', {idcadeau:id}, function(data){
            window.location = data.link;
        });
    });
});