---
title: "AgentSpeak(L) Language Examples"
---
We present here a short overview of language examples of our _AgentSpeak(L)_ syntax. You can found the full [EBNF description](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_Form) of the language syntax on the project [documentation page](http://lightjason.github.io/AgentSpeak/).

## <a name="lambdaexpression"></a>Lambda Expression

<pre><code class="asl">L = collection/list/range(1, 20);
(L) -> Y : generic/print(Y);
(L) -> Y | R : R = Y+1; 
</code></pre>

## <a name="repairplanning"></a>Explicit Repair-Planning

## <a name="multiplan"></a>Multi-Plan Definition

## <a name="multiassignment"></a>Multi Assignments

<pre><code class="prolog">L = collection/list/range(1, 20);
[A|B|C| _ |D|E|F|G] = L;
</code></pre>

## <a name="parallelization"></a>Parallelization & Thread-Safe Variables
