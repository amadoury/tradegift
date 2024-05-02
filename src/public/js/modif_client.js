$(document).ready(function(){
    let button = $(".container form button");
    button.on('click', function(){
        let pseudo = $(".container form #pseudo").val();
        let data_client;
        $.get('http://localhost:8080/search_client', {client:pseudo}, function(data){
            data_client = data;
        }); 

        $.post('http://localhost:8080/modif_client', {client:data_client});
    });

});

