---
title: "Tutorial: Trigger"
jsonld: ["techarticle", "course"]
gitter: "tutorials"
previous:
    url: "/tutorials/agentspeak-in-fifteen-minutes"
    text: "Develop an AgentSpeak Scenario in 15min"
next:
    url: "/tutorials/actions"
    text: "Actions"
---

This tutorial explains the functionality of _agent triggering_. For understanding the purpose of triggers you have to understand the concept of events, which is a well-known concept in [UI programming](https://docs.oracle.com/javase/tutorial/uiswing/events/).

{{< toc >}}

## Previous Knowledge

The [AgentSpeak 15min](/tutorials/agentspeak-in-fifteen-minutes/) tutorial defines the basic knowledge and working scenario.

## What are triggers?

A short definition of triggers in LightJason's agent concept: a trigger is

> an event written in a first-order logical literal

On the other hand, the agent is

> an event listener which executes a plan if an event is released


### What kinds of triggers do exist?

An agent is a _logical program_ which defines some knowledge elements e.g. beliefbase and the beliefs, so there are different kinds of triggers to distinguish the elements:

* __add goal (+!)__ tells the agent try to reach the goal which is named by the trigger
* __delete goal (-!)__ tells the agent that something is going wrong, the _delete goal_ is executed iif a plan failed
* __add belief (+)__ is created if a belief is pushed into the beliefbase
* __delete belief (-)__ is created if a belief is removed from the beliefbase


## How can I use them?

From a global viewpoint, a trigger is created based on a _semantic definition_, so there is no defined type for calling a certain trigger in a situation. It depends on your conceptional view of your multi-agent system and your individual execution model.

The usage is very simple, the agent class supports a [trigger-method](http://lightjason.github.io/AgentSpeak/sources/db/d62/interfaceorg_1_1lightjason_1_1agentspeak_1_1agent_1_1IAgent_3_01T_01extends_01IAgent_3_04_4_01_4.html#af453e6a5f02ca05958925af4a8c04c10), so create your trigger and call this method.


### Java Implementation

A trigger is a combination of a _literal_ and a _trigger type_. Both elements are defined as classes [CTrigger](http://lightjason.github.io/AgentSpeak/sources/d1/d5a/classorg_1_1lightjason_1_1agentspeak_1_1language_1_1instantiable_1_1plan_1_1trigger_1_1CTrigger.html) and [ITrigger.EType](http://lightjason.github.io/AgentSpeak/sources/d9/d18/enumorg_1_1lightjason_1_1agentspeak_1_1language_1_1instantiable_1_1plan_1_1trigger_1_1ITrigger_1_1EType.html). The code shows the usage of a _add goal trigger_ which defines with the first argument at {{< linelink "" "triggercreate" "71" >}} the type of the trigger and with the second argument at {{< linelink "" "triggercreate" "73-75" >}} the literal.

<!-- htmlmin:ignore -->
{{< githubsource user="LightJason" repo="Examples" file="src/main/java/myagentproject/App.java" lang="java" branch="tutorial-agent-trigger" id="triggercreate" >}}
<!-- htmlmin:ignore -->


### AgentSpeak Implementation

The agent (in detail the ASL script) can handle the trigger iif a plan (an instantiated goal) exists which matches the literal. For this example the agents need only to define a pla which matches the literal ({{< linelink "" "triggercall" "1" >}}) and executes a print message ({{< linelink "" "triggercall" "2" >}})

<!-- htmlmin:ignore -->
{{< githubsource user="LightJason" repo="Examples" file="agent_trigger.asl" lang="agentspeak" branch="tutorial-agent-trigger" id="triggercall" >}}
<!-- htmlmin:ignore -->


## Notes

The ```trigger```-method allows you to control the agent from Java-side, so that your system can execute any plans inside the agent. You can push the trigger at any time to the agent and the agent will execute the trigger as soon as possible, except you tell the agent that the trigger should be executed immediately (see the second argument of the method documentation). The agent can sleep, so in that case the trigger will be discarded.


## Reference Solution

The reference solution is based on the [agentspeak-in-15min](/tutorials/agentspeak-in-fifteen-minutes) tutorial; we extended this tutorial with trigger behaviour. If you struggled at some point or wish to obtain our exemplary solution with code documentation of this tutorial, you can download the archive {{< githubzip user="LightJason" repo="Examples" branch="tutorial-agent-trigger" >}} containing the source code and a executable {{< githubdownload user="LightJason" repo="Examples" branch="jar-tutorial-agent-trigger" file="myagentapp-1.0-SNAPSHOT.jar" text="Jar file" >}}.

We run the program two times with 3 agents and 4 cycles and get the following output, first run

```commandline
Hello World on agent   980.697.799
Hello World on agent   595.995.566
Hello World on agent   1.142.993.467
Hello World again on agent   595.995.566
Hello World again on agent   980.697.799
special goal with value   2.2248289532471044   triggered on agent   980.697.799
Hello World again on agent   1.142.993.467
special goal with value   76.80922753529944   triggered on agent   1.142.993.467
Hello World again on agent   980.697.799
Hello World again on agent   595.995.566
special goal with value   37.108561892490954   triggered on agent   595.995.566
Hello World again on agent   1.142.993.467
Hello World again on agent   980.697.799
special goal with value   2.0871955837920453   triggered on agent   980.697.799
Hello World again on agent   595.995.566
special goal with value   98.1913332685896   triggered on agent   595.995.566
Hello World again on agent   1.142.993.467
```

second run

```commandline
Hello World on agent   212.890.971
Hello World on agent   1.082.569.346
Hello World on agent   1.258.955.623
Hello World again on agent   212.890.971
Hello World again on agent   1.082.569.346
Hello World again on agent   1.258.955.623
special goal with value   92.44063483887761   triggered on agent   1.258.955.623
Hello World again on agent   212.890.971
Hello World again on agent   1.082.569.346
Hello World again on agent   1.258.955.623
Hello World again on agent   212.890.971
Hello World again on agent   1.082.569.346
special goal with value   61.76316960019202   triggered on agent   1.082.569.346
Hello World again on agent   1.258.955.623
```

Based on the random execution of the trigger the results are different.
