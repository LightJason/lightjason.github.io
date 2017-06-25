"use strict";

jQuery(function() {

    var ll_swap = true;
    var ln_index = 0;
    var la_validorder = ["state-1", "path-1to1", "path-1to1", "path-1to1", "path-1to1", "path-1to1", "path-1to1", "path-1to2", "path-2to2", "path-2to2", "path-2to3", "path-2to3"];


    var lo_colorset = function(i, p_prefix, p_colorfill, p_colorline) {
        if (i.startsWith("state"))
            jQuery( p_prefix+i ).attr("fill", p_colorfill);
        if (i.startsWith("path"))
            jQuery( p_prefix+i ).attr("stroke", p_colorline);        
    };

    var lo_valid = function() {
        if (ll_swap)
        {
            lo_colorset( la_validorder[ln_index], "#", "#f90", "#f90" );
            ln_index++;
            ll_swap = false;
        }
        else
        {
            lo_colorset( la_validorder[ln_index-1], "#", "#fff", "#000" );
            ll_swap = true;
        }

        if (ln_index < la_validorder.length - 1 )
            setTimeout( lo_valid, 1000 );
        else
        {
            ln_index = 0;
            ll_swap = true;
        }
    }


    // animate of string
    jQuery("#animate-valid").click( function() {
        if ( ln_index != 0)
            return;

        setTimeout(lo_valid, 1000);
        
    });

    // defines hover effects for the text linkage
	[ "state-1", "state-4", "state-error" ].forEach( function(i) {
		jQuery("#animate-" + i).hover( 
			function() { jQuery("#" + i).attr("fill", "#f90"); },
			function() { jQuery("#" + i).attr("fill", "#fff"); } 
		);
	});    

} );    