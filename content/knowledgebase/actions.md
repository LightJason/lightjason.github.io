---
title: "Basic Knowledge: Actions"
jsonld: ["techarticle"]
gitter: "knowledge base"
previous :
    url: "/knowledgebase/beliefsandfacts"
    text: "kb: Basic - Beliefs and Facts"
next :
    url: "/knowledgebase/builtinactions"
    text: "kb: Basic - Built-in Actions"
---

Actions enrich agents twofold: First they provide further functionality, for example to compute complex calculations which could be implemented better, i.e. simpler, more scalable, in an imperative programming language. Secondly they allow agents to interact with their environment and other agents.

<!--more-->

We imagine actions to be the sensors and actuators to perceive and manipulate other objects in the environment.

Actions can be called analogously to functions inside the body or condition of a [&#8594; plan](../plansandrules).

> **Notes:** 

> * A list of already [&#8594; built-in actions](../builtinactions) can be found on the next page.
> * An elegant way to handle failing plans are explained in the article about [&#8594; explicit repair actions](../repairactions).
> * **For developers:** See our [&#8594; tutorial about actions](/tutorials/actions/) for a practical guide on how to use and create new actions.


**Example**

```agentspeak
!main.
+!main <-
    generic/print("this message gets printed by a built-in action");
    Colour = myfavouritecolour();  // custom action to get my colour
    message/send("Bob", Colour)    // custom action to send my colour to bob
.
```
