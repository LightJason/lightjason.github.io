---
draft: true
title: "Tutorial: Beliefbase"
jsonld: ["techarticle"]
previous:
    url: "/tutorials/environment"
    text: "Environment"  
next:
    url: "/about"
    text: "About"      
---

In contrast to Prolog and original Jason, the beliefbase of LightJason is more than a list of facts.
LightJason supports a hierarchical organized structure of beliefs, so you can manage the knowledge of an agent as [ontology](https://en.wikipedia.org/wiki/Ontology) with an  efficient searching and unification.

<!--more-->

{{< toc >}}

## Previous Knowledge

This tutorial describes the usage of beliefbases in a more general usage.

* the scenario starts with the [AgentSpeak 15min](/tutorials/agentspeak-in-fifteen-minutes/) tutorial
* it is also nessessary to understand the basic structure of [literals](/knowledgebase/logicalprogramming/#a-name-atomliterals-atom-literals-a)
* and the [extended literal](/knowledgebase/differencetojason/#terms-and-literals) structure in LightJason




## Beliefbase Components

The beliefbase consists of three different elements

* __Views__ are structured elements to build the hierarchical naming structure of the beliefbase, the view is the component which allows the agent to get access to the beliefbase data
* __Storage__ is a persistent thread-safe structure for the belief literals and views, there are different built-in storages inside the the package ```org.lightjason.agentspeak.beliefbase.storage```
* __Beliefbase__ is a middleware between views and storage to create goal- and belief-trigger

{{< img src="/images/beliefbase.svg" alt="beliefbase" width="30%" >}}

Beliefs are literals that carry any information in a structured form, e. g. the state of the environment. Beliefs are therefore ambiguous, which means that several beliefs can be stored under the same functor. During unification, the appropriate delivery is then selected on the basis of the unification parameters and the variables are assigned.


### Storage - Persistence

In order to enable an efficient query within the beliefbase, the belief literals are stored in a map within the storage. The storage itself must therefore allow the storage of the queries for beliefs. In addition to the literal, a storage can also contain views. Using this mechanism, hierarchical structures can be built up in the supply base, because the views can be referenced from one storage to another storage by storing the views. 


In this example, there are two agents and both agents are referenced to the equal storage, but use different views.

* Agent 1 gets access to the literal by the structure
<!-- htmlmin:ignore -->
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">foo/value(5)
</code></pre>
<!-- htmlmin:ignore -->

* Agent 2 gets access to the literal by the structure
<!-- htmlmin:ignore -->
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">foo2/value(5)
</code></pre>
<!-- htmlmin:ignore -->

This structure allows the agent to store knowledge in a persistent way with generating the goals.
But this type of beliefs consumes less memory and reduces performance during modification. On each cycle the storage can generate or delete beliefs which triggers the goals.

### On-Demand

The on-demand beliefbase allows you to create a non-persistence belief definition, which is suitable to get access to the environment / underlying software architecture. It follows up the [lazy loading pattern](https://en.wikipedia.org/wiki/Lazy_loading))

{{< img src="/images/ondemandbeliefbase.svg" alt="on-demand beliefbase" width="50%" >}}

For some practical explanation, think about agents as:

> Agents are _individual and self-organized_ items,
> which perceives their environment autonomously.

We built this structure with _on-demand beliefbases_ into LightJason/AgentSpeak(L++), so you get access to a belief which will be created if you access it and after usage the literal, object will be removed. This is a very efficient way for perceiving. We recommend the following workflow:

1. build an on-demand beliefbase for all dynamic access and changeable information e.g. environment, other agents
2. create a plan which will run continuously, i.e. the plan runs in each cycle
3. within this plan access the belief
4. if the belief can be unified within the plan condition, get the information out of the belief and put it -- if needed -- into a persistent beliefbase



## Implementation

### Basic

The default beliefbase structure will be created within the _configuration structure_, so each agent gets on the default behaviour its own beliefbase, view and storage. The ```CDefaultAgentConfiguration``` [class](https://github.com/LightJason/AgentSpeak/blob/master/src/main/java/org/lightjason/agentspeak/configuration/CDefaultAgentConfiguration.java#L163-L173) defines the creating process:

<!-- htmlmin:ignore -->
{{< githubsource user="LightJason" repo="AgentSpeak-Java" file="src/main/java/org/lightjason/agentspeak/configuration/CDefaultAgentConfiguration.java" lang="java" filter="[[:space:]]{4}public.*beliefbase(.|\n)*?{(.|\n)*?}" id="beliefbase" postfix=" ">}}
<!-- htmlmin:ignore -->

The {{< linelink "" "beliefbase" "4" >}} creates the base structure, the first call creates a _persistent beliefbase_ with a _multi-storage_ (for literals and views). After that a view is created with the ```create``` call. The call expects a name for the view and tree node name. For the root structure an existing name ```BELIFBASEROOTNAME``` exists. 

After that the initial beliefs are added in {{< linelink "" "beliefbase" "5" >}} the beliefbase and {{< linelink "" "beliefbase" "7" >}} all triggers, which are created on the initial beliefs, are reset. At the end the root beliefbase view is returned. Within your generator you can overload this method to define your own structure.

On dynamic structures you can add and remove at any time a view from an agent to create dynamic information groups


### ASL Belief Access

On the ASL side all beliefs are defined by the prefix which is created by the structure of
the views. For the structure of a literal take a look on the [knowledge base](/knowledgebase/differencetojason/#terms-and-literals). A short example shows the structure:

<!-- htmlmin:ignore -->
<pre data-language="AgentSpeak(L++)" id="source-beliefbaseuse"><code class="language-agentspeak">
+!testplan 
    : >>sub/foo(X) <-
        +myknowledge(X)
.        

+myknowledge(T) <- 
    generic/print( "I get knowledge", T )
.

</code></pre>

<!-- htmlmin:ignore -->

The {{< linelink "" "beliefbaseuse" "3" >}} unifies a belief ```foo``` which is defined inside the beliefbase ```sub```. If the unification is executed successfully, the value of ```foo``` is stored inside the variable ```X```. {{< linelink "" "beliefbaseuse" "4" >}} adds a new literal ```myknowledge``` with the value from ```X``` to the root beliefbase and  
after adding the literal the plan {{< linelink "" "beliefbaseuse" "7-9" >}} is executed.


### Persistent Beliefbase

The main goal of a beliefbase is _storing literals_ and _views_. Based on the configuration source code we added two
additional beliefbases {{< linelink "" "persistentbeliefbase" "5, 6" >}}. In {{< linelink "" "persistentbeliefbase" "5" >}} a _multi-storage_ is used to store literals and views, the name of this structure is ```multibb``` and it will added to the _root_ beliefbase, which is references by the variable ```l_view```. {{< linelink "" "persistentbeliefbase" "6" >}} it is similar, but the name is ```singlebb``` and it is a _single-storage_ for storing literals only.

On main difference is the ```create``` call, the _root_ node needs only a name, but on children elements of the _root_ node the parent must be put into the ```create``` call and the result of the ```create``` must be added to the parent.

<!-- htmlmin:ignore -->
<pre data-language="Java" id="source-beliefbaseuse"><code class="language-java" id="source-persistentbeliefbase">
final IView<T> l_beliefbase = new CBeliefbasePersistent<T>( new CMultiStorage<>() ).create( BELIEFBASEROOTNAME );

l_beliefbase
    .add( new CBeliefbasePersistent<T>( new CMultiStorage<>() ).create( "multibb", l_view ) )
    .add( new CBeliefbasePersistent<T>( new CSingleStorage<>() ).create( "singlebb", l_view ) );
 
</code></pre>

<!-- htmlmin:ignore -->


### On-Demand Beliefbase

The main goal of a _on-demand beliefbase_ is, that the literals which are accessed by the ASL script, created during runtime. The literal creation process is done by the _on-demand beliefbase_. The concept is very usefull to preceiving the environment, because the environment is changing continously and so the agent can get all information at any time.

For this description we create an interface of the environment:


<!-- htmlmin:ignore -->
```java

public interface IEnvironment
{
    Stream<ILiteral> literal( final IAgent<?> p_agent );
}

```
<!-- htmlmin:ignore -->

We define within the interface the ```literal``` method which gets an agent as argument and returns a stream of literal (or an empty stream of no literals are exist). The agent, which is passed by the argument, is the agent which tries to get access to a literal, so the method returns all literals, which are existing for the calling agent. An efficient way is to create these literals on-fly.

Based on this we must modify the agent, so that on the constructor call the _on-demand beliefbase_ is bind {{< linelink "" "agent" "11-12" >}}  to the environment and agent. The agent class gets an inner class for defining the _on-demand beliefbase_ {{< linelink "" "agent" "16-54" >}}. The idea is, that each agent gets a reference to the environment {{< linelink "" "agent" "4" >}} and uses the ```literal``` method {{< linelink "" "agent" "22, 28, 36, 44, 50" >}} with a self reference to get the individual literals from the environment. 

We illustrate the concept of the _on-demand beliefbase_, but this concept can be used multiple times with different objects.

<!-- htmlmin:ignore -->
<pre data-language="Java" id="source-beliefbaseuse"><code class="language-java" id="source-agent">
public final class MyAgent extends IBaseAgent<MyAgent>
{
    private IEnvironment m_environment;

    public MyAgent( final IAgentConfiguration<MyAgent> p_configuration, final IEnvironment p_environment )
    {
        super( p_configuration );
        m_environment = p_environment;

        m_beliefbase
            .add( new EnvironmentBeliefbase().create( "env" ) );
    }


    private final class EnvironmentBeliefbase extends IBeliefbaseOnDemand<MyAgent>
    {

        @Override
        public final Stream<ILiteral> streamLiteral()
        {
            return m_environment.literal( MyAgent.this );
        }

        @Override
        public final Collection<ILiteral> literal( final String p_key )
        {
            return m_environment.literal( MyAgent.this )
                                .filter(i -> p_key.equals( i.functor() ) )
                                .collect( Collectors.toSet() );
        }

        @Override
        public final boolean empty()
        {
            return !m_environment.literal( MyAgent.this )
                                 .findFirst()
                                 .isPresent();
        }

        @Override
        public final int size()
        {
            return (int) m_environment.literal( MyAgent.this ).count();
        }

        @Override
        public final boolean containsLiteral( final String p_key)
        {
            return m_environment.literal( MyAgent.this )
                                .anyMatch(i -> p_key.equals( i.functor() ) );
        }

    }
}

</code></pre>

<!-- htmlmin:ignore -->


## Tips

From a general point of view, just see a beliefbase as a _linkage structure_ for getting or storing literals, so here are some ideas for represent data:

* An on-demand beliefbase can be Wikipedia, so on each call the functor of the literal can be used to run a search on Wikipedia and return the article data as a literal structure
* A persistent single beliefbase can be a database, where each row can be a literal and the primary key defines the functor of the literal
* A persistent multiple beliefbase can be a file directory, each view defines a directory and each filename a functor of a literal
* A XML file can be also used for a persistent multiple beliefbase, each view defines a colletion of nodes and the literal defines a leaf node, where the tag is defined by the literal functor

A well-structured knowledge beliefbase architecture can increase the performance of your agents, so think about the organization of the beliefbase and all dependent data structures. The beliefbase storage or on-demand structure must be a thread-safe component for read and write access.
