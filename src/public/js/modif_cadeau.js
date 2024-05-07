$(document).ready(function(){
    // $("#taille").val("");
    // $("#nbcolor").val(0);
    // $("#flexCheckTaille").prop('checked', false);
    // $("#flexCheckCouleur").prop('checked', false);
    // $(".taille").hide();
    // $(".couleur").hide();
    // $("#form-couleur").remove();
    $.getScript('../js/form_cadeau.js', function(jd) {
        // Call custom function defined in script
        CheckJS();
     });
});