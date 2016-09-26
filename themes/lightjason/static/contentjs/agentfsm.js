// animates the svg image of the agent-finite-state-machine
$(document).ready(function() {
	$("#animate-agentfsm").click( function() {
		$("#init, #main, #first, #second").css("animation-play-state", "running");
	} );
} );
