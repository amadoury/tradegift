$(document).ready(function(){
    $(".card-hide").hide();
    let card_elem = $(".card-elem");
    card_elem.on("click dblclick", function(){

        //$(this).closest('article').find('h3').slideToggle('fast');
        $(this).find(':hidden').on("click", function(){
            //$(this).find(':hidden').slideToggle('fast');
            $(this).slideToggle('fast');
        })
        //this.hide();
    });
});