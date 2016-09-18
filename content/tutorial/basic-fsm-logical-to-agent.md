---
title: "Basic Knowledge: From Finite-State-Machine and Logical Programming to an Agent"
---

The main idea of your framework is, that we define an agent as a [finite-state-machine](../basic-finitestatemachine) with the following definition:

* a __state__ is a set of belief if a cycle is not running
* a __transition__ is the execution of a plan (with instantiation of a goal)

But in generell of parallel execution of plans there can be many active transition in one cycle. 

> A small example shows the main functionality of the structure. We define the structure of three plans without a condition and an _initial goal_. The _initial goal (```main```)_ calls two other plans ```first``` and ```second``` within the next cycle. The ```first``` plan will call itself within the following cycles (loop structure) and the ```second``` plan calls the _initial goal_ plan.  The ```first``` plan will be called once in each cycle, because the trigger ```!first``` are equal. The plans ```first``` and ```main``` or ```second``` run in parallel.
> 
> <pre><code class="lightjason">!main.
> +!main <- !first; !second.
> +!first <- !first.
> +!second <- !main.
> </code></pre>
> 
> The state-machine of this agent which executs empty plans is shown in the following picture.
> ![fsmagent](../../images/fsmagent1.svg#centering)

