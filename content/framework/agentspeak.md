---
title: "AgentSpeak(L++) Language Features"
---
We present here a short overview of language examples of our _AgentSpeak(L++)_ syntax. You can found the full [EBNF description](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_Form) of the language syntax on the project [documentation page](http://lightjason.github.io/AgentSpeak/). The Railroad / Syntax diagrams of the _AgentSpeak(L++)_ language:

* [Agent Railroad / Syntax Diagram](http://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/)
* [PlanBundle Railroad / Syntax Diagram](http://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/PlanBundle.g4/)

## <a name="lambdaexpression"></a>Lambda Expression

The language does not support a looping directly, but we are using _lambda expression_ which care based on the theoretical structure of a [lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus). IN a short word we use a defintion like a _for each_ call, so each element in a variable can be looped.

> The example creates a list of the number _[1,20)_ and we are looping over the elements, first in sequential order and call the _print_ action for each element and in the second call we are summarize each value to the variable _R_. _R_ is in this case the _returning variable_

<pre><code class="lightjason">L = collection/list/range(1, 20);
(L) -> Y : generic/print(Y);
(L) -> Y | R : R = Y+1; 
</code></pre>

## <a name="repairaction"></a>Explicit Repair-Action

In generell supports the implementation _repair planning_ with the default behaviour ```-!```. In this additional structure we support also _repair action chains_.

> The example shows the execution of three actions _actionA_, _actionB_, _actionC_. The system execute the _actionA_ first, if the action fails, _actionB_ will be executed, if this also fails _actionC_ will be executed. If _actionC_ fails also, the whole plan fails.

<pre><code class="prolog">L = collection/list/range(1, 20);
actionA << actionB << actionC;
</code></pre>

> If you don't want, that a plan is failing, if an action fails you can put at the end of this chain a ```true``` value. This models the behaviour _anything can go wrong, but the agent ignore the error(s)_. 

<pre><code class="prolog">L = collection/list/range(1, 20);
actionA << true;
</code></pre>

## <a name="multiplanrule"></a>Multi-Plan and Rule Definition

In general Prolog uses only logical rules, _AgentSpeak(L)_ and _AgentSpeak(L++)_ use rules and also adds a plan structure. Within a Prolog structure the ordering of rules and plans are neccessary of the execution semantic (see in [Learn Prolog Now!](http://www.learnprolognow.org/lpnpage.php?pagetype=html&pageid=lpn-htmlse10)).

But in the _AgentSpeak(L++)_ the ordering of rules and plans are not relevant for the execution semantic. On this case within the source code plan and rule structures are grouped.

> This example shows the [Ackermann function](https://en.wikipedia.org/wiki/Ackermann_function). The first line defines the rule name (literal) similar to Prolog. Each rule will be added by the ```:-``` rule-sign under the literal. In classical Prolog the rule-literal must be for each different rule and Prolog executes the rules in sequential order. In our case we change this behaviour, so that each rule, which can be executed, will be executed. So we put a condition first to the rule, so this condition will deny or allow the execution. After that the rule-body will be added. For calling a rule from a plan or a rule, you need to put a ```$```-sign in front of the rule-name.

<pre><code class="prolog">ackermann(N, M, R)
    :- N == 0; M > 0; R = M+1
    :- M == 0; N > 0; TN = N-1; $ackermann(TN, 1, RA); R = RA
    :- N > 0; M > 0; TN = N-1; TM = M-1; $ackermann(N, TM, RI); $ackermann(TN, RI, RO); R = RO
</code></pre>


## <a name="multiassignment"></a>Multi Assignments

The multi-assignment allowed to extract elements from a list into different variables. It is similar to the [head-tail-notation of Prolog](https://en.wikibooks.org/wiki/Prolog/Lists) but here we can create complex structures.

> The examples creates a list if number within in the range _[1,20)_ and 1 will be put into the variable _A_, 2 in _B_, 3 in _C_, 4 will be ignore, 5 in _D_, 6 in _E_, 7 in _F_ and the list _[8,20)_ in _G_

<pre><code class="prolog">L = collection/list/range(1, 20);
[A|B|C|_|D|E|F|G] = L;
</code></pre>

## <a name="parallelism"></a>Parallelism & Thread-Safe Variables

The main sign for parallelism ist the _at-sign (@)_ character. If the @ is put in front of an action or variable the action will be executioned in parallel and the variable will be thread-safe. Not each action supports a parallel execution
