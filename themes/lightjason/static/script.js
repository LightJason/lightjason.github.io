"use strict";

jQuery(function() {

    jQuery(".category_showall").click(function() {
        jQuery(".item_category").parent().fadeIn( "slow", function() {});
    });

    jQuery(".item_category").click(function() {
        jQuery("[data-category=" + jQuery(this).attr( "data-category" ) + "]").parent().fadeOut( "slow", function() {});
    });    

});
    