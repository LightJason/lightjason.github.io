---
title: "Basic Knowledge: Finite-State-Machine"
jsonld:
    techarticle: true
---
A [Finite-State-Machine](https://en.wikipedia.org/wiki/Finite-state_machine) is a system with explicit defined states and transitions between the states with the following syntax:

* a __state__ is presented by a circle and defines a _stable execution point_
* a __final state__ is defined by a circle with a _double outline_
* the state-machine defines a single __initial state__ with a triangle
* a __transition__ is presented by an arrow which starts in a state and ends in a state. A transition symbols a an active execution call like a function

Mostly within a state the state-name is documented, also the arrow of a transition can be used for documentation.

> This example show a similar state-machine with three states, that runs from the _initial state_ to a _final state_.
> ![fsmagent](/images/fsm1.svg#centering)
