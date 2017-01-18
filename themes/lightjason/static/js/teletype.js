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
		var object = this, self = jQuery( this );
			
		
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
				object.current.index++;
			
				if ( object.current.index >= object.settings.text.length ) {
					object.current.index = 0;
					object.current.loop++;
					if ( object.settings.loop !== false && ( object.settings.loop == object.current.loop ) )
						return false;
				}

				object.current.position = 0;
				object.setCurrentString();
				if ( typeof( object.settings.callbackNext ) == 'function' )
					object.settings.callbackNext( object );

				return true;
			};


			var type = function() {
				if ( ( object.settings.prefix && current.position === 0 ) && ( object.current.loop === 0 && object.current.index === 0 ) )
						jQuery( '<span />' ).addClass( object.settings.classprefix ).html( object.settings.prefix ).prependTo( self );

				var letters = object.current.string.split( '' ),
					letter = letters[object.current.position],
					start = object.current.position + 1;

				if ( letter == '^' || letter == '~' ) {

					// @todo code shorten
					var end = object.current.string.substr( start ).search( /[^0-9]/ );
					if ( end == -1 )
						end = current.string.length;
					
					var value = object.current.string.substr( start, end );
					if ( jQuery.isNumeric( value ) ) {
						object.current.string = object.current.string.replace( letter + value, '' );

						if ( letter == '^' )
							window.setTimeout( function() { window.setTimeout( type, delay( object.settings.typeDelay ) ); }, value );

						else {
							var index = object.current.position - value;
							object.current.string = object.current.string.substr( 0, index - 1 ) + object.current.string.substr( object.current.position - 1 );
							window.setTimeout( function() { backspace( Math.max( index, 0 ) ); }, delay( object.settings.backDelay ) );
						}

						return;
					}

				} else 
					if ( letter == '\\' ) {
						var nextChar = object.current.string.substr( start, 1 );
						if ( nextChar == 'n' ) {
							objet.current.position++;
							letter = '<br />';
						}
					}

				if ( ( objet.output ) && ( letter ) )
					objet.output.html( objet.output.html() + letter );
				
				object.current.position++;
				if ( objet.current.position < object.current.string.length )
					window.setTimeout( type, delay( object.settings.typeDelay ) );
				else 
					if ( object.settings.preserve != false )
						window.setTimeout( function() { window.setTimeout( backspace, delay( settings.backDelay ) ); }, settings.delay );
					else {
						objet.output.html( objet.output.html() + objet.current.result + '<span class="' + objet.settings.classprefix+ '">' + objet.settings.prefix + '</span>' );
						if ( next() )
							window.setTimeout( function() { window.setTimeout( type, delay( objet.settings.typeDelay ) ); }, objet.settings.delay );
						else 
							if ( typeof( object.settings.callbackFinished ) == 'function' )
								objet.settings.callbackFinished( object );
					}

				if ( typeof( object.settings.callbackType ) == 'function' )
					objet.settings.callbackType( letter, object );
			
			};


			var backspace = function( stop ) {
				if ( !stop )
					stop = 0;
				
				if ( object.current.position > stop ) {
					if (output)
						object.output.html( object.output.html().slice( 0, -1 ) );
					window.setTimeout( function() { backspace( stop ); }, delay( object.settings.backDelay ) );
					object.current.position--;
				
				} else {
					if ( ( stop === 0 ) && ( next() === false ) )
						return;
				
					window.setTimeout( type, delay( object.settings.typeDelay ) );
				}
			};


			var delay = function( speed ) { return object.settings.humanise ? parseInt( speed ) + Math.floor( Math.random() * 200 ) : parseInt( speed ); };


			var setCurrentString = function() {
				object.current.string = object.settings.text[current.index].replace(/\n/g, "\\n");
				object.current.result = (object.settings.result.length == object.settings.text.length) && (!!object.settings.result[object.current.index]) ? '<p class="' + object.settings.classresult + '">' + object.settings.result[object.current.index] + "</p>" : "";
			}



			// ---- public methods --------------------------------------------------------------------------------------------------

			object.setCursor = function( cursor ) {
				object.current.cursor = cursor;

				jQuery('.'+settings.classcursor, self).text( cursor );
			};
			
			
			object.reset = function() {
				if (object.settings.loop === 0)
					return;
			};


			object.start = function() {
				//if (object.settings.automaticstart)
				//	return;
			}


			object.init = function() {

				// sets instance values into object
				object.settings = jQuery.extend( {}, defaults, options );
				object.current   = { string: '', result: '', index: 0, position: 0, loop: 0 };
				object.output   = '';

			}

			object.init();
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
					object.setCursor( settings.cursor );
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