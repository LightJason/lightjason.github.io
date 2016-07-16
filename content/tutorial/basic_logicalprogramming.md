---
title: "Basic Knowledge: Logical Programming"
---
This tutorial gives a short introduction in [logical programming concepts](https://en.wikipedia.org/wiki/Logic_programming), which are needed to write the source code of an agent.

## Basic Information

On logical programms we are talking about a _symbolic definition_. We are writing source code in _symbols_, _facts_ and _rules_. The difference between [imperative programming](https://en.wikipedia.org/wiki/Imperative_programming) and a logical programm is, that we don't define _how the problem should be solved_. We define only the facts and rules which are needed to calculate the solution. In a more general way we define the _constraints_ which are needed to solve the problem. On this definition the runtime create an internal structure to solve the problem.

### Atom & Literals

The plainest structure of a logical programming language are _atoms_ and based on this structure the _literals_. For example:

> We would like to define that the sun is shining
> <pre><code class="prolog">sun( shining() ).</pre></code>
> The word ```sun``` and the word ```shining``` are _atoms_, the whole structure ```sun(shining())``` is named _literal_.

Another example is a time definition:

> We would like to say it is currently 2 a clock post meridiam (pm)
> <pre><code class="prolog">time( current( hour(2), minute(0), pm() ) ).</pre></code>
> You can see, that a literal can store a list of other literals or values inside the brackets.

Based on the first example a negation is also possible

> We would to say it is currently not raining
> <pre><code class="prolog">~raining().</pre></code>
> The tilde ```~``` in front of a atom defines the [strong negation](https://en.wikipedia.org/wiki/Stable_model_semantics#Strong_negation)

### Terms

In short: _Everything is a term_
All elements within the source code are terms, so the super (generic) data structure is a term. In our frame we are distinguish two different types of terms:

* raw terms are terms with a native Java datatype, in such a term any Java data structure can be stored, but it cannot be used by the normal behaviour of the logical programming language, but these datasets can be stored within variables, can be unified, ...
* other terms like literals are structured objects that are described above

In our structure we create an inheritance model to build the software architecture for these structured. The root element is the [ITerm interface](http://lightjason.github.io/AgentSpeak/sources/d9/d34/interfaceorg_1_1lightjason_1_1agentspeak_1_1language_1_1ITerm.html) and the {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/d4/dc1/interfaceorg_1_1lightjason_1_1agentspeak_1_1language_1_1ITerm__inherit__graph_org.svg" "ITerm inheritance diagram" >}} shows the structure of the relations.





### Facts

### Rules


## Runtime

### Logical

### Unifaction

### Rules


