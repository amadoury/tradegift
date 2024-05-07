
$(document).ready(function(){
    let ncolors = $('#nbcolor');
    ncolors.on("input", function(){
            $('.couleur #form-couleur').remove();

        let l = [];
        for(var i = 0; i < ncolors.val(); i++){
            let ip = $("<div class=\"form-floating mb-3\" id=\"form-couleur\">\
            <input type=\"text\" name=\"couleur\" class=\"form-control\" id=\"couleur\" placeholder=\"Entrez la couleur\" required> \
            <label for=\"couleur\">Entrer la couleur " + (i+ 1) + "</label>\
          </div>");
          l.push(ip);
        }

        for (var i =0; i < l.length; i++){
            if (i == 0) {
                l[i].insertAfter($(".couleur label"));
            }else{
                l[i].insertAfter(l[i-1]);
            }
        }
    });

    $(".taille").hide();
    $(".couleur").hide();
    let checkbox_taille = $(".form-check-taille");
    checkbox_taille.on("click",function(){
        if (checkbox_taille.prop( "checked" )){
            $(".taille").show();
        }
        else{
            $(".taille").hide();
            $(".form-select").val("");
        }
    });

    let checkbox_couleur = $(".form-check-couleur");
    checkbox_couleur.on("click",function(){
        if (checkbox_couleur.prop( "checked" )){
            $(".couleur").show();
        }
        else{
            $(".couleur").hide();
            ncolors.val(0);
            $('.couleur #form-couleur').remove();
        }
    });

    $("#form-cadeau").on("submit", function(e){
        e.preventDefault();
        let nom = $("#nomCadeau");
        let prix = $("#prixPoints");
        let img = $("#image");
        console.log("hello world avant");
        if (nom.val() && prix.val() && img.val()){

            let array_path = img.val().split("\\");
            var colors = [];
            $("input[name^='couleur']").each(function() {
                colors.push($(this).val());
            });

            let fd = new FormData(this);
            console.log(fd);            	

            $.ajax({
                type: "POST",
                url: '/cadeau',
                data: fd,
                contentType:false,
                processData:false,
                success: function(data){
                    if (data.flag){
                        console.log("flag " + data.flag);
                        let success = $("<p class='myfont text-center'> The addition was successful </p>")
                        success.css({
                            color:"green"
                        });
                        success.insertAfter($(".myfont-title"));
                        nom.val("");
                        prix.val(0);
                        img.val("");
                        $("#taille").val("");
                        $("#nbcolor").val(0);
                        $("#flexCheckTaille").prop('checked', false);
                        $("#flexCheckCouleur").prop('checked', false);
                        $(".taille").hide();
                        $(".couleur").hide();
                        $("#form-couleur").remove();
                    }
                    else{
                        window.location = data.link;
                    }
                }
            });
        }
    });

    $(".btn_modifier").on('click', function(){
        e.preventDefault();
        let nom = $("#nomCadeau");
        let prix = $("#prixPoints");
        let img = $("#image");
        if (nom.val() && prix.val() && img.val()){
            var colors = [];
            $("input[name^='couleur']").each(function() {
                colors.push($(this).val());
            });

            let fd = new FormData(this);
            //console.log(fd);  
            fd.append('id', $(".btn-modifier").attr("value"));          	

            $.ajax({
                type: "POST",
                url: '/modif_cadeau',
                data: fd,
                contentType:false,
                processData:false,
                success: function(data){
                    if (data.flag){
                        console.log("flag " + data.flag);
                        let success = $("<p class='myfont text-center'> The Modification was successful </p>")
                        success.css({
                            color:"green"
                        });
                        success.insertAfter($(".myfont-title"));
                        nom.val("");
                        prix.val(0);
                        img.val("");
                        $("#taille").val("");
                        $("#nbcolor").val(0);
                        $("#flexCheckTaille").prop('checked', false);
                        $("#flexCheckCouleur").prop('checked', false);
                        $(".taille").hide();
                        $(".couleur").hide();
                        $("#form-couleur").remove();
                    }
                    else{
                        window.location = data.link;
                    }
                }
            });
        }
    });
});