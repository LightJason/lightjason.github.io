---
title: "Basic Knowledge: Terms"
jsonld: ["techarticle"]
gitter: "knowledge base"
previous :
    url: "/knowledgebase/atoms"
    text: "Basic Knowledge: Atoms"
next :
    url: "/knowledgebase/literals"
    text: "Basic Knowledge: Literals"
---

Terms can represent **any value- and data-type** within the language.

<style>
svg.railroad-diagram path {
    stroke-width: 2;
    stroke: grey;
    fill: rgba(0,0,0,0);
}
svg.railroad-diagram text {
    font: bold 14px monospace;
    text-anchor: middle;
}
svg.railroad-diagram rect {
    stroke-width: 3;
    stroke: black;
}

svg.railroad-diagram .non-terminal {
    fill: #14811a;
}
code.remark-inline-code {
    color: #8C1C00;
}
</style>
<svg height=400px class="railroad-diagram centering" viewBox="0 0 580 302" id="svg_b4dad0fe5fbef2c0e24d9db1cc69e5a2"><path d="M20 21v20m10-20v20M20 31h20.5m-.5 0h20" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M60 31h196m68 0h196M256 20h68v22h-68z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#b45cffe084dd3d20d928bee85e7b0f21"><text x="290" y="35">string</text></a></g><path d="M520 31h20M40 31a10 10 0 0 1 10 10v10a10 10 0 0 0 10 10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M60 61h196m68 0h196M256 50h68v22h-68z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#b1bc248a7ff2b2e95569f56de68615df"><text x="290" y="65">number</text></a></g><path d="M520 61a10 10 0 0 0 10-10V41a10 10 0 0 1 10-10M40 31a10 10 0 0 1 10 10v40a10 10 0 0 0 10 10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M60 91h172m116 0h172M232 80h116v22H232z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#af6a9878b68b9081f2f32558fc1c5f42"><text x="290" y="95">logicalvalue</text></a></g><path d="M520 91a10 10 0 0 0 10-10V41a10 10 0 0 1 10-10M40 31a10 10 0 0 1 10 10v70a10 10 0 0 0 10 10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M60 121h192m76 0h192m-268-11h76v22h-76z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#f0d674f1e0ed4292267f149c5983db02"><text x="290" y="125">literal</text></a></g><path d="M520 121a10 10 0 0 0 10-10V41a10 10 0 0 1 10-10M40 31a10 10 0 0 1 10 10v100a10 10 0 0 0 10 10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M60 151h188m84 0h188m-272-11h84v22h-84z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#e04aa5104d082e4a51d241391941ba26"><text x="290" y="155">variable</text></a></g><path d="M520 151a10 10 0 0 0 10-10V41a10 10 0 0 1 10-10M40 31a10 10 0 0 1 10 10v130a10 10 0 0 0 10 10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M60 181h172m116 0h172m-288-11h116v22H232z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#aa70971153fc735cddfeb6720c3303c9"><text x="290" y="185">variablelist</text></a></g><path d="M520 181a10 10 0 0 0 10-10V41a10 10 0 0 1 10-10M40 31a10 10 0 0 1 10 10v160a10 10 0 0 0 10 10m460 0" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M60 200h164v22H60z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#b11464d4ff702d93244a8e2a7f6ba3bf"><text x="142" y="215">LEFTANGULARBRACKET</text></a></g><path d="M224 211h10m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M244 200h84v22h-84z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#45e9c6711e26d65a3189b502fd08a63"><text x="286" y="215">termlist</text></a></g><path d="M328 211h10m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M348 200h172v22H348z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#a025c9443af11da0298acc93764673e7"><text x="434" y="215">RIGHTANGULARBRACKET</text></a></g><path d="M520 211a10 10 0 0 0 10-10V41a10 10 0 0 1 10-10M40 31a10 10 0 0 1 10 10v190a10 10 0 0 0 10 10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M60 241h180m100 0h180m-280-11h100v22H240z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#63973cd3ad7ccf2c8d5dce94b215f683"><text x="290" y="245">expression</text></a></g><path d="M520 241a10 10 0 0 0 10-10V41a10 10 0 0 1 10-10M40 31a10 10 0 0 1 10 10v220a10 10 0 0 0 10 10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M60 271h152m156 0h152m-308-11h156v22H212z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#a3e531edbe77ec3a390a2671be0905b8"><text x="290" y="275">ternary_operation</text></a></g><path d="M520 271a10 10 0 0 0 10-10V41a10 10 0 0 1 10-10m0 0h20m-10-10v20m10-20v20" transform="translate(.5 .5)"/></svg>

> **Note:** A more developer-specific explanation of terms can be found [$\to$ here](https://lightjason.github.io/knowledgebase/logicalprogramming/#terms).

**Examples**

```agentspeak
duration(60)
light(red)
```
Here `60` and `red` would be terms.