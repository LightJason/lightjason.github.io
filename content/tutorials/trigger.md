---
title: "Tutorial: Triggering"
jsonld: ["techarticle"]
---

This tutorial explain the functionality of _agent triggering_. For understanding purpose of triggers you have to understand the concept of events which is a well-known concept in [UI programming](https://docs.oracle.com/javase/tutorial/uiswing/events/).

{{< toc >}}

## What are triggers?

A short definition of triggers in LightJason's agent concept it is

> an event written in a first-order logical literal

On the other hand, the agent is

> an event listener which executes a plan iif an event is released


### What kind of trigger exists?

An agent is a _logical program_ which defines some knowledge elements e.g. beliefbase and the beliefs, so there are different kind of triggers to distinguish the elements:

* __add goal (+!)__ tells the agent try to reach the goal which is named by the trigger
* __delete goal (-!)__ tells the agent that something is going wrong, the _delete goal_ is executed iif a plan was failed
* __add belief (+)__ is created if a belief is pushed into the beliefbase
* __delete belief (-)__ is created if a belief is removed from the beliefbase


## How can I use them?

On a global viewpoint a trigger is created on a _semantic definition_, so there is no defined  type to call in a situation a certain trigger. It depends on your conceptional view of your multi-agent system and your individual execution model. 

The usage is very simple, the agent class supports a [trigger-method](http://lightjason.github.io/AgentSpeak/sources/db/d62/interfaceorg_1_1lightjason_1_1agentspeak_1_1agent_1_1IAgent_3_01T_01extends_01IAgent_3_04_4_01_4.html#af453e6a5f02ca05958925af4a8c04c10), so create your trigger and call this method.


### Java Implementation

A trigger is a combination of a _literal_ and a _trigger type_. Both elements are defined as classes [CTrigger](http://lightjason.github.io/AgentSpeak/sources/d1/d5a/classorg_1_1lightjason_1_1agentspeak_1_1language_1_1instantiable_1_1plan_1_1trigger_1_1CTrigger.html) and [ITrigger.EType](http://lightjason.github.io/AgentSpeak/sources/d9/d18/enumorg_1_1lightjason_1_1agentspeak_1_1language_1_1instantiable_1_1plan_1_1trigger_1_1ITrigger_1_1EType.html). The code shows the usage of a _add goal trigger_ which defines on the first argument {{< linelink "" "triggercreate" "2" >}} the type of the trigger and on the second argument the literal {{< linelink "" "triggercreate" "3-6" >}}

<!-- htmlmin:ignore -->
{{< githubfile user="LightJason" repo="Examples" file="src/main/java/myagentproject/App.java" lang="java" branch="tutorial-agent-trigger" id="triggercreate" >}}
<!-- htmlmin:ignore -->


### AgentSpeak Implementation

The agent (in detail the ASL script) can handle the trigger iif a plan (an instantiated goal) exists that matchs of the literal. For this example the agents need to define a plan only which matchs the literal ({{< linelink "" "triggercall" "1" >}}) and executes a print message ({{< linelink "" "triggercall" "2" >}})

<!-- htmlmin:ignore -->
{{< githubfile user="LightJason" repo="Examples" file="agent_trigger.asl" lang="agentspeak" branch="tutorial-agent-trigger" id="triggercall" >}}
<!-- htmlmin:ignore -->


## Notes

The ```trigger```-method allows you to control the agent from Java-side, so that your system can execute any plans inside the agent. You can push the trigger at any time to the agent and the agent will execute the trigger as soon as possible, except you tell the agent that the trigger should execute immediatly (see method documentation second argument). The agent can sleeping so in that case the trigger will discarded.


## Reference Solution

The referenced solution based on the [agentspeak-in-15min](agentspeak-in-fifteen-minutes) tutorial, so we extend this tutorial with trigger behaviour. 
