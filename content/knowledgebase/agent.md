---
title: "Basic Knowledge: From Finite-State-Machine and Logical Programming to an Agent"
jsonld: ["techarticle", "course"]
gitter: "knowledge base"
previous :
    url: "/knowledgebase/finitestatemachine"
    text: "Finite-State-Machine"
next :
    url: "/knowledgebase/differencetojason"
    text: "Difference to Jason"
---

{{< includejs "/agentfsm.js" >}}

The main definition of our [BDI (Belief-Desire-Intention) framework](https://en.wikipedia.org/wiki/Belief%E2%80%93desire%E2%80%93intention_software_model) follows [Russell & Norvig - Artificial Intelligence: A Modern Approach](http://aima.cs.berkeley.edu/) with the structure of _goal-based agents_:

> An agent is anything that can be viewed as perceiving its environment through sensors and acting upon that environment through effectors _(Chapter 2.1, page 31)_

We are defining furthermore along the book of [Michael Wooldrige - An Introduction to MultiAgent Systems](http://www.cs.ox.ac.uk/people/michael.wooldridge/pubs/imas/IMAS2e.html) _(chapter 2.1, page 26)_:

> * _Reactivity:_ Intelligent agents are able to perceive their environment, and respond in a timely fashion to changes that occur in it in order to satisfy their design objectives
> * _Proactiveness:_ Intelligent agents are able to exhibit goal-directed behaviour by talking the initiative in order to satisfy their design objectives
> * _Social ability:_ Intelligent agents are capable of interacting with other agents (and possible humans) in order to satisfy their design objectives

The technical execution structure of the agent uses the concepts of [PRS (Procedural Reasoning System)](https://en.wikipedia.org/wiki/Procedural_reasoning_system) and architecture of [dMARS (Distributed Multi-Agent Reasoning System)](https://en.wikipedia.org/wiki/Distributed_multi-agent_reasoning_system), so we are definiting the agent as a [Finite-State-Machine](finitestatemachine) in a [Logical Programming language](logicalprogramming) with the following definition:

* the __initial state__ is optionally defined with the _initial goal_
* a __state__ is a set of beliefs if a cycle is not running
* a __transition__ is the execution of a plan (with instantiation of a goal) and is limited by the _plan condition_

But in general, in parallel execution of plans there can be many active transition in one cycle.
We also focus on the definition of _M. Wooldrige_, stating that

> a multi-agent system is inherently multithreaded, in that each agent is assumed to have at least on thread of control _(chapter 2.2, page 30)_



## Basic Behaviour

This basic example shows the main functionality of the structure. We define the structure of three plans without a condition and an _initial goal_. The _initial goal (```main```)_ calls two other plans ```first``` and ```second``` within the next cycle. The ```first``` plan will call itself within the following cycles (loop structure) and the ```second``` plan calls the _initial goal_ plan.  The ```first``` plan will be called once in each cycle, because the trigger ```!first``` and the plan ```+!first``` match. Note: The plans ```first``` and ```main``` or ```second``` run in parallel.

<!-- htmlmin:ignore -->
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">!main.
+!main <- !first; !second.
+!first <- !first.
+!second <- !main.
</code></pre>
<!-- htmlmin:ignore -->

The state-machine of this agent which executes empty plans is shown in the following picture.

<svg id="agentfsm" xmlns="http://www.w3.org/2000/svg" viewBox="71 51 490 248"><defs><style>@keyframes colorchange { 0%{ fill: white; } 50%{ fill: blue; } 100%{ fill: white; } } tspan { font-family: sans-serif; fill: black; }</style><marker orient="auto" overflow="visible" id="a" viewBox="-1 -4 10 8" markerWidth="10" markerHeight="8" color="#000"><path d="M8 0L0-3v6z" fill="currentColor" stroke="currentColor"/></marker><marker orient="auto" overflow="visible" id="b" viewBox="-9 -4 10 8" markerWidth="10" markerHeight="8" color="#000"><path d="M-8 0l8 3v-6z" fill="currentColor" stroke="currentColor"/></marker></defs><g fill="none"><circle class="state" cx="130.5" cy="121.5" r="22.5"/><circle id="init" cx="130.5" cy="121.5" r="22.5" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/><path d="M82.5 109.5l25.5 12.75L82.5 135z" fill="#fff"/><path d="M82.5 109.5l25.5 12.75L82.5 135z" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/><circle class="state" cx="292.5" cy="121.5" r="22.5"/><circle id="main" cx="292.5" cy="121.5" r="22.5" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/><circle class="state" cx="434.376" cy="121.5" r="22.5"/><circle id="first" cx="434.376" cy="121.5" r="22.5" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/><circle class="state" cx="355.5" cy="265.5" r="22.5"/><circle id="second" cx="355.5" cy="265.5" r="22.5" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/><path marker-end="url(#a)" stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M153 121.5h107.1m54.9 0h86.976m-89.208 9.784c15.854 9.18 36.886 25.068 47.232 48.716 8.308 18.99 7.907 38.826 5.104 54.606"/><path d="M282.896 152.394c-2.803 15.78-3.204 35.617 5.104 54.606 10.346 23.648 31.378 39.537 47.232 48.716" marker-start="url(#b)" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/><path d="M448.939 104.346C464.217 87.377 488.17 63.813 504 63c24.824-1.275 37.725 37.427 18 54-10.586 8.895-35.047 9.538-55.441 8.225" marker-end="url(#a)" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/><path fill="#fff" d="M177.515 106.5h49v30h-49z"/><text transform="translate(182.515 112.276)"><tspan x=".084" y="15" textLength="38.832">!main</tspan></text><path fill="#fff" d="M338.2 106.5h41v30h-41z"/><text transform="translate(343.2 112.276)"><tspan x=".1" y="15" textLength="30.8">!first</tspan></text><path fill="#fff" d="M510.291 72.278h41v30h-41z"/><text transform="translate(515.291 78.054)"><tspan x=".1" y="15" textLength="30.8">!first</tspan></text><path fill="#fff" d="M317.016 148.745h67v30h-67z"/><text transform="translate(322.016 154.521)"><tspan x=".052" y="15" textLength="56.896">!second</tspan></text><path fill="#fff" d="M266.617 198.336h49v30h-49z"/><text transform="translate(271.617 204.112)"><tspan x=".084" y="15" textLength="38.832">!main</tspan></text></g></svg>

The picture shows the _static model_ of the agent and the states represent a _set of beliefs_ which are created during runtime and the transitions are the instantiation of the goal and the execution of the plans. The initial state is defined by the initial goal.
<br/>
Based on this static model the _runtime model_ shows the execution structure of the state-machine. The animation shows the continuous execution_ of the agent on each cycle. In this case the agent runs infinitely, but it switches between the ```main```-state and the ```first``` and ```second```-state, but these two states run in parallel (<a href="#agentfsm" id="animate-agentfsm">animate finite-state-machine</a>).


## Action Behaviour

Actions are one of the helpful structures within agent-programming. A definition of an action is:

> The action is a function with $f : \mathbb{X}^n \rightarrow \mathbb{B}$ and $\mathbb{X}$ is any input data type and $\mathbb{B}$ is a binary set with {true, false}, which is executed independend and directly within the current agent / plan context. An action can change the environment immediately or the internal structure of the agent.

On a technical point of view the action is a [method](https://en.wikipedia.org/wiki/Method_(computer_programming)), which is called inside the current plan. The method is defined by the {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/d0/dfe/interfaceorg_1_1lightjason_1_1agentspeak_1_1action_1_1IAction__coll__graph.svg" "IAction interface" >}}. All actions[^iaction] implement this interface which uses the _IExecution_ interface for all executable structures.
<br/>
Based on the first illustrated finite-state-machine, we will show the action structure. In short: Actions executed on the _transition_. On the first state-machine the transition contains only the _achievement goals_. An achievement goal is also an action which executes a plan.

<!-- htmlmin:ignore -->
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak line-numbers">!main.

+!main <-
    generic/print("execute main-goal");
    !first;
    generic/print("achievement-goal in main: first");
    !second;
    generic/print("achievement-goal in main: second")
.

+!first <-
    generic/print("execute first-goal");
    !first;
    generic/print("achievement-goal in first: first")
.

+!second <-
    generic/print("execute second-goal");
    !main;
    generic/print("achievement-goal in second: main")
.

</code></pre>
<!-- htmlmin:ignore -->


[^iaction]: see the [IAction interface](http://lightjason.github.io/AgentSpeak/sources/dc/d53/interfaceorg_1_1lightjason_1_1agentspeak_1_1action_1_1IAction.html) for a detailed description
