"use strict";

jQuery(function() {

	// defines hover effects for literal
	jQuery("#animate-literal-annotation").hover( 
		function() { jQuery(".svg-literal-annotation").attr("fill", "red"); },
		function() { jQuery(".svg-literal-annotation").attr("fill", ""); } 
	);

	jQuery("#animate-literal-values").hover( 
		function() { jQuery(".svg-literal-values").attr("fill", "red"); },
		function() { jQuery(".svg-literal-values").attr("fill", ""); } 
	);

	jQuery("#animate-literal-functor").hover( 
		function() { jQuery(".svg-literal-functor").attr("fill", "red"); },
		function() { jQuery(".svg-literal-functor").attr("fill", ""); } 
	);

	jQuery("#animate-literal-negation").hover( 
		function() { jQuery(".svg-literal-negation").attr("fill", "red"); },
		function() { jQuery(".svg-literal-negation").attr("fill", ""); } 
	);

	jQuery("#animate-literal-raw").hover( 
		function() { jQuery(".svg-literal-raw").attr("fill", "blue"); },
		function() { jQuery(".svg-literal-raw").attr("fill", ""); } 
	);	
	
} );
