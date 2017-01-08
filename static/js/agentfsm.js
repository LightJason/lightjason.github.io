// animates the svg image of the agent-finite-state-machine
$(document).ready(function() {
	$("#animate-agentfsm").click( function() {
		$("#init").css("animation-name", "colorchange");
		$("#init").css("animation-duration", "1.5s");

		$("#main").css("animation-name", "colorchange");
		$("#main").css("animation-duration", "3s");
		$("#main").css("animation-delay", "2.75s");
		$("#main").css("animation-iteration-count", "infinite");

		$("#first, #second").css("animation-name", "colorchange");
		$("#first, #second").css("animation-duration", "3s");
		$("#first, #second").css("animation-delay", "4.25s");
		$("#first, #second").css("animation-iteration-count", "infinite");
	} );
} );
