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