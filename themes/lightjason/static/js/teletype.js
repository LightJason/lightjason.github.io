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
( function () {
	jQuery.fn.teletype = function( options ) {
		var settings = jQuery.extend( {}, jQuery.fn.teletype.defaults, options );
		var object = this,
			self = jQuery( this ),
			output = null,
			current = { 
				string: '',
				result: '',
				index: 0,
				position: 0,
				loop: 0
			};
		var next = function() {
			current.index++;
			if ( current.index >= settings.text.length ) {
				current.index = 0;
				current.loop++;
				if ( settings.loop !== false && ( settings.loop == current.loop ) ) {
					return false;
				}
			}
			current.position = 0;
			setCurrentString();
			if ( typeof( settings.callbackNext ) == 'function' ) {
				settings.callbackNext( current, object );
			}
			return true;
		};
		var type = function() {
			if ( settings.prefix && current.position === 0 ) {
				if ( current.loop === 0 && current.index === 0 ) {
					jQuery( '<span />' ).addClass( 'teletype-prefix' ).html( settings.prefix ).prependTo( self );
				}
			}
			var letters = current.string.split( '' ),
				letter = letters[current.position],
				start = current.position + 1;
			if ( letter == '^' || letter == '~' ) {
				var end = current.string.substr( start ).search( /[^0-9]/ );
				if ( end == -1 ) {
					end = current.string.length;
				}
				var value = current.string.substr( start, end );
				if ( jQuery.isNumeric( value ) ) {
					current.string = current.string.replace( letter + value, '' );
					if ( letter == '^' ) {
						window.setTimeout( function() {
							window.setTimeout( type, delay( settings.typeDelay ) );
						}, value );
					} else {
						var index = current.position - value;
						current.string = current.string.substr( 0, index - 1 ) + current.string.substr( current.position - 1 );
						window.setTimeout( function() {
							backspace( Math.max( index, 0 ) );
						}, delay( settings.backDelay ) );
					}
					return;
				}
			} else if ( letter == '\\' ) {
				var nextChar = current.string.substr( start, 1 );
				if ( nextChar == 'n' ) {
					current.position++;
					letter = '<br />';
				}
			}
			if ( letter !== undefined ) {
				output.html( output.html() + letter );
			}
			current.position++;
			if ( current.position < current.string.length ) {
				window.setTimeout( type, delay( settings.typeDelay ) );
			} else if ( settings.preserve === false ) {
				window.setTimeout( function() {
					window.setTimeout( backspace, delay( settings.backDelay ) );
				}, settings.delay );
			} else {
				output.html( 
					output.html() + 
					( (settings.result.length == settings.text.length) && (!!settings.result[current.index])   ? '<p class="teletype-result">' + settings.result[current.index] + "</p>" : "" ) + 
					'<span class="teletype-prefix">' + settings.prefix + '</span>' 
				);
				if ( next() ) {
					window.setTimeout( function() {
						window.setTimeout( type, delay( settings.typeDelay ) );
					}, settings.delay );
				} else if ( typeof( settings.callbackFinished ) == 'function' ) {
					settings.callbackFinished( object );
				}
			}
			if ( typeof( settings.callbackType ) == 'function' ) {
				settings.callbackType( letter, current, object );
			}
		};
		var backspace = function( stop ) {
			if ( !stop ) {
				stop = 0;
			}
			if ( current.position > stop ) {
				output.html( output.html().slice( 0, -1 ) );
				window.setTimeout( function() {
					backspace( stop );
				}, delay( settings.backDelay ) );
				current.position--;
			} else {
				if ( stop === 0 ) {
					if ( next() === false ) {
						return;
					}
				}
				window.setTimeout( type, delay( settings.typeDelay ) );
			}
		};
		var delay = function( speed ) {
			var time = parseInt( speed );
			if ( settings.humanise ) {
				time += Math.floor( Math.random() * 200 );
			}
			return time;
		};
		var setCurrentString = function() {
			current.string = settings.text[current.index].replace(/\n/g, "\\n");
		}
		this.setCursor = function( cursor ) {
			jQuery('.teletype-cursor', self).text( cursor );
		};
        this.reset = function() {
            //jQuery( '.teletype-text' ).empty();
            current.index = 0;
            current.position = 0;
            type();
        };
		return this.each( function() {
			setCurrentString();
			self.addClass( 'teletype' ).empty();
			output = jQuery( '<span />' ).addClass( 'teletype-text' ).appendTo( self );
			if ( settings.cursor ) {
				var cursor = jQuery( '<span />' )
					.addClass( 'teletype-cursor' )
					.appendTo( self );
				object.setCursor( settings.cursor );
				setInterval ( function() {
                  if ( settings.smoothBlink ) {
				    cursor.animate( { opacity: 0 } ).animate( { opacity: 1 } );
			      } else {
                      cursor.delay(500).fadeTo(0,0).delay(500).fadeTo(0,1);
                  }
				}, settings.blinkSpeed );
			}
			type();
		} );
	};
	jQuery.fn.teletype.defaults = {
		text: [ 'one', 'two', 'three' ],
		result: ['', '', ''],
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
	};
}( jQuery ) );