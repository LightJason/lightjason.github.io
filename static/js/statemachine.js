"use strict";

jQuery(function() {

    // valid finite-state execution
    var lo_valid = {
        string      : "aaabbb169XxX",
        execution   : [["state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to2", "state-2", "path-2to2", "state-2", "path-2to2", "state-2", "path-2to3", "state-3", "path-3to4", "state-4" ]]
    };

    // non-valid finite-state execution
    var lo_nonvalid = {
    };

    // animate of string
    jQuery("#animate-valid").click( function() {
        if ( lo_valid.timout )
            return;

        lo_valid = LJason.finitestatemachine( lo_valid );
    });

    // defines hover effects for the text linkage
	[ "state-1", "state-4", "state-error" ].forEach( function(i) {
		jQuery("#animate-" + i).hover( 
			function() { jQuery("#" + i).attr("fill", "#f90"); },
			function() { jQuery("#" + i).attr("fill", "#fff"); } 
		);
	});    

} );    