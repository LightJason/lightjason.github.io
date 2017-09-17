---
title: "Theoretical Introduction: Logic Programming"
jsonld: ["techarticle", "course"]
gitter: "knowledge base"
previous :
    url: "/knowledgebase/differencetojason"
    text: "Theoretical Introduction: Difference to Jason"
next :
    url: "/knowledgebase/finitestatemachine"
    text: "Theoretical Introduction: Finite-State-Machine"
---

This article gives a short introduction in [logic programming concepts](https://en.wikipedia.org/wiki/Logic_programming), which are needed to write the source code of an agent.
For a general understanding of logic programming it can be helpful to start by considering Prolog, in detail we recommend [SWI-Prolog](http://www.swi-prolog.org/), because there are many applications and good tutorials to understand the main mechanism of logic programming.

{{< toc >}}

## Design Time

On logic programs we are talking about a _symbolic definition_. We are writing source code in _symbols_, _facts_ and _rules_.
The difference between [imperative programming](https://en.wikipedia.org/wiki/Imperative_programming) and a logic program is that the latter does not define _how the problem should be solved_. It only defines the facts and rules which are needed to calculate the solution. In a more general way it defines the _constraints_ which are needed to solve the problem. On this definition the runtime creates an internal structure to solve the problem.

In LightJason's agent developing process, you have to write an _agent script_ in our AgentSpeak(L++) programming language, which describes the behaviour of the agent. The script describes _what and when the agent should do_. This process is named _design time_, because you design the behaviour without knowledge about the real execution process. During _design time_ there are some concepts to understand related to the structure of our logic programming language, which are shown in the following.

> **Note:** The following sections are also covered in our knowledge base.<br>
> For more information see [$\to$ Terms](../terms/), [$\to$ Atoms](../atoms/), [$\to$ Literals](../literals/), [$\to$ Variables](../variables), [$\to$ Facts and Beliefs](../beliefsandfacts), [$\to$ Rules](../rules) and [$\to$ Unification](../unification).

### Terms

In short: _Everything is a term._

All elements within the AgentSpeak(L++) code are [terms](#terms), forming the building blocks of a super (generic) data structure. In our framework we distinguish two different types of terms:

* *Raw terms* are terms with a native Java data type. In such a term any Java data structure can be stored, but it cannot be used by the normal behaviour mechanisms of the logic programming language.
Unification and assignments are nonetheless possible on these raw data structures.
* *Other terms* like literals are structured objects which are described in the following.

In LightJason an inheritance model exists to build a software architecture for these structured elements.
The root element is the [ITerm interface](https://lightjason.github.io/AgentSpeak/sources/d9/d34/interfaceorg_1_1lightjason_1_1agentspeak_1_1language_1_1ITerm.html) and the {{< lightbox "https://lightjason.github.io/AgentSpeak/sources/d4/dc1/interfaceorg_1_1lightjason_1_1agentspeak_1_1language_1_1ITerm__inherit__graph_org.svg" "ITerm inheritance diagram" >}} shows the structure of the relations.

### <a name="atomliterals">Atoms & Literals</a>

The simplest structural elements of a logic programming language are _atoms_ which are part of [literals](#literals).
In the Prolog definition and consequently also in AgentSpeak(L++) all *literals* and *atoms* begin with a lower-case letter. 
Additionally, atoms can also contain slashes ```/``` and minus ```-``` characters. For clarification see the following example:

> We would like to define that the sun is shining
> <pre><code class="language-prolog ">sun( shining() )</pre></code>
> The word ```sun``` and the word ```shining``` are _atoms_, the whole structure ```sun(shining())``` is named _literal_.

<a name="time"></a>Another example is a time definition:

> We would like to say it is currently 2 o'clock post meridiem (pm)
> <pre><code class="language-prolog">time( current( hour(2), minute(0), period( pm() ) ) )</pre></code>
> You can see, that a literal can store a list of other literals or values inside the brackets.

Based on the first example a negation is also possible:

> We would like to say it is currently not raining
> <pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">~raining()</pre></code>
> The tilde ```~``` in front of a atom defines the [strong negation](https://en.wikipedia.org/wiki/Stable_model_semantics#Strong_negation)

### Variables

Variables are specialised [terms](#terms) to store information during runtime.
They can be used to define literals with a _placeholder_ and (in contrast to [atoms](#atoms) or [literals](#literals)) begin with an upper-case letter.

> Based on the [time example](#time) we added some variables to extract the hour, minute and period part of the literal
> <pre><code class="language-prolog">time( current( hour( Hour ), minute( Minute ), period( Period ) ) )</code></pre>
> **Note:** The upper-case variables ```Hour```, ```Minute``` and ```Period``` can be assigned to values automatically. This mechanism is called [unification](#unification).

Within a logic programming language exists a specialised variable which is _just_ the underscore ```_```. This variable can be sloppy named as _trash can_. You can use this special variable for defining a variable which value should be ignored.

> In contradistinction to the time example above, we would like to ignore the period, i.e. the ```am()```/```pm()``` part, so we say, that we would like to get the current time and ignoring the 12-hour clock period.
> <pre><code class="language-prolog">time( current( hour( Hour ), minute( Minute ), period( _ ) ) )</code></pre>
> With this definition we can get a very flexible structure for extracting some information from the literals.

### Beliefs and Facts

Based on the definition of [variables](#variables) and [literals](#atomliterals) we are defining a _fact_ as a _literal without variables_. A fact is a literal which define a state or an information (independent whether the information is correct or wrong). In relation to a multi-agent system a _belief_ is a _fact about the knowledge or the environment_. So the fact defines a state or a point of view of an object without any information about the correctness.

### Rules

Rules, in contrast to [literals](#literals), [variables](#variables) and [facts](#beliefs-and-facts), are an _executable structure_. Rules can be seen as _static functions_ in a logic programming language with some additional structure.

> One of the most famous examples for rules in logic programs is the [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number). Mathematically this sequences is defined as
> $$F\_n = F\_{n-1} + F\_{n-2}$$
> $$F\_0 = 0$$
> $$F\_1 = F\_2 = 1$$
> For the value $n=5$ the sequence is calculated as
> $$F\_5 = F\_4 + F\_3 = (F\_3 + 1) + (1+1) = ((1+1)+1) + (1+1) = 5$$
> Based on this calculation you can see that each function element $F\_n$ which is not defined as $1$ gets resolved in
> a recursive way. A Prolog rule, which calculates the Fibonacci number of any input can be written as follows:
> <pre><code class="language-prolog">fibonacci(0,0).
fibonacci(1,1).
fibonacci(2,1).
fibonacci(N,R) :-
    N > 1,
    N1 is N-1,
    N2 is N-2,
    fibonacci(N1,R1),
    fibonacci(N2,R2),
    R is R1 + R2
.</code></pre>
> One of the most important aspect of a Prolog program is, that the exit conditions are written first. The last item
> in the rule is the calculation to be made, iff no other condition can be matched. The last rule can be read in the
> following way (the comma is pronounced as a logical _and_):

> > If (```N``` is greater than ```1```) _and_ (```N1``` can be set to ```N-1```) _and_ (```N2``` can be calculate to ```N-2```) _and_
> > (the rule ```fibonacci(N1,R1)``` can be successfully executed) _and_ (the rule ```fibonacci(N2,R2)``` can be successfully executed) _and_
> > (```R``` can be calculated to ```R1 + R2```) _then_ the rule will be finished successful

> The order of the rule is very important, because Prolog tries to find a rule, which can be matched successfully,
> the first rule, that matches will be used. Variables will be set during runtime and the values will be passed
> back as a reference, which is named [side effect](https://en.wikipedia.org/wiki/Side_effect_(computer_science)). In imperative programming languages these side effects are undesired, but
> can be very helpful in logic programming languages.  
>
>  But an advice in writing such rules: In the worst-case, the logic programming runtime will have to check all possibilities to calculate a solution. The system tries to find a successful solution with a [backtracking algorithm](https://en.wikipedia.org/wiki/Backtracking). This can be a [NP-complete problem](https://en.wikipedia.org/wiki/NP-completeness) and so a solution cannot be calculated efficiently.


## Runtime

In the section [design time](#designtime) we are talked about a symbolic representation of data. We can define such data in the agent script and during the execution of the agent we would like to modify the data. On an abstract point of view we are talking about [deductive reasoning](https://en.wikipedia.org/wiki/Deductive_reasoning), that means in slopping sentence: _We are generating new knowledge, based on the current knowledge of the agent_.

{{< img src="/images/deduction.svg" alt="deduction" width="30%" >}}

The description of the figure is that we are modelling the $\Delta$ during [design time](#designtime) with any kind of [facts](#beliefs-and-facts). During runtime the agent can modify the knowledge and generate implicit knowledge about the environment which is based on the previous knowledge $\Delta$. The implicit knowledge is named $belief(\Delta, \rho)$

### Unification

[Unification](https://en.wikipedia.org/wiki/Unification_(computer_science)) is the process for _setting values from one literal into the variables of another literal_, e.g. determining the current value of `Colour` in `light(Colour)`.

>**Note:** `Colour` is a variable!

Based on the previous [time example](#time) the procedure can look as follows:

> We have two literals, one literal with values and another literal with variables
> <pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">time( current( hour( 2    ), minute( 0      ), period( pm() ) ) )
> time( current( hour( Hour ), minute( Minute ), period( _    ) ) )
> </pre></code>
> Based on this structure the systems tries to transfer the values from the first literal into the variables
> of the second literal, such that both literals are equal. If it is not possible the unification
> process will fail. On a successful execution the variable ```Hour``` stores the value $2$ and the variable
> ```Minute``` the value $0$.

The runtime of the logic programming language tries to find an executable structure, so that all unification components and [rules](#rules) can be finished successfully. The unification process can be used to generate new literals based on existing literals. In combination with _rules_ the system can solve complex reasoning structures. If the system cannot find any possibility to solve the problem, the logic program will be stopped with a failure. The goal of the runtime is to find a successful solution.
