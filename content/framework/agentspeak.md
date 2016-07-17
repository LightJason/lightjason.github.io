---
title: "AgentSpeak(L) Language Features"
---
We present here a short overview of language examples of our _AgentSpeak(L)_ syntax. You can found the full [EBNF description](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_Form) of the language syntax on the project [documentation page](http://lightjason.github.io/AgentSpeak/). The Railroad / Syntax diagrams of the _AgentSpeak(L)_ language:

* [Agent Railroad / Syntax Diagram](http://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/)
* [PlanBundle Railroad / Syntax Diagram](http://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/PlanBundle.g4/)

## <a name="lambdaexpression"></a>Lambda Expression

The language does not support a looping directly, but we are using _lambda expression_ which care based on the theoretical structure of a [lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus). IN a short word we use a defintion like a _for each_ call, so each element in a variable can be looped.

> The example creates a list of the number _[1,20)_ and we are looping over the elements, first in sequential order and call the _print_ action for each element and in the second call we are summarize each value to the variable _R_. _R_ is in this case the _returning variable_

<pre><code class="lightjason">L = collection/list/range(1, 20);
(L) -> Y : generic/print(Y);
(L) -> Y | R : R = Y+1; 
</code></pre>

## <a name="repairplanning"></a>Explicit Repair-Planning

## <a name="multiplan"></a>Multi-Plan Definition

## <a name="multiassignment"></a>Multi Assignments

The multi-assignment allowed to extract elements from a list into different variables. It is similar to the [head-tail-notation of Prolog](https://en.wikibooks.org/wiki/Prolog/Lists) but here we can create complex structures.

> The examples creates a list if number within in the range _[1,20)_ and 1 will be put into the variable _A_, 2 in _B_, 3 in _C_, 4 will be ignore, 5 in _D_, 6 in _E_, 7 in _F_ and the list _[8,20)_ in _G_

<pre><code class="prolog">L = collection/list/range(1, 20);
[A|B|C|_|D|E|F|G] = L;
</code></pre>

## <a name="parallelism"></a>Parallelism & Thread-Safe Variables

The main sign for parallelism ist the _at (@)_ character. If the @ is put in front of an action or variable the action will be executioned in parallel and the variable will be thread-safe. Not each action supports a parallel execution
