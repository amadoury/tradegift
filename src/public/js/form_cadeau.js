
$(document).ready(function(){
    let ncolors = $('#nbcolor');
    console.log(ncolors);
    ncolors.on("input", function(){
        for (var i = 0; i < ncolors.val(); i++){
            $('.container form #form-couleur').remove();
        }

        for(var i = 0; i < ncolors.val(); i++){
            let ip = $("<div class=\"form-floating mb-3\" id=\"form-couleur\">\
            <input type=\"text\" name=\"couleur\" class=\"form-control\" id=\"couleur\" placeholder=\"Entrez la couleur\" required> \
            <label for=\"couleur\">Entrer la couleur " + (i+ 1) + "</label>\
          </div>");
          ip.insertBefore($(".container form button"));
        }
    });
});