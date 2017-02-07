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

4. Put the following code inside the ```<project>``` section, e.g. after ```</dependencies>```, to include the [Maven Shade Plugin](https://maven.apache.org/plugins/maven-shade-plugin/examples/executable-jar.html) which creates an executable JAR when you build your project with ```mvn package``` 

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
    ```commandline
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

final class MyAgent extends IBaseAgent<MyAgent>
{
    MyAgent( final IAgentConfiguration<MyAgent> p_configuration )
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

import java.io.InputStream;
import java.util.stream.Collectors;

final class MyAgentGenerator extends IBaseAgentGenerator<MyAgent>
{
    MyAgentGenerator( final InputStream p_stream ) throws Exception
    {
        super(
            p_stream,
            CCommon.actionsFromPackage().collect( Collectors.toSet() ),
            IAggregation.EMPTY
        );
    }

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
import java.util.Collections;
import java.util.Set;
import java.util.logging.LogManager;
import java.util.stream.Collectors;
import java.util.stream.IntStream;


final class App
{

    static
    {
        LogManager.getLogManager().reset();
    }

    private App()
    {
    }

    public static void main( final String[] p_args )
    {
        if ( p_args.length < 2 )
            throw new RuntimeException( "arguments are not set: ASL script, number of agents" );

        final Set<MyAgent> l_agents;
        try
            (
                final FileInputStream l_stream = new FileInputStream( p_args[0] );
            )
        {
            l_agents = Collections.unmodifiableSet(
                new MyAgentGenerator( l_stream )
                    .generatemultiple( Integer.parseInt( p_args[1] ) )
                    .collect( Collectors.toSet() )
            );
        }
        catch ( final Exception l_exception )
        {
            l_exception.printStackTrace();
            return;
        }

        IntStream
            .range(
                0,
                p_args.length < 3
                ? Integer.MAX_VALUE
                : Integer.parseInt( p_args[2] )
            )
            .forEach( j -> l_agents.parallelStream().forEach( i ->
                                                              {
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
    
    

    
## Reference Solution

If you struggled at some point or wish to obtain our exemplary solution with code documentation to this tutorial, you can download the archive containing the source code [here](/download/agentspeak-in-15min.zip). 

__Be aware__ that if you build AgentSpeak from the _most recent_ sources, the values inside the ```groupId```, ```artifactId``` and ```version``` tags of the AgentSpeak dependency (inside of __your__ ```pom.xml```) will have to correspond to the _most recent_ [pom.xml](https://github.com/LightJason/AgentSpeak/blob/master/pom.xml#L27) in the AgentSpeak(L++) repository.

<!-- htmlmin:ignore -->
{{< githubfile "LightJason" "AgentSpeak" "pom.xml" "xml" "<groupId>(.|\n)*?</version>" >}}


```xml
<dependency>
    <groupId>org.lightjason</groupId>
    <artifactId>agentspeak</artifactId>
    <version>0.0.1-SNAPSHOT</version>
</dependency>
```
<!-- htmlmin:ignore -->


[^runtime]: For creating a complex and fast runtime have a look at general object-orientated programming patterns. Here we only provide a short example to show you how you can work with AgentSpeak(L++) agents.
