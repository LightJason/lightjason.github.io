---
title: "Basic Knowledge: Literals"
jsonld: ["techarticle"]
gitter: "knowledge base"
previous :
    url: "/knowledgebase/terms"
    text: "kb: Basic - Terms"
next :
    url: "/knowledgebase/variables"
    text: "kb: Basic - Variables"
---

{{< includejs "/agentcycle.js" >}}

Literals are the conclusion of terms and atoms. They have to start with a **lower-case letter**!

<!--more-->

<svg class="railroad-diagram centering" viewBox="0 0 872 109" id="svg_f0d674f1e0ed4292267f149c5983db02"><path d="M20 38v20m10-20v20M20 48h20.5m-.5 0h10m0 0a10 10 0 0 0 10-10 10 10 0 0 1 10-10m0 0h172m0 0a10 10 0 0 1 10 10 10 10 0 0 0 10 10M50 48h20m0 0h20" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M90 48h48m36 0h48m-84-11h36v22h-36z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#fa868488740aa25870ced6b9169951fb"><text x="156" y="52">AT</text></a></g><path d="M222 48h20M70 48a10 10 0 0 1 10 10v10a10 10 0 0 0 10 10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M90 67h132v22H90z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#207b9b679fb614699f3d949f6fc63218"><text x="156" y="82">STRONGNEGATION</text></a></g><path d="M222 78a10 10 0 0 0 10-10V58a10 10 0 0 1 10-10m0 0h20m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M272 37h52v22h-52z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#3e10f8c809242d3a0f94c18e7addb866"><text x="298" y="52">atom</text></a></g><path d="M324 48h10m0 0a10 10 0 0 0 10-10v-8a10 10 0 0 1 10-10m0 0h448m0 0a10 10 0 0 1 10 10v8a10 10 0 0 0 10 10m-488 0h20m448 0" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M354 37h148v22H354z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#5ffa5d1c78ad09c7bf5b4d0b0764641f"><text x="428" y="52">LEFTROUNDBRACKET</text></a></g><path d="M502 48h10m0 0a10 10 0 0 0 10-10 10 10 0 0 1 10-10m0 0h84m0 0a10 10 0 0 1 10 10 10 10 0 0 0 10 10m-124 0h20" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M532 37h84v22h-84z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#45e9c6711e26d65a3189b502fd08a63"><text x="574" y="52">termlist</text></a></g><path d="M616 48h20m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M646 37h156v22H646z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#3a52152b9f1e9dd45998ce24723d98ed"><text x="724" y="52">RIGHTROUNDBRACKET</text></a></g><path d="M802 48h20m0 0h10m0 0h20m-10-10v20m10-20v20" transform="translate(.5 .5)"/></svg>

In the Prolog definition and consequently also in AgentSpeak(L++) all *literals* and *[&#8594; atoms](../atoms)* begin with a lower-case letter but otherwise may also contain upper-case letters, slashes and minuses.

> **Note:** Depending on the context in which literals are used, i.e. as *belief*, the slash `/` has a special semantic meaning, requiring additional adaptation to work as intended. See [&#8594; beliefs](../beliefsandfacts) for details.

Additionally _literals_ enrich the expressibility of _agent knowledge_ with <a href="#literal" id="animate-literal-negation">negations</a>, <a href="#literal" id="animate-literal-functor">functors</a> and <a href="#literal" id="animate-literal-values">value lists</a>.
They may also contain _raw terms_ which define a _wrapper_ around any <a href="#literal" id="animate-literal-raw">native Java object</a> type.


<svg id="literal" xmlns="http://www.w3.org/2000/svg" xmlns:xl="http://www.w3.org/1999/xlink" version="1.1" viewBox="218 36 326 77" height="130pt" xmlns:dc="http://purl.org/dc/elements/1.1/"><defs><font-face font-size="12" panose-1="2 0 5 3 0 0 0 2 0 4" units-per-em="1000" underline-position="-100" underline-thickness="50" slope="0" x-height="517" cap-height="714" ascent="951.9958" descent="-212.99744" font-weight="500"></font-face><font-face font-size="10" panose-1="2 0 5 3 0 0 0 2 0 4" units-per-em="1000" underline-position="-100" underline-thickness="50" slope="0" x-height="517" cap-height="714" ascent="951.9958" descent="-212.99744" font-weight="500"></font-face></defs><g stroke="none" stroke-opacity="1" stroke-dasharray="none" fill="none" fill-opacity="1"><rect fill="white" width="833.3333" height="366"/><g><text transform="translate(258.41667 41.332)" fill="black"><tspan class="svg-literal-negation" font-size="12" font-weight="500" x=".4" y="11" textLength="7.2">~</tspan></text><text transform="translate(415 41.332)" fill="black"><tspan class="svg-literal-values" font-size="12" font-weight="500" x=".206" y="11" textLength="123.588">(value(<tspan class="svg-literal-raw">5</tspan>), time(<tspan class="svg-literal-raw">"12:00"</tspan>))</tspan></text><text transform="translate(269.5 41.332)" fill="black"><tspan class="svg-literal-functor" font-size="12" font-weight="500" x="1.144" y="11" textLength="140.344">group/subgroup/any-name</tspan></text><line x1="417.27083" y1="61.125" x2="538.10417" y2="61.125" stroke="#b4b4b4" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="270.27083" y1="61.125" x2="414.27083" y2="61.125" stroke="#b4b4b4" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="266.63542" y1="61.127496" x2="256.22917" y2="61.125" stroke="#b4b4b4" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><text transform="translate(223.5 95.36)" fill="#b4b4b4"><tspan class="svg-literal-negation" font-size="10" font-weight="500" fill="#b4b4b4" x=".145" y="10" textLength="38.71">negation</tspan></text><text transform="translate(326 95.36)" fill="#b4b4b4"><tspan class="svg-literal-functor" font-size="10" font-weight="500" fill="#b4b4b4" x=".165" y="10" textLength="31.67">functor</tspan></text><text transform="translate(462.5 95.36)" fill="#b4b4b4"><tspan class="svg-literal-values" font-size="10" font-weight="500" fill="#b4b4b4" x=".24" y="10" textLength="28.52">values</tspan></text><line x1="342" y1="90" x2="342" y2="61" stroke="#b4b4b4" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="477" y1="90" x2="477" y2="61" stroke="#b4b4b4" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="261.01252" y1="61.12615" x2="255.26272" y2="90" stroke="#b4b4b4" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/></g></g></svg>

For clarification see the following examples:

**Examples:**

> We would like to define that the sun is shining
> <pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">sun( shining() )</pre></code>
> The word ```sun``` and the word ```shining``` are _atoms_, the whole structure ```sun(shining())``` is named _literal_.

<a name="time"></a>Another example is a time definition:

> We would like to say it is currently 2 o'clock post meridiem (pm)
> <!-- htmlmin:ignore --><pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">time( current( hour(2), minute(0), period( pm() ) ) )</pre></code><!-- htmlmin:ignore -->
> You can see, that a literal can store a list of other literals or values inside the brackets.

Based on the first example a negation is also possible:

> We would like to say it is currently not raining
> <!-- htmlmin:ignore --><pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">~raining()</pre></code><!-- htmlmin:ignore -->
> The tilde ```~``` in front of an atom defines the [strong negation](https://en.wikipedia.org/wiki/Stable_model_semantics#Strong_negation)

A more practical example:

> Consider the following Java excerpt to encode the states of a traffic light:

<!-- htmlmin:ignore -->
> ```java
String  light = "green";
int     phase_duration = 60;
String  phase_program = "morning";
boolean applies_to_vehicles = true;
boolean applies_to_pedestrians = false;
```
<!-- htmlmin:ignore -->

>Transformed in a meaningful way into literals:

><!-- htmlmin:ignore --><pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">light( green )
phase( duration(60), program(morning) )
appliesTo( vehicles )
~appliesTo( pedestrians )
</code></pre><!-- htmlmin:ignore -->
