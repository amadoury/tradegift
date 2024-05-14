$(document).ready(function(){
    let button = $("button");
    button.on('click', function(){
        let pseudo = $("#floatingPseudo");
        let password = $("#floatingPassword");
        let points = $("#floatingPoints");
        let naiss = $("#dateNaissance");
        if (pseudo.val() && password.val() && points.val() && naiss.val()){
            let data = $(".form-modif").serialize();
            $.get('/change', data, function(data){
                if (data.flag){
                    $("#error").remove();
                    $("#success").remove();
                    let success = $("<p id='success' class='text-center'>The modification was successful</p>");
                    success.css({
                        color:'green'
                    });
                    $(".container > h2").after(success);
                }
                else{
                    $("#error").remove();
                    $("#success").remove();
                    let error = $("<p id='error' class='text-center'>The modification was not successful</p>");
                    error.css({
                        color:'red'
                    });
                    $(".container > h2").after(error);
                }
            });           
        }
    });

});

