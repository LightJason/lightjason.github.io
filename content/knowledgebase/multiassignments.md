---
title: "Advanced Knowledge: Multi-Assignments"
jsonld: ["techarticle"]
previous :
    url: "/knowledgebase/unification"
    text: "KB: Basic - Unification"
next :
    url: "/knowledgebase/triggering"
    text: "KB: Advanced - Plan Triggering Techniques"
---

The [multi-assignment](https://agentspeak-java.lightjason.org/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#aaf72be46bb3458f45cf02c8858d96be) allows to extract elements from a list into different variables. It is similar to the [head-tail-notation of Prolog](https://en.wikibooks.org/wiki/Prolog/Lists) but here we can create complex structures.

<!--more-->

<svg class="railroad-diagram" height="64pt" viewBox="0 0 464 62" id="svg_aaf72be46bb3458f45cf02c8858d96be"><path d="M20 21v20m10-20v20M20 31h20.5m-.5 0h10m364 0" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M50 20h116v22H50z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://agentspeak-java.lightjason.org/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#aa70971153fc735cddfeb6720c3303c9"><text x="108" y="35">variablelist</text></a></g><path d="M166 31h10m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M186 20h68v22h-68z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://agentspeak-java.lightjason.org/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#ffd6976a2b4f6934eb075d0013316ff1"><text x="220" y="35">ASSIGN</text></a></g><path d="M254 31h10m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M274 20h140v22H274z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://agentspeak-java.lightjason.org/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#42600adc6af2349e9c1da893ee2ec08d"><text x="344" y="35">executable_term</text></a></g><path d="M414 31h10m0 0h20m-10-10v20m10-20v20" transform="translate(.5 .5)"/></svg>

**Example:**

> The examples creates a list of numbers within the range _[1,20)_ and similar to the deconstruct operator assigns the numbers of the list to variables.
<!-- htmlmin:ignore -->
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">L = collection/list/range(1, 20);
[A|B|C|_|D|E|F|G] = L;
</code></pre>
<!-- htmlmin:ignore -->
> Resulting in
>
> * _A_ &#8592; 1
> * _B_ &#8592; 2
> * _C_ &#8592; 3
> * (the _garbage bin_ variable `_` causes the number 4 to be ignored)
> * _D_ &#8592; 5
> * _E_ &#8592; 6
> * _F_ &#8592; 7
> * _G_ &#8592; [8, ... 19]
