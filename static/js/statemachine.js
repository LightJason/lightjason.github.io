"use strict";

jQuery(function() {

    // state-machine execution algorithm (based on dom ids)
    var lx_statemachineexecution = function( po_model, pn_time, pc_state, pc_transition, pc_activecolor, pc_colorfillreset, pc_colorlinereset )
    {
        // if wait-state
        if ( po_model.wait )
        {
            if ( po_model.item[po_model.index].startsWith(pc_state) )
                jQuery( "#" + po_model.item[po_model.index] ).attr( "fill", pc_colorfillreset );

            if ( po_model.item[po_model.index].startsWith(pc_transition) )
                jQuery( "#" + po_model.item[po_model.index] ).attr( "stroke", pc_colorlinereset );             

            po_model.index++;
            po_model.wait = !po_model.wait;
            po_model.timeout = setTimeout( function() { lx_statemachineexecution( po_model, pn_time, pc_state, pc_transition, pc_activecolor, pc_colorfillreset, pc_colorlinereset ) }, pn_time );
            return;
        }

        if ( po_model.item[po_model.index].startsWith(pc_state) )
            jQuery( "#" + po_model.item[po_model.index] ).attr( "fill", pc_activecolor );

        if ( po_model.item[po_model.index].startsWith(pc_transition) )
            jQuery( "#" + po_model.item[po_model.index] ).attr( "stroke", pc_activecolor );     

        po_model.wait = !po_model.wait;
        if ( po_model.index < po_model.item.length - 1 )
            po_model.timeout = setTimeout( function() { lx_statemachineexecution( po_model, pn_time, pc_state, pc_transition, pc_activecolor, pc_colorfillreset, pc_colorlinereset ) }, pn_time ); 
        else
            clearTimeout( po_model.timeout );
    }    

    // valid finite-state execution
    var lo_valid = {
        index       : 0,
        timeout     : 0,
        wait        : false,
        string      : "aaabbb169XxX",
        item        : ["state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to2", "state-2", "path-2to2", "state-2", "path-2to2", "state-2", "path-2to3", "state-3", "path-3to4", "state-4" ]
    }

    // animate of string
    jQuery("#animate-valid").click( function() {
        if ( lo_valid.timout )
            return;

        lx_statemachineexecution( lo_valid, 250, "state", "path", "#f90", "#fff", "#000" );
    });

    // defines hover effects for the text linkage
	[ "state-1", "state-4", "state-error" ].forEach( function(i) {
		jQuery("#animate-" + i).hover( 
			function() { jQuery("#" + i).attr("fill", "#f90"); },
			function() { jQuery("#" + i).attr("fill", "#fff"); } 
		);
	});    

} );    