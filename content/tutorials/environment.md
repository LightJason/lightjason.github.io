---
title: "Tutorial: Environment"
jsonld: ["techarticle", "course"]
---

LightJason system architecture does not require any environment, but you can easily write your own. Based on the _asynchronous and parallel_ execution model in LightJason you have to create thread-safe data structures for your environment to avoid any [race condition](https://en.wikipedia.org/wiki/Race_condition). 

__Keep in mind that all calls of the environment are done in parallel and asynchronously, so your environment must handle these access correctly.__

{{< toc >}}

## Previous Knowledge

We do the tutorial into three steps:

1. create the basic agent structure based on the [AgentSpeak 15min](/tutorials/agentspeak-in-fifteen-minutes/), [Triggering](/tutorials/trigger/) and [Actions](/tutorials/actions/) tutorials
2. we use the [object-actions (internal actions)](/tutorials/actions/#object-actions-internal-actions) to pass the calls from the agent to the evnironment
3. we create a _thread-safe_ environment which can execute the _object-actions_ from the agent

## Agent with actions

The agent class must define the actions which passed the call to the environment. Based on this definition the action can be called inside the agent script

### Agent class

In this example we implement the action as [object-actions (internal actions)](/tutorials/actions/#object-actions-internal-actions) on {{< linelink "" "agentclass" "21-26" >}}. The method name can be choosen arbitrary, so the annotation defines the action name. Arguments can be passed with the native Java type inside the method. 

The method pass the data to the method of the environment object {{< linelink "" "agentclass" "25" >}}. The environment object is set by the constructor and stored inside the agent object {{< linelink "" "agentclass" "13, 15, 18" >}}. All agents references the same environment, because in Java all inheritance of objects are passed as references.

<!-- htmlmin:ignore -->
{{< githubsource id="agentclass" user="LightJason" repo="Examples" file="src/main/java/myagentproject/MyAgent.java" lang="java" branch="tutorial-environment" >}}
<!-- htmlmin:ignore -->

### Agent AgentSpeak(L++) Script

The agent script can use the action ```env/move``` at {{< linelink "" "asl" "10" >}}. The parameter is the new position, but this can fail, so the whole can fail also. Here we encapsulate the action with a plan to handle failure execution. The failure execution start with the plan {{< linelink "" "asl" "15-20" >}}. Each of the _movement plans_ calls it self to create en _infinity loop_ of moving. In parallel the plan {{< linelink "" "asl" "21-23" >}} will be executed if another agents has been moved.

<!-- htmlmin:ignore -->
{{< githubsource user="LightJason" repo="Examples" file="agent_environment.asl" lang="agentspeak" branch="tutorial-environment" id="asl" >}}
<!-- htmlmin:ignore -->




## Agent generator with environment

<!-- htmlmin:ignore -->
{{< githubsource user="LightJason" repo="Examples" file="src/main/java/myagentproject/MyAgentGenerator.java" lang="java" branch="tutorial-environment" >}}
<!-- htmlmin:ignore -->


## Environment

<!-- htmlmin:ignore -->
{{< githubsource user="LightJason" repo="Examples" file="src/main/java/myagentproject/CEnvironment.java" lang="java" branch="tutorial-environment" >}}
<!-- htmlmin:ignore -->


In most cases, you have got a bidirectional connection between agent and environment, so the agent should perceive the environment (reads data from the environment) and should also modify the environment (by executing actions).

## Reference Solution

If you struggled at some point or wish to obtain our exemplary solution with code documentation to this tutorial, you can download the archive {{< githubzip user="LightJason" repo="Examples" branch="tutorial-environment" >}} containing the source code and a executable {{< githubdownload user="LightJason" repo="Examples" branch="jar-tutorial-environment" file="myagentapp-1.0-SNAPSHOT.jar" text="Jar file" >}}.


We run the example with 5 agents and 5 cycles (different runs returns different outputs)

```commandline
agent   1.476.690.107   is on position   2   move to    3
agent   1.758.056.825   is on position   0   move to    1
agent   966.974.341   is on position   5   move to    1
agent   90.603.167   is on position   3   move to    4
agent   889.488.859   get information that other agent has moved from   0   to   1
agent   889.488.859   is on position   6   move to    2

agent   1.476.690.107   cannot move from   2   to    3   try to move to   1.0
agent   1.476.690.107   get information that other agent has moved from   3   to   4
agent   1.476.690.107   get information that other agent has moved from   0   to   1
agent   966.974.341   cannot move from   5   to    1   try to move to   4.0
agent   966.974.341   get information that other agent has moved from   3   to   4
agent   966.974.341   get information that other agent has moved from   0   to   1
agent   1.758.056.825   get information that other agent has moved from   3   to   4
agent   889.488.859   cannot move from   6   to    2   try to move to   5.0
agent   1.758.056.825   is on position   1   move to    2
agent   889.488.859   get information that other agent has moved from   3   to   4
agent   90.603.167   get information that other agent has moved from   0   to   1
agent   90.603.167   is on position   4   move to    0

agent   90.603.167   is on position   0   move to    1
agent   966.974.341   is on position   5   move to    4.0
agent   1.758.056.825   cannot move from   1   to    2   try to move to   0.0
agent   1.758.056.825   get information that other agent has moved from   4   to   0
agent   966.974.341   get information that other agent has moved from   4   to   0
agent   1.476.690.107   is on position   2   move to    1.0
agent   1.476.690.107   get information that other agent has moved from   4   to   0
agent   889.488.859   is on position   6   move to    5.0
agent   889.488.859   get information that other agent has moved from   4   to   0

agent   966.974.341   is on position   4   move to    0
agent   966.974.341   get information that other agent has moved from   6   to   5
agent   1.476.690.107   get information that other agent has moved from   6   to   5
agent   1.476.690.107   cannot move from   2   to    1.0   try to move to   1.0
agent   1.476.690.107   get information that other agent has moved from   5   to   4
agent   1.758.056.825   get information that other agent has moved from   6   to   5
agent   889.488.859   is on position   5   move to    1
agent   1.758.056.825   is on position   1   move to    0.0
agent   889.488.859   get information that other agent has moved from   5   to   4
agent   1.758.056.825   get information that other agent has moved from   5   to   4
agent   90.603.167   get information that other agent has moved from   5   to   4
agent   90.603.167   get information that other agent has moved from   6   to   5
agent   90.603.167   cannot move from   0   to    1   try to move to   4.0

agent   90.603.167   is on position   0   move to    4.0
agent   966.974.341   cannot move from   4   to    0   try to move to   3.0
agent   1.476.690.107   is on position   2   move to    1.0
agent   1.758.056.825   cannot move from   1   to    0.0   try to move to   0.0
agent   889.488.859   cannot move from   5   to    1   try to move to   4.0
```