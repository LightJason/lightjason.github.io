---
title: "Tutorial: Actions"
jsonld: ["techarticle"]
gitter: "tutorials"
previous :
    url: "/tutorials/trigger"
    text: "Trigger" 
next :
    url: "/tutorials/communication"
    text: "Communication"
---

This tutorial explains the concept and usage of actions. Actions are _executable mechanisms_. We support a lot of different actions which support some [basic functionality](/knowledgebase/builtinactions). 
<!--more-->

Actions are an important part within a multi-agent system e.g. for [communication](/tutorials/communication), modifying the [environment](/tutorials/environment) or the internal state of the agent.

{{< toc >}}

## Previous Knowledge

The [AgentSpeak 15min](/tutorials/agentspeak-in-fifteen-minutes/) tutorial defines the basic knowledge and working scenario.

## What are actions?

For actions, there exist two points of view:

1. software-based, so an action is a method (within a class) which will be executed during the agent cycle with the current agent-based execution context
2. agent-based, the action is represented by a literal within a rule or plan, but during execution the same action can be run more than one times in parallel

Based on these two definitions, on the Java-side a method must be written and be combined with the literal information for the AgentSpeak(L++) script, so that the agent can get access to the method. LightJason supports for this structure an interface, method annotations and reading mechanism to create all action objects.



## What kinds of actions do exist?

There are two kinds of actions, both can also be used in similar context. The usage of an action is based on the software-design, so there is no general approach to use an action.

### Standalone-Actions - External Actions

Standalone actions, which are named in the Jason definition _external actions_, are classes which implement the [IAction](https://lightjason.github.io/AgentSpeak/sources/dc/d53/interfaceorg_1_1lightjason_1_1agentspeak_1_1action_1_1IAction.html) interface. But we recommand to use the base implementation [IBaseAction](http://lightjason.github.io/AgentSpeak/sources/da/d94/classorg_1_1lightjason_1_1agentspeak_1_1action_1_1IBaseAction.htm). For getting an overview of the structure, take a look on the {{< lightbox "https://lightjason.github.io/AgentSpeak/sources/dd/d3e/classorg_1_1lightjason_1_1agentspeak_1_1action_1_1IBaseAction__coll__graph.svg" "IBaseAction inheritance diagram" >}}. The recommand parts of an action are:

* a ```name``` which represents the call on the agent script
* the number of ```minimal arguments``` for checking the correct number of arguments during parsing
* the ```execution``` which defines the functionality of the action

There are some other methods inside the definition:

* the ```variables``` method returns a list of variables if the action generates variables

### Object-Actions - Internal Actions

Object actions are methods inside the agent class or super classes of the agent class. LightJason can read all class methods (not static or abstract methods) and create the actions on-the-fly. With black- and white-listing you can define a very detailed action generation. The visibility of a method can be public, private or protected.
For the usage there exist three types of annotations:

* method annotation ```@IAgentActionName``` for defining action name
* class annotation ```@IAgentAction```, which can get two arguments:
    * ```access``` with the values ```BLACKLIST``` or ```WHITELIST``` to define the filter mechanism (default: ```BLACKLIST```)
    * ```classes``` a list of class objects for which the filtering should be defined (default empty for all classes)
* method annotation ```@IAgentActionFilter``` with the ```classes``` argument for defining class filtering of a method (see ```@IAgentAction```)

Parameters of the method will be packed / unpacked into terms automatically.




## How can I create an action?

Within this section both kinds of actions are shown. The code of an action should be very efficient and minimalistic, because an action will be called multiple times from an agent, because plan execution and also agent execution are in parallel.

### AgentSpeak(L++) Script

The agent script shows the usage of a standalone action, it can be used like a built-in action. The naming is equal to the ```name```-method or annotation.

<!-- htmlmin:ignore -->
{{< githubsource user="LightJason" repo="Examples" file="agent_with_action.asl" lang="agentspeak" branch="tutorial-agent-action" >}}
<!-- htmlmin:ignore -->

### Standalone-Actions - External Actions

The data representation can be comprehended by the standalone action. A necessary property is the ```serialVersionUID``` which is defined by the Java [Serializable](https://docs.oracle.com/javase/9/docs/api/java/io/Serializable.html) interface, this allows to serialise the action.

<!-- htmlmin:ignore -->
{{< githubsource user="LightJason" repo="Examples" file="src/main/java/myagentproject/CStandAloneAction.java" lang="java" branch="tutorial-agent-action" >}}
<!-- htmlmin:ignore -->


### Object-Actions - Internal Actions

In object / internal actions, the pack & unpack process of values is done automatically. The actions are written inside the agent class and must be annotated

<!-- htmlmin:ignore -->
{{< githubsource user="LightJason" repo="Examples" file="src/main/java/myagentproject/MyAgent.java" lang="java" branch="tutorial-agent-action" >}}
<!-- htmlmin:ignore -->

The action instantiation is done by the generator in

<!-- htmlmin:ignore -->
{{< githubsource user="LightJason" repo="Examples" file="src/main/java/myagentproject/MyAgentGenerator.java" lang="java" branch="tutorial-agent-action" >}}
<!-- htmlmin:ignore -->


## Efficent Concurrency Action

Regarding the standalone action, __keep in mind that the action is called multiple times__ because the plan and rule execution is done in parallel and multiple agents can run the action in parallel. The ```synchronized``` keyword is not a general solution for avoiding [race condition](https://en.wikipedia.org/wiki/Race_condition) because synchronisation slows down the performance.

In common work, the object-orientated design of the action class can be changed to remove synchronisation. If you get race condition exceptions or performance problems, just redesign your architecture. A good design of concurrency architecture can be found in all [built-in actions](http://lightjason.github.io/AgentSpeak/sources/d7/d4b/namespaceorg_1_1lightjason_1_1agentspeak_1_1action_1_1builtin.htm) of the framework.

## Reference Solution

This tutorial depends on the tutorial [AgentSpeak-in-15min](/tutorials/agentspeak-in-fifteen-minutes), so the whole build process is explained within the basic tutorial. If you struggled at some point or wish to obtain our exemplary solution with code documentation of this tutorial, you can download the archive containing the source code and an executable jar file:

{{< githubrelease user="LightJason" repo="Examples" filter="tutorial-agent-action" zip="true" names="myagentapp-1.0-SNAPSHOT.jar=Jar Executable" >}}

We run the example with 5 agents and 1 cycle

```commandline
agent 981.414.120 calls standalone-action with parameter rvuoaiwqa
agent 263.847.538 calls standalone-action with parameter tqhkgkrcpziag
agent 1.675.634.764 calls standalone-action with parameter aefrnaopw
agent uses string   aefrnaopw   gets from standalone action   9   and from object action   1675634757
agent uses string   tqhkgkrcpziag   gets from standalone action   13   and from object action   263847551
agent 1.053.779.425 calls standalone-action with parameter dwyziieavx
agent uses string   rvuoaiwqa   gets from standalone action   9   and from object action   981414113
agent uses string   dwyziieavx   gets from standalone action   10   and from object action   1053779435
agent 1.128.132.589 calls standalone-action with parameter urm
agent uses string   urm   gets from standalone action   3   and from object action   1128132590
```
