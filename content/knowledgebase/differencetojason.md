---
title: "Difference to Jason"
draft: true
---

We describe the difference between LightJason and [Jason](http://jason.sourceforge.net/), because in general the LightJason framework is inspired by Jason, but it is __not__:

* a copy of Jason
* a extension to Jason

LightJason does not use __any code fragments__ of Jason, so there is no connection between the two frameworks. LightJason is __only inspired__ by the concept of Jason on a theoretical level. We build a fully new framework from scratch.

{{< toc >}}


## Jason Agent Cycle

The Jason agent cycle defines the _execution mechanism_ of an agent and is found on [Jason Book](http://jason.sourceforge.net/jBook/jBook/Home.html) figure 4.1 (page 68). The cycle execution depends on the ordering of the source code within the ASL file.

![Jason Agent Cycle](/images/jasonagentcycle.svg#centering)

## LightJason Agent Cycle

On a general point of view we reduce the Jason agent cycle to the neccessary elements. This allows us to build a very efficient execution structure based on a _parallel data-streaming architecture_. On the other hand we generalize the cycle structure, so we can build a more flexible architecture. But __keep in mind_ the LightJaosn agent cycle is run in parallel with optional on-demand / lazy-binding data elements.

![LightJason Agent Cylce](/images/agentcycle.svg#centering)

### Perceiving & Messaging

The LightJason AgentSpeak(L++) structure does not distinguish between _messages_ and _perceiving_, we reduce this concept to two elements:

* __triggers__ which are _pushed data_ for the agent
* __on-demand access__ which is a component of the beliefbase to read knowledge on-demand during runtime

All triggers will be cached, instantiate and execute in parallel during the cycle. During execution new incoming triggers will be stored inside the cache. 
The execution can get access via unification to the beliefbase, so the beliefs can be unified during execution.
A statistic will count fails and successful runs of the plans. The _cost aggregation_ component allows to define for each action a cost value, named _score_, which can be used by for an optimized execution.

### Terms and Literals

The LightJason architecture does not implement all elements of a _logical programming language_. We reduce the concept also, so that we can optimize the execution performance. We define two elements only:

* __literals__ which defines the logical literal with a functor, value and annotation list
* __raw terms__ which defines a _wrapper_ around any native Java object type

### Beliefbase

The beliefbase is not a single element to store all facts of the agent. The beliefbase is a _tree structure_ to organize the agent knowledge. Nodes of this _knowledge tree_ can be shared over many agents or can be used by _on-demand unfification_, so that the agent can perceive the environment in realtime.

