---
title: "Basic Knowledge: Actions"
jsonld: ["techarticle"]
gitter: "knowledge base"
previous :
    url: "/knowledgebase/beliefsandfacts"
    text: "Basic Knowledge: Beliefs and Facts"
next :
    url: "/knowledgebase/builtinactions"
    text: "Basic Knowledge: Built-in Actions"
---

Actions enrich agents twofold: First they provide further functionality, for example to compute complex calculations which could be implemented better, i.e. simpler, more scalable, in an imperative programming language. Secondly they allow agents to interact with their environment and other agents.
We imagine actions to be the sensors and actuators to perceive and manipulate other objects in the environment.

Actions can be called analogously to functions inside the [plan](../plans)-body or -condition.

> **Note:** A list of already [built-in actions](../builtinactions) can be found on the next page.

<p></p>

> **Note for developers:** See our tutorial about [$\to$ actions](/tutorials/actions/) for a practical guide on how to use and create new actions.


**Example**

```agentspeak
!main.
+!main <-
    generic/print("this message gets printed by a built-in action");
    Colour = myfavouritecolour();  // custom action to get my colour
    message/send("Bob", Colour)    // custom action to send my colour to bob
.
```