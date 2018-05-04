---
title: "Advanced Knowledge: Explicit Repair Actions"
jsonld: ["techarticle"]
previous :
    url: "/knowledgebase/lambdaexpressions"
    text: "kb: Advanced - Lambda Expressions"
next :
    url: "/knowledgebase/failing"
    text: "kb: Advanced - Failing is Intentional"
---

AgentSpeak(L++) supports the implementation of _repair planning_ with the default behaviour ```-!```. With this additional structure we also support [repair action chains](https://agentspeak.lightjason.org/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#503f34271b101269197f766a6b90e4a9).

<!--more-->

<svg class="railroad-diagram" viewBox="0 0 628 131" height="120pt" id="svg_503f34271b101269197f766a6b90e4a9"><path d="M20 30v20m10-20v20M20 40h20.5m-.5 0h10m0 0h20" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M70 40h32m140 0h32M102 29h140v22H102z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://agentspeak.lightjason.org/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#42600adc6af2349e9c1da893ee2ec08d"><text x="172" y="44">executable_term</text></a></g><path d="M274 40h20M50 40a10 10 0 0 1 10 10v10a10 10 0 0 0 10 10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M70 70h48m108 0h48M118 59h108v22H118z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://agentspeak.lightjason.org/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#163e59b1504a89d48bda077b55007abc"><text x="172" y="74">test_action</text></a></g><path d="M274 70a10 10 0 0 0 10-10V50a10 10 0 0 1 10-10M50 40a10 10 0 0 1 10 10v40a10 10 0 0 0 10 10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M70 89h204v22H70z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://agentspeak.lightjason.org/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#a6ff3b47279b01ca106287f45227661c"><text x="172" y="104">achievement_goal_action</text></a></g><path d="M274 100a10 10 0 0 0 10-10V50a10 10 0 0 1 10-10m0 0a10 10 0 0 0 10-10 10 10 0 0 1 10-10m0 0h244m0 0a10 10 0 0 1 10 10 10 10 0 0 0 10 10m-284 0h20m244 0" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M314 29h92v22h-92z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://agentspeak.lightjason.org/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#60cf3b0028df9d050ee4c038c45c66d"><text x="360" y="44">LEFTSHIFT</text></a></g><path d="M406 40h10m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M426 29h132v22H426z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://agentspeak.lightjason.org/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#503f34271b101269197f766a6b90e4a9"><text x="492" y="44">repair_formula</text></a></g><path d="M558 40h20m0 0h10m0 0h20m-10-10v20m10-20v20" transform="translate(.5 .5)"/></svg>

The following example shows the execution of three actions _actionA_, _actionB_, _actionC_. The system executes the _actionA_ first, if the action fails, _actionB_ will be executed, if this also fails _actionC_ will be executed. If the last action in the statement fails (here: _actionC_), the whole plan fails.

<!-- htmlmin:ignore -->
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">actionA << actionB << actionC;
</code></pre>
<!-- htmlmin:ignore -->

You can also use this technique if you don't want a plan to fail: If an action might fail you can append a ```<< true``` to its invocation. This models the behaviour _anything can go wrong, but the agent ignores the error(s)_.
<!-- htmlmin:ignore --><pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">actionA << true;
</code></pre><!-- htmlmin:ignore -->
