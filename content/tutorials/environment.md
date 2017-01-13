---
title: "Tutorial: Environment"
jsonld: ["techarticle"]
---

By default, there is no environment in LightJason, because of our system requirements and design; but you can easily write your own. __Keep in mind that all calls of the environment are done in parallel, so many agents might access the environment at the same time with different actions.__ Therefore you must create a thread-safe data structure for your environment. If the environment throws an exception, the action on the agent-side will fail.

{{< toc >}}

## Simple Environment

1. You can create an environment class which any content, but for this tutorial we create two ```synchronized``` methods for a more efficient execution with concurrent data structures and a well-organised source code.

	<!-- htmlmin:ignore -->
    ```java
    public final class Environment
    {
        // method to do something with the agent but method
        // is synchronized to avoid concurrency exceptions
        // @param p_agent agent
        public final synchronized void do_something( final IAgent<?> p_agent )
        {
            // do something with the agent
            // throw an execption for action failing
        }
        
        // method to do something with the agent and value but method
        // is synchronized to avoid concurrency exceptions
        // @param p_agent agent
        // @param p_value double value
        public final synchronized void do_somethingother( final IAgent<?> p_agent, final double p_value )
        {
            // do something with the agent and the value
            // throw an execption for action failing
        }
    }
    ```
    <!-- htmlmin:ignore -->

2. Modify the [agent generator](/tutorials/agentspeak-in-fifteen-minutes/#your-agent-generator-class) and pass the environment to the agent constructor.

	<!-- htmlmin:ignore -->
    ```java
    public final class MyAgentGenerator extends IBaseAgentGenerator<MyAgent>
    {
        // environment reference
        private final Environment m_environment;
    
        // constructor of the generator
        // @param p_environment environment reference        
        // @param p_stream ASL code as any stream e.g. FileInputStream
        public MyAgentGenerator( final Environment p_environment, final InputStream p_stream ) throws Exception
        {
            super(
                p_stream,
    
                Stream.concat(
                    CCommon.actionsFromPackage(),
                    CCommon.actionsFromAgentClass( MyAgent.class ),              
                ).collect( Collectors.toSet() ),
    
                IAggregation.EMPTY
            );
            m_environment = p_environment;
        }
    
        @Override
        public final MyAgent generatesingle( final Object... p_data )
        {
            // put the environment reference to the agent
            return new MyAgent( m_configuration, m_environment );
        }
    }    
    ```
    <!-- htmlmin:ignore -->

3. Modify the [agent class constructor](/tutorials/agentspeak-in-fifteen-minutes/#a-id-agentclass-a-your-agent-class), so you can put an environment inside it and create a [class action](/tutorials/agentspeak-in-fifteen-minutes/#class-actions) to pass the data to/from the environment. If errors occur, throw an exception so the agent plan will fail.

	<!-- htmlmin:ignore -->
    ```java    
    @IAgentAction
    public final class MyAgent extends IBaseAgent<MyAgent>;
    {
        // environment reference
        private final Environment m_environment;
    
        // constructor of the agent
        // @param p_configuration agent configuration of the agent generator        
        // @param p_environment environment reference
        public MyAgent( final IAgentConfiguration<MyAgent> p_configuration, final Environment p_environment,  )
        {
            super( p_configuration );
            m_environment = p_environment;
        }
        
        @IAgentActionFilter
        @IAgentActionName( name = "env/action" )
        private void envaction()
        {
            // method can throw an exception for action failing
            m_environment.do_something( this );
        }
        
        @IAgentActionFilter
        @IAgentActionName( name = "env/paramaction" )
        private void envotheraction( final Number p_value )
        {
            // method can throw an exception for action failing
            m_environment.do_somethingother( this, p_value.doubleValue() );
        }
    
    }
    ```
    <!-- htmlmin:ignore -->

## Complex Environment

In most cases, you have got a bidirectional connection between agent and environment, so the agent should perceive the environment (reads data from the environment) and should also modify the environment (by executing actions).
So we combine the [efficient beliefbase tutorial](/tutorials/efficient-beliefbase) with the [simple environment code](#create-simple-environment).

## Multiple Environments

By the system design an agent can deal with multiple environments:
Each environment can be referenced by an unique name, which is used for the literal functor.
LightJason's [unifcation](/knowledgebase/logicalprogramming/#unifaction) and [variables](/knowledgebase/logicalprogramming/#variables) allow to store an environment object.
The reference to the environment object can be passed to the action. The agent also has access to the beliefbase to get knowledge about the current environment state, which can changed at any time, e.g. by [communication](/tutorials/communication) or by the underlying software system.

<div>
	<div id="content">
   		<span>Typed.js is a <strong>jQuery</strong> plugin.</span>
   		<p>It <em>types</em> out sentences.</p>
   		<p>And then deletes them.</p>
   		<p>Try it out!</p>
   </div>
   <span id="typed" style="white-space:pre;"></span>
</div>