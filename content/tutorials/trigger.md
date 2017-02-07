---
title: "Tutorial: Triggering"
jsonld: ["techarticle"]
---

This tutorial explain the functionality of _agent triggering_. For understanding purpose of triggers you have to understand the concept of events which is a well-known concept in [UI programming](https://docs.oracle.com/javase/tutorial/uiswing/events/).

{{< toc >}}

## What are triggers?

A short definition of triggers in LightJason's agent concept it is

> an event written in a first-order literal

On the other hand, the agent is

> an event listener which executes a plan iif an event is released


### What kind of trigger exists?



## How can I use them?

### Implementation


--
--

## Trigger A Goal

The agent class has got a [trigger method](http://lightjason.github.io/AgentSpeak/sources/db/d62/interfaceorg_1_1lightjason_1_1agentspeak_1_1agent_1_1IAgent_3_01T_01extends_01IAgent_3_04_4_01_4.html#af453e6a5f02ca05958925af4a8c04c10) which runs a goal, The [CTrigger](http://lightjason.github.io/AgentSpeak/sources/d1/d5a/classorg_1_1lightjason_1_1agentspeak_1_1language_1_1instantiable_1_1plan_1_1trigger_1_1CTrigger.html) class uses four [trigger types](http://lightjason.github.io/AgentSpeak/sources/d9/d18/enumorg_1_1lightjason_1_1agentspeak_1_1language_1_1instantiable_1_1plan_1_1trigger_1_1ITrigger_1_1EType.html) ([addgoal](http://lightjason.github.io/AgentSpeak/sources/d9/d18/enumorg_1_1lightjason_1_1agentspeak_1_1language_1_1instantiable_1_1plan_1_1trigger_1_1ITrigger_1_1EType.html#a8f036453c557da7c573456ab30fea9cb), [deletegoal](http://lightjason.github.io/AgentSpeak/sources/d9/d18/enumorg_1_1lightjason_1_1agentspeak_1_1language_1_1instantiable_1_1plan_1_1trigger_1_1ITrigger_1_1EType.html#a27c788cd71ba696603248697b88c1aa7), [addbelief](http://lightjason.github.io/AgentSpeak/sources/d9/d18/enumorg_1_1lightjason_1_1agentspeak_1_1language_1_1instantiable_1_1plan_1_1trigger_1_1ITrigger_1_1EType.html#a3b940a57e1aef6525a6730ccdb929405), [deletebelief](http://lightjason.github.io/AgentSpeak/sources/d9/d18/enumorg_1_1lightjason_1_1agentspeak_1_1language_1_1instantiable_1_1plan_1_1trigger_1_1ITrigger_1_1EType.html#aedd88e304e671dc112395eeffe010645)) and a literal for execution. The third parameter is a boolean flag to run the immediately otherwise the goal will be run within the next cycle.

<!-- htmlmin:ignore -->
```java
agent.trigger(
    CTrigger.from(
        ITrigger.EType.ADDGOAL,
        CLiteral.from( 
            "foo/goal",
            CRawTerm.from( 1234 )
        )        
    )
);
```
<!-- htmlmin:ignore -->


### Trigger on each cycle

If you need a goal-trigger based on any external data, we recommend to overload the agent's ```call()``` method and put the trigger into it, e.g.

<!-- htmlmin:ignore -->
```java
// overload agent-cycle
@Override
public final MyAgent call() throws Exception
{
    // create goal trigger based on a condition
    if ( any condition )
        this.trigger(
            CTrigger.from(
                ITrigger.EType.ADDGOAL,
                CLiteral.from( 
                    "condition-goal",
                    CRawTerm.from( any value )
                )        
        );

    // run default cycle
    return super.call();
}
```
<!-- htmlmin:ignore -->

1. To try this out modify your ```MyAgent``` class as follows
    
    <!-- htmlmin:ignore -->
    ```java
    package myagentproject;
    
    import org.lightjason.agentspeak.agent.IBaseAgent;
    import org.lightjason.agentspeak.configuration.IAgentConfiguration;
    import org.lightjason.agentspeak.language.CLiteral;
    import org.lightjason.agentspeak.language.CRawTerm;
    import org.lightjason.agentspeak.language.instantiable.plan.trigger.CTrigger;
    import org.lightjason.agentspeak.language.instantiable.plan.trigger.ITrigger;
    
    /* complex agent */
    public final class MyAgent extends IBaseAgent<MyAgent>
    {
        // constructor of the agent
        // @param p_configuration agent configuration of the agent generator
        public MyAgent( final IAgentConfiguration<MyAgent> p_configuration )
        {
            super( p_configuration );
        }
    
        // overload agent-cycle
        @Override
        public final MyAgent call() throws Exception
        {
            // create goal trigger based on a condition
            this.trigger(
                CTrigger.from(
                    ITrigger.EType.ADDGOAL,
                    CLiteral.from(
                        "special-goal",
                        CRawTerm.from( 2342 )
                    )
                )
            );
    
            // run default cycle
            return super.call();
        }
    }
    
    ```
    <!-- htmlmin:ignore -->
    
    and add the following to your ```agent.asl```
    
    <!-- htmlmin:ignore -->
    <pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">+!special-goal(X) <-
        generic/print("Special goal with value", X, "triggered in cycle", Cycle)
        .
    </code></pre>
    <!-- htmlmin:ignore -->
    
2. Rebuild you JAR (```mvn package```) and run it with your modified ```agent.asl```. You should see the prints of the triggered ```special-goal```:
         
    <!-- htmlmin:ignore -->
    ```bash
    Hello World!
    Special goal with value   2342   triggered in cycle   0
    Hello World! (again)   1
    Special goal with value   2342   triggered in cycle   1
    Hello World! (again)   2
    Special goal with value   2342   triggered in cycle   2
    ...
    ```
    <!-- htmlmin:ignore -->
