---
title: "Basic Knowledge: From Finite-State-Machine and Logical Programming to an Agent"
---

The main idea of your framework is, that an agent is defined as a [Finite-State-Machine](../basic-finitestatemachine) in a [Logical Programming language](../basic-logicalprogramming) with the following definition:

* the __initial state__ is optional defined with the _initial goal_
* a __state__ is a set of beliefs if a cycle is not running
* a __transition__ is the execution of a plan (with instantiation of a goal) and is limited by the _plan condition_

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
>
> ![fsmagent](../../images/fsmagent1.svg#centering)
> 
> The picture shows the _static model_ of the agent and the states represent a _set of beliefs_ which are created during runtime and the the transitions are the instantiation of the goal and the execution of the plans. The initial state is defined by the initial goal.
> Based on this static model the _runtime model_ shows the execution structure of the state-machine.
