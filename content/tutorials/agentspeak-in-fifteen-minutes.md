---
title: "Tutorial: Develop an AgentSpeak Scenario in 15 Minutes"
jsonld: ["techarticle"]
---

This tutorial explains how to develop a simple, but full working scenario in 15 minutes with the most recent version of the AgentSpeak(L++) source code.

__Note: This tutorial aims at developers of multi-agent systems (MAS) and requires some basic understanding in programming.__

{{< toc >}}

## Tools You Need

* Working Maven $\geq$ 3.1 [installation](http://maven.apache.org/install.html).
* Java __JDK__ 1.8 installation which can be obtained [here](http://www.oracle.com/technetwork/java/javase/downloads/index.html).
* Git installation (optional, but recommended)
  * Linux: Installing ``git`` via your favourite package manager should be sufficient.
  * MacOS: Using [Homebrew](http://brew.sh) with ```brew install git```.
  * [Git for Windows](https://git-for-windows.github.io)
  

## Introduction

This tutorial gives you a _very short_ introduction into LightJason's AgentSpeak(L++) structure. Our [source code documentation](http://lightjason.github.io/AgentSpeak/sources/index.html) can help you in developing your own MAS project according to your individual requirements. 

__Note:__ Don't hesitate to ask questions via email or on the [issue tracker](https://github.com/LightJason/AgentSpeak/issues).

This tutorial is structured as follows:
First you will build AgentSpeak(L++) from source and install the resulting _AgentSpeak_ package on your system, making it available as a dependency for your own MAS project.
Then you will create your own MAS project based on the template created by the Maven tool.

All further configuration of ```xml``` files and programming will then take place in your own project's directory.

For the following sections we assume that you are working inside the directory ```Developer```. You are of course free to choose your own, in which case, please replace ```Developer``` accordingly.

## Build AgentSpeak(L++) from the Sources

1. Obtain the current source code from [AgentSpeak(L++)](https://github.com/LightJason/AgentSpeak) and place it into ```Developer/AgentSpeak```. This can be done on the command line either via Git 

    <!-- htmlmin:ignore -->
    ```commandline
    cd Developer
    git clone https://github.com/LightJason/AgentSpeak.git
    ```
    <!-- htmlmin:ignore -->

    or by downloading the [ZIP archive](https://github.com/LightJason/AgentSpeak/archive/master.zip) and extracting it to ```Developer```.
    
    <!-- htmlmin:ignore -->
    ```commandline
    cd Developer
    unzip AgentSpeak-master.zip
    ```
    <!-- htmlmin:ignore -->
    
    __Note:__ If you chose to download the _ZIP archive_, be aware that the resulting directory will be ```AgentSpeak-master```. Either rename it to ```AgentSpeak``` or keep this in mind in the following sections.
    
    You should now have the following directory structure:
    
    <!-- htmlmin:ignore -->
    ```commandline
    ├── Developer/
    │   └── AgentSpeak/      
    ```
    <!-- htmlmin:ignore -->

2. Change into the AgentSpeak project directory ```Developer/AgentSpeak``` and run ```mvn install``` to build and install AgentSpeak:

    <!-- htmlmin:ignore -->
    ```commandline
    cd Developer/AgentSpeak
    mvn install
    ```
    <!-- htmlmin:ignore -->
    
    AgentSpeak will be installed as a local maven artifact in the directory ```~/.m2``` and can be imported as a dependency by your project.
    
    The build process should terminate with a ```BUILD SUCCESS``` message.

## Maven Project Configuration

1. Create an empty Maven project (see [Maven in 5 minutes tutorial](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)) inside the ```Developer``` directory:
    
    <!-- htmlmin:ignore -->
    ```commandline
    cd Developer
    mvn archetype:generate -DgroupId=myagentproject -DartifactId=myagentapp -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
    ```
    <!-- htmlmin:ignore -->
    
    Maven will then create a project template, resulting in the following directory structure:
    
    <!-- htmlmin:ignore -->
    ```commandline
    ├── Developer/
    │   └── AgentSpeak/ <-- AgentSpeak project (added in previous section)
    │   └── myagentapp/ <-- created by Maven
    │       ├── pom.xml
    │       └── src/
    │           ├── main/
    │           │   └── java/
    │           │       └── myagentproject/
    │           │           └── App.java
    │           └── test/
    │               └── java/
    │                   └── myagentproject/
    │                       └── AppTest.java    
    ```
    <!-- htmlmin:ignore -->
    
    ```Developer/myagentapp/``` is the directory in which your own MAS projects resides.
    
2. Take a note of the current values of ```groupId```, ```artifactId``` and ```version``` from the AgentSpeak [pom.xml](https://github.com/LightJason/AgentSpeak/blob/master/pom.xml#L27) and put them inside the corresponding tags of the following excerpt (replace ```from AgentSpeak(L++) pom.xml``` with the correct value):
    
	<!-- htmlmin:ignore -->
    ```xml
	<dependency>
	    <groupId>from AgentSpeak(L++) pom.xml</groupId>
	    <artifactId>from AgentSpeak(L++) pom.xml</artifactId>
	    <version>from AgentSpeak(L++) pom.xml</version>
	</dependency>
    ```
    <!-- htmlmin:ignore -->
    
    Inside ```Developer/myagentapp/``` open the ```pom.xml``` with your favourite (programming) editor, navigate to the ```<dependencies>``` section and add the completed excerpt above or below the already present ```<dependency>``` entries (for example, you will also find an entry for JUnit within this section).
    
3. __For LightJason/AgentSpeak to run, it is crucial to enforce Java 1.8 support__ in your project. Add the following entry before the ```<dependencies>``` section:

	<!-- htmlmin:ignore -->
    ```xml
    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>
    ``` 
    <!-- htmlmin:ignore -->

4. Put the following code inside the ```<project>``` section, e.g. after ```</dependencies>```, to include the [Maven Shade Plugin](https://maven.apache.org/plugins/maven-shade-plugin/examples/executable-jar.html) which creates an executable JAR when you build your project with ```mvn package```.

	<!-- htmlmin:ignore -->
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
                                    <!-- here you must provide the full name of the class which contains the main method -->
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
    <!-- htmlmin:ignore -->
    
5. Test-build your project by running ``mvn package`` inside ```Developer/myagentapp/```, i.e. where your ``pom.xml`` is located:

    <!-- htmlmin:ignore -->
    ```bash
    cd Developer/myagentapp/
    mvn package
    ```
    
    It should print ```BUILD SUCCESS```. 
    
    The resulting, runnable JAR is located at  ```Developer/myagentapp/target/myagentapp-1.0-SNAPSHOT.jar```.

6. Import your Maven project into your favourite IDE.

## Agent and Generator Classes

__Note:__ The file names and paths provided in the following sections are relative to your project folder. For example ```src/main/java/myagentproject/MyAgent.java``` refers to the file ```MyAgent.java``` located at ```Developer/myagentapp/src/main/java/myagentproject/```.

### <a id="agentclass"></a> Agent Class
Each agent, which you use, must be inherited from our base class {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/d3/d39/interfaceorg_1_1lightjason_1_1agentspeak_1_1agent_1_1IAgent_3_01T_01extends_01IAgent_3_04_4_01_4__coll__graph.svg" "IAgent" >}} interface, but we recommend our {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/d6/df3/classorg_1_1lightjason_1_1agentspeak_1_1agent_1_1IBaseAgent_3_01T_01extends_01IAgent_3_04_4_01_4__coll__graph_org.svg" "IBaseAgent" >}} with a complete execution mechanism. __Please note__ that you need to pass your agent class as a generic parameter to the definition of a LightJason agent class.

Create an agent class ```MyAgent.java``` in ```src/main/java/myagentproject/``` as follows:

<!-- htmlmin:ignore -->
```java
package myagentproject;

import org.lightjason.agentspeak.agent.IBaseAgent;
import org.lightjason.agentspeak.configuration.IAgentConfiguration;

/* basic agent structure */
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
}

```
<!-- htmlmin:ignore -->

### Agent Generator Class

Next create your own {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/d1/dc9/interfaceorg_1_1lightjason_1_1agentspeak_1_1generator_1_1IAgentGenerator_3_01T_01extends_01IAgent_3_04_4_01_4__inherit__graph.svg" "agent generator" >}} (agent factory). This component is based on the [UML factory pattern](https://en.wikipedia.org/wiki/Factory_method_pattern). Within the factory the agent script (ASL) is parsed once and you can generate a lot of agents with a single factory. We support a general implementation of the factory the {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/dc/d04/classorg_1_1lightjason_1_1agentspeak_1_1generator_1_1IBaseAgentGenerator_3_01T_01extends_01IAgent_3_04_4_01_4__coll__graph.svg" "IBaseAgentGenerator" >}}.

Create an agent generator class ```MyAgentGenerator.java``` in ```src/main/java/myagentproject/``` as follows:

<!-- htmlmin:ignore -->
```java
package myagentproject;

import org.lightjason.agentspeak.common.CCommon;
import org.lightjason.agentspeak.generator.IBaseAgentGenerator;
import org.lightjason.agentspeak.language.score.IAggregation;

import java.util.stream.Stream;
import java.io.InputStream;
import java.util.stream.Collectors;


/**
 * agent generator to create agents
 */
public final class MyAgentGenerator extends IBaseAgentGenerator<MyAgent>
{
    /**
     * @param p_stream ASL code as any stream e.g. FileInputStream
     */
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

    /**
     * generator method of the agent
     *
     * @param p_data any data which can be put from outside to the generator method
     * @return returns an agent
     */
    @Override
    public final MyAgent generatesingle( final Object... p_data )
    {
        return new MyAgent( m_configuration );
    }
}
```
<!-- htmlmin:ignore -->


### Write Your Own Runtime

In this section you will write your own runtime[^runtime] within the ```main``` method of the ```App``` class.
The runtime is responsible for running the agents in each cycle.
We are using [Java streams](https://docs.oracle.com/javase/tutorial/collections/streams/) to execute the agent, but you can use also a [thread-pool](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/Executors.html), because all agents implement the [Callable](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/Callable.html) interface (the [Future](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/Future.html) object is the agent in the state $cycle + 1$)

<!-- htmlmin:ignore -->
```java
package myagentproject;

import java.io.FileInputStream;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * main application with runtime
 */
public final class App
{

    static
    {
        // disable logger
        LogManager.getLogManager().reset();
    }
    

    /**
     * private constructor to avoid any instantiation
     */
    private App()
    {
    }

    /**
     * main method
     *
     * @param p_args command-line arguments
     */
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
                .generatemultiple( Integer.parseInt( p_args[1] ) )
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
                }
                catch ( final Exception l_exception )
                {
                    l_exception.printStackTrace();
                }
            } ) );
    }
}
```
<!-- htmlmin:ignore -->


### Write Your Agent Script

Create a simple *Hello World* agent for testing purposes.
Add a file ```agent.asl``` in the top-level directory of your project with the following content:

<!-- htmlmin:ignore -->
<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">// initial-goal
!main.
// initial plan (triggered by the initial goal)
+!main <-
    generic/print("Hello World!");
    !mynextgoal
    .
+!mynextgoal <-
    generic/print("Hello World! (again)", Cycle);
    !mynextgoal
    .
</code></pre>
<!-- htmlmin:ignore -->

The agent starts in cycle $0$ with the initial goal ```!main```. As the plan ```main``` matches, it gets executed, i.e. printing "Hello World" and adding ```mynextgoal``` to be triggered in the next cycle.
In cycle $1$ and preceding cycles $1+n$ the agent will execute the plan ```mynextgoal```, printing ```Hello World! (again)``` with the current cycle number and adds the trigger for the same plan for the preceding cycle.

### Run It

1. Run Maven within your project directory to build the program:

	<!-- htmlmin:ignore -->
    ```commandline
    mvn package
    ```
    <!-- htmlmin:ignore -->
     
2. Run the program to create 500 agents based on the ```agent.asl``` and the agents will run 1000 cycles:

	<!-- htmlmin:ignore -->
    ```commandline
    java -jar target/myagentapp-1.0-SNAPSHOT.jar agent.asl 500 1000
    ```
    <!-- htmlmin:ignore -->

3. Observe the CPU load and time with the print actions (code above) and without (code below): 

	<!-- htmlmin:ignore -->
   <pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">// initial-goal
    !main.
    // initial plan (triggered by the initial goal)
    +!main <-
        !mynextgoal
        .   
    +!mynextgoal <-
        !mynextgoal
        .
    </code></pre>
    <!-- htmlmin:ignore -->

    i.e. run
    
    <!-- htmlmin:ignore -->
    ```commandline
    java -jar target/myagentapp-1.0-SNAPSHOT.jar agent.asl 500 1000
    ```
    <!-- htmlmin:ignore -->
    
    and compare it with
    
    <!-- htmlmin:ignore -->
    ```commandline
    java -jar target/myagentapp-1.0-SNAPSHOT.jar agent_noprint.asl 500 1000
    ```
    <!-- htmlmin:ignore -->
    
    On a recent dual-core 2C/4T laptop (benchmarked with the Linux/Unix tool ```time```) this yields
    
    <!-- htmlmin:ignore -->
    ```commandline
    time java -jar target/myagentapp-1.0-SNAPSHOT.jar agent.asl 500 1000
    ...
    74.76s user 6.61s system 161% cpu 50.367 total
    ```
    <!-- htmlmin:ignore -->
    
    vs.
    
    <!-- htmlmin:ignore -->
    ```commandline
    time java -jar target/myagentapp-1.0-SNAPSHOT.jar agent_noprint.asl 500 1000
    ...
    45.54s user 1.34s system 307% cpu 15.247 total
    ```
    <!-- htmlmin:ignore -->
    
    It is therefore noteworthy, that 
    * the load gets well distributed across the CPU-cores and
    * too many prints have a negative impact on the performance, as you are then basically benchmarking your shell ;-)
    
    
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
{{% asl "specialgoal" %}}
+!special-goal(X) <-
        generic/print("Special goal with value", X, "triggered in cycle", Cycle);
        R = my/cool-action("Lorem Ipsum.");
        generic/print("The return of my cool action is", R);
        my/very-cool-action(4711)
.
{{% /asl %}}
    <!-- htmlmin:ignore -->
    
    __Note:__ Don't forget to add the semicolon at the end of {{< linelink "" "specialgoal" "4" >}}.
    
3. Again, rebuild the JAR and run it. The output should now look like this:
    
    <!-- htmlmin:ignore -->
    ```commandline
    ...
    inner action is called with value 4,711 by agent myagentproject.MyAgent@c03cf28 ( Cycle: 0 / Trigger: [+!mynextgoal[][]] / Running Plans: [main, special-goal] / Beliefbase: beliefbase (org.lightjason.agentspeak.beliefbase.view.CView@46547924): [] )
    ```
    <!-- htmlmin:ignore -->
    
## Reference Solution

If you struggled at some point or wish to obtain our exemplary solution to this tutorial, you can download the archive containing the source code [here](/download/agentspeak-in-15min.zip). 

__Be aware__ that if you build AgentSpeak from the _most recent_ sources, the values inside the ```groupId```, ```artifactId``` and ```version``` tags of the AgentSpeak dependency (inside of __your__ ```pom.xml```) will have to correspond to the _most recent_ [pom.xml](https://github.com/LightJason/AgentSpeak/blob/master/pom.xml#L27) in the AgentSpeak(L++) repository.
As of this writing (January 2017) this would be

<!-- htmlmin:ignore -->
```xml
<dependency>
    <groupId>org.lightjason</groupId>
    <artifactId>agentspeak</artifactId>
    <version>0.0.1-SNAPSHOT</version>
</dependency>
```
<!-- htmlmin:ignore -->

but it might change in the future.

[^runtime]: For creating a complex and fast runtime have a look at general object-orientated programming patterns. Here we only provide a short example to show you how you can work with AgentSpeak(L++) agents.
