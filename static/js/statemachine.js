"use strict";

jQuery(function() {

    // animate of string
    jQuery("#animate-valid").click( function() {
        ["state-1", "path_1to1", "path_1to1", "path_1to1", "path_1to1", "path_1to1", "path_1to1", "path_1to2", "path_2to2", "path_2to2", "path_2to3", "path_2to3"].forEach( function(i) {

        });
    });

    // defines hover effects for the text linkage
	[ "state-1", "state-4", "state-error" ].forEach( function(i) {
		jQuery("#animate-" + i).hover( 
			function() { jQuery("#" + i).attr("fill", "#f90"); },
			function() { jQuery("#" + i).attr("fill", "#fff"); } 
		);
	});    

} );    