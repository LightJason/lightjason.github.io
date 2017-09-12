---
title: "Knowledge Base"
gitter: "knowledge base"
previous :
    url: "/framework"
    text: "Framework"
next :
    url: "/knowledgebase/logicalprogramming/"
    text: "Theoretical Introduction: Logic Programming"
---

In this Section we provide basic and advanced knowledge helpful for understanding the theoretical concepts of our framework.

> **Note:** For a more *hands-on* experience $\to$ see [practical tutorials](/tutorials).

## Theoretical Introduction
  1. [Logic Programming](logicalprogramming) for understanding the difference to imperative programming. Explanation of the basic concepts for using this paradigm to describe the agent behaviour
  2. [Finite-State Machine](finitestatemachine) for understanding the runtime model of the agent behaviour
  3. [Finite-State Machine and Logic Programming of an agent](agent) to understand how we combine the parts into our agent definition
  4. [Difference to Jason](differencetojason) shows the main differences between [Jason](http://jason.sourceforge.net) and our framework


<br>

## Basic Knowledge
  1. Atoms
  2. Terms
  3. Literals
  4. Variables
  5. Plans
  6. Goals
  7. Beliefs and Facts
  8. Actions
  9. [Built-in Actions](builtinactions) provides a reference to all built-in actions available to LightJason agent programmers
  10. Unification

<br>

## Advanced Knowledge
  1. [Plan Triggering Techniques](triggering) provides insights into different ways to trigger plans in AgentSpeak(L++)
  2. [Plan Annotations](annotations) shows how to modify the execution behaviour of plans
  3. [Failing is Intentional](failing) explains techniques to mitigate failing plans and actions, as failing is part of ~~humans~~ agents interacting with each other in a shared environment.