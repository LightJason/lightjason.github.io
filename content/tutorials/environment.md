---
title: "Tutorial: Environment"
jsonld: ["techarticle"]
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

In this example we implement the action as [object-actions (internal actions)](/tutorials/actions/#object-actions-internal-actions) on {{< linelink "" "agentclass" "20-25" >}}. The method name can be choosen arbitrary, so the annotation defines the action name. Arguments can be passed with the native Java type inside the method. 

The method pass the data to the method of the environment object {{< linelink "" "agentclass" "24" >}}. The environment object is set by the constructor and stored inside the agent object {{< linelink "" "agentclass" "12, 14, 17" >}}. All agents references the same environment, because in Java als inheritance of objects are passed as references.

<!-- htmlmin:ignore -->
{{< githubsource id="agentclass" user="LightJason" repo="Examples" file="src/main/java/myagentproject/MyAgent.java" lang="java" branch="tutorial-environment" >}}
<!-- htmlmin:ignore -->

### Agent AgentSpeak(L++) Script

The agent script can use the action ```env/move```. The parameter is the new position, but this can fail. 

<!-- htmlmin:ignore -->
{{< githubsource user="LightJason" repo="Examples" file="agent_environment.asl" lang="agentspeak" branch="tutorial-environment" >}}
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
