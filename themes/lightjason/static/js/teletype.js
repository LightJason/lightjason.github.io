/*
* Teletype jQuery Plugin
* @version 0.1.6
*
* @author Steve Whiteley
* @see http://teletype.rocks
* @see https://github.com/stvwhtly/jquery-teletype-plugin
*
* Copyright (c) 2015 Steve Whiteley
* Dual licensed under the MIT or GPL Version 2 licenses.
*
*/

"use strict";
(function () {

	jQuery.teletype = function( element, options ) {

			// helper references
			var dom = jQuery( this );
			
		
			// default plugin settings
			var defaults = {
				text: [ 'one', 'two', 'three' ],
				result: [],
				automaticstart: true,
				classresult: "teletype-result",
				classprefix: "teletype-prefix",
				classtext: "teletype-text",
				// classcursor: "teletype-cursor",
				// classmain: "teletype",
				typeDelay: 100,
				backDelay: 50,
				blinkSpeed: 1000,
				delay: 2000,
				cursor: '|',
				preserve: false,
				prefix: '',
				loop: 0,
				humanise: true,
				smoothBlink: true,
				callbackNext: null,
				callbackType: null,
				callbackFinished: null
			}


			// ---- private methods -------------------------------------------------------------------------------------------------

			var next = function() {
				element.current.index++;
			
				if ( element.current.index >= element.settings.text.length ) {
					element.current.index = 0;
					element.current.loop++;
					if ( element.settings.loop !== false && ( element.settings.loop == element.current.loop ) )
						return false;
				}

				element.current.position = 0;
				element.setCurrentString();
				if ( typeof( element.settings.callbackNext ) == 'function' )
					element.settings.callbackNext( element );

				return true;
			};


			var type = function() {
				if ( ( element.settings.prefix && current.position === 0 ) && ( element.current.loop === 0 && element.current.index === 0 ) )
						jQuery( '<span />' ).addClass( element.settings.classprefix ).html( element.settings.prefix ).prependTo( dom );

				var letters = element.current.string.split( '' ),
					letter = letters[element.current.position],
					start = element.current.position + 1;

				if ( letter == '^' || letter == '~' ) {

					// @todo code shorten
					var end = element.current.string.substr( start ).search( /[^0-9]/ );
					if ( end == -1 )
						end = current.string.length;
					
					var value = element.current.string.substr( start, end );
					if ( jQuery.isNumeric( value ) ) {
						element.current.string = element.current.string.replace( letter + value, '' );

						if ( letter == '^' )
							window.setTimeout( function() { window.setTimeout( type, delay( element.settings.typeDelay ) ); }, value );

						else {
							var index = element.current.position - value;
							element.current.string = element.current.string.substr( 0, index - 1 ) + element.current.string.substr( element.current.position - 1 );
							window.setTimeout( function() { backspace( Math.max( index, 0 ) ); }, delay( element.settings.backDelay ) );
						}

						return;
					}

				} else 
					if ( letter == '\\' ) {
						var nextChar = element.current.string.substr( start, 1 );
						if ( nextChar == 'n' ) {
							element.current.position++;
							letter = '<br />';
						}
					}

				if ( ( element.output ) && ( letter ) )
					element.output.html( element.output.html() + letter );
				
				element.current.position++;
				if ( element.current.position < element.current.string.length )
					window.setTimeout( type, delay( element.settings.typeDelay ) );
				else 
					if ( element.settings.preserve != false )
						window.setTimeout( function() { window.setTimeout( backspace, delay( settings.backDelay ) ); }, settings.delay );
					else {
						element.output.html( element.output.html() + element.current.result + '<span class="' + element.settings.classprefix+ '">' + element.settings.prefix + '</span>' );
						if ( next() )
							window.setTimeout( function() { window.setTimeout( type, delay( element.settings.typeDelay ) ); }, element.settings.delay );
						else 
							if ( typeof( element.settings.callbackFinished ) == 'function' )
								element.settings.callbackFinished( element );
					}

				if ( typeof( element.settings.callbackType ) == 'function' )
					element.settings.callbackType( letter, element );
			
			};


			var backspace = function( stop ) {
				if ( !stop )
					stop = 0;
				
				if ( element.current.position > stop ) {
					if (output)
						element.output.html( element.output.html().slice( 0, -1 ) );
					window.setTimeout( function() { backspace( stop ); }, delay( element.settings.backDelay ) );
					element.current.position--;
				
				} else {
					if ( ( stop === 0 ) && ( next() === false ) )
						return;
				
					window.setTimeout( type, delay( element.settings.typeDelay ) );
				}
			};


			var delay = function( speed ) { return element.settings.humanise ? parseInt( speed ) + Math.floor( Math.random() * 200 ) : parseInt( speed ); };


			var setCurrentString = function() {
				element.current.string = element.settings.text[current.index].replace(/\n/g, "\\n");
				element.current.result = (element.settings.result.length == element.settings.text.length) && (!!element.settings.result[element.current.index]) ? '<p class="' + element.settings.classresult + '">' + element.settings.result[element.current.index] + "</p>" : "";
			}



			// ---- public methods --------------------------------------------------------------------------------------------------

			element.setCursor = function( cursor ) {
				element.current.cursor = cursor;
			};
			
			
			element.reset = function() {
				if (element.settings.loop === 0)
					return;
			};


			element.start = function() {
				//if (element.settings.automaticstart)
				//	return;
			}


			element.init = function() {

				// clear DOM node first
				dom.empty();

				// sets instance values into element
				element.settings = jQuery.extend( {}, defaults, options );
				element.current   = { string: '', result: '', index: 0, position: 0, loop: 0 };
				element.output   = '';

				// set cursor
				if ( element.settings.cursor ) {
					//var cursor = jQuery( '<span />' ).addClass( element.settings.classcursor ).appendTo( self );
					/*
					setInterval ( function() {
						if ( element.settings.smoothBlink )
							cursor.animate( { opacity: 0 } ).animate( { opacity: 1 } );
						else
							cursor.delay(500).fadeTo(0,0).delay(500).fadeTo(0,1);
					}, settings.blinkSpeed );
					*/
				}
				

			}

			element.init();
		}

		// ---- jQuery initialization -------------------------------------------------------------------------------------------



		jQuery.fn.teletype = function( options ) {

			return this.each( function() {
				// http://stefangabos.ro/jquery/jquery-plugin-boilerplate-revisited/

				if (undefined == jQuery(this).data('teletype'))
					return jQuery(this).data( 'teletype', new jQuery.teletype(this, options) );

				/*
				setCurrentString();
				self.addClass( settings.classmain ).empty();
				output = jQuery( '<span />' ).addClass( settings.classtext ).appendTo( self );
				if ( settings.cursor ) {
					var cursor = $( '<span />' ).addClass( settings.classcursor ).appendTo( self );
					element.setCursor( settings.cursor );
					setInterval ( function() {
						if ( settings.smoothBlink )
							cursor.animate( { opacity: 0 } ).animate( { opacity: 1 } );
						else
							cursor.delay(500).fadeTo(0,0).delay(500).fadeTo(0,1);
					}, settings.blinkSpeed );
				}
				if (settings.automaticstart)
					type();	
				*/

			} );
	}

})(jQuery);