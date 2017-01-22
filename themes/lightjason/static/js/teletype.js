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
;(function ( jQuery, window, document, undefined ) {

	// default plugin settings
	var defaults = {
		text: [ 'one', 'two', 'three' ],
		result: [],
		automaticstart: true,
		classresult: "teletype-result",
		classprefix: "teletype-prefix",
		classcursor: "teletype-cursor",
		classoutput: "teletype-text",
		taglinebreak: "<br/>",
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



	function Plugin( element, options )
	{
		this.dom = jQuery( element );
		this.settings = jQuery.extend( {}, defaults, options );

		// sets instance an nessessary DOM values into element
		this.current   = { string: '', result: '', letters: [], index: 0, position: 0, loop: 0 };
		this.output    = jQuery( '<span/>' ).addClass( this.settings.classoutput ).appendTo( this.dom );
		
		this.init();
	}


	Plugin.prototype = {


		// ---- private methods -------------------------------------------------------------------------------------------------

		init : function()
		{

			// clear DOM node first
			this.dom.empty();

			// set cursor
			if ( this.settings.cursor ) {
				var cursor = jQuery( '<span/>' ).addClass( this.settings.classcursor ).appendTo( this.dom ).text( this.settings.cursor );
				var self = this;
				setInterval ( function() {
					if ( self.settings.smoothBlink )
						cursor.animate( { opacity: 0 } ).animate( { opacity: 1 } );
					else
						cursor.delay(500).fadeTo(0,0).delay(500).fadeTo(0,1);
				}, this.settings.blinkSpeed );
			}
		
			// start typing
			if (this.settings.automaticstart)
			{
				this.setCurrentString();
				this.type();
			}

		},

		// returns a delay value
		delay : function( speed ) 
		{ 
			return this.settings.humanise ? parseInt( speed ) + Math.floor( Math.random() * 200 ) : parseInt( speed ); 
		},

		// sets the current string data (command and command-result)
		setCurrentString : function() {
			this.current.string = this.settings.text[this.current.index].replace(/\n/g, "\\n");
			this.current.letters = this.current.string.split( '' );
			this.current.result = (this.settings.result.length == this.settings.text.length) && (this.settings.result[this.current.index]) ? '<p class="' + this.settings.classresult + '">' + this.settings.result[this.current.index] + "</p>" : "";
		},

		// extracts a number beginning on the given position of a string
		extractnumber : function( text, start )
		{
			var end = text.substr( start ).search( /[^0-9]/ );
			return text.substr( start, end == -1 ? text.length : end );
		},


		// defines the function for get the next command-item
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


		// creates a pause function
		pause : function( text, start )
		{
			var time = this.extractnumber( text, start );
			if ( !jQuery.isNumeric( time ) )
				return;

			this.current.position = start + time.length;
			setTimeout( this.type.bind(this), time );
		},


		// runs the typing animation
		type : function() 
		{

			// add new prefix item if possible
			if ( ( this.settings.prefix ) && ( this.current.position === 0 ) )
					jQuery( '<span />' ).addClass( this.settings.classprefix ).html( this.settings.prefix ).appendTo( this.output );

			// get current letter & position
			var letter = this.current.letters[this.current.position],
				start = this.current.position + 1;

			// check pause
			if ( letter == '^' )
			{
				this.pause( this.current.string, start );
				return;
			}

			// check for pause or remove sign
			/*
			if ( letter == '~' )
			{

				// @todo code shorten
				var end = this.current.string.substr( start ).search( /[^0-9]/ );
				if ( end == -1 )
					end = current.string.length;
				
				var value = this.current.string.substr( start, end );
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
			if ( ( letter == '\\' ) && ( this.current.string.substr( start, 1 ) === 'n' ) )
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


		backspace : function( stop ) 
		{
			if ( !stop )
				stop = 0;
			
			if ( this.current.position > stop ) {
				this.dom.html( this.dom.html().slice( 0, -1 ) );
				setTimeout( this.backspace( stop ).bind(this), delay( this.settings.backDelay ) );
				this.current.position--;
			
			} else {
				if ( ( stop === 0 ) && ( next() === false ) )
					return;
			
				setTimeout( this.type.bind(element), this.delay( this.settings.typeDelay ) );
			}
		},



		// ---- public methods --------------------------------------------------------------------------------------------------

		setCursor : function( cursor )
		{
			this.settings.cursor = cursor;
		},
		
		
		reset : function()
		{
			if (this.settings.loop === 0)
				return;
		},


		start : function()
		{
			console.log("foo");
			if (this.settings.automaticstart)
				return;

			//setCurrentString();
			//type();	
		}

	
	};

	// ---- jQuery initialization -------------------------------------------------------------------------------------------

	jQuery.fn.teletype = function( options ) {

		return this.each( function() {
			// https://github.com/jquery-boilerplate/jquery-patterns
			// http://stefangabos.ro/jquery/jquery-plugin-boilerplate-revisited/
			// http://stackoverflow.com/questions/8758685/get-dom-element-from-jquery-plugin-extension
			// https://github.com/jquery-boilerplate/jquery-patterns/blob/master/patterns/jquery.basic.plugin-boilerplate.js

			if ( !jQuery.data(this, 'teletype') )
				return jQuery.data( this, 'teletype', new Plugin(this, options) );				
		} );
	}

})( jQuery, window, document );