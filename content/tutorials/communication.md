---
title: "Tutorial: Communication"
jsonld: ["techarticle"]
---

LightJason architecture does not support in general a build-in communication, because communication and 
agent addressing / naming depends on the domain or underlying software architecture. To create a 
communication structure you have to build-up your own naming model, a send action with a receiving plan and 
a data structure to map agent names / addresses to agent objects.

If you struggled at some point or wish to obtain our exemplary solution to this tutorial, you can download the archive containing the source code [here](/download/communication-agent.zip).

{{< toc >}}

> __Don't reinvent the edge__
> <br/>
> Communication can be a _very expensive_ calling structure, especially on distributed systems. If
> you build your own communication structure
> just think about multi-threading and performance aspects. Within this tutorial we cannot show you 
> all details of fast and efficient communication
> data structure, so we would like to show you the basics only. On a distributed system you have to 
> organize the naming schema and searching methods of names and objects. If you need to transfer 
> messages over the network, just think about 
> serialization and deserialization performance.
> Java supports a [serialize interface](https://docs.oracle.com/javase/tutorial/jndi/objects/serial.html) 
> so don't create self-defined string data structure, because for such message transfering there 
> are a lot of other and well-known and estabilished components. Well known formats
> are [JSON](https://de.wikipedia.org/wiki/JavaScript_Object_Notation), [YAML](https://de.wikipedia.org/wiki/YAML) or [XML/XSD with Jaxb](https://de.wikipedia.org/wiki/Java_Architecture_for_XML_Binding)

## Agent

For this example we create a small agent, which sends a random message to the agent with the name ```agent 0```. The initial-goal triggers the ```main```-plan, which generates the message and calls the send action.

<!-- htmlmin:ignore -->
{{% source "agentspeak" %}}
!main.

+!main <-
    R = generic/string/random( 12, "abcdefghijklmnopqrstuvwxyz");
    message/send("agent 0", R)    
.

+!message/receive(  message( Message ), from( AgentName )  ) <-
    generic/print( MyName, " received message [", Message, "] from [", AgentName, "] in cycle [", Cycle, "]")
.
{{% /source %}}
<!-- htmlmin:ignore -->



### Agent with name

For communication a _name resolution_ is needed, so the agents needs to get a name (here a string). This name will be used to determine the sender
of a message

<!-- htmlmin:ignore -->
```java
package myagentproject;

import org.lightjason.agentspeak.agent.IBaseAgent;
import org.lightjason.agentspeak.configuration.IAgentConfiguration;

public final class MyCommunicationAgent extends IBaseAgent< >MyCommunicationAgent>
{
    private final String m_name;
    
    public MyCommunicationAgent( final String p_name, final IAgentConfiguration<MyCommunicationAgent> p_configuration )
    {
        super( p_configuration );
        m_name = p_name;
    }
    
    public final String name()
    {
        return m_name;
    }
}
```
<!-- htmlmin:ignore -->

### Agent factory with name generating

The agent factory must create the agent object and a unique name. Within this example we use one factory only, so
each factory create a _send_ action and the send action contains the name resolution. Based on this, the action must
be accessable within the factory to register each agent. The name definition is here with the schema ```agent <number>```
but __keep in mind that the generate method can be called in parallel, so the counter must be thread-safe.__ Java
supports such [atomic variables](https://docs.oracle.com/javase/tutorial/essential/concurrency/atomicvars.html).

<!-- htmlmin:ignore -->
```java
package myagentproject;

import org.lightjason.agentspeak.common.CCommon;
import org.lightjason.agentspeak.generator.IBaseAgentGenerator;
import org.lightjason.agentspeak.language.score.IAggregation;

import java.io.InputStream;
import java.text.MessageFormat;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public final class MyAgentGenerator extends IBaseAgentGenerator<MyCommunicationAgent>
{

    private final CSend m_send;

    private final AtomicLong m_counter = new AtomicLong();

    public MyAgentGenerator(final CSend p_send, final InputStream p_stream ) throws Exception
    {
        super(
                p_stream,

                Stream.concat(
                        CCommon.actionsFromPackage(),
                        Stream.of( p_send )
                ).collect( Collectors.toSet() ),

                IAggregation.EMPTY,

                new CVariableBuilder()
        );

        m_send = p_send;
    }


    public final void unregister( final MyCommunicationAgent p_agent )
    {
        m_send.unregister( p_agent );
    }

    @Override
    public final MyCommunicationAgent generatesingle( final Object... p_data )
    {
        return m_send.register(
                new MyCommunicationAgent(

                        MessageFormat.format( "agent {0}", m_counter.getAndIncrement() ),

                        m_configuration
                )
        );
    }

}
```
<!-- htmlmin:ignore -->



## Send-Action with address resolution

For communication basisc a _send_ action must be created. This actions needs also an _address resolution_ for the agent names, this can be an URL access or a string name. Within this example we use a map with string for the agent name and the value for the agent object. Each generated agent must be registered at this action so that other agents can send messages. The action tries to find the agent object based on the name, builds the goal-trigger and transfer the data to the other agent. On the next cycle call of the receiving agent the message goal-plan will be triggered.

<!-- htmlmin:ignore -->
```java
package myagentproject;

import org.lightjason.agentspeak.action.IBaseAction;
import org.lightjason.agentspeak.agent.IAgent;
import org.lightjason.agentspeak.common.CPath;
import org.lightjason.agentspeak.common.IPath;
import org.lightjason.agentspeak.language.CLiteral;
import org.lightjason.agentspeak.language.CRawTerm;
import org.lightjason.agentspeak.language.ITerm;
import org.lightjason.agentspeak.language.execution.IContext;
import org.lightjason.agentspeak.language.execution.fuzzy.CFuzzyValue;
import org.lightjason.agentspeak.language.execution.fuzzy.IFuzzyValue;
import org.lightjason.agentspeak.language.instantiable.plan.trigger.CTrigger;
import org.lightjason.agentspeak.language.instantiable.plan.trigger.ITrigger;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public final class CSend extends IBaseAction
{
    private final Map<String, MyCommunicationAgent> m_agents = new ConcurrentHashMap<>();

    public final MyCommunicationAgent register( final MyCommunicationAgent p_agent )
    {
        m_agents.put( p_agent.name(), p_agent );
        return p_agent;
    }

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
                                               final List<ITerm> p_return, final List<ITerm> p_annotation )
    {
        final IAgent<?> l_receiver = m_agents.get( p_argument.get( 0 ).<String>raw() );
        if ( l_receiver == null )
            return CFuzzyValue.from( false );

        l_receiver.trigger(
            CTrigger.from(
                ITrigger.EType.ADDGOAL,

                CLiteral.from( "message/receive",

                    CLiteral.from( 
                        "message",
                        p_argument.subList( 1, p_argument.size() ).stream().map( i -> CRawTerm.from( i.raw() ) )
                    ),

                    CLiteral.from(
                        "from",
                        CRawTerm.from( p_context.agent().<MyCommunicationAgent>raw().name() )
                    )
                )

            )
        );

        return CFuzzyValue.from( true );
    }

}
```
<!-- htmlmin:ignore -->




## Variable-Builder

The variable builder allows to create _individual variables and constants_ during runtin within a plan. In this case we crate the constant ```MyName``` which stores the individual agent name. The ```raw```-method allows to create an object reference with a safe-cast. The variable builder is added to the agent factory.

<!-- htmlmin:ignore -->
```java
package myagentproject;

import org.lightjason.agentspeak.agent.IAgent;
import org.lightjason.agentspeak.language.execution.IVariableBuilder;
import org.lightjason.agentspeak.language.instantiable.IInstantiable;
import org.lightjason.agentspeak.language.variable.CConstant;
import org.lightjason.agentspeak.language.variable.IVariable;

import java.util.stream.Stream;

public final class CVariableBuilder implements IVariableBuilder
{
    @Override
    public final Stream<IVariable<?>> generate(IAgent<?> p_agent, IInstantiable p_runningcontext )
    {
        return Stream.of(
            new CConstant<>( "MyName", p_agent.<MyCommunicationAgent>raw().name() )
        );
    }
}
```


