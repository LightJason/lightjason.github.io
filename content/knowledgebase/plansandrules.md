---
title: "Basic Knowledge: Plans and Logic Rules"
jsonld: ["techarticle"]
gitter: "knowledge base"
previous :
    url: "/knowledgebase/variables"
    text: "kb: Basic - Variables"
next :
    url: "/knowledgebase/goals"
    text: "kb: Basic - Goals"
---

In contrast to [&#8594; literals](../literals), [&#8594; variables](../variables) and [&#8594; beliefs and facts](../beliefsandfacts), plans and rules are _executable structures_.

<!--more-->

{{< toc >}}

In general Prolog uses only logical rules. _AgentSpeak(L)_ and _AgentSpeak(L++)_ also use rules but additionally provide a plan structure. Within a Prolog structure the ordering is relevant to the execution semantic (see in [Learn Prolog Now!](http://www.learnprolognow.org/lpnpage.php?pagetype=html&pageid=lpn-htmlse10)).

But in _AgentSpeak(L++)_ the ordering of rules and plans are **not** relevant for the execution semantic. Furthermore plan and rule structures can be grouped within the source code to simplify modelling different paths of execution.

## Plans
 
Plans are like _static methods_ or _functions_ in an imperative programming language, with an execution condition and boolean return value.

<svg class="railroad-diagram" height="112" viewBox="0 0 726 80" id="svg_5fc25157650d0cb24f02216d904584df"><path d="M20 30v20m10-20v20M20 40h20.5m-.5 0h10m0 0a10 10 0 0 0 10-10 10 10 0 0 1 10-10m0 0h108m0 0a10 10 0 0 1 10 10 10 10 0 0 0 10 10M50 40h20" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M70 29h108v22H70z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#4ab6864fc58ecd8b598ee10dfe2ac311"><text x="124" y="44">annotations</text></a></g><path d="M178 40h20m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M208 29h116v22H208z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#4f0fa1b5875427a602b3f913163be2ca"><text x="266" y="44">plan_trigger</text></a></g><path d="M324 40h10m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M344 29h76v22h-76z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#f0d674f1e0ed4292267f149c5983db02"><text x="382" y="44">literal</text></a></g><path d="M420 40h10m0 0a10 10 0 0 0 10-10 10 10 0 0 1 10-10m0 0h152m0 0a10 10 0 0 1 10 10 10 10 0 0 0 10 10m-192 0h20m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M460 29h132v22H460z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#d60b4a42e52668da3017e5717ef3f60"><text x="526" y="44">plandefinition</text></a></g><path d="M592 40h10m-142 0a10 10 0 0 0-10 10 10 10 0 0 0 10 10m0 0h132m0 0a10 10 0 0 0 10-10 10 10 0 0 0-10-10m10 0h20m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M632 29h44v22h-44z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#40679521b5da0954b705341a2859f782"><text x="654" y="44">DOT</text></a></g><path d="M676 40h10m0 0h20m-10-10v20m10-20v20" transform="translate(.5 .5)"/></svg>



### Transforming Imperative Functions to Plans

To transform an imperative function to a logical plan, proceed as follows:

* Consider every execution path! For each terminating path create a plan condition.
* Variables have to start with a capital letter, e.g. `newduration` $\Rightarrow$ `NewDuration`.
* Statements have to be separated by a semicolon `;`, except the last one!
* A plan has to be terminated by a full stop symbol `.`

### Plan Example

> Consider the following Java method to change the phase duration of a traffic light:
<!-- htmlmin:ignore --><pre data-language="Java"><code class="language-java">public static boolean phaseduration( int newduration )
{
  if ( newduration < 1 )   // Plan condition: plan fails if
      return false;        // new duration is unreasonably small
</code><code class="language-java">
  System.out.println( "For safety, changing light to RED" );
  System.out.println( "Changing phase duration to " + newduration );
  return true;             // Plan succeeded
}
</code></pre><!-- htmlmin:ignore -->
> 
> transformed into a plan, by considering the above procedure, will result in
> 
> <!-- htmlmin:ignore --><pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">+!phaseduration(NewDuration)
    : NewDuration < 1 <-    // path 1: plan condition to always fail
        fail                // fail simply marks the plan as failed.</code><code class="language-agentspeak">
    : NewDuration >= 1 <-   // path 2: plan condition to change light and succeed
        generic/print( "For safety, changing light to RED" );
        generic/print( "Changing phase duration to", NewDuration )
.
</code></pre><!-- htmlmin:ignore -->


## Rules

<svg class="railroad-diagram" width="626" height="112" viewBox="0 0 626 80" id="svg_d0404623ab035c7e30f997d91d173a52"><path d="M20 30v20m10-20v20M20 40h20.5m-.5 0h10m0 0a10 10 0 0 0 10-10 10 10 0 0 1 10-10m0 0h108m0 0a10 10 0 0 1 10 10 10 10 0 0 0 10 10M50 40h20" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M70 29h108v22H70z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#4ab6864fc58ecd8b598ee10dfe2ac311"><text x="124" y="44">annotations</text></a></g><path d="M178 40h20m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M208 29h76v22h-76z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#f0d674f1e0ed4292267f149c5983db02"><text x="246" y="44">literal</text></a></g><path d="M284 40h10m0 0h10m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M314 29h188v22H314z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#d42b51522492f1bfb748a7056a67ec99"><text x="408" y="44">logicalruledefinition</text></a></g><path d="M502 40h10m-198 0a10 10 0 0 0-10 10 10 10 0 0 0 10 10m0 0h188m0 0a10 10 0 0 0 10-10 10 10 0 0 0-10-10m10 0h10m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M532 29h44v22h-44z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#40679521b5da0954b705341a2859f782"><text x="554" y="44">DOT</text></a></g><path d="M576 40h10m0 0h20m-10-10v20m10-20v20" transform="translate(.5 .5)"/></svg>

Rules

* can be seen as _static functions_ in a logic programming language with some additional structure.
* are similar to plans, but without context and trigger event.

### Rule Example

> One of the most famous examples for rules in logic programs is the [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number). Mathematically this sequences is defined as
> $$F\_n = F\_{n-1} + F\_{n-2}$$
> $$F\_0 = 0$$
> $$F\_1 = F\_2 = 1$$
> For the value $n=5$ the sequence is calculated as
> $$F\_5 = F\_4 + F\_3 = (F\_3 + 1) + (1+1) = ((1+1)+1) + (1+1) = 5$$
> Based on this calculation you can see that each function element $F\_n$ which is not defined as $1$ gets resolved in
> a recursive way. A rule, which calculates the Fibonacci number of any input can be written as follows:
> <!-- htmlmin:ignore -->
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">fibonacci(X,R)
    // order of the rules are indeterministic, so for avoid indeterministic behaviour
    // add the condition, when the rule can be executed first
    :- X <= 2;  R = 1
    :- X > 2;   TA = X - 1; TB = X - 2; $fibonacci(TA,A); $fibonacci(TB,B); R = A+B
.
!main <-
    $fibonacci(8, FIB)
.
</code></pre>
<!-- htmlmin:ignore -->
