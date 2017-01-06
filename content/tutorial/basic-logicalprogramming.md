---
title: "Basic Knowledge: Logical Programming"
---

This tutorial gives a short introduction in [logical programming concepts](https://en.wikipedia.org/wiki/Logic_programming), which are needed to write the source code of an agent. For general understanding of logical programme it can be helpful to learn first Prolog, in detail we recommand [SWI-Prolog](http://www.swi-prolog.org/), because there a lot of application and good tutorials to understand the main mechanism of programming.

{{< toc >}}

## Designtime

On logical programms we are talking about a _symbolic definition_. We are writing source code in _symbols_, _facts_ and _rules_. The difference between [imperative programming](https://en.wikipedia.org/wiki/Imperative_programming) and a logical programm is, that we don't define _how the problem should be solved_. We define only the facts and rules which are needed to calculate the solution. In a more general way we define the _constraints_ which are needed to solve the problem. On this definition the runtime create an internal structure to solve the problem.

On the agent developing process, you have to write an _agent script_ in our AgentSpeak(L++) programming language, which describes the behaviour of the agent. The script describs _what and when should the agent do_. This process is named _designtime_, because you design the behaviour without knowledge about the real execution process. During _designtime_ there are some concepts to understand the structure of our logical programming language, which are shown here...


### Terms

In short: _Everything is a term_
All elements within the source code are terms, so the super (generic) data structure is a term. In our framework we are distinguish two different types of terms:

* raw terms are terms with a native Java datatype, in such a term any Java data structure can be stored, but it cannot be used by the normal behaviour of the logical programming language. Unifying and assigments are possible on these raw data structures
* other terms like literals are structured objects which are here described

In our structure we create an inheritance model to build the software architecture for these structured. The root element is the [ITerm interface](https://lightjason.github.io/AgentSpeak/sources/d9/d34/interfaceorg_1_1lightjason_1_1agentspeak_1_1language_1_1ITerm.html) and the {{< lightbox "https://lightjason.github.io/AgentSpeak/sources/d4/dc1/interfaceorg_1_1lightjason_1_1agentspeak_1_1language_1_1ITerm__inherit__graph_org.svg" "ITerm inheritance diagram" >}} shows the structure of the relations.

### <a name="atomliterals">Atom & Literals</a>

The plainest structure of a logical programming language are _atoms_ and based on this structure the _literals_. In the Prolog definition and so in AgentSpeak(L) all literals / atoms are beginning with a lower-case letter. In our definition the atom can contains also slash ```/``` and minus ```-```. For example:

> We would like to define that the sun is shining
> <pre><code class="language-prolog ">sun( shining() )</pre></code>
> The word ```sun``` and the word ```shining``` are _atoms_, the whole structure ```sun(shining())``` is named _literal_.

<a name="time"></a>Another example is a time definition:

> We would like to say it is currently 2 a clock post meridiam (pm)
> <pre><code class="language-prolog">time( current( hour(2), minute(0), pm() ) )</pre></code>
> You can see, that a literal can store a list of other literals or values inside the brackets.

Based on the first example a negation is also possible

> We would to say it is currently not raining
> <pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">~raining()</pre></code>
> The tilde ```~``` in front of a atom defines the [strong negation](https://en.wikipedia.org/wiki/Stable_model_semantics#Strong_negation)

### Variables

Variables can be used to define literals with a _placeholder_ and in constrast to atom / literals begins a variable with an upper-case letter. 

> Based on the [time example](#time) we add some variables to extract the hour and minute part of the literal
> <pre><code class="language-prolog">time( current( hour( Hour ), minute( Minute ), pm() ) )</code></pre>
> The upper-case variables ```Hour``` and ```Minute``` are parts of the literal and the system can set the values into. This structure is named [unification](#unifaction)

Within a logical programming language exists a specialized variable which is _only_ the underscore ```_```. This variable can be sloppy named as _trash can_. You can use this special variable for defining a variable which value should be ignored.

> In contradistinction to the time example above, we would like to ignore the ```pm()``` part, so we say, that we would like to get the current time and ignoring the 12-hour clock part
> <pre><code class="language-prolog">time( current( hour( Hour ), minute( Minute ), _ ) )</code></pre>
> With this definition we can get a very flexible structure for extracting some information from the literals.

### Facts & Beliefs

Based on the definition of [variables](#variables) and [literals](#atomliterals) we are defining a _fact_ as a _literal without variables_. A fact is a literal which define a state or an information (independed the information is correct or wrong). In relation to a multi-agent system a _belief_ is a _fact about the knowledge or the environment_. So the fact defines a state or a point of view of an object without any information about the correctness.

### Rules

Rules as distinct from [literals](#a-name-atomliterals-atom-literals-a), [variables](#variables) and [facts](#facts-beliefs) are an _executable structure_. Rules can be looked upon as a _static function_, but on a logical programming language a function with some additional structure.

> One of the most rule examples for logical programs is the [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number). In the mathematical definition this sequences is defined as
> $$F\_n = F\_{n-1} + F\_{n-2}$$
> $$F\_0 = F\_1 = F\_2 = 1$$
> For the value $n=5$ the sequence is calculated as 
> $$F\_5 = F\_4 + F\_3 = (F\_3 + 1) + (1+1) = ((1+1)+1) + (1+1) = 5$$
> Based on this calculation you see that each function element $F\_n$ which is not defined as $1$ resolved in 
> a recursive way. To create a rule, which calculates the fibonacci number of any input in Prolog the rules shows
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
> One of the importent part on a Prolog program is, that first the exit conditions are written. The last item 
> in the list is the calculation iif no other condition will be matched. The last rule can be read in the 
> following way (the comma is pronounced as a logical _and_):

> > If (```N``` is greater than ```1```) _and_ (```N1``` can be set to ```N-1```) _and_ (```N2``` can be calculate to ```N-2```) _and_ 
> > (the rule ```fibonacci(N1,R1)``` can be successfull executed) _and_ (the rule ```fibonacci(N2,R2)``` can be successfull executed) _and_
> > (```R``` can be calulated to ```R1 + R2```) _then_ the rule will be finished successful

> The order of the rule is very importend, because Prolog tries to find a rule, which is matched successfully, 
> the first rule, that matchs will be used. Variables will be set during runtime and the values will be passed 
> back by a reference, this is named [side effect](https://en.wikipedia.org/wiki/Side_effect_(computer_science)). In imperative programming languages these side effects are undesired, but 
> very helpful in logical programming languages.  
> 
> But an advice in writing such rules: The logical programming runtime will be check in a worst-case szenario all possibilites of calculating a solution. The system tries to find a successfull solution with a [backtracking algorithm](https://en.wikipedia.org/wiki/Backtracking). This can be a [NP-complete problem](https://en.wikipedia.org/wiki/NP-completeness) and so a solution cannot be calculated efficently.


## Runtime

In the section [designtime](#designtime) we are talking about a symbolic representation of data. We can define such data in the agent script and during the execution of the agent we would like to modify the data. On an abstract point of view we are talking about [deductive reasoning](https://en.wikipedia.org/wiki/Deductive_reasoning), that means in slopping sentence: _We are generating new knowledge, based on the current knowledge of the agent_.

![deduction](/images/deduction.svg#centering)

The description of the figure is that we are modeling the $\Delta$ during [designtime](#designtime) with any kind of [facts](#facts-beliefs). During runtime the agent can modify the knowledge and generates implicit knowledge about the environment which is based on the previous knowledge $\Delta$. The implicit knowledge is named $belief(\Delta, \rho)$

### Unifaction

In general the [unification](https://en.wikipedia.org/wiki/Unification_(computer_science)) is the process for _setting values from one literal into the variables of another literal_. Based on the [time example](#time) we show the procedure.

> We have got two literals, one literal with values and another literal with variables
> <pre><code class="language-prolog">time( current( hour( 2    ), minute( 0      ), pm() ) )
> time( current( hour( Hour ), minute( Second ), _    ) )
> </pre></code>
> Based on this structure the systems tries to transfer the values from the first literal into the variables 
> of the second literal in that case, that both literals are equal. If it is not possible the unification 
> process will fail. On a successfull execution the variable ```Hour``` stores the value $2$ and the variable 
> ```Second``` the value $0$.

The runtime of the logical programming language tries to find an executable structure, so that all unification components and [rules](#rules) can be finished successfully. The unification process can be used to generate new literals based on existing literals. In combination with [rules](#rules) the system can solved complex reasoning structures. If the system cannot find any possibility to solve the problem, the logical program will be stopped with a failure. The goal of the runtime is, to find a successful solution.
