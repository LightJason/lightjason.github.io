---
title: "Basic Knowledge: Atoms"
jsonld: ["techarticle"]
previous :
    url: "/knowledgebase/differencetojason"
    text: "KB: Background - Difference to Jason"
next :
    url: "/knowledgebase/terms"
    text: "KB: Basic - Terms"
---

Atoms are **unsplittable** elements and represent the _basic building blocks_.

<!--more-->

> **Note:** They have to be structured in the following form:

<svg height=300px class="railroad-diagram centering" viewBox="0 0 490 229" id="svg_3e10f8c809242d3a0f94c18e7addb866"><path d="M20 30v20m10-20v20M20 40h20.5m-.5 0h10m390 0" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M50 29h140v22H50z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://agentspeak-java.lightjason.org/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#28e746830337961c5de40b87c99980a6"><text x="120" y="44">LOWERCASELETTER</text></a></g><path d="M190 40h10m0 0a10 10 0 0 0 10-10 10 10 0 0 1 10-10m0 0h200m0 0a10 10 0 0 1 10 10 10 10 0 0 0 10 10m-240 0h20m0 0h10m0 0h20" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M250 29h140v22H250z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://agentspeak-java.lightjason.org/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#28e746830337961c5de40b87c99980a6"><text x="320" y="44">LOWERCASELETTER</text></a></g><path d="M390 40h20m-180 0a10 10 0 0 1 10 10v10a10 10 0 0 0 10 10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M250 59h140v22H250z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://agentspeak-java.lightjason.org/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#c857e06a9c6dcbcfd625e4859380c98e"><text x="320" y="74">UPPERCASELETTER</text></a></g><path d="M390 70a10 10 0 0 0 10-10V50a10 10 0 0 1 10-10m-180 0a10 10 0 0 1 10 10v40a10 10 0 0 0 10 10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M250 100h20m100 0h20M270 89h100v22H270z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://agentspeak-java.lightjason.org/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#a058c5dc734e54ff3d93b96acac339f4"><text x="320" y="104">UNDERSCORE</text></a></g><path d="M390 100a10 10 0 0 0 10-10V50a10 10 0 0 1 10-10m-180 0a10 10 0 0 1 10 10v70a10 10 0 0 0 10 10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M250 130h40m60 0h40m-100-11h60v22h-60z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://agentspeak-java.lightjason.org/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#999bbbf1d86bc7611397c77222e076db"><text x="320" y="134">DIGIT</text></a></g><path d="M390 130a10 10 0 0 0 10-10V50a10 10 0 0 1 10-10m-180 0a10 10 0 0 1 10 10v100a10 10 0 0 0 10 10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M250 160h40m60 0h40m-100-11h60v22h-60z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://agentspeak-java.lightjason.org/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#646da671ca01bb5d84dbb5fb2238dc8e"><text x="320" y="164">SLASH</text></a></g><path d="M390 160a10 10 0 0 0 10-10V50a10 10 0 0 1 10-10m-180 0a10 10 0 0 1 10 10v130a10 10 0 0 0 10 10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M250 190h40m60 0h40m-100-11h60v22h-60z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://agentspeak-java.lightjason.org/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#ffc0d9b54a1fe677c4c9e6b050e67c81"><text x="320" y="194">MINUS</text></a></g><path d="M390 190a10 10 0 0 0 10-10V50a10 10 0 0 1 10-10m0 0h10m-190 0a10 10 0 0 0-10 10v149a10 10 0 0 0 10 10m0 0h180m0 0a10 10 0 0 0 10-10V50a10 10 0 0 0-10-10m10 0h20m0 0h10m0 0h20m-10-10v20m10-20v20" transform="translate(.5 .5)"/></svg>

The simplest structural elements of a logic programming language are _atoms_ which are part of [&#8594; literals](../literals).
_Atoms_ can contain upper- and lower-case letters, slashes ```/``` and minus ```-``` characters, but have to start with a lower-case letter.

**Examples:**

`red`, `green`, `yellow`, `pedestrians`, `vehicle`, `myFirstAtom23`, `foo/Bar-Baz`
