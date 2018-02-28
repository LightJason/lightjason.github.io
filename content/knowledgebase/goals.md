---
title: "Basic Knowledge: Goals"
jsonld: ["techarticle"]
previous :
    url: "/knowledgebase/plansandrules"
    text: "kb: Basic - Plans and Logic Rules"
next :
    url: "/knowledgebase/beliefsandfacts"
    text: "kb: Basic - Beliefs and Facts"
---

Goals define which plans an agent should try to instantiate and execute.

<!--more-->

They can be defined as 

* [the initial goal](http://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#12a3e79ad1f2c67d5cd687d1277a51b1), i.e. by convention `!main.` or 
* [achievement goals inside plans](http://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#a6ff3b47279b01ca106287f45227661c), e.g. `!myplan(90)`, which means _"try to instantiate and execute a plan `myplan(N)` (with parameter variable `N` set to `90`) in the next cycle"_.

<svg class="railroad-diagram" width="524" height="112" viewBox="0 0 524 92"><path d="M20.5 21.5v20m10-20v20m-10-10H41M40.5 31.5h10M50.5 31.5h20"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M70 31h24M234 31h24M94 20h140v22H94z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#a811f517fa7f9ba04cf05d3a6c777799"><text x="164" y="35">EXCLAMATIONMARK</text></a></g><path d="M258.5 31.5h20M50.5 31.5a10 10 0 0 1 10 10v10a10 10 0 0 0 10 10"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M70 50h188v22H70z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#54d93a03ab9f9e3d0cdcbe9e3ce017be"><text x="164" y="65">DOUBLEEXCLAMATIONMARK</text></a></g><path d="M258.5 61.5a10 10 0 0 0 10-10v-10a10 10 0 0 1 10-10"/><g><path d="M278.5 31.5h20"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M298 31h40M414 31h40M338 20h76v22h-76z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#f0d674f1e0ed4292267f149c5983db02"><text x="376" y="35">literal</text></a></g><path d="M454.5 31.5h20M278.5 31.5a10 10 0 0 1 10 10v10a10 10 0 0 0 10 10"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M298 50h156v22H298z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#a8a6a0dad629d3c681de3e882cbc44a9"><text x="376" y="65">variable_evaluate</text></a></g><path d="M454.5 61.5a10 10 0 0 0 10-10v-10a10 10 0 0 1 10-10"/></g><path d="M474.5 31.5h10M484.5 31.5h20m-10-10v20m10-20v20"/></svg>

> **Note**: For advanced information regarding triggering plans via goals, see our guide [&#8594; Advanced Knowledge: Plan Triggering Techniques](../triggering).
