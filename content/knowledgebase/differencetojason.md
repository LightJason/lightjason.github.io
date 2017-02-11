---
title: "Difference to Jason"
---

We describe the difference between LightJason and [Jason](http://jason.sourceforge.net/), because in general the LightJason framework is inspired by Jason, but it is __not__:

* a copy of Jason
* a extension to Jason

LightJason does not use __any code fragments__ of Jason, so there is no connection between the two frameworks. LightJason is __only inspired__ by the concept of Jason on a theoretical level. We build a fully new framework from scratch.

{{< toc >}}


## Jason Agent Cycle

The Jason agent cycle defines the _execution mechanism_ of an agent and is found on [Jason Book](http://jason.sourceforge.net/jBook/jBook/Home.html) figure 4.1 (page 68). The cycle execution depends on the ordering of the source code within the ASL file.

{{< img src="/images/jasonagentcycle.svg" alt="Jason agent cycle" >}}


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

* __literals__ which defines the logical literal with <a href="#literal" id="animate-literal-negation">negation</a>, <a href="#literal" id="animate-literal-functor">functor</a>, <a href="#literal" id="animate-literal-values">values</a> and <a href="#literal" id="animate-literal-annotation">annotation</a> list
* __raw terms__ which defines a _wrapper_ around any <a href="#literal" id="animate-literal-raw">native Java object</a> type

<svg id="literal" xmlns="http://www.w3.org/2000/svg" viewBox="207 192 743 111"><g fill="none"><text transform="translate(274.48 206.72)" fill="#000"><tspan class="svg-literal-negation" font-size="20" font-weight="500" x="0" y="19" textLength="12">~</tspan></text><text transform="translate(545.063 206.72)" fill="#000"><tspan class="svg-literal-values" font-size="20" font-weight="500" x=".01" y="19" textLength="205.98">(value(<tspan class="svg-literal-raw">5</tspan>), time(<tspan class="svg-literal-raw">“12:00“</tspan>))</tspan></text><text transform="translate(760.698 206.72)" fill="#000"><tspan class="svg-literal-annotation" font-size="20" font-weight="500" x=".09" y="19" textLength="175.44">[source(<tspan class="svg-literal-raw">“sensor 1“</tspan>)]</tspan></text><text transform="translate(293.563 206.72)" fill="#000"><tspan class="svg-literal-functor" font-size="20" font-weight="500" x=".46" y="19" textLength="240.8">group/subgroup/any-name</tspan></text><path stroke="#a5a5a5" stroke-linecap="round" stroke-linejoin="round" d="M765 235.125l171 .93m-390.667-.93h215.5m-468.5 0h243m-247.302.002l-19.406-.002M848.198 264v-28"/><text transform="translate(221.063 269.776)" fill="#a5a5a5"><tspan class="svg-literal-negation" font-size="16" font-weight="500" x=".032" y="15" textLength="61.936">negation</tspan></text><text transform="translate(388.563 269.776)" fill="#a5a5a5"><tspan class="svg-literal-functor" font-size="16" font-weight="500" x=".164" y="15" textLength="50.672">functor</tspan></text><text transform="translate(625.063 269.776)" fill="#a5a5a5"><tspan class="svg-literal-values" font-size="16" font-weight="500" x=".184" y="15" textLength="45.632">values</tspan></text><text transform="translate(810.198 269.776)" fill="#a5a5a5"><tspan class="svg-literal-annotation" font-size="16" font-weight="500" x=".064" y="15" textLength="75.872">annotation</tspan></text><path class="svg-literal-annotation"stroke="#a5a5a5" stroke-linecap="round" stroke-linejoin="round" d="M414.063 264v-28m234 28v-28m-370.518-.874L270.084 264"/></g></svg>

{{< inlinejs "/literal.js" >}}

### Beliefbase

The beliefbase is not a single element to store all facts of the agent. The beliefbase is a _tree structure_ to organize the agent knowledge. Nodes of this _knowledge tree_ can be shared over many agents or can be used by _on-demand unfification_, so that the agent can perceive the environment in realtime.

