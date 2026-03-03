$(document).ready(function () {

    $(".container1 div").each(function () {
        var divClass = $(this).attr("class"); 
        $(this).css("background-color", divClass);

        var pElement = $(this).find("p");
        var pClass = pElement.attr("class"); 
        pElement.css("color", pClass);
    });


    
    
    $("a[href*='google']").text("Google");

    
    $("a[href$='org']").text("IEEE");

    
    $("a[href^='https']").text("Facebook");

    
    $("a[href^='http']").append(" Official Website");


    
    $(".container3 figure:eq(2) img")
        .attr("src", "./img/orange.jfif")
        .next("figcaption")
        .text("fig.3 - Orange Juice");


    
    $("td[class~='my-name']").css("color", "blue");

    
    $(".container4 td:odd").css("background-color", "pink");

    $(".container4 tr:last td:eq(1)").css("font-weight", "bold");


    
    $(".container5 ul > li:eq(1)").css("font-style", "italic");

    $(".container5 ol li:eq(1)").next().css("color", "red");

});
