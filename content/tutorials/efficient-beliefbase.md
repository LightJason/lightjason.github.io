---
title: "Tutorial: Efficient Beliefbase"
jsonld: ["techarticle"]
---

In contrast to Prolog and original Jason, the beliefbase of LightJason is more than a list.
LightJason supports a hierarchical structure of beliefs. 
We support a more organised data structure with efficient searching and unification of beliefs.

{{< toc >}}

A literal in LightJason can be structured like

<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">
foo/value(5)
</code></pre>

and each part (separated by slash) references a beliefbase. This structure is comparable to a Unix directory, where the last item is the file (here: the literal).

## Elements

The beliefbase consists of three different elements

* __Storage__ is a persistent thread-safe structure for the literals and views
* __Views__ are structured elements to build the hierarchical naming structure of the literal
* __Beliefbase__ is a middleware between views and storage to create goal-trigger

### Persistence

In general, beliefs can be stored in a persistent way. 
So an literal object will be set into the storage and the views creates the tree structure. 

![Beliefbase](/images/beliefbase.svg#centering)

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
But this type of beliefs consumes more memory and reduce performance during modification. On each cycle the storage can generate or delete beliefs which triggers the goals.
 
### On-Demand

The on-demand beliefbase allows you to create a non-persistence belief definition, which is suitable to get access to the environment / underlying software architecture. It follows up the [lazy loading pattern](https://en.wikipedia.org/wiki/Lazy_loading))

![Beliefbase](/images/ondemandbeliefbase.svg#centering)

For some practical explanation, think about agents as:
 
> Agents are _individual and self-organized_ items, 
> which perceives their environment autonomous.

We built this structure with _on-demand beliefbases_ into LightJason/AgentSpeak(L++), so you get access to a belief which will be created if you access it and after usage the literal object will be removed. This is a very efficient way for perceiving. We recommend the following workflow: 

1. build an on-demand beliefbase for all dynamic access and changeable information e.g. environment, other agents
2. create a plan which will run continuously, i.e. the plan runs in each cycle
3. within this plan access the belief
4. if the belief can be unified within the plan condition, get the information out of the belief and put it -- if needed -- into a persistent beliefbase

#### Agent with on-demand beliefbase

Java agent class with inner on-demand beliefbase class. The inner class can get access to all properties within the agent class. 
The environment class contains attributes to generate data as literals for each agent.
The on-demand beliefbase is only a wrapper for the environment literals.

<!-- htmlmin:ignore -->
```java
public final class MyAgent extends IBaseAgent<MyAgent>
{
    // environment reference
    private Environment m_environment;

    // constructor of the agent
    // @param p_environment environment reference
    // @param p_configuration agent configuration of the agent generator
    public MyAgent( final Environment p_environment, final IAgentConfiguration<MyAgent> p_configuration )
    {
        super( p_configuration );
        m_environment = p_environment;
        
        m_beliefbase
            // the on-demand beliefbase referenced all beliefs with "env/"
            .add( new EnvironmentBeliefbase().create( "env" ) );
    }
    
    // inner class with on-demand beliefbase
    private final class EnvironmentBeliefbase extends IDemandBeliefbase
    {
        @Override
        public final int size()
        {
            // returns the number of the literals within the environment for the agent
            return m_environment.size( MyAgent.this );
        }

        @Override
        public final boolean empty()
        {
            // returns empty-flag for literals of this agent
            return m_environment.empty( MyAgent.this );
        }

        @Override
        public final boolean containsLiteral( final String p_key )
        {
            // checks the existence of a literal for the agent
            return m_environment.containsKey( MyAgent.this, p_key.toLowerCase() );
        }

        @Override
        public final Stream<ILiteral> streamLiteral()
        {
            // returns a stream of all literals for the agent
            return m_environment.stream( MyAgent.this );
        }

        @Override
        public final Collection<ILiteral> literal( final String p_key )
        {
            // return a collection of all literals for the agent
            return this.containsLiteral( p_key )
                   ? m_environment.stream( MyAgent.this ).collect( Collectors.toSet() )
                   : Collections.emptySet();
        }
    }
}
```
<!-- htmlmin:ignore -->


#### ASL of the agent

On the ASL side all beliefs with the prefix ```env/``` will be matched to the on-demand beliefbase and will be passed back to the agent.
On the unification (```>>```) the literal will be generated and unified into the variable ```X```. After printing the value of X, it will be stored in the persistent beliefbase.
Because of LightJason's system architecture the ```checkenvironment``` plan will be run in each cycle (in parallel to other plans), so you can control the agent's perceptions in a clean way.

<!-- htmlmin:ignore -->
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">
!checkenvironment.

+!checkenvironment
    : >>env/foo(X) <-
        generic/print( "envrionment", X );
        +myknowledge(X);
        !checkenvironment
.        

+myknowledge(T) <-
    generic/print( "I get knowledge", T )
.    

</code></pre>
<!-- htmlmin:ignore -->
