---
title: "Tutorial: AgentSpeak scenario in 15 minutes"
jsonld: ["techarticle"]
---

This tutorial explains how to build a simple, but full working scenario in 15 minutes with the current developing source code. You can download the [source codes](/download/agentspeak-in-15min.zip)

{{< toc >}}

## Tools you need

* Working Maven $\geq$ 3.1 [installation](http://maven.apache.org/install.html)
* Java JDK 1.8 installation which can be found by Maven

## Introduction

The tutorial give you a _very short_ introduction into LightJason's AgentSpeak(L++) structure. A fully [source code documentation](http://lightjason.github.io/AgentSpeak/sources/index.html) can help to develop your individuell requirements. Do not be afraid to ask via email or on the [issue tracker](https://github.com/LightJason/AgentSpeak/issues)

## AgentSpeak(L++) from the sources

1. Download the current source codes from [AgentSpeak(L++)](https://github.com/LightJason/AgentSpeak) as Zip or via Git:
    
    ```bash
    git clone https://github.com/LightJason/AgentSpeak.git
    ```

2. Run ```mvn``` within the source code directory. AgentSpeak(L++) should build and you can use it.

## Maven project configuration

1. Copy the ```groupId```, ```artifactId``` and ```version``` from the [pom.xml](https://github.com/LightJason/AgentSpeak/blob/master/pom.xml#L27) of the current AgentSpeak(L++) project.

2. Create a Maven project (we recommend the [Maven in 5 minutes tutorial](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)) with

    ```bash
    mvn archetype:generate -DgroupId=myagentproject -DartifactId=myagentapp -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
    ```

3. Open the ```pom.xml```, navigate to the ```dependency``` section and add AgentSpeak(L++) reference (you will find an entry for JUnit within the section): 

    ```xml
        <dependency>
            <groupId>org.lightjason</groupId>
            <artifactId>AgentSpeak</artifactId>
            <version>version from AgentSpeak(L++) pom.xml</version>
        </dependency>
    ```

4. For enabling the Java 1.8 support, add the following entry before the ```dependency``` section:

    ```xml
        <properties>
            <maven.compiler.source>1.8</maven.compiler.source>
            <maven.compiler.target>1.8</maven.compiler.target>
        </properties>
    ``` 

5. Put the following code under the ```dependency``` section of the [Maven Shade Plugin](https://maven.apache.org/plugins/maven-shade-plugin/examples/executable-jar.html) to create an executable Jar

    ```xml
    <build>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-shade-plugin</artifactId>
                    <version>2.4.3</version>
                    <executions>
                        <execution>
                            <phase>package</phase>
                            <goals>
                                <goal>shade</goal>
                            </goals>
                            <configuration>
                                <transformers>
                                    <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                                        <!-- here must be set the full name of the class which contains the main method -->
                                        <mainClass>myagentproject.App</mainClass>
                                    </transformer>
                                </transformers>
                            </configuration>
                        </execution>
                    </executions>
                </plugin>
            </plugins>
    </build>
    ```

6. Import your Maven project into your favorite IDE.

## Agent and generator

### <a id="agentclass"></a> Your agent class
Each agent, which you use, must be inherited from our base class {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/d3/d39/interfaceorg_1_1lightjason_1_1agentspeak_1_1agent_1_1IAgent_3_01T_01extends_01IAgent_3_04_4_01_4__coll__graph.svg" "IAgent" >}} interface, but we recommand our {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/d6/df3/classorg_1_1lightjason_1_1agentspeak_1_1agent_1_1IBaseAgent_3_01T_01extends_01IAgent_3_04_4_01_4__coll__graph_org.svg" "IBaseAgent" >}} with a fully executable mechanism. __Please note__ that you need to pass your agent class as a generic parameter to the definitions of LightJason agents:

```java
package myagentproject;

import org.lightjason.agentspeak.agent.IBaseAgent;
import org.lightjason.agentspeak.configuration.IAgentConfiguration;

public final class MyAgent extends IBaseAgent<MyAgent>
{
    // constructor of the agent
    // @param p_configuration agent configuration of the agent generator
    public MyAgent( final IAgentConfiguration<MyAgent> p_configuration )
    {
        super( p_configuration );
    }
}
```

### Your agent generator class

Create your own {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/d1/dc9/interfaceorg_1_1lightjason_1_1agentspeak_1_1generator_1_1IAgentGenerator_3_01T_01extends_01IAgent_3_04_4_01_4__inherit__graph.svg" "agent generator" >}} (agent factory). This component is based on the [UML factory pattern](https://en.wikipedia.org/wiki/Factory_method_pattern). Within the factory the agent script (ASL) is parsed once and you can generate a lot of agents with a single factory. We support a general implementation of the factory the {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/dc/d04/classorg_1_1lightjason_1_1agentspeak_1_1generator_1_1IBaseAgentGenerator_3_01T_01extends_01IAgent_3_04_4_01_4__coll__graph.svg" "IBaseAgentGenerator" >}}:

```java
package myagentproject;

import org.lightjason.agentspeak.common.CCommon;
import org.lightjason.agentspeak.generator.IBaseAgentGenerator;
import org.lightjason.agentspeak.language.score.IAggregation;

import java.util.stream.Stream;
import java.io.InputStream;
import java.util.stream.Collectors;


public final class MyAgentGenerator extends IBaseAgentGenerator<MyAgent>
{
    // constructor of the generator
    // @param p_stream ASL code as any stream e.g. FileInputStream
    public MyAgentGenerator( final InputStream p_stream ) throws Exception
    {
        super(
            // input ASL stream
            p_stream,
            
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
            
            // aggregation function for the optimization function, here
            // we use an empty function
            IAggregation.EMPTY
        );
    }
    
    // generator method of the agent
    // @param p_data any data which can be put from outside to the generator method
    // @return returns an agent
    @Override
    public final MyAgent generatesingle( final Object... p_data )
    {
        return new MyAgent( m_configuration );
    }
}
```


### Write your runtime

Write your own runtime[^runtime] within the ```main``` method and let the agents run. We are using [Java streams](https://docs.oracle.com/javase/tutorial/collections/streams/) to execute the agent, but you can use also a [thread-pool](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/Executors.html) because all agents are implements the [Callable](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/Callable.html) interface (the [Future](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/Future.html) object is the agent in the state $cycle + 1$)

```java
package myagentproject;

import java.io.FileInputStream;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public final class App 
{
    private App()
    {
    }

    public static void main( final String[] p_args ) throws Exception
    {
        // parameter of the command-line arguments:
        // 1. ASL file
        // 2. number of agents
        // 3. number of iterations (if not set maximum)
        final Set<MyAgent> l_agents;
        try
        ( 
            final FileInputStream l_stream = new FileInputStream( p_args[0] );
        )
        {
            l_agents = new MyAgentGenerator( l_stream )
                            .generatemultiple( Integer.parseInt(p_args[1]) )
                            .collect( Collectors.toSet() );
        } catch ( final Exception l_exception )
        {
            l_exception.printStackTrace();
            return;
        }
        
        // runtime call (with parallel execution)
        IntStream
            .range(
                0, 
                p_args.length < 3 
                ? Integer.MAX_VALUE
                : Integer.parseInt( p_args[2] ) 
            )
            .forEach( j -> l_agents.parallelStream().forEach( i -> {
                try
                {
                    i.call();
                } catch ( final Exception l_exception )
                {
                    l_exception.printStackTrace();
                }
            } ) );
    }
}
```

### Finally

1. Run Maven within the source directory to build the program:
```bash
mvn package
```
     
2. Run the program to create 500 agents based on the ```agent.asl``` and the agents will run 1000 cycles:
```bash
java -jar target/myagentapp-1.0-SNAPSHOT.jar agent.asl 500 1000
```

## Trigger a goal

The agent class has got a [trigger method](http://lightjason.github.io/AgentSpeak/sources/db/d62/interfaceorg_1_1lightjason_1_1agentspeak_1_1agent_1_1IAgent_3_01T_01extends_01IAgent_3_04_4_01_4.html#af453e6a5f02ca05958925af4a8c04c10) which runs a goal, The [CTrigger](http://lightjason.github.io/AgentSpeak/sources/d1/d5a/classorg_1_1lightjason_1_1agentspeak_1_1language_1_1instantiable_1_1plan_1_1trigger_1_1CTrigger.html) class uses four [trigger types](http://lightjason.github.io/AgentSpeak/sources/d9/d18/enumorg_1_1lightjason_1_1agentspeak_1_1language_1_1instantiable_1_1plan_1_1trigger_1_1ITrigger_1_1EType.html) ([addgoal](http://lightjason.github.io/AgentSpeak/sources/d9/d18/enumorg_1_1lightjason_1_1agentspeak_1_1language_1_1instantiable_1_1plan_1_1trigger_1_1ITrigger_1_1EType.html#a8f036453c557da7c573456ab30fea9cb), [deletegoal](http://lightjason.github.io/AgentSpeak/sources/d9/d18/enumorg_1_1lightjason_1_1agentspeak_1_1language_1_1instantiable_1_1plan_1_1trigger_1_1ITrigger_1_1EType.html#a27c788cd71ba696603248697b88c1aa7), [addbelief](http://lightjason.github.io/AgentSpeak/sources/d9/d18/enumorg_1_1lightjason_1_1agentspeak_1_1language_1_1instantiable_1_1plan_1_1trigger_1_1ITrigger_1_1EType.html#a3b940a57e1aef6525a6730ccdb929405), [deletebelief](http://lightjason.github.io/AgentSpeak/sources/d9/d18/enumorg_1_1lightjason_1_1agentspeak_1_1language_1_1instantiable_1_1plan_1_1trigger_1_1ITrigger_1_1EType.html#aedd88e304e671dc112395eeffe010645)) and a literal for execution. The third parameter is a boolean flag to run the immediately otherweise the goal will be run within the next cycle.

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

### Trigger on each cycle

If you need a goal-trigger based on any external data, we recommand the following structure

```java
package myagentproject;

import org.lightjason.agentspeak.agent.IBaseAgent;
import org.lightjason.agentspeak.configuration.IAgentConfiguration;

public final class MyAgent extends IBaseAgent<MyAgent>
{
    // constructor of the agent
    // @param p_configuration agent configuration of the agent generator
    public MyAgent( final IAgentConfiguration<MyAgent> p_configuration )
    {
        super( p_configuration );
    }
}

// overload agent-cycle
@Override
public final MyAgent call() throws Exception
{
    // create goal trigger based on a condition
    if (any condition)
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

## How can I build my own actions?

In general we support two kind of actions:

* Actions which are standalone classes e.g. for complex calculations.
* Actions which are methods inside an agent class can be used to build action, which modify the agent Java object or depended Java objects.

### Standalone action

Use the {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/d0/dfe/interfaceorg_1_1lightjason_1_1agentspeak_1_1action_1_1IAction__coll__graph.svg" "IAction" >}} interface or the {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/dd/d3e/classorg_1_1lightjason_1_1agentspeak_1_1action_1_1IBaseAction__coll__graph.svg" "IBaseAction" >}} to create your actions. 

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
            // convert term-value to the Java-type (here String) and create a lower-case string
            // you don't think about the term definition, LightJason does this for you, but
            // it can be create a casting exception if the type is incorrect
            final String l_argument = p_argument.get(0).<String>raw().toLowerCase(Locale.ROOT);

            // here we do some testing output stuff and the context parameter contains all information
            // in which context the action is called e.g. the agent which calls, current variables, ...
            System.out.println( MessageFormat.format( "standalone action is called from agent {0}", p_context.agent() ) );

            // the action should return a value, you can wrap each Java type into LightJason
            p_return.add( CRawTerm.from( l_argument ) );

            // the actions returns a fuzzy-boolean for successful or failing execution
            // the optional second parameter is a fuzzy-value in [0,1] on default it is 1
            return CFuzzyValue.from( true );
        }
}
```

### Class actions

You need to write a method (visibility can be ```public```, ```protected``` or ```private```) inside your agent class:

```java
package myagentproject;

import org.lightjason.agentspeak.agent.IBaseAgent;
import org.lightjason.agentspeak.configuration.IAgentConfiguration;
import org.lightjason.agentspeak.action.binding.IAgentAction;
import org.lightjason.agentspeak.action.binding.IAgentActionFilter;
import org.lightjason.agentspeak.action.binding.IAgentActionName;

import java.text.MessageFormat;

// annotation to mark the class, that actions are inside
@IAgentAction
public final class MyAgent extends IBaseAgent<MyAgent>
{
    // constructor of the agent
    // @param p_configuration agent configuration of the agent generator
    public MyAgent( final IAgentConfiguration<MyAgent> p_configuration )
    {
        super( p_configuration );
    }

    // an inner action inside the agent class,
    // with the annotation the method is marked as action
    // and the action-name for the ASL script is set
    // @param p_value argument of the action
    // @note LightJason supports Long and Double values, so if you declare
    // every numerical value as Number you can handle both types, because
    // number has methods to convert the data
    @IAgentActionFilter
    @IAgentActionName( name = "my/very-cool-action" )
    private void myaction( final Number p_value )
    {
        System.out.println( MessageFormat.format( "inner action is called with value {0} by agent {1}", p_value, this ) );
    }

}
```

[^runtime]: For creating a complex and fast runtime you need to take a look at general object-orientated programming pattern. Here we only provide a short example to show you how you can work with Agentspeak(L++) agents.
