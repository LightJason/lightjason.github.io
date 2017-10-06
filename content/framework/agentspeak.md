---
title: "AgentSpeak(L++) Component"
gitter: "framework"
---

This is the main component with the agent functionality. The component allows to build agents from the ASL script and contains all [built-in actions](/knowledgebase/builtinactions).

* [Source Documentation](https://lightjason.github.io/AgentSpeak/sources/)
* [OpenHub Code Statistic](https://www.openhub.net/p/LightJason-AgentSpeak)
* [Libraries.io Statistic](https://libraries.io/github/LightJason/AgentSpeak)
* Testing Agent
	* [Unit Testing Agent](https://github.com/LightJason/AgentSpeak/blob/master/src/test/resources/agent/complete.asl)
	* [Agent](https://github.com/LightJason/AgentSpeak/blob/master/src/test/resources/agent/hanoi.asl) which plays [Tower of Hanoi](https://en.wikipedia.org/wiki/Tower_of_Hanoi)



## Benchmarking Emergency Scenario

The video presents a performance test of our framework with 15.000 agents on an emergency scenario. The video shows the system running in realtime on a single computer (iMac with 2,9 GHz Intel Core i5, 16 GB RAM and OSX El Captain 10.11.6).

> The agents calculate their landmarks to the exit point (position 140 / 140 in the middle) on a grid world with 250x250 cells and startswalking. If a cell is blocked by another agent, agents try to move to the right-side cell, if this is not possible to the left side cell; if neither is possible, the agent stops walking and waits for a random time until trying again to continue walking. If the agent doesn't reach a landmark within five attempts, it skips the landmark and starts walking to the next one except the exit point.

{{< video "https://player.vimeo.com/video/202120833" "https://vimeo.com/lightjason/emergencyscenario" >}}


## Language Features

We present a short overview of language examples of the _AgentSpeak(L++)_ syntax. You can found the full [EBNF description](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_Form) of the language syntax on the project [documentation page](http://lightjason.github.io/AgentSpeak/). The Railroad / Syntax diagrams of the _AgentSpeak(L++)_ language:

* [Agent Railroad / Syntax Diagram](http://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/)
* [PlanBundle Railroad / Syntax Diagram](http://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/PlanBundle.g4/)

### <a name="lambdaexpression"></a>Lambda Expression

The language does not support looping directly; however, we support [lambda expression](http://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#945f3fc449518a73b9f5f32868db466c) which are based on [lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus). Similar to a _for each_ call, each element in an input list (variable) can be looped.

> The example creates a list of the number _[1,20)_ and we are looping over the elements, first in sequential order and call the _print_ action for each element and in the second call we are summarize each value to the variable _R_. _R_ is in this case the _returning variable_

<!-- htmlmin:ignore -->
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">L = collection/list/range(1, 20);
(L) -> Y : generic/print(Y);
(L) -> Y | R : R = Y+1;
</code></pre>
<!-- htmlmin:ignore -->

### <a name="repairaction"></a>Explicit Repair Action

In general supports the implementation _repair planning_ with the default behaviour ```-!```. In this additional structure we support also [repair action chains](http://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#503f34271b101269197f766a6b90e4a9).

> The example shows the execution of three actions _actionA_, _actionB_, _actionC_. The system executes the _actionA_ first, if the action fails, _actionB_ will be executed, if this also fails _actionC_ will be executed. If _actionC_ fails also, the whole plan fails.

<!-- htmlmin:ignore -->
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">
actionA << actionB << actionC;
</code></pre>
<!-- htmlmin:ignore -->

> If you don't want that a plan is failing, if an action fails you can put at the end of this chain a ```true``` value. This models the behaviour _anything can go wrong, but the agent ignores the error(s)_.

<!-- htmlmin:ignore --><pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">actionA << true;
</code></pre><!-- htmlmin:ignore -->

### <a name="multiplanrule"></a>Multi-Plan and Rule Definition

In general Prolog uses only logical rules, _AgentSpeak(L)_ and _AgentSpeak(L++)_ use rules and also adds a plan structure. Within a Prolog structure the ordering of rules and plans are neccessary of the execution semantic (see in [Learn Prolog Now!](http://www.learnprolognow.org/lpnpage.php?pagetype=html&pageid=lpn-htmlse10)).

But in _AgentSpeak(L++)_ the ordering of rules and plans are not relevant for the execution semantic. On this case within the source code plan and rule structures are grouped.

> This example shows the [Ackermann function](https://en.wikipedia.org/wiki/Ackermann_function). The first line defines the [rule](http://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#d0404623ab035c7e30f997d91d173a52) name (literal) similar to Prolog. Each rule will be added by the ```:-``` rule-sign under the literal. In classical Prolog the rule-literal must be for each different rule and Prolog executes the rules in sequential order. In our case we change this behaviour, so that each rule, which can be executed, will be executed. So we put a condition first to the rule, so this condition will deny or allow the execution. After that the rule-body will be added. For calling a rule from a plan or a rule, you need to put a ```$```-sign in front of the rule-name.

<!-- htmlmin:ignore -->
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">ackermann(N, M, R)
    :- N == 0; M > 0; R = M+1
    :- M == 0; N > 0; TN = N-1; $ackermann(TN, 1, RA); R = RA
    :- N > 0; M > 0; TN = N-1; TM = M-1; $ackermann(N, TM, RI); $ackermann(TN, RI, RO); R = RO
</code></pre>
<!-- htmlmin:ignore -->

> The second example shows the structure for [plans](http://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#5fc25157650d0cb24f02216d904584df). For plans it is similar to the rule structure, but the ```<-``` plan-sign is used and a condition of the plan execution can be added. Here exist three plans, the first will be executed, iif there is a belief ```hello``` with a string value, the second plan will be executed, iif there exists a belief ```hello``` with a numeric value which is greater than $1000$ and the third plan will be run every time (default plan).

<!-- htmlmin:ignore -->
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">+!main

    : >>( hallo(X), generic/type/isstring(X) ) <-
            generic/print("---", "first plan", "---", "unification variables", X)

    : >>( hallo(X), generic/type/isnumeric(X) && X > 1000 )  <-
        generic/print("---", "second plan", "---", "unification variables", X)

    <- generic/print("---", "third (default) plan", "---").
</code></pre>
<!-- htmlmin:ignore -->

### <a name="multiassignment"></a>Multi-Assignments

The [multi-assignment](http://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm#aaf72be46bb3458f45cf02c8858d96be) allowed to extract elements from a list into different variables. It is similar to the [head-tail-notation of Prolog](https://en.wikibooks.org/wiki/Prolog/Lists) but here we can create complex structures.

> The examples creates a list if number within in the range _[1,20)_ and 1 will be put into the variable _A_, 2 in _B_, 3 in _C_, 4 will be ignore, 5 in _D_, 6 in _E_, 7 in _F_ and the list _[8,20)_ in _G_

<!-- htmlmin:ignore -->
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">L = collection/list/range(1, 20);
[A|B|C|_|D|E|F|G] = L;
</code></pre>
<!-- htmlmin:ignore -->

### <a name="parallelism"></a>Parallelism and Thread-Safe Variables

The main sign for parallelism ist the _at-sign (@)_ character. If the @ is put in front of an action or variable the action will be executioned in parallel and the variable will be thread-safe. Not each action supports a parallel execution
