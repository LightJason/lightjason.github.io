"use strict";

jQuery(function() {

    // layout function
    var lx_layout = function( pc_prefix, pc_item, pc_state, pc_statecolor, pc_transition, pc_transitioncolor )
    {
        if ( pc_item.startsWith(pc_state) )
            jQuery( pc_prefix + pc_item ).attr( "fill", pc_statecolor );

        if ( pc_item.startsWith(pc_transition) )
            jQuery( pc_prefix + pc_item ).attr( "stroke", pc_transitioncolor );  
    };


    // state-machine execution algorithm (based on dom ids)
    var lx_statemachineexecution = function( po_model, pn_time, pc_prefix, pc_activecolor, pc_state, pc_statecolorreset, pc_transition, pc_transitioncolorreset )
    {
        // if wait-state
        if ( po_model.wait )
        {
            lx_layout( pc_prefix, po_model.item[po_model.index], pc_state, pc_statecolorreset, pc_transition, pc_transitioncolorreset );

            po_model.index++;
            po_model.wait = !po_model.wait;
            po_model.timeout = setTimeout( function() { lx_statemachineexecution( po_model, pn_time, pc_prefix, pc_activecolor, pc_state, pc_statecolorreset, pc_transition, pc_transitioncolorreset ) }, pn_time );
            return;
        }

        lx_layout( pc_prefix, po_model.item[po_model.index], pc_state, pc_activecolor, pc_transition, pc_activecolor );
        po_model.wait = !po_model.wait;
        if ( po_model.index < po_model.item.length - 1 )
            po_model.timeout = setTimeout( function() { lx_statemachineexecution( po_model, pn_time, pc_prefix, pc_activecolor, pc_state, pc_statecolorreset, pc_transition, pc_transitioncolorreset ) }, pn_time ); 
        else
        {
            po_model.index = 0;
            clearTimeout( po_model.timeout );
        }    
    }    

    // valid finite-state execution
    var lo_valid = {
        index       : 0,
        timeout     : 0,
        wait        : false,
        string      : "aaabbb169XxX",
        item        : ["state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to1", "state-1", "path-1to2", "state-2", "path-2to2", "state-2", "path-2to2", "state-2", "path-2to3", "state-3", "path-3to4", "state-4" ]
    };

    // non-valid finite-state execution
    var lo_nonvalid = {
    };

    // animate of string
    jQuery("#animate-valid").click( function() {
        if ( lo_valid.timout )
            return;

        lx_layout( "#", lo_valid.item[lo_valid.item.length-1], "state", "#fff", "path", "#000" );
        lx_statemachineexecution( lo_valid, 750, "#", "#f90", "state", "#fff", "path", "#000" );
    });

    // defines hover effects for the text linkage
	[ "state-1", "state-4", "state-error" ].forEach( function(i) {
		jQuery("#animate-" + i).hover( 
			function() { jQuery("#" + i).attr("fill", "#f90"); },
			function() { jQuery("#" + i).attr("fill", "#fff"); } 
		);
	});    

} );    