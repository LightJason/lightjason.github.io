---
title: "Basic Knowledge: Actions"
---
This text gives you an overview over the build-in actions in LightJason AgentSpeak(L++). We don't explain all actions in detail, because it is too much. If you think there is anything missing feel free to write the actions and send a [pull request](https://help.github.com/articles/about-pull-requests/) back with your actions. Please keep in mind that you are use our styleguide and code structure. Otherwise write us an email or create an [issue](https://github.com/LightJason/AgentSpeak/issues)

## Action structure

All actions are organized within the [action.buildin](http://lightjason.github.io/AgentSpeak/sources/d8/da4/namespaceorg_1_1lightjason_1_1agentspeak_1_1action_1_1buildin.html) package. Each packages defines a semantic structure of the actions and the action name is equal to Java package and class name:

* ```collection``` any type of collections e.g. map, list, tupel...
* ```cypto``` defines any crypotographic algorithms e.g. hash and encryption functions
* ```generic``` generic elements e.g. type casting, string and date & time processing
* ```math``` math functions e.g. sin, cos, but also [BLAS algorithms](https://en.wikipedia.org/wiki/Basic_Linear_Algebra_Subprograms), [linear programming](https://en.wikipedia.org/wiki/Linear_programming), statistical and interpolation algorithms
* ```rest``` [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) components to get access to webservices

For usage you can take a look on your [testing agent](https://github.com/LightJason/AgentSpeak/blob/master/src/test/resources/agent/complete.asl) which contains many actions.
