---
title: "Tutorial: Actions"
jsonld: ["techarticle"]
draft: true
---

This tutorial explains the concept and usage of actions.

{{< toc >}}

## What are actions?


## What kind of actions exists?

### Build-in actions

### General-Actions - External Actions

### Object-Actions - Internal Actions


## Technical definition of an action


## How can I create an action?

### Implementation


--
--



## How can I build my own actions?

In general we support two kind of actions:

1. Actions which are standalone classes e.g. for complex calculations.
2. Actions which are methods inside an agent class can be used to build action, which modify the agent Java object or depended Java objects.

### Standalone Actions

Use the {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/d0/dfe/interfaceorg_1_1lightjason_1_1agentspeak_1_1action_1_1IAction__coll__graph.svg" "IAction" >}} interface or the {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/dd/d3e/classorg_1_1lightjason_1_1agentspeak_1_1action_1_1IBaseAction__coll__graph.svg" "IBaseAction" >}} to create your actions.

1. Create a ```MyAction``` class in ```src/main/java/myagentproject/```, which converts an input string into lower-case, as follows: 

	<!-- htmlmin:ignore -->
    ```java
    package myagentproject;

    import org.lightjason.agentspeak.common.CPath;
    import org.lightjason.agentspeak.common.IPath;
    import org.lightjason.agentspeak.action.IBaseAction;
    import org.lightjason.agentspeak.language.execution.IContext;
    import org.lightjason.agentspeak.language.ITerm;
    import org.lightjason.agentspeak.language.CRawTerm;
    import org.lightjason.agentspeak.language.execution.fuzzy.CFuzzyValue;
    import org.lightjason.agentspeak.language.execution.fuzzy.IFuzzyValue;

    import java.util.List;
    import java.util.Locale;
    import java.text.MessageFormat;

    /* action in a external class */
    public final class MyAction extends IBaseAction
    {
        @Override
        public final IPath name()
        {
            return CPath.from( "my/cool-action" );
        }

        @Override
        public final int minimalArgumentNumber()
        {
            return 1;
        }

        @Override
        public final IFuzzyValue<Boolean> execute( final IContext p_context, final boolean p_parallel, final List<ITerm> p_argument, final List<ITerm> p_return,
                                                final List<ITerm> p_annotation )
        {
            // Convert term-value to a Java-type (here String) and create a lower-case string.
            // Note: You don't have to think about the term definition, LightJason does this for you.
            // But it will throw a casting exception if the type of the passed argument is incorrect.
            final String l_argument = p_argument.get( 0 ).<String>raw().toLowerCase( Locale.ROOT );

            // here we do some testing output stuff and the context parameter contains all information
            // in which context the action is called e.g. the agent which calls, current variables, ...
            System.out.println( MessageFormat.format(
                    "standalone action is called from agent {0} with argument \"{1}\"", p_context.agent(), l_argument
            ) );

            // the action should return a value, you can wrap any Java object into LightJasons's terms.
            p_return.add( CRawTerm.from( l_argument ) );

            // actions returns a fuzzy-boolean for successful or failed execution
            // the optional second parameter is a fuzzy-value in [0,1]. default: 1
            return CFuzzyValue.from( true );
        }
    }        
    ```
    <!-- htmlmin:ignore -->

2. To make the action ```my/cool-action``` available to your agents, simply add it to the agents where they get instantiated, i.e. in our case inside the ```MyAgentGenerator``` class.
Replace the code segment

	<!-- htmlmin:ignore -->
    ```java
    // a set with all possible actions for the agent
    Stream.concat(
            // we use all build-in actions of LightJason
            CCommon.actionsFromPackage(),
            CCommon.actionsFromAgentClass( MyAgent.class )
            // build the set with a collector
    ).collect( Collectors.toSet() ),
    ```
    <!-- htmlmin:ignore -->
    
    with
    
    <!-- htmlmin:ignore -->
    ```Java
    // a set with all possible actions for the agent
    Stream.concat(
            // we use all build-in actions of LightJason
            CCommon.actionsFromPackage(),
            Stream.concat(
                    // use the actions which are defined inside the agent class
                    CCommon.actionsFromAgentClass( MyAgent.class ),
                    // add an own external action
                    Stream.of(
                            new MyAction()
                    )
            )
            // build the set with a collector
    ).collect( Collectors.toSet() ),
    ```
    <!-- htmlmin:ignore -->
    
    which adds a instance of ```MyAction``` to the built-in actions of our agents.
    
3. Execute your new action inside the ```special-goal``` plan by modifying your ```agent.asl```

	 <!-- htmlmin:ignore -->
    <pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">+!special-goal(X) <-
        generic/print("Special goal with value", X, "triggered in cycle", Cycle);
        R = my/cool-action("Lorem Ipsum.");
        generic/print("The return of my cool action is", R)
        .
    </code></pre>
    <!-- htmlmin:ignore -->
    
    rebuilding your JAR and running it. The relevant part of the print-out is
    
    <!-- htmlmin:ignore -->
    ```bash
    ...
    standalone action is called from agent myagentproject.MyAgent@38e79ae3 ( Cycle: 0 / Trigger: [+!mynextgoal[][]] / Running Plans: [main, special-goal] / Beliefbase: beliefbase (org.lightjason.agentspeak.beliefbase.view.CView@53db6f10): [] ) with argument lorem ipsum.
    The return of my cool action is   lorem ipsum.
    ```
    <!-- htmlmin:ignore -->
    
    
### Agent Class Actions

To create actions within the agent's class you need to add a method (visibility can be ```public```, ```protected``` or ```private```) inside of it and annotate the class with ```@IAgentAction``` and the method with

<!-- htmlmin:ignore -->
```java
@IAgentActionFilter
@IAgentActionName( name = "my/very-cool-action" )
```

1. Modify your ```MyAgent``` class as follows:

    ```java
    package myagentproject;

    import org.lightjason.agentspeak.action.binding.IAgentAction;
    import org.lightjason.agentspeak.action.binding.IAgentActionFilter;
    import org.lightjason.agentspeak.action.binding.IAgentActionName;
    import org.lightjason.agentspeak.agent.IBaseAgent;
    import org.lightjason.agentspeak.configuration.IAgentConfiguration;
    import org.lightjason.agentspeak.language.CLiteral;
    import org.lightjason.agentspeak.language.CRawTerm;
    import org.lightjason.agentspeak.language.instantiable.plan.trigger.CTrigger;
    import org.lightjason.agentspeak.language.instantiable.plan.trigger.ITrigger;

    import java.text.MessageFormat;


    /** agent class with annotation to mark the class that actions are inside **/
    @IAgentAction
    public final class MyAgent extends IBaseAgent<MyAgent>
    {
        /**
         * constructor of the agent
         *
         * @param p_configuration agent configuration of the agent generator
         **/
        public MyAgent( final IAgentConfiguration<MyAgent> p_configuration )
        {
            super( p_configuration );
        }

        /**
        * overload agent-cycle
        *
        * @return agent self-reference
        */
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

        /**
        *  an inner action inside the agent class,
        * with the annotation that the method is marked as action
        * and the action-name for the ASL script is set
        *
        * @note LightJason supports Long and Double values, so if you declare
        * every numerical value as Number you can handle both types, because
        * number has methods to convert the data
        *
        * @param p_value argument of the action
        */
        @IAgentActionFilter
        @IAgentActionName( name = "my/very-cool-action" )
        private void myaction( final Number p_value )
        {
            System.out.println( MessageFormat.format( "inner action is called with value {0} by agent {1}", p_value, this ) );
        }
    }    
    ```
    <!-- htmlmin:ignore -->

2. Modify the ```special-goal``` plan of your ```agent.asl``` to also execute the *agent class action* ({{< linelink "" "specialgoal" "5" >}}):
<!-- htmlmin:ignore -->
{{% source "agentspeak" "specialgoal" %}}
+!special-goal(X) <-
        generic/print("Special goal with value", X, "triggered in cycle", Cycle);
        R = my/cool-action("Lorem Ipsum.");
        generic/print("The return of my cool action is", R);
        my/very-cool-action(4711)
.
{{% /source %}}
<!-- htmlmin:ignore -->
    
    __Note:__ Don't forget to add the semicolon at the end of {{< linelink "" "specialgoal" "4" >}}.
    
3. Again, rebuild the JAR and run it. The output should now look like this:
    
    <!-- htmlmin:ignore -->
    ```commandline
    ...
    inner action is called with value 4,711 by agent myagentproject.MyAgent@c03cf28 ( Cycle: 0 / Trigger: [+!mynextgoal[][]] / Running Plans: [main, special-goal] / Beliefbase: beliefbase (org.lightjason.agentspeak.beliefbase.view.CView@46547924): [] )
    ```
    <!-- htmlmin:ignore -->

