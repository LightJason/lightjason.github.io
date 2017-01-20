"use strict";

jQuery(function() {

    jQuery(".category_showall").click(function() {
        jQuery(".item_category").parent().fadeIn( "slow", function() {});
    });

    jQuery(".item_category").click(function() {
        jQuery("[data-category=" + jQuery(this).attr( "data-category" ) + "]").parent().fadeOut( "slow", function() {});
    });    

    jQuery("#toc").toc({
        "selectors" : "h2,h3,h4,h5,h6",
        "container" : ".body"
    });

    jQuery("#tochideshow").click(function() {
        jQuery("#toc").fadeToggle( "slow", function() { 
            jQuery("#tochideshow").text().match(/hide/i) ?  jQuery("#tochideshow").text("Show") : jQuery("#tochideshow").text("Hide");
        });

    });    

    jQuery("#nav").click(function() {
        if (!jQuery(".sidebar").data("active"))
        {
            jQuery(".sidebar").css("width", "250px");
            jQuery(".sidebar").css("margin-left", "0");
            jQuery(".sidebar").data("active", true);
        } else {
            jQuery(".sidebar").css("width", "0");
            jQuery(".sidebar").css("margin-left", "0");  
            jQuery(".sidebar").data("active", false);
        }
    });

    jQuery(".teletype").each(function() {
        jQuery(this).css("width", jQuery(this).attr( "data-width" ) );
        jQuery(this).css("height", jQuery(this).attr( "data-height" ) );

        jQuery(this).teletype({
            text: jQuery(this).find("p.command").map(function(){ return jQuery(this).text().trim(); }),
            result : jQuery(this).find("p.result").map(function(){ return jQuery(this).html(); }),
            prefix: jQuery(this).attr( "data-prefix" ),
            cursor: "\u258B",
            automaticstart: false,
            typeDelay: 30,
            backDelay: 50,
            preserve: true,
            loop: 1
        });
    });

    jQuery(".teletypereset").click(function(){
        console.log( jQuery( "#" + jQuery(this).attr( "data-terminal" ) ).data("teletype") );
    });
});
    