---
title: "Basic Knowledge: Actions"
---

This text gives you an overview over the main build-in actions in LightJason/AgentSpeak(L++).

## Action structure

All actions are organised within the [action.buildin](http://lightjason.github.io/AgentSpeak/sources/d8/da4/namespaceorg_1_1lightjason_1_1agentspeak_1_1action_1_1buildin.html) package. Each packages defines a semantic structure of the actions and the action name is equal to Java package and class name:

* ```collection``` any type of collections e.g. map, list, tuple...
* ```crypto``` defines any cryptographic algorithms e.g. hash and encryption functions
* ```generic``` generic elements e.g. type casting, string and date & time processing
* ```math``` math functions e.g. sin, cos, but also [BLAS algorithms](https://en.wikipedia.org/wiki/Basic_Linear_Algebra_Subprograms), [linear programming](https://en.wikipedia.org/wiki/Linear_programming), statistical and interpolation algorithms
* ```rest``` [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) components to get access to web services

For an example on how to make use of actions have a look at our [testing agent](https://github.com/LightJason/AgentSpeak/blob/master/src/test/resources/agent/complete.asl) which uses many built-in actions provided by AgentSpeak(L++).
