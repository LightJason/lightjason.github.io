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
(function() {

	/**
	 * plugin factory
	 * 
	 * @param po_element closure element
	 * @param po_options initialize options 
	 */
	var Plugin = function Plugin( po_element, po_options )
	{
		/**
		 * static default options
		 */
		var so_default = {
			text: [ 'one', 'two', 'three' ],
			result: [],
			automaticpn_start: true,
			classresult: "teletype-result",
			classprefix: "teletype-prefix",
			classcursor: "teletype-cursor",
			classoutput: "teletype-text",
			taglinebreak: "<br/>",
			typeDelay: 100,
			backDelay: 50,
			blinkpn_Speed: 1000,
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

		this.dom = jQuery( po_element );
		this.settings = jQuery.extend( {}, so_default, po_options );

		this.init();
	}


	Plugin.prototype = {

		/**
		 * constructor
		 */
		init : function()
		{

			// clear DOM node first
			this.dom.empty();

			// sets instance an nessessary DOM values into element
			this.current   = { string: '', result: '', letters: [], index: 0, position: 0, loop: 0 };
			this.output    = jQuery( '<span/>' ).addClass( this.settings.classoutput ).appendTo( this.dom );

			// set cursor
			if ( this.settings.cursor ) {
				var cursor = jQuery( '<span/>' ).addClass( this.settings.classcursor ).appendTo( this.dom ).text( this.settings.cursor );
				var self = this;
				setInterval ( function() {
					if ( self.settings.smoothBlink )
						cursor.animate( { opacity: 0 } ).animate( { opacity: 1 } );
					else
						cursor.delay(500).fadeTo(0,0).delay(500).fadeTo(0,1);
				}, this.settings.blinkpn_Speed );
			}
		
			// start typing
			if (this.settings.automaticstart)
			{
				this.setCurrentString();
				this.type();
			}

		},

		/**
		 * delay function
		 * 
		 * @param pn_speed any speed value
		 * @return randomized speed value
		 */
		delay : function( pn_speed ) 
		{ 
			return this.settings.humanise ? parseInt( pn_speed ) + Math.floor( Math.random() * 200 ) : parseInt( pn_speed ); 
		},


		/**
		 * sets the current string and if possible result data
		 */
		setCurrentString : function() {
			this.current.string = this.settings.text[this.current.index].replace(/\n/g, "\\n");
			this.current.letters = this.current.string.split( '' );
			this.current.result = (this.settings.result.length == this.settings.text.length) && (this.settings.result[this.current.index]) ? '<p class="' + this.settings.classresult + '">' + this.settings.result[this.current.index] + "</p>" : "";
		},


		/**
		 * extract a number from a text
		 * 
		 * @param pc_text input text
		 * @param pn_start start position within the string
		 * @return extracted number
		 */
		extractnumber : function( pc_text, pn_start )
		{
			var end = pc_text.substr( pn_start ).search( /[^0-9]/ );
			return pc_text.substr( pn_start, end == -1 ? pc_text.length : end );
		},


		/**
		 * sets the next outpur sequence
		 */
		next : function()
		{
			this.current.index++;

			// check end and looping
			if ( this.current.index >= this.settings.text.length )
			{
				this.current.index = 0;
				this.current.loop++;
				if ( ( this.settings.loop !== false ) && ( this.settings.loop == this.current.loop ) )
					return false;
			}

			this.setCurrentString();
			this.current.position = 0;

			// runs next-callback
			if ( typeof( this.settings.callbackNext ) == 'function' )
				this.settings.callbackNext( null );

			return true;
		},


		/**
		 * pause function for typing pause
		 * 
		 * @param pc_text current input text
		 * @param pn_start start position for searching pause time
		 */
		pause : function( pc_text, pn_start )
		{
			var time = this.extractnumber( pc_text, pn_start );
			if ( !jQuery.isNumeric( time ) )
				return;

			this.current.position = pn_start + time.length;
			setTimeout( this.type.bind(this), time );
		},


		/**
		 * execution typing
		 */
		type : function() 
		{

			// add new prefix item if possible
			if ( ( this.settings.prefix ) && ( this.current.position === 0 ) )
					jQuery( '<span />' ).addClass( this.settings.classprefix ).html( this.settings.prefix ).appendTo( this.output );

			// get current letter & position
			var letter = this.current.letters[this.current.position],
				pn_start = this.current.position + 1;

			// check pause
			if ( letter == '^' )
			{
				this.pause( this.current.string, pn_start );
				return;
			}

			// check for pause or remove sign
			/*
			if ( letter == '~' )
			{

				// @todo code shorten
				var end = this.current.string.substr( pn_start ).search( /[^0-9]/ );
				if ( end == -1 )
					end = current.string.length;
				
				var value = this.current.string.substr( pn_start, end );
				if ( jQuery.isNumeric( value ) ) {
					this.current.string = this.current.string.replace( letter + value, '' );

					if ( letter == '^' )
						setTimeout( function() {}, value );

					else
					{
						var index = this.current.position - value;
						this.current.string = this.current.string.substr( 0, index - 1 ) + this.current.string.substr( this.current.position - 1 );
						setTimeout( backspace( Math.max( index, 0 ) ).bind(element) , delay( this.settings.backDelay ) );
					}

					return;
				}

			}
			*/
			
			// check for line-break
			if ( ( letter == '\\' ) && ( this.current.string.substr( pn_start, 1 ) === 'n' ) )
			{
				this.current.position++;
				letter = this.settings.taglinebreak;		
			}


			// run typing-callback
			if ( typeof( this.settings.callbackType ) == 'function' )
				this.settings.callbackType( element );


			// increment current position and set output
			this.current.position++;
			this.output.html( this.output.html() + letter );

			// run the next iteration
			if ( this.current.position < this.current.string.length )
				setTimeout( this.type.bind(this), this.delay( this.settings.typeDelay ) );
			else
			{
				// set the result (of the typing) if it exists
				if ( this.current.result )
					this.output.html( this.output.html() + this.current.result );

				// check if there exists a new line
				if ( this.next() )
				{
					this.output.html( this.output.html() + this.settings.taglinebreak );
					setTimeout( this.type.bind(this), this.delay( this.settings.typeDelay ) );
				}
			}

		},

		/**
		 * backspace for removing characters
		 * @bug incomplete
		 * 
		 * @param pn_stiop number of characters to remove
		 */
		backspace : function( pn_stop ) 
		{
			if ( !pn_stop )
				pn_stop = 0;
			
			if ( this.current.position > pn_stop ) {
				this.dom.html( this.dom.html().slice( 0, -1 ) );
				setTimeout( this.backspace( pn_stop ).bind(this), delay( this.settings.backDelay ) );
				this.current.position--;
			
			} else {
				if ( ( pn_stop === 0 ) && ( next() === false ) )
					return;
			
				setTimeout( this.type.bind(this), this.delay( this.settings.typeDelay ) );
			}
		},


		/**
		 * modifies the internal cursor representation
		 * 
		 * @param pc_cursor cursor character
		 */
		setCursor : function( pc_cursor )
		{
			this.settings.cursor = pc_cursor;
		},
		
		/**
		 * resets the dom element and rerun typing
		 */
		reset : function()
		{
			if (this.settings.loop === 0)
				return;
		},


		/**
		 * starts typing if automatic start is disabled
		 */
		start : function()
		{
			if (this.settings.automaticstart)
				return;

			// wrong scope....
			console.log(this);
			this.setCurrentString();
			this.type();
		}

	
	};

	// ---- jQuery initialization -------------------------------------------------------------------------------------------

	jQuery.fn.teletype = function( px_option )
	{
		var lo_reference = jQuery(this).data("teletype");
		if (!lo_reference)
		{
			lo_reference = new Plugin(this, px_option);
			jQuery(this).data('teletype', lo_reference );
		}
		
		return lo_reference;
	}

})(jQuery);