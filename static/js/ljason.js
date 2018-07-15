"use strict";

/**
 * base modul to represent base algorithms
 * and structure to encapsulate structures
 **/
var LJason = (function (px_modul) {

    // ---- state-machine --------------------------------------------------------------------------------------------------------------------------------------
    var statemachineexecute = function( po_model )
    {
        // if wait-state
        if ( po_model.wait )
        {
            po_model.execution.forEach( function(i) { po_model.callbackColor( po_model.prefix, i[po_model.index], po_model.statestring, po_model.statecolor, po_model.transitionstring, po_model.transitioncolor ); });

            po_model.index++;
            po_model.wait = !po_model.wait;
            po_model.timeout = setTimeout( function() { statemachineexecute( po_model ) }, po_model.time );
            return;
        }

        po_model.wait = !po_model.wait;
        po_model.execution.forEach( function(i) { po_model.callbackColor( po_model.prefix, i[po_model.index], po_model.statestring, po_model.activecolor, po_model.transitionstring, po_model.activecolor ); });
        
        if ( po_model.index < po_model.execution[0].length - 1 )
        {
            if (typeof(po_model.callbackNext) === "function")
                po_model.callbackNext(po_model);

            po_model.timeout = setTimeout( function() { statemachineexecute( po_model ) }, po_model.time );
        }
        else
        {
            po_model.index = 0;
            clearTimeout( po_model.timeout );

            if (typeof(po_model.callbackFinish) === "function")
                po_model.callbackFinish(po_model);
        }    
    };

    /**
     * executes a state-machine based on dom elements
     * 
     * @param po_options state-machine configuration
     */
    px_modul.finitestatemachine = function( po_options )
    {
        var lo = jQuery.extend({}, {
                index: 0,
                wait: false,
                prefix: "#",
                time: 750,
                execution: [[]],
                timeout: undefined,
                activecolor: "#0e7",
                statecolor: "#fff",
                transitioncolor: "#000",
                statestring: "state",
                transitionstring: "path",
                callbackStart: undefined,
                callbackFinish: undefined,
                callbackNext: undefined,
                callbackColor: function( pc_prefix, pc_item, pc_state, pc_statecolor, pc_transition, pc_transitioncolor ) 
                {
                    if ( pc_item.startsWith(pc_state) )
                        jQuery( pc_prefix + pc_item ).attr( "fill", pc_statecolor );

                    if ( pc_item.startsWith(pc_transition) )
                        jQuery( pc_prefix + pc_item ).attr( "stroke", pc_transitioncolor );
                }
            }, po_options || {} );
        
        if (typeof(lo.callbackStart) === "function")
            lo.callbackStart( lo );    
            
        statemachineexecute( lo );
        return lo;
    };

    // ---------------------------------------------------------------------------------------------------------------------------------------------------------

    return px_modul;
}(LJason || {}));
