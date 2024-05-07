$(document).ready(function(){
    let checkbox = $("#checkbox");
    checkbox.on("click",function(){
        if (checkbox.prop( "checked" )){
            $("input[name^='password']").attr("type", "text");
        }
        else{
            $("input[name^='password']").attr("type", "password");
        }
    });

    $(".btn-login").on("click", function(){
        let pseudo = $("input[name^='pseudo']");
        let password = $("input[name^='password']");
        if (pseudo.val() && password.val()){
            let link = $("form").attr("id");
            let d = $("form").serialize();
            $.post(link, d, function(data){
                if (!data.flag){
                   let error = $("<p id='error' class='text-center'>Wrong Pseudo or Password </p>");
                   error.css({
                    color:"red"
                   });
                   $("#error").remove();
                   pseudo.val("");
                   password.val("");
                   $(".form-signin > .h3").after(error);
                }
                else{
                    window.location = data.link;
                }
            })
            .done(function(){
                console.log("done");
            })
            .fail(function(){
                console.log("fail");
            }); 

        } else {
            let error = $("<p id='error' class='text-center'>Pseudo or Password is Empty</p>");
            $("#error").remove();
            error.css({
                color:"red"
            });
            $(".form-signin > .h3").after(error);
        }
    }); 
});