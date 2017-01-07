---
title: "Tutorial: Communication"
jsonld: ["techarticle"]
---

LightJason architecture does not support in general a build-in communication, because communication and 
agent addressing / naming depends on the domain or underlying software architecture. To create a 
communication structure you have to build-up your own naming model, a send action with a receiving plan and 
a data structure to map agent names / addresses to agent objects.

{{< toc >}}

## Don't reinvent the edge

Communication can be a _very expensive_ calling structure, especially on distributed systems. If you build your own communication structure
just think about multi-threading and performance aspects. Within this tutorial we cannot show you all details of fast and efficient communication
data structure, so we would like to show you the basics only. On a distributed system you have to organize the naming schema and searching methods
of names and objects. If you need to transfer messages over the network, just think about serialization and deserialization performance.
Java supports a [serialize interface](https://docs.oracle.com/javase/tutorial/jndi/objects/serial.html) so don't create self-defined string
data structure, because for such message transfering there are a lot of other and well-known and estabilished components. Well known formats
are [JSON](https://de.wikipedia.org/wiki/JavaScript_Object_Notation), [YAML](https://de.wikipedia.org/wiki/YAML) or [XML/XSD with Jaxb](https://de.wikipedia.org/wiki/Java_Architecture_for_XML_Binding)


## Agent with name

For communication a _name resolution_ is needed, so the agents needs to get a name (here a string). This name will be used to determine the sender
of a message

```java
public final class MyCommunicationAgent extends IBaseAgent<MyCommunicationAgent>
{
    // agent name
    private final String m_name;

    // constructor of the agent
    // @param p_name agent name
    // @param p_configuration agent configuration of the agent generator
    public MyAgent( final IAgentConfiguration MyAgent  p_configuration )
    {
        super( p_configuration );
        m_name = p_name;
    }
    
    // returns the agent name
    // @return agent name
    public final String name()
    {
        return m_name;
    }

}
```

## Send-Action with address resolution

For communication basisc a _send_ action must be created. This actions needs also an _address resolution_ for the agent names, this can be an URL access or a string name. Within this example we use a map with string for the agent name and the value for the agent object. Each generated agent must be registered at this action so that other agents can send messages. The action tries to find the agent object based on the name, builds the goal-trigger and transfer the data to the other agent. On the next cycle call of the receiving
agent the message goal-plan will be triggered.

```java
public final class CSend extends IBaseAction
{
    // create a thread-safe map to store name and agent object
    private final Map<String, MyCommunicationAgent> m_agents = new ConcurrentHashMap<>();

    // register method to register an agent
    // @param p_agent agent object    
    // @return agent object
    public final MyCommunicationAgent register( final MyCommunicationAgent p_agent )
    {
        m_agents.put( p_agent.name(), p_agent );
        return p_agent;
    }
    
    // remove an agent by the name
    // @param p_agent agent object
    // @return agent object
    public final MyCommunicationAgent unregister( final MyCommunicationAgent p_agent )
    {
        m_agents.remove( p_agent.name() );
        return p_agent;
    }

    @Override
    public final IPath name()
    {
        return CPath.from( "message/send" );
    }

    @Override
    public final int minimalArgumentNumber()
    {
        return 2;
    }

    @Override
    public final IFuzzyValue<Boolean> execute( final IContext p_context, final boolean p_parallel, final List<ITerm> p_argument, 
                                               final List<ITerm> p_return, final List<ITerm> p_annotation
    )
    {
        // first parameter of the action is the name of the receiving agent
        final IAgent<?> l_receiver = m_agents.get( p_argument.get( 0 ).<String>raw() );
        
        // if the agent is it not found, action fails
        if ( l_receiver == null )
            return CFuzzyValue.from( false );

        // create the receiving goal-trigger of the message
        l_receiver.trigger(
            CTrigger.from(
                ITrigger.EType.ADDGOAL,
                
                // create the goal literal "message/receive(M,S)" with M is the message literal
                // and S the sending agent name
                CLiteral.from(
                    "message/receive",
                    
                    // message literal
                    CLiteral.from(
                        "message",
                        
                        // first argument is the agent name so copy all other arguments to the message literal
                        p_argument.subList( 1, p_argument.size() ).stream().map( i -> CRawTerm.from( i.raw() ) )
                    ),
                    
                    // name of the sending agent in this the agent which calls the send action is read from
                    // context and translate in the communication agent, the communication agent has got the
                    // method name() to read the agent name
                    CLiteral.from( "from", CRawTerm.from( p_context.agent().<MyCommunicationAgent>raw().name() ) )
                )
                
            )
        );

        return CFuzzyValue.from( true );
    }

}
```


## Agent factory with name generating

The agent factory must create the agent object and a unique name. Within this example we use one factory only, so
each factory create a _send_ action and the send action contains the name resolution. Based on this, the action must
be accessable within the factory to register each agent. The name definition is here with the schema ```agent <number>```
but __keep in mind that the generate method can be called in parallel, so the counter must be thread-safe.__ Java
supports such [atomic variables](https://docs.oracle.com/javase/tutorial/essential/concurrency/atomicvars.html).


```java
public final class MyAgentGenerator extends IBaseAgentGenerator<MyCommunicationAgent>
{
    // store a reference to the send action for adding / removing agents
    private final IAction m_send = new CSend();
    
    // thread-safe counter for the agent name, because the generator method
    // can be called in parallel
    private final AtomicLong m_counter = new AtomicLong();

    //constructor of the generator
    //@param p_stream ASL code as any stream e.g. FileInputStream
    public MyAgentGenerator( final InputStream p_stream ) throws Exception
    {
        super(
            // input ASL stream
            p_stream,

            // a set with all possible actions for the agent
            Stream.concat(
                // we use all build-in actions of LightJason
                CCommon.actionsFromPackage(),
                
                // add send action to the generator
                Stream.concat( m_send )
                
            // build the set with a collector
            ).collect( Collectors.toSet() ),

            // aggregation function for the optimization function, here
            // we use an empty function
            IAggregation.EMPTY
        );
    }
    
    // unregister an agent
    // @param p_agent agent object
    public final void unregister( final MyCommunicationAgent p_agent )
    {
        m_send.unregister( p_agent );
    }

    // generator method of the agent
    // @param p_data any data which can be put from outside to the generator method
    // @return returns an agent
    @Override
    public final MyCommunicationAgent generatesingle( final Object... p_data )
    {
        // register a new agent object at the send action and the register
        // method retruns the object reference
        return m_send.register( 
                   new MyCommunicationAgent( 
            
                        // create a string with the agent name "agent <number>"
                        // get the value of the counter first and increment, build the agent
                        // name with message format (see Java documentation)
                        MessageFormat.format( "agent {0}", m_counter.getAndIncrement() ),
                
                        // add the agent configuration
                        m_configuration 
                )
        );
    }
}
```



