---
title: "Tutorial: Environment"
---

There is no environment on LightJason's AgentSpeak(L++), because of system design it is not needed anymore, but you can easily write your own. __Keep in mind, that all calls of the environment are done in parallel, so many agents might access the environment at the same time with different actions.__ Therefore you must create a thread-safe data structure for your environment. If the environment throws an exception the action on the agent-side will fail.

{{< toc >}}

## Create simple environment

1. create an environment class which any content, but we create here two ```synchronized``` method for a more efficient execution you need to think about concurrency data structures and well-organized source code

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

2. modify the [agent generator](/tutorials/agentspeak-in-fifteen-minutes/#your-agent-generator-class) and pass the environment to the agent constructor 

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

3. modify the [agent class constructor](/tutorials/agentspeak-in-fifteen-minutes/#a-id-agentclass-a-your-agent-class), so that can be put an environment inside and create [class action](/tutorials/agentspeak-in-fifteen-minutes/#class-actions) to pass the data to / from the environment, on errors throw an exception and the agent plan will fail

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

## Complex environment

In most cases you have got a _bidirectional connection_ between agent and environment, so the agent should perceive the environment (reads data from the environemnt) and should also modify the environment (by executing actions). So we combine the [efficient beliefbase tutorial](/tutorials/efficient-beliefbase) with the [simple environment code](#create-simple-environment).

## Multiple environments

On the system design an agent can deal with multiple environments, in a short view we can definied it with:

> Each environment will be referenced by an unique name, which is used for the literal functor.
> LightJason [unifcation](/knowledgebase/basic-logicalprogramming/#unifaction) and [variables](/knowledgebase/logicalprogramming/#variables) allows to store an environment object, so the environment object
> can be passed to the action. The agent gets also an beliefbase to get knowledge
> about the current environment references, which can be changed at any time e.g. by [communication](/tutorials/communication) or by the underlying software system.

