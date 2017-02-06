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

![Jason ](/images/jasonagentcycle.svg#centering)

## LightJason Agent Cycle

On a general point of view we reduce the Jason agent cycle to the neccessary elements. This allows us to build a very efficient execution structure. On the other hand we generalize the cycle structure, so we can build a more flexible architecture. But __keep in mind_ the LightJaosn agent cycle is run in parallel with optional on-demand / lazy-binding data elements.

### Perceiving

### Terms and Literals

### Beliefbase
