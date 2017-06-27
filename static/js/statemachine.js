"use strict";

jQuery(function() {

    // state-machine reset function
    var lx_resetcallback = function(i) {
        var la_unchecked = i.dom.parent().find(".unchecked");
        i.dom.parent().find(".checked").each(function(n,m) { var lo = jQuery(m); jQuery(la_unchecked[n]).text( lo.text() ); lo.empty(); });

        ["state-error", "state-4"].forEach(function(j) { jQuery( i.prefix + j ).attr("fill", i.statecolor); }); 
    };

    // state-machine copy char
    var lx_stringcopy = function(i) {
        if ( !i.execution[0][i.index].startsWith(i.transitionstring) )
            return;

        var la_checked = i.dom.parent().find(".checked");
        i.dom.parent().find(".unchecked").each(function(n,m) { var lo_checked = jQuery(la_checked[n]); var lo_unchecked = jQuery(m); lo_checked.text( lo_checked.text() + lo_unchecked.text().charAt(0) ); lo_unchecked.text( lo_unchecked.text().substring(1) ); });
    };

    // valid-string state-machine execution
    var lo_valid = {
        callbackStart : lx_resetcallback,
        callbackNext  : lx_stringcopy,
        execution     : [["state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to2", "state-2", "path-2to2", "state-2", "path-2to2", "state-2", "path-2to3", "state-3", "path-3to4", "state-4" ]]
    };

    // non-valid state-machine execution
    var lo_nonvalid = {
        callbackStart : lx_resetcallback,
        callbackNext  : lx_stringcopy,
        execution     : [["state-1", "path-1to1", "state-1", "path-1to1", "path-1to2", "state-2", "path-2toerror", "state-error"]]
    };


    // animate state-machine
    jQuery(".unchecked").css( "opacity", 0.3 );

    jQuery("#animate-valid").click( function() {
        if ( ( lo_nonvalid.timout ) || ( lo_valid.timout ) )
            return;

        lo_valid.dom = jQuery(this);
        lo_valid = LJason.finitestatemachine( lo_valid );
    });

    jQuery("#animate-nonvalid").click( function() {
        if ( ( lo_nonvalid.timout ) || ( lo_valid.timout ) )
            return;

        lo_nonvalid.dom = jQuery(this);
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