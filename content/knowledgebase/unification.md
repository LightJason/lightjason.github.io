---
title: "Basic Knowledge: Unification"
jsonld: ["techarticle"]
gitter: "knowledge base"
previous :
    url: "/knowledgebase/builtinactions"
    text: "kb: Basic - Built-in Actions"
next :
    url: "/knowledgebase/triggering"
    text: "kb: Advanced - Plan Triggering Techniques"
---

[Unification](https://en.wikipedia.org/wiki/Unification_(computer_science)) is the process for _setting values from one literal into the variables of another literal_, e.g. determining the current value of `Colour` in `light(Colour)`.
Note: `Colour` is a variable! Based on the previous [&#8594; time example](../literals#time) the procedure can look as follows:

> We have two literals, one literal with values and another literal with variables
> <!-- htmlmin:ignore --><pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">time( current( hour( 2    ), minute( 0      ), period( pm()   ) ) )
> time( current( hour( Hour ), minute( Minute ), period( Period ) ) )
> </pre></code><!-- htmlmin:ignore -->
> Based on this structure the systems tries to transfer the values from the first literal into the variables
> of the second literal, such that both literals are equal. If it is not possible the unification
> process will fail. On a successful execution the variable ```Hour``` stores the number $2$, the variable
> ```Minute``` the number $0$ and the variable ```Period``` the [&#8594; atom](../atoms) `pm`.

The runtime of the logic programming language tries to find an executable structure, so that all unification components and [&#8594; rules](../plansandrules) can be finished successfully. The unification process can be used to generate new literals based on existing literals. In combination with _rules_ the system can solve complex reasoning structures. If the system cannot find any possibility to solve the problem, the logic program will be stopped with a failure. The goal of the runtime is to find a successful solution.

<svg height="128" class="railroad-diagram" viewBox="0 0 1052 101" id="svg_e732ce4bb8479dc479e294d62beaf1cf"><path d="M20 30v20m10-20v20M20 40h20.5m-.5 0h10m0 0a10 10 0 0 0 10-10 10 10 0 0 1 10-10m0 0h36m0 0a10 10 0 0 1 10 10 10 10 0 0 0 10 10m-76 0h20" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M70 29h36v22H70z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#fa868488740aa25870ced6b9169951fb"><text x="88" y="44">AT</text></a></g><path d="M106 40h20m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M136 29h100v22H136z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#f2160f407f56e0f4d495cecd44055e2d"><text x="186" y="44">RIGHTSHIFT</text></a></g><path d="M236 40h10m0 0h20" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M266 40h320m76 0h320M586 29h76v22h-76z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#f0d674f1e0ed4292267f149c5983db02"><text x="624" y="44">literal</text></a></g><path d="M982 40h20m-756 0a10 10 0 0 1 10 10v10a10 10 0 0 0 10 10m716 0" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M266 59h148v22H266z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#5ffa5d1c78ad09c7bf5b4d0b0764641f"><text x="340" y="74">LEFTROUNDBRACKET</text></a></g><path d="M414 70h10m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M434 59h76v22h-76z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#f0d674f1e0ed4292267f149c5983db02"><text x="472" y="74">literal</text></a></g><path d="M510 70h10m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M530 59h60v22h-60z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#4d9b3e9fc12849d060371eb65154c751"><text x="560" y="74">COMMA</text></a></g><path d="M590 70h10m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M610 59h196v22H610z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#89368367b9f48fd82a781f5a4e1ad8b6"><text x="708" y="74">unification_constraint</text></a></g><path d="M806 70h10m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M826 59h156v22H826z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#3a52152b9f1e9dd45998ce24723d98ed"><text x="904" y="74">RIGHTROUNDBRACKET</text></a></g><path d="M982 70a10 10 0 0 0 10-10V50a10 10 0 0 1 10-10m0 0h10m0 0h20m-10-10v20m10-20v20" transform="translate(.5 .5)"/></svg>

In AgentSpeak(L++) unification can be done by using the right shift operator `>>` in combination with a literal to be unified. [&#8594; Terms](../terms) of interest are then replaced by [&#8594; variables](../variables).

As unification provides values for the first matching literal in the belief base (not necessarily in denoted order), applying constraints can be quite helpful to get the literal of interest.
It is therefore possible to provide certain logical constraints to variables, by using the
<!-- htmlmin:ignore --><pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">>>(literal, constraint)</code></pre><!-- htmlmin:ignore -->
notation.

**Examples**

> We want to get the current values of the complex literal
> <!-- htmlmin:ignore --><pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">time( current( hour( 2 ), minute( 0 ), period( pm() ) ) )</code></pre><!-- htmlmin:ignore -->
> but are not interested in the value of the period. Nevertheless we will have to provide the complete literal to the unification:
<!-- htmlmin:ignore --><pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">>>time( current( hour( Hour ), minute( Minute ), period( _ ) ) )</code></pre><!-- htmlmin:ignore -->
> which unifies `Hour` and `Minute` to `2` and `0` respectively. For the value of the `period` we will also have to provide a variable. Here we can use the variable ```_``` as _placeholder_.

<p></p>

> As unification provides values for the first match, applying constraints can be helpful.
> Consider the three beliefs
<!-- htmlmin:ignore --><pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">periods( am(), pm() ).
time( current( hour( 10 ), minute( 0  ), period( am() ) ) ).
time( current( hour( 4  ), minute( 30 ), period( pm() ) ) ).
</code></pre><!-- htmlmin:ignore -->
in Bob's belief base, describing the two periods a day can have and two appointments he has.<br>
Alice would like to know whether Bob has an appointment after 4 o'clock in the afternoon.
To get only the values of the second `time(…)` belief, Bob could unify the values as follows (as he already knows two constraints, provided by Alice):
<!-- htmlmin:ignore --><pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">>>periods(AM, PM);  // unify possible periods into variables AM and PM to use them in the unification below
> >>( time( current( hour( Hour ), minute( Minute ), period( Period ) ) ), Period == PM && Hour >= 4);
</code></pre><!-- htmlmin:ignore -->
This will yield `4`, `30`, and `pm` for `Hour`, `Minute` and `Period` respectively.
