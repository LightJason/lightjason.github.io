"use strict";

jQuery(function() {

    // valid string
    var lo_valid = {
        string        : "aaabbb169XxX",
        callbackStart : function(i) { ["state-error", "state-4"].forEach(function(j) { jQuery( i.prefix + j ).attr("fill", i.statecolor); }); },
        execution     : [["state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to2", "state-2", "path-2to2", "state-2", "path-2to2", "state-2", "path-2to3", "state-3", "path-3to4", "state-4" ]]
    };

    // non-valid finite-state execution
    var lo_nonvalid = {
        string        : "AA2b",
        callbackStart : function(i) { ["state-error", "state-4"].forEach(function(j) { jQuery( i.prefix + j ).attr("fill", i.statecolor); }); },
        execution     : [["state-1", "path-1to1", "state-1", "path-1to1", "path-1to2", "state-2", "path-2toerror", "state-error"]]
    };

    // animates of strings
    jQuery("#animate-valid").click( function() {
        if ( lo_valid.timout )
            return;

        lo_valid = LJason.finitestatemachine( lo_valid );
    });

    jQuery("#animate-nonvalid").click( function() {
        if ( lo_nonvalid.timout )
            return;

        lo_nonvalid = LJason.finitestatemachine( lo_nonvalid );
    });


    // defines hover effects for the text linkage
	[ "state-1", "state-4", "state-error" ].forEach( function(i) {
		jQuery("#animate-" + i).hover( 
			function() { jQuery("#" + i).attr("fill", "#0e7"); },
			function() { jQuery("#" + i).attr("fill", "#fff"); } 
		);
	});    

} );    