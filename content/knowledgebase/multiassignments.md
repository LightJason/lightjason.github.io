---
title: "Advanced Knowledge: Multi-Assignments"
jsonld: ["techarticle"]
gitter: "knowledge base"
previous :
    url: "/knowledgebase/unification"
    text: "kb: Basic - Unification"
next :
    url: "/knowledgebase/triggering"
    text: "kb: Advanced - Plan Triggering Techniques"
---

The [multi-assignment](http://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#aaf72be46bb3458f45cf02c8858d96be) allowed to extract elements from a list into different variables. It is similar to the [head-tail-notation of Prolog](https://en.wikibooks.org/wiki/Prolog/Lists) but here we can create complex structures.

<svg class="railroad-diagram" height="64pt" viewBox="0 0 464 62" id="svg_aaf72be46bb3458f45cf02c8858d96be"><path d="M20 21v20m10-20v20M20 31h20.5m-.5 0h10m364 0" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M50 20h116v22H50z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#aa70971153fc735cddfeb6720c3303c9"><text x="108" y="35">variablelist</text></a></g><path d="M166 31h10m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M186 20h68v22h-68z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#ffd6976a2b4f6934eb075d0013316ff1"><text x="220" y="35">ASSIGN</text></a></g><path d="M254 31h10m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M274 20h140v22H274z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#42600adc6af2349e9c1da893ee2ec08d"><text x="344" y="35">executable_term</text></a></g><path d="M414 31h10m0 0h20m-10-10v20m10-20v20" transform="translate(.5 .5)"/></svg>

<!-- htmlmin:ignore -->
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">[VARS, ...] = action
</code></pre>
<!-- htmlmin:ignore -->

**Example:**

> The examples creates a list of numbers within the range _[1,20)_ where 1 will be put into the variable _A_, 2 in _B_, 3 in _C_, 4 will be ignored, 5 in _D_, 6 in _E_, 7 in _F_ and the list _[8,20)_ in _G_.
<!-- htmlmin:ignore -->
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">L = collection/list/range(1, 20);
[A|B|C|_|D|E|F|G] = L;
</code></pre>
<!-- htmlmin:ignore -->