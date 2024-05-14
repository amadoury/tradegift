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
                l[i].attr('class', l[i].attr('class') + ' mt-3');
                l[i].insertAfter($(".couleur label"));
            }else{
                l[i].insertAfter(l[i-1]);
            }
        }
    });

    let ntaille = $('#nbtaille');
    ntaille.on('input', function(){
        $('.ntaille #form-taille').remove();
        let nb = ntaille.val() >= 6 ? 6 :  ntaille.val();
        let l = [];
        for(var i = 0; i < nb; i++){
            let ip = $('<div class="form-floating mb-3" id="form-taille" >\
            <select class="form-select" name="taille" id="taille">\
                <option value="">Selectionnez la taille '+ (i + 1) +' </option>\
                <option value="xs">XS</option>\
                <option value="s">S</option>\
                <option value="m">M</option>\
                <option value="l">L</option>\
                <option value="xl">XL</option>\
                <option value="xxl">XXL</option>\
            </select>\
          </div>');
          l.push(ip);
        }

        for (var i =0; i < l.length; i++){
            if (i == 0) {
                l[i].attr('class', l[i].attr('class') + ' mt-3');
                l[i].insertAfter($(".ntaille label"));
            }else{
                l[i].insertAfter(l[i-1]);
            }
        }
    
    });

    $(".ntaille").hide();
    $(".couleur").hide();
    let checkbox_taille = $(".form-check-taille");
    checkbox_taille.on("click",function(){
        if (checkbox_taille.prop( "checked" )){
            $(".ntaille").show();
        }
        else{
            $('.ntaille').hide();
            ntaille.val(0);
            $('.ntaille #form-taille').remove();
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

    $("#modif-cadeau").on("submit", function(e){
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
            fd.append('id',  $('.btn-modifier')[0].id);           	

            $.ajax({
                type: "POST",
                url: '/modif_cadeau',
                data: fd,
                contentType:false,
                processData:false,
                success: function(data){
                    if (data.flag){
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

});