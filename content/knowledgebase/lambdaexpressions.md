---
title: "Advanced Knowledge: Lambda Expressions"
jsonld: ["techarticle"]
gitter: "knowledge base"
previous :
    url: "/knowledgebase/annotations"
    text: "kb: Advanced - Plan Annotations"
next :
    url: "/knowledgebase/repairactions"
    text: "kb: Advanced - Explicit Repair Actions"
---

AgentSpeak(L++) does not support looping directly; however, we support [lambda expressions](http://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#945f3fc449518a73b9f5f32868db466c) which are based on [lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus). Similar to a _for each_ call, each element in an input list (variable) can be looped.

<!--more-->

<svg class="railroad-diagram" viewBox="0 0 986 71" id="svg_945f3fc449518a73b9f5f32868db466c"><path d="M20 30v20m10-20v20M20 40h20.5m-.5 0h10m0 0a10 10 0 0 0 10-10 10 10 0 0 1 10-10m0 0h36m0 0a10 10 0 0 1 10 10 10 10 0 0 0 10 10m-76 0h20" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M70 29h36v22H70z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#fa868488740aa25870ced6b9169951fb"><text x="88" y="44">AT</text></a></g><path d="M106 40h20m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M136 29h188v22H136z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#9710aecf13a42eb931a1697d06df0ac2"><text x="230" y="44">lambda_initialization</text></a></g><path d="M324 40h10m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M344 29h100v22H344z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#45bbccf026893bca7220853a204cae6c"><text x="394" y="44">RIGHTARROW</text></a></g><path d="M444 40h10m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M464 29h84v22h-84z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#e04aa5104d082e4a51d241391941ba26"><text x="506" y="44">variable</text></a></g><path d="M548 40h10m0 0a10 10 0 0 0 10-10 10 10 0 0 1 10-10m0 0h124m0 0a10 10 0 0 1 10 10 10 10 0 0 0 10 10m-164 0h20" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M578 29h124v22H578z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#25bfb7f27c4e1566b19121b950615f68"><text x="640" y="44">lambda_return</text></a></g><path d="M702 40h20m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M732 29h60v22h-60z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#f65f22e75defc168edfc6444e6aaf4f8"><text x="762" y="44">COLON</text></a></g><path d="M792 40h10m0 0h10" transform="translate(.5 .5)"/><g class="non-terminal" transform="translate(.5 .5)"><path d="M812 29h124v22H812z"/><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#cc6330cd22cd33c989908a17bda8b49f"><text x="874" y="44">block_formula</text></a></g><path d="M936 40h10m0 0h20m-10-10v20m10-20v20" transform="translate(.5 .5)"/></svg>

> This example creates a list of the number _[1,20)_ and we are looping over the elements, first in sequential order and call the _print_ action for each element and in the second call we are summarize each value to the variable _R_. _R_ is in this case the _returning variable_
<!-- htmlmin:ignore -->
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">L = collection/list/range(1, 20);
(L) -> Y : generic/print(Y);
(L) -> Y | R : R = Y+1;
</code></pre>
<!-- htmlmin:ignore -->

**Practical Example**

This concept especially makes sense in situations where efficient processing of multiple elements is desired.
Consider an agent _Alice_ with a custom action `myfriends( Phonebook )` which returns a list of her closest friends from her phone book. If Alice would want to send an invitation to each of her closest friends, she could use a _lambda expression_ to send a message to each of them:
<!-- htmlmin:ignore -->
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">+!main
<-
  L = myfriends( Phonebook );
  (L) -> Friend : message/send( Friend, content( "invitation to my birthday, next week" ) )
.
</code></pre>
<!-- htmlmin:ignore -->

<br>

_But, can we optimise this further?_

Alice probably would not want to wait until the message gets delivered. In practice she would hand all the envelopes to the postal clerk at the same time to have her mind free for other tasks.

The same can be achieved by adding the [&#8594; annotation](../annotations) `@` to the lambda expression to instruct LightJason to execute the expression in parallel:
<!-- htmlmin:ignore -->
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">+!main
<-
  L = myfriends( Phonebook );
  @(L) -> Friend : message/send( Friend, content( "invitation to my birthday, next week" ) )
.
</code></pre>
<!-- htmlmin:ignore -->

<br>

_But, what if some of her friends have to be invited via different kinds of messengers?_

Here the feature that LightJason executes [&#8594; plans](../plansandrules) with different plan signatures in parallel comes into play.
Alice simply creates a plan `+!sendinvitation( Friend )` to do the job. This plan gets executed in the next cycle (see [&#8594; advanced triggering](../triggering)) and can also decide on how each friend can be reached best.

> **Note:** Alice removed the `@` from the lambda expression as the plans will be executed in the next cycle in parallel.

<!-- htmlmin:ignore -->
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">+!main
<-
  L = myfriends( Phonebook );
  (L) -> Friend : !sendinvitation( Friend )
.
</code><code class="language-agentspeak">
+!sendinvitation( Friend )
  : isreachablebyemail( Friend ) <-
    message/send/email( Friend, content( "invitation to my birthday, next week" ) )
  : isreachablebyjabber( Friend ) <-
  	message/send/jabber( Friend, content( "invitation to my birthday, next week" ) )
.
</code></pre>
<!-- htmlmin:ignore -->

