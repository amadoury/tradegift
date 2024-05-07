$(document).ready(function(){
    $(".btn-delete").on("click", function(){
        let id = $(".btn-delete").attr("id");
        console.log("id " + id);
        $.get('/delete_cadeau', {idcadeau:id}, function(data){
            window.location = data.link;
        });
    });
});