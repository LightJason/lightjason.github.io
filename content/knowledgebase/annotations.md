---
title: "Advanced Knowledge: Plan Annotations"
jsonld: ["techarticle"]
gitter: "knowledge base"
previous :
    url: "/knowledgebase/triggering"
    text: "kb: Advanced - Plan Triggering Techniques"
next :
    url: "/knowledgebase/failing"
    text: "kb: Advanced - Failing is Intentional"
---

Analogously to [Java](https://en.wikipedia.org/wiki/Java_annotation), AgentSpeak(L++) also supports the concept of [annotations](https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#4ab6864fc58ecd8b598ee10dfe2ac311).

AgentSpeak(L++) [&#8594; plans and logic rules](../plansandrules) can be modified in their execution behaviour by adding annotation(s) to them.
Our [plan grammar](https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#5fc25157650d0cb24f02216d904584df) specifies that (optional) annotations can be placed in front of the plan trigger, prefixed with an `@` symbol, i.e.

<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">@annotation
+!plan <-
    ...
.
</code></pre>


<style>
svg.railroad-diagram path {
    stroke-width: 2;
    stroke: grey;
    fill: rgba(0,0,0,0);
}
svg.railroad-diagram text {
    font: bold 14px monospace;
    text-anchor: middle;
    color: rgba(0,0,0,0);
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

<svg class="railroad-diagram" width="726" height="112" viewBox="0 0 726 80" id="svg_5fc25157650d0cb24f02216d904584df"><path d="M20 30v20m10-20v20M20 40h20.5m-.5 0h10m0 0a10 10 0 0 0 10-10 10 10 0 0 1 10-10m0 0h108m0 0a10 10 0 0 1 10 10 10 10 0 0 0 10 10M50 40h20" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M70 29h108v22H70z"/><a xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#4ab6864fc58ecd8b598ee10dfe2ac311"><text x="124" y="44">annotations</text></a></g><path d="M178 40h20m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M208 29h116v22H208z"/><a xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#4f0fa1b5875427a602b3f913163be2ca"><text x="266" y="44">plan_trigger</text></a></g><path d="M324 40h10m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M344 29h76v22h-76z"/><a xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#f0d674f1e0ed4292267f149c5983db02"><text x="382" y="44">literal</text></a></g><path d="M420 40h10m0 0a10 10 0 0 0 10-10 10 10 0 0 1 10-10m0 0h152m0 0a10 10 0 0 1 10 10 10 10 0 0 0 10 10m-192 0h20m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M460 29h132v22H460z"/><a xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#d60b4a42e52668da3017e5717ef3f60"><text x="526" y="44">plandefinition</text></a></g><path d="M592 40h10m-142 0a10 10 0 0 0-10 10 10 10 0 0 0 10 10m0 0h132m0 0a10 10 0 0 0 10-10 10 10 0 0 0-10-10m10 0h20m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M632 29h44v22h-44z"/><a xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#40679521b5da0954b705341a2859f782"><text x="654" y="44">DOT</text></a></g><path d="M676 40h10m0 0h20m-10-10v20m10-20v20" transform="translate(.5 .5)"/></svg>

We currently support two built-in annotations, i.e. `@parallel` and `@atomic`, which are explained in the following in further detail.

<svg class="railroad-diagram" width="270" height="120" viewBox="0 0 270 92" id="svg_e8cfdf2f51a622adbe9ef531c7dc10c5"><path d="M20 21v20m10-20v20M20 31h20.5m-.5 0h10m170 0" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M50 20h36v22H50z"/><a xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#fa868488740aa25870ced6b9169951fb"><text x="68" y="35">AT</text></a></g><path d="M86 31h10m0 0h20" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M116 31h8m68 0h8m-76-11h68v22h-68z"/><a xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#ef668eed93582ab6729f8a7e679d4f4a"><text x="158" y="35">ATOMIC</text></a></g><path d="M200 31h20M96 31a10 10 0 0 1 10 10v10a10 10 0 0 0 10 10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M116 50h84v22h-84z"/><a xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#df13a99b035d6f0bce4f44ab18eec8eb"><text x="158" y="65">PARALLEL</text></a></g><path d="M200 61a10 10 0 0 0 10-10V41a10 10 0 0 1 10-10m0 0h10m0 0h20m-10-10v20m10-20v20" transform="translate(.5 .5)"/></svg>

> **Note**: Multiple annotations can be applied to a plan, i.e.
> <pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">@annotation1
@annotation2
+!plan <-
    ...
.
</code></pre>

## `@atomic`

The `@atomic` annotation defines a plan to _always succeed_ by default.
This behaviour is useful in cases where failure of [&#8594; actions](../actions) can be expected but do not constitute erroneous behaviour or results.

**Usage:**

<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">@atomic
+!plan <-
    ...
.
</code></pre>

The plan will succeed regardless of failing actions or sub-plans.

For a plan
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">@atomic
+!plan <-
    action1();
    !!immediate_subplan;
    !postponed_subplan;
    action2();
.
</code></pre>
the execution flow is as depicted below

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xl="http://www.w3.org/1999/xlink" version="1.1" viewBox="116 161 727 114" width="727pt" height="114pt" xmlns:dc="http://purl.org/dc/elements/1.1/"><defs><marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="FilledArrow_Marker" viewBox="-1 -4 10 8" markerWidth="10" markerHeight="8" color="#235e00"><g><path d="M 8 0 L 0 -3 L 0 3 Z" fill="currentColor" stroke="currentColor" stroke-width="1"/></g></marker><font-face font-family="Courier New" font-size="12" panose-1="2 7 3 9 2 2 5 2 4 4" units-per-em="1000" underline-position="-232.91016" underline-thickness="41.015625" slope="0" x-height="422.85156" cap-height="571.28906" ascent="832.5195" descent="-300.29297" font-weight="500"><font-face-src><font-face-name name="CourierNewPSMT"/></font-face-src></font-face><marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="FilledArrow_Marker_2" viewBox="-1 -4 10 8" markerWidth="10" markerHeight="8" color="black"><g><path d="M 8 0 L 0 -3 L 0 3 Z" fill="currentColor" stroke="currentColor" stroke-width="1"/></g></marker><marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="FilledArrow_Marker_3" viewBox="-1 -4 10 8" markerWidth="10" markerHeight="8" color="#666"><g><path d="M 8 0 L 0 -3 L 0 3 Z" fill="currentColor" stroke="currentColor" stroke-width="1"/></g></marker><font-face font-family="Helvetica Neue" font-size="12" panose-1="2 0 5 3 0 0 0 2 0 4" units-per-em="1000" underline-position="-100" underline-thickness="50" slope="0" x-height="517" cap-height="714" ascent="951.9958" descent="-212.99744" font-weight="500"><font-face-src><font-face-name name="HelveticaNeue"/></font-face-src></font-face><font-face font-family="Helvetica Neue" font-size="10" panose-1="2 0 5 3 0 0 0 2 0 4" units-per-em="1000" underline-position="-100" underline-thickness="50" slope="0" x-height="517" cap-height="714" ascent="951.9958" descent="-212.99744" font-weight="500"><font-face-src><font-face-name name="HelveticaNeue"/></font-face-src></font-face><marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="FilledArrow_Marker_4" viewBox="-1 -4 10 8" markerWidth="10" markerHeight="8" color="#235e00"><g><path d="M 8 0 L 0 -3 L 0 3 Z" fill="currentColor" stroke="currentColor" stroke-width="1"/></g></marker><marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="FilledArrow_Marker_5" viewBox="-1 -4 10 8" markerWidth="10" markerHeight="8" color="#b1001c"><g><path d="M 8 0 L 0 -3 L 0 3 Z" fill="currentColor" stroke="currentColor" stroke-width="1"/></g></marker></defs><g stroke="none" stroke-opacity="1" stroke-dasharray="none" fill="none" fill-opacity="1"><title>Knowledgebase - Annotations</title><rect fill="white" width="915" height="538.2"/><g><title>Layer 1</title><line x1="225" y1="233.8611" x2="233.1" y2="233.8611" marker-end="url(#FilledArrow_Marker)" stroke="#235e00" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="396" y1="233.8611" x2="404.1" y2="233.8611" marker-end="url(#FilledArrow_Marker)" stroke="#235e00" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="558" y1="233.8611" x2="575.1" y2="233.8611" marker-end="url(#FilledArrow_Marker)" stroke="#235e00" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><path d="M 665.9245 232.69026 C 675.1304 232.8519 684.3512 233.14191 692.1096 233.408" marker-end="url(#FilledArrow_Marker)" stroke="#235e00" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><path d="M 153 224.8611 L 216 224.8611 C 220.97056 224.8611 225 228.89055 225 233.8611 L 225 233.8611 C 225 238.83167 220.97056 242.8611 216 242.8611 L 153 242.8611 C 148.02944 242.8611 144 238.83167 144 233.8611 L 144 233.8611 C 144 228.89055 148.02944 224.8611 153 224.8611 Z" fill="white"/><path d="M 153 224.8611 L 216 224.8611 C 220.97056 224.8611 225 228.89055 225 233.8611 L 225 233.8611 C 225 238.83167 220.97056 242.8611 216 242.8611 L 153 242.8611 C 148.02944 242.8611 144 238.83167 144 233.8611 L 144 233.8611 C 144 228.89055 148.02944 224.8611 153 224.8611 Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><text transform="translate(149 226.8611)" fill="black"><tspan font-family="Courier New" font-size="12" font-weight="500" x="3.0947266" y="10" textLength="64.81055">action1()</tspan></text><path d="M 252 224.8611 L 387 224.8611 C 391.97056 224.8611 396 228.89055 396 233.8611 L 396 233.8611 C 396 238.83167 391.97056 242.8611 387 242.8611 L 252 242.8611 C 247.02944 242.8611 243 238.83167 243 233.8611 L 243 233.8611 C 243 228.89055 247.02944 224.8611 252 224.8611 Z" fill="white"/><path d="M 252 224.8611 L 387 224.8611 C 391.97056 224.8611 396 228.89055 396 233.8611 L 396 233.8611 C 396 238.83167 391.97056 242.8611 387 242.8611 L 252 242.8611 C 247.02944 242.8611 243 238.83167 243 233.8611 L 243 233.8611 C 243 228.89055 247.02944 224.8611 252 224.8611 Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><text transform="translate(248 226.8611)" fill="black"><tspan font-family="Courier New" font-size="12" font-weight="500" x="3.0888672" y="10" textLength="136.82227">!!immediate_subplan</tspan></text><path d="M 423 224.8611 L 549 224.8611 C 553.97056 224.8611 558 228.89055 558 233.8611 L 558 233.8611 C 558 238.83167 553.97056 242.8611 549 242.8611 L 423 242.8611 C 418.02944 242.8611 414 238.83167 414 233.8611 L 414 233.8611 C 414 228.89055 418.02944 224.8611 423 224.8611 Z" fill="white"/><path d="M 423 224.8611 L 549 224.8611 C 553.97056 224.8611 558 228.89055 558 233.8611 L 558 233.8611 C 558 238.83167 553.97056 242.8611 549 242.8611 L 423 242.8611 C 418.02944 242.8611 414 238.83167 414 233.8611 L 414 233.8611 C 414 228.89055 418.02944 224.8611 423 224.8611 Z" stroke="#666" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><text transform="translate(419 226.8611)" fill="black"><tspan font-family="Courier New" font-size="12" font-weight="500" x="2.189453" y="10" textLength="129.6211">!postponed_subplan</tspan></text><path d="M 594 224.8611 L 657 224.8611 C 661.9706 224.8611 666 228.89055 666 233.8611 L 666 233.8611 C 666 238.83167 661.9706 242.8611 657 242.8611 L 594 242.8611 C 589.02944 242.8611 585 238.83167 585 233.8611 L 585 233.8611 C 585 228.89055 589.02944 224.8611 594 224.8611 Z" fill="white"/><path d="M 594 224.8611 L 657 224.8611 C 661.9706 224.8611 666 228.89055 666 233.8611 L 666 233.8611 C 666 238.83167 661.9706 242.8611 657 242.8611 L 594 242.8611 C 589.02944 242.8611 585 238.83167 585 233.8611 L 585 233.8611 C 585 228.89055 589.02944 224.8611 594 224.8611 Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><text transform="translate(590 226.8611)" fill="black"><tspan font-family="Courier New" font-size="12" font-weight="500" x="3.0947266" y="10" textLength="64.81055">action2()</tspan></text><line x1="117" y1="233.8611" x2="134.1" y2="233.8611" marker-end="url(#FilledArrow_Marker_2)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="495" y1="224.8611" x2="514.99964" y2="204.86147" marker-end="url(#FilledArrow_Marker_3)" stroke="#666" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" stroke-dasharray="4,4"/><text transform="translate(752 226.37367)" fill="#235e00"><tspan font-family="Helvetica Neue" font-size="12" font-weight="500" fill="#235e00" x=".322" y="11" textLength="85.356">plan succeeded</tspan></text><text transform="translate(222.89674 241.7687)" fill="#b1001c"><tspan font-family="Helvetica Neue" font-size="10" font-weight="500" fill="#b1001c" x=".115" y="10" textLength="12.77">fail</tspan></text><text transform="translate(468.5 161.94111)" fill="#666"><tspan font-family="Helvetica Neue" font-size="10" font-weight="500" fill="#666" x="18.235" y="10" textLength="103.53">Executed in next cycle.</tspan><tspan font-family="Helvetica Neue" font-size="10" font-weight="500" fill="#666" x="14.435" y="22.28" textLength="72.23">No information r</tspan><tspan font-family="Helvetica Neue" font-size="10" font-weight="500" fill="#666" x="86.485" y="22.28" textLength="19.81">egar</tspan><tspan font-family="Helvetica Neue" font-size="10" font-weight="500" fill="#666" x="106.115" y="22.28" textLength="19.45">ding</tspan><tspan font-family="Helvetica Neue" font-size="10" font-weight="500" fill="#666" x="1.845" y="34.559998" textLength="72.96">success or failur</tspan><tspan font-family="Helvetica Neue" font-size="10" font-weight="500" fill="#666" x="74.625" y="34.559998" textLength="66.31">e in this cycle. </tspan></text><text transform="translate(399.4029 241.32026)" fill="#b1001c"><tspan font-family="Helvetica Neue" font-size="10" font-weight="500" fill="#b1001c" x=".115" y="10" textLength="12.77">fail</tspan></text><text transform="translate(557.56944 242.66556)" fill="#b1001c"><tspan font-family="Helvetica Neue" font-size="10" font-weight="500" fill="#b1001c" x=".115" y="10" textLength="12.77">fail</tspan></text><text transform="translate(662 239.36)" fill="#b1001c"><tspan font-family="Helvetica Neue" font-size="10" font-weight="500" fill="#b1001c" x=".115" y="10" textLength="12.77">fail</tspan></text><text transform="translate(223.54167 212.2211)" fill="#235e00"><tspan font-family="Helvetica Neue" font-size="10" font-weight="500" fill="#235e00" x=".35" y="10" textLength="21.3">succ</tspan></text><text transform="translate(394.08333 212.2211)" fill="#235e00"><tspan font-family="Helvetica Neue" font-size="10" font-weight="500" fill="#235e00" x=".35" y="10" textLength="21.3">succ</tspan></text><text transform="translate(555.25 212.2211)" fill="#235e00"><tspan font-family="Helvetica Neue" font-size="10" font-weight="500" fill="#235e00" x=".35" y="10" textLength="21.3">succ</tspan></text><text transform="translate(675.8611 212.2211)" fill="#235e00"><tspan font-family="Helvetica Neue" font-size="10" font-weight="500" fill="#235e00" x=".35" y="10" textLength="21.3">succ</tspan></text><text transform="translate(118 162.19311)" fill="black"><tspan font-family="Helvetica Neue" font-size="12" font-weight="500" fill="black" x=".472" y="11" textLength="46.056">@atomic</tspan></text><path d="M 711 225 L 711 225 C 715.9706 225 720 229.02944 720 234 L 720 234 C 720 238.97056 715.9706 243 711 243 L 711 243 C 706.0294 243 702 238.97056 702 234 L 702 234 C 702 229.02944 706.0294 225 711 225 Z" fill="white"/><path d="M 711 225 L 711 225 C 715.9706 225 720 229.02944 720 234 L 720 234 C 720 238.97056 715.9706 243 711 243 L 711 243 C 706.0294 243 702 238.97056 702 234 L 702 234 C 702 229.02944 706.0294 225 711 225 Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="720" y1="234" x2="737.1" y2="234" marker-end="url(#FilledArrow_Marker_4)" stroke="#235e00" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="207" y1="243" x2="225.7627" y2="255.50847" marker-end="url(#FilledArrow_Marker_5)" stroke="#b1001c" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="378" y1="243" x2="405.14517" y2="256.5726" marker-end="url(#FilledArrow_Marker_5)" stroke="#b1001c" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="540" y1="243" x2="567.1452" y2="256.5726" marker-end="url(#FilledArrow_Marker_5)" stroke="#b1001c" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="234" y1="261" x2="684" y2="261" stroke="#b1001c" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="648" y1="243" x2="675.1452" y2="256.5726" marker-end="url(#FilledArrow_Marker_5)" stroke="#b1001c" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="684" y1="261" x2="697.6357" y2="247.36432" marker-end="url(#FilledArrow_Marker_2)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><text transform="translate(694.6846 250.13123)" fill="black"><tspan font-family="Helvetica Neue" font-size="10" font-weight="500" fill="black" x=".31" y="10" textLength="38.38">@atomic</tspan></text></g></g></svg>

## `@parallel`

The `@parallel` annotation defines a plan to execute every action and [&#8594; goal](../goals) in its body in parallel, via [fork-join](https://en.wikipedia.org/wiki/Fork%E2%80%93join_model) mechanism.
This behaviour is useful to speed up execution of independent actions and sub-plans.

> **Notes:**

> * If **one** of the parallel executed body elements fail, the whole plan fails.
> * The annotation only applies to plans triggered by `!!` and executed in the **current** cycle. Plans triggered via `!` will be independently executed in the *following* cycle. For more information on triggering see [&#8594; Plan Triggering Techniques](../triggering).

**Usage:**

<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">@parallel
+!plan <-
    ...
.
</code></pre>

For a plan
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">@parallel
+!plan <-
    action1();
    !!immediate_subplan;
    !postponed_subplan;
    action2();
.
</code></pre>
the execution flow is as depicted below

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xl="http://www.w3.org/1999/xlink" version="1.1" viewBox="170 315 556 149" width="556pt" height="149pt" xmlns:dc="http://purl.org/dc/elements/1.1/"><defs><font-face font-family="Courier New" font-size="12" panose-1="2 7 3 9 2 2 5 2 4 4" units-per-em="1000" underline-position="-232.91016" underline-thickness="41.015625" slope="0" x-height="422.85156" cap-height="571.28906" ascent="832.5195" descent="-300.29297" font-weight="500"><font-face-src><font-face-name name="CourierNewPSMT"/></font-face-src></font-face><marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="FilledArrow_Marker" viewBox="-1 -4 10 8" markerWidth="10" markerHeight="8" color="black"><g><path d="M 8 0 L 0 -3 L 0 3 Z" fill="currentColor" stroke="currentColor" stroke-width="1"/></g></marker><marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="FilledArrow_Marker_2" viewBox="-1 -4 10 8" markerWidth="10" markerHeight="8" color="#666"><g><path d="M 8 0 L 0 -3 L 0 3 Z" fill="currentColor" stroke="currentColor" stroke-width="1"/></g></marker><marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="FilledArrow_Marker_3" viewBox="-1 -4 10 8" markerWidth="10" markerHeight="8" color="#b1001c"><g><path d="M 8 0 L 0 -3 L 0 3 Z" fill="currentColor" stroke="currentColor" stroke-width="1"/></g></marker><font-face font-family="Helvetica Neue" font-size="12" panose-1="2 0 5 3 0 0 0 2 0 4" units-per-em="1000" underline-position="-100" underline-thickness="50" slope="0" x-height="517" cap-height="714" ascent="951.9958" descent="-212.99744" font-weight="500"><font-face-src><font-face-name name="HelveticaNeue"/></font-face-src></font-face><font-face font-family="Helvetica Neue" font-size="10" panose-1="2 0 5 3 0 0 0 2 0 4" units-per-em="1000" underline-position="-100" underline-thickness="50" slope="0" x-height="517" cap-height="714" ascent="951.9958" descent="-212.99744" font-weight="500"><font-face-src><font-face-name name="HelveticaNeue"/></font-face-src></font-face><marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="FilledArrow_Marker_4" viewBox="-1 -4 10 8" markerWidth="10" markerHeight="8" color="#235e00"><g><path d="M 8 0 L 0 -3 L 0 3 Z" fill="currentColor" stroke="currentColor" stroke-width="1"/></g></marker></defs><g stroke="none" stroke-opacity="1" stroke-dasharray="none" fill="none" fill-opacity="1"><title>Knowledgebase - Annotations</title><rect fill="white" width="906" height="535.0798"/><g><title>Layer 1</title><path d="M 297 333 L 432 333 C 436.97056 333 441 337.02944 441 342 L 441 342 C 441 346.97056 436.97056 351 432 351 L 297 351 C 292.02944 351 288 346.97056 288 342 L 288 342 C 288 337.02944 292.02944 333 297 333 Z" fill="white"/><path d="M 297 333 L 432 333 C 436.97056 333 441 337.02944 441 342 L 441 342 C 441 346.97056 436.97056 351 432 351 L 297 351 C 292.02944 351 288 346.97056 288 342 L 288 342 C 288 337.02944 292.02944 333 297 333 Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><text transform="translate(293 335)" fill="black"><tspan font-family="Courier New" font-size="12" font-weight="500" x="6.689453" y="10" textLength="129.6211">!postponed_subplan</tspan></text><path d="M 297 369 L 432 369 C 436.97056 369 441 373.02944 441 378 L 441 378 C 441 382.97056 436.97056 387 432 387 L 297 387 C 292.02944 387 288 382.97056 288 378 L 288 378 C 288 373.02944 292.02944 369 297 369 Z" fill="white"/><path d="M 297 369 L 432 369 C 436.97056 369 441 373.02944 441 378 L 441 378 C 441 382.97056 436.97056 387 432 387 L 297 387 C 292.02944 387 288 382.97056 288 378 L 288 378 C 288 373.02944 292.02944 369 297 369 Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><text transform="translate(293 371)" fill="black"><tspan font-family="Courier New" font-size="12" font-weight="500" x="3.0888672" y="10" textLength="136.82227">!!immediate_subplan</tspan></text><path d="M 297 405 L 432 405 C 436.97056 405 441 409.02944 441 414 L 441 414 C 441 418.97056 436.97056 423 432 423 L 297 423 C 292.02944 423 288 418.97056 288 414 L 288 414 C 288 409.02944 292.02944 405 297 405 Z" fill="white"/><path d="M 297 405 L 432 405 C 436.97056 405 441 409.02944 441 414 L 441 414 C 441 418.97056 436.97056 423 432 423 L 297 423 C 292.02944 423 288 418.97056 288 414 L 288 414 C 288 409.02944 292.02944 405 297 405 Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><text transform="translate(293 407)" fill="black"><tspan font-family="Courier New" font-size="12" font-weight="500" x="39.094727" y="10" textLength="64.81055">action1()</tspan></text><path d="M 297 441 L 432 441 C 436.97056 441 441 445.02944 441 450 L 441 450 C 441 454.97056 436.97056 459 432 459 L 297 459 C 292.02944 459 288 454.97056 288 450 L 288 450 C 288 445.02944 292.02944 441 297 441 Z" fill="white"/><path d="M 297 441 L 432 441 C 436.97056 441 441 445.02944 441 450 L 441 450 C 441 454.97056 436.97056 459 432 459 L 297 459 C 292.02944 459 288 454.97056 288 450 L 288 450 C 288 445.02944 292.02944 441 297 441 Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><text transform="translate(293 443)" fill="black"><tspan font-family="Courier New" font-size="12" font-weight="500" x="39.094727" y="10" textLength="64.81055">action2()</tspan></text><line x1="214.48925" y1="391.00717" x2="279.7627" y2="347.49153" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="441" y1="414" x2="512.4653" y2="399.70693" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="441" y1="378" x2="512.4653" y2="392.29307" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="441" y1="342" x2="514.7922" y2="386.27533" marker-end="url(#FilledArrow_Marker_2)" stroke="#666" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" stroke-dasharray="4,4"/><line x1="441" y1="450" x2="514.7922" y2="405.72467" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="539.85636" y1="397.61025" x2="620.2597" y2="412.22903" marker-end="url(#FilledArrow_Marker_3)" stroke="#b1001c" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><text transform="translate(635 370.8598)" fill="#235e00"><tspan font-family="Helvetica Neue" font-size="12" font-weight="500" fill="#235e00" x=".322" y="11" textLength="85.356">plan succeeded</tspan></text><text transform="translate(635 406.5959)" fill="#b1001c"><tspan font-family="Helvetica Neue" font-size="12" font-weight="500" fill="#b1001c" x=".442" y="11" textLength="55.116">plan failed</tspan></text><text transform="translate(446 320.08)" fill="#666"><tspan font-family="Helvetica Neue" font-size="10" font-weight="500" fill="#666" x="25.235" y="10" textLength="103.53">Executed in next cycle.</tspan><tspan font-family="Helvetica Neue" font-size="10" font-weight="500" fill="#666" x="1.71" y="22.28" textLength="72.23">No information r</tspan><tspan font-family="Helvetica Neue" font-size="10" font-weight="500" fill="#666" x="73.76" y="22.28" textLength="19.81">egar</tspan><tspan font-family="Helvetica Neue" font-size="10" font-weight="500" fill="#666" x="93.39" y="22.28" textLength="61.68">ding success </tspan><tspan font-family="Helvetica Neue" font-size="10" font-weight="500" fill="#666" x="28.57" y="34.559998" textLength="33.51">or failur</tspan><tspan font-family="Helvetica Neue" font-size="10" font-weight="500" fill="#666" x="61.9" y="34.559998" textLength="66.31">e in this cycle. </tspan></text><path d="M 531 387 L 531 387 C 535.97056 387 540 391.02944 540 396 L 540 396 C 540 400.97056 535.97056 405 531 405 L 531 405 C 526.02944 405 522 400.97056 522 396 L 522 396 C 522 391.02944 526.02944 387 531 387 Z" fill="white"/><path d="M 531 387 L 531 387 C 535.97056 387 540 391.02944 540 396 L 540 396 C 540 400.97056 535.97056 405 531 405 L 531 405 C 526.02944 405 522 400.97056 522 396 L 522 396 C 522 391.02944 526.02944 387 531 387 Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><path d="M 207 387 L 207 387 C 211.97056 387 216 391.02944 216 396 L 216 396 C 216 400.97056 211.97056 405 207 405 L 207 405 C 202.02944 405 198 400.97056 198 396 L 198 396 C 198 391.02944 202.02944 387 207 387 Z" fill="white"/><path d="M 207 387 L 207 387 C 211.97056 387 216 391.02944 216 396 L 216 396 C 216 400.97056 211.97056 405 207 405 L 207 405 C 202.02944 405 198 400.97056 198 396 L 198 396 C 198 391.02944 202.02944 387 207 387 Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="215.78756" y1="394.0472" x2="278.33575" y2="380.1476" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="215.78756" y1="397.9528" x2="278.33575" y2="411.8524" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="214.48925" y1="400.99283" x2="279.7627" y2="444.50847" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="171" y1="396" x2="188.1" y2="396" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><text transform="translate(186.70833 371.90145)" fill="black"><tspan font-family="Helvetica Neue" font-size="12" font-weight="500" fill="black" x=".168" y="11" textLength="20.664">fork</tspan></text><text transform="translate(527 371.90145)" fill="black"><tspan font-family="Helvetica Neue" font-size="12" font-weight="500" fill="black" x=".056" y="11" textLength="18.888">join</tspan></text><line x1="539.85636" y1="394.38975" x2="620.2597" y2="379.77097" marker-end="url(#FilledArrow_Marker_4)" stroke="#235e00" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><text transform="translate(170 315.332)" fill="black"><tspan font-family="Helvetica Neue" font-size="12" font-weight="500" fill="black" x=".482" y="11" textLength="48.036">@parallel</tspan></text></g></g></svg>

## Examples

The agent script

<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">!main.

+!main <-
    !!plan << generic/print("plan failed!")
.

+!plan <-
    generic/print("foo");
    !!subplan1;
    !!subplan2;
    generic/print("bar")
.

+!subplan1 <-
    generic/print("sub-plan1");
    fail
.

+!subplan2 <-
    generic/print("sub-plan2")
.
</code></pre>

will only yield

```commandline
foo
sub-plan1
plan failed!
```

as `+!subplan1` fails and the execution stops.

Adding `@parallel` to `+!plan` will execute every goal trigger and action in parallel, yielding

```commandline
bar
sub-plan1
foo
sub-plan2
plan failed!
```

(ordering of output might vary).
It can be observed that, despite executing every element in `+!plan`'s body, the whole plan still fails, as `+!subplan1` fails.

Further adding `@atomic` to `+!plan` will result in successful execution of `+!plan`, returning

```commandline
foo
bar
sub-plan1
sub-plan2
```

(ordering might vary).
The same effect could also be achieved by preventing `!subplan1` to fail via `@atomic`, which is left as an exercise to the reader.

The complete example discussed above would be

<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">!main.

+!main <-
    !!plan << generic/print("plan failed!")
.

@atomic
@parallel
+!plan <-
    generic/print("foo");
    !!subplan1;
    !!subplan2;
    generic/print("bar")
.

+!subplan1 <-
    generic/print("sub-plan1");
    fail
.

+!subplan2 <-
    generic/print("sub-plan2")
.
</code></pre>