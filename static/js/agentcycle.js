"use strict";

jQuery(function() {

	// defines hover effects for literal
	[ "literal-annotation", "literal-values", "literal-functor", "literal-negation" ].forEach( function(i) {
		jQuery("#animate-"+i).hover( 
			function() { jQuery(".svg-"+i).attr("fill", "red"); },
			function() { jQuery(".svg-"+i).attr("fill", ""); } 
		);
	});

	jQuery("#animate-literal-raw").hover( 
			function() { jQuery(".svg-literal-raw").attr("fill", "blue"); },
			function() { jQuery(".svg-literal-raw").attr("fill", ""); } 
		);


	// defines hover effects for both agent-cycles
	[ ".svg-agentcycle-checkcontext", ".svg-agentcycle-unify", ".svg-agentcycle-action",
	 ".svg-agentcycle-execution", ".svg-agentcycle-beliefbase", ".svg-agentcycle-plans",
	 ".svg-agentcycle-intentions", ".svg-agentcycle-trigger"
	].forEach( function(i) {
		jQuery(i).hover( 
			function() { jQuery(i).attr("fill", "#0f0"); },
			function() { jQuery(i).attr("fill", "#dfd"); } 
		);
	});
	
} );
