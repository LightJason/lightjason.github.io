---
title: "Basic Knowledge: Finite-State-Machine"
jsonld: ["techarticle"]
---

## State Machine

A [Finite-State-Machine](https://en.wikipedia.org/wiki/Finite-state_machine) is a system with explicit defined states and transitions between the states with the following syntax:

* a __state__ is presented by a circle and defines a _stable execution point_
* a __final state__ is defined by a circle with a _double outline_
* the state-machine defines a single __initial state__ with a triangle
* a __transition__ is presented by an arrow which starts in a state and ends in a state. A transition symbols a an active execution call like a function

Mostly within a state the state-name is documented, also the arrow of a transition can be used for documentation.

> This example show a similar state-machine with three states, that runs from the _initial state_ to a _final state_ (left to right). This example shows the _static structure_ of the state machine, so there is no runtime information with in the illustration
> ![finite-state-machine](/images/fsm1.svg#centering)

### Usage and Example

State-Machine are a useful tool to describe [regular expressions](https://en.wikipedia.org/wiki/Regular_expression) and we would like to motivate this concept for explaining the functional principle:

> The main goal is to create a system, which can check strings that matchs the following criteria:
> The strings starts with an arbitrary  sequence of the letter ```a``` or ```b``` (the sequence can be empty).
> After the initial sequence follows a positiv number which depends on any digit. 
> The end of the sequence is a sequence of the letter ```x``` with two letters at minimum. All letters within this string can be lower- or upper-case. Some valid example sequences: ```ab1x```, ```aaaaabbb169XXX```, ```AaAabbBB972xXxXXXX```
 

## Petri Net

Based on the static information of the state machine it can be extend to a [petri net](https://en.wikipedia.org/wiki/Petri_net), which allows to a runtime behaviour. The concept of such a petri net is used to describe an agent during runtime.
