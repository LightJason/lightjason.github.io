---
title: "Basic Knowledge: Finite-State-Machine"
jsonld: ["techarticle", "course"]
gitter: "knowledge base"
previous :
    url: "/knowledgebase/logicalprogramming"
    text: "Logical Programming"
next :
    url: "/knowledgebase/agent"
    text: "Finite-State-Machine and Logical Programming to an Agent"
---

## State Machine

A [Finite-State-Machine](https://en.wikipedia.org/wiki/Finite-state_machine) is a system with explicit defined states and transitions between the states with the following syntax:

* a __state__ is presented by a circle and defines a _stable execution point_
* a __final state__ is defined by a circle with a _double outline_
* the state-machine defines a single __initial state__ with a triangle
* a __transition__ is presented by an arrow which starts in a state and ends in a state. A transition symbols a an active execution call like a function

Mostly within a state the state-name is documented, also the arrow of a transition can be used for documentation.

> This example show a similar state-machine with three states, that runs from the _initial state_ to a _final state_ (left to right). This example shows the _static structure_ of the state machine, so there is no runtime information with in the illustration
> {{< img src="/images/fsm1.svg" alt="finite-state-machine" width="30%" >}}


### Usage and Example

State-Machine are an useful tool to describe [regular expressions](https://en.wikipedia.org/wiki/Regular_expression) and we would like to motivate this concept for explaining the functional principle:

> The main goal is to create a system, which can check strings that matchs the following criteria:
> The strings starts with an arbitrary  sequence of the letter ```a``` or ```b``` (the sequence can be empty).
> After the initial sequence follows a positiv number which depends on any digit.
> The end of the digit sequence is a sequence of the letter ```x``` with two letters at minimum. All letters within this string can be lower- or upper-case. Some valid example sequences: ```ab1x```, ```aaaaabbb169XXX```, ```AaAabbBB972xXxXXXX```

Most programming languages defines such regular expression in a [perl notation](https://en.wikipedia.org/wiki/Regular_expression#Perl) or [posix notation](https://en.wikipedia.org/wiki/Regular_expression#POSIX_basic_and_extended). We use for the example the posix notation which is defined as:

```(a|A|b|B)*  [0-9]+  (x|X){2,}```

* The first block ```(a|A|b|B)*``` defines the different letters and the ```|``` defines the _or_-Operator. At the end the ```*```-operator defines $\geq 0$ elements.
* The second block ```[0-9]+``` defines _all elements between 0 and 9_ and the ```+```-operator sets the number of elements $\geq 1$
* The third block ```(x|X){2,}``` defines similar to the first both letter cases and the ```{2,}``` defines the number of elements with $\geq 2$

Based on this definition it is possible to define a state machine, which can check if  the string matchs the given structure. On the runtime the string is read character by character and based on the state machine a transition will be found, which matchs the character.



## Petri Net

Based on the static information of the state machine it can be extend to a [petri net](https://en.wikipedia.org/wiki/Petri_net), which allows to a runtime behaviour. The concept of such a petri net is used to describe an agent during runtime.
