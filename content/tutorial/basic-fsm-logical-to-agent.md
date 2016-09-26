---
title: "Basic Knowledge: From Finite-State-Machine and Logical Programming to an Agent"
---

The main definition of our [BDI (Belief-Desire-Intention) framework](https://en.wikipedia.org/wiki/Belief%E2%80%93desire%E2%80%93intention_software_model) follows [Russell & Norvig - Artificial Intelligence: A Modern Approach](http://aima.cs.berkeley.edu/) with the structure of _goal-based agents_:

> An agent is anything that can be viewed as perceiving its environment through sensors and acting upon that environment through effectors _(chapter 2.1, page 31)_

We are defining furthermore along the book of [Michael Wooldrige - An Introduction to MultiAgent Systems](http://www.cs.ox.ac.uk/people/michael.wooldridge/pubs/imas/IMAS2e.html) _(chapter 2.1, page 26)_:

> * _Reactivity:_ Intelligent agents are able to perceive their environment, and respond in a timely fashion to changes that occur in it in order to satisfy their design objectives
> * _Proactiveness:_ Intelligent agents are able to exhibit goal-directed behaviour by talking the initiative in order to satisfy their design objectives
> * _Social ability:_ Intelligent agents are capable of interacting with other agents (and possible humans) in order to satisfy their design objectives

The technical execution structure of the agent uses the concepts of [PRS (Procedural Reasoning System)](https://en.wikipedia.org/wiki/Procedural_reasoning_system) and architecture of [dMARS (Distributed Multi-Agent Reasoning System)](https://en.wikipedia.org/wiki/Distributed_multi-agent_reasoning_system), so we are definiting the agent as a [Finite-State-Machine](../basic-finitestatemachine) in a [Logical Programming language](../basic-logicalprogramming) with the following definition:

* the __initial state__ is optional defined with the _initial goal_
* a __state__ is a set of beliefs if a cycle is not running
* a __transition__ is the execution of a plan (with instantiation of a goal) and is limited by the _plan condition_

But in generell of parallel execution of plans there can be many active transition in one cycle. We focus also the definition of _M. Wooldrige_ with 

> [A] multi-agent system is inherently multithreaded, in that each agent is assumed to have at least on thread of control _(chapter 2.2, page 30)_



## Basic Behaviour

This basic example shows the main functionality of the structure. We define the structure of three plans without a condition and an _initial goal_. The _initial goal (```main```)_ calls two other plans ```first``` and ```second``` within the next cycle. The ```first``` plan will call itself within the following cycles (loop structure) and the ```second``` plan calls the _initial goal_ plan.  The ```first``` plan will be called once in each cycle, because the trigger ```!first``` are equal. The plans ```first``` and ```main``` or ```second``` run in parallel.
 
<pre><code class="language-lightjason">!main.
+!main <- !first; !second.
+!first <- !first.
+!second <- !main.
</code></pre>

The state-machine of this agent which executs empty plans is shown in the following picture.

<a name="agentfsm"></a><svg id="fsmstart" xmlns="http://www.w3.org/2000/svg" xmlns:xl="http://www.w3.org/1999/xlink" xmlns:dc="http://purl.org/dc/elements/1.1/" version="1.1" viewBox="71 51 490 248" width="490pt" height="248pt"><style>@keyframes colorchange { 0%{ fill: white; } 50%{ fill: blue; } 100%{ fill: white; } } tspan { font-family: sans-serif; fill: black; }</style><defs><marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="FilledArrow_Marker" viewBox="-1 -4 10 8" markerWidth="10" markerHeight="8" color="black"><g><path d="M 8 0 L 0 -3 L 0 3 Z" fill="currentColor" stroke="currentColor" stroke-width="1"/></g></marker><marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="FilledArrow_Marker_2" viewBox="-9 -4 10 8" markerWidth="10" markerHeight="8" color="black"><g><path d="M -8 0 L 0 3 L 0 -3 Z" fill="currentColor" stroke="currentColor" stroke-width="1"/></g></marker></defs><g stroke="none" stroke-opacity="1" stroke-dasharray="none" fill="none" fill-opacity="1"><g><circle class="state" id="init" cx="130.5" cy="121.5" r="22.500036" /><circle cx="130.5" cy="121.5" r="22.500036" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><path d="M 82.5 109.5 L 108 122.25 L 82.5 135 Z" fill="white"/><path d="M 82.5 109.5 L 108 122.25 L 82.5 135 Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><circle class="state" id="main" cx="292.5" cy="121.5" r="22.500036" /><circle cx="292.5" cy="121.5" r="22.500036" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><circle class="state" id="first" cx="434.3764" cy="121.5" r="22.500036" /><circle cx="434.3764" cy="121.5" r="22.500036" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><circle class="state" id="second" cx="355.5" cy="265.5" r="22.500036" /><circle cx="355.5" cy="265.5" r="22.500036" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="153.00001" y1="121.5" x2="260.09999" y2="121.5" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line x1="315.00001" y1="121.5" x2="401.9764" y2="121.5" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><path d="M 312.76819 131.283986 C 328.62153 140.46309 349.65398 156.35196 360 180 C 368.30788 198.98943 367.90656 218.82563 365.10382 234.60593" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><path d="M 282.89618 152.39407 C 280.09344 168.17438 279.69212 188.01057 288 207 C 298.34602 230.64805 319.37848 246.53692 335.23182 255.71602" marker-start="url(#FilledArrow_Marker_2)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><path d="M 448.93856 104.34639 C 464.21743 87.37744 488.17005 63.812963 504 63 C 528.8242 61.725127 541.7247 100.42666 522 117 C 511.4142 125.89452 486.95324 126.53818 466.55897 125.22525" marker-end="url(#FilledArrow_Marker)" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><rect x="177.51519" y="106.5" width="49" height="30" fill="white"/><text transform="translate(182.51519 112.276)"><tspan x=".084" y="15" textLength="38.832">!main</tspan></text><rect x="338.20016" y="106.5" width="41" height="30" fill="white"/><text transform="translate(343.20016 112.276)"><tspan x=".1" y="15" textLength="30.800">!first</tspan></text><rect x="510.2914" y="72.277704" width="41" height="30" fill="white"/><text transform="translate(515.2914 78.053705)"><tspan x=".1" y="15" textLength="30.800">!first</tspan></text><rect x="317.01628" y="148.74509" width="67" height="30" fill="white"/><text transform="translate(322.01628 154.52109)"><tspan x=".052" y="15" textLength="56.896">!second</tspan></text><rect x="266.61718" y="198.33556" width="49" height="30" fill="white"/><text transform="translate(271.61718 204.11156)"><tspan x=".084" y="15" textLength="38.832">!main</tspan></text></g></g></svg>
 
The picture shows the _static model_ of the agent and the states represent a _set of beliefs_ which are created during runtime and the the transitions are the instantiation of the goal and the execution of the plans. The initial state is defined by the initial goal.
<br/>
Based on this static model the _runtime model_ shows the execution structure of the state-machine. The animation shows the _continous execution_ of the agent on each cycle. In this case the agent runs infinity, but it switchs between the ```main```-state and the ```first``` and ```second```-state, but these two state run in parallel (<a href="#agentfsm" id="animate-agentfsm">animate finite-state-machine</a>).
{{< inlinejs "../../contentjs/agentfsm.js" >}}


## Action Behaviour

Actions are one of the helpful structures within agent-programming. A definition of an action is:

> The action is a function with $f : \mathbb{X}^n \rightarrow \mathbb{B}$ and $\mathbb{X}$ is any input data type and $\mathbb{B}$ is a binary set with {true, false}, which is executed independed and directly within the current agent / plan context. An action can change the environment immediatly or the internal structure of the agent.

On a technical point of view the action is a [method](https://en.wikipedia.org/wiki/Method_(computer_programming)), which is called inside the current plan. The method is definied by the {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/d0/dfe/interfaceorg_1_1lightjason_1_1agentspeak_1_1action_1_1IAction__coll__graph.svg" "IAction interface" >}}. All actions[^iaction] implement this interface which uses the _IExecution_ interface for all executable structures.
<br/>
Based on the first illustrated finite-state-machine we will show the action structure. In a short definition actions are set on the _transition_. On the first state-machine the transition contains only the _achievment goals_. An achievment goal is also an action which executes a plan. We would like to modify the agent that we execute more the one - the achievement goal - action.

<pre><code class="language-lightjason line-numbers">!main.

+!main <-
	generic/print("execute main-goal");
	!first; 
	generic/print("achievment-goal in main: first");
	!second;
	generic/print("achievment-goal in main: second")
.

+!first <- 
	generic/print("execute first-goal");
	!first;
	generic/print("achievment-goal in first: first");
.

+!second <- 
	generic/print("execute second-goal");
	!main;
	generic/print("achievment-goal in second: main")
.
</code></pre>

[^iaction]: see the [IAction interface](http://lightjason.github.io/AgentSpeak/sources/dc/d53/interfaceorg_1_1lightjason_1_1agentspeak_1_1action_1_1IAction.html) for a detailed description
