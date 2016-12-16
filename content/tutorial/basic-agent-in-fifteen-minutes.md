---
title: "Basic Knowledge: Agent scenario in 15 minutes"
---
This tutorial shows an example of a scenario in 15 minutes with the current developing source code. You can build a full working scenario.

## Tools you need

* working Maven $\geq$ 3.1 [installation](http://maven.apache.org/install.html)
* JDK 1.8 installation which can be found by Maven

## Tutorial

### AgentSpeak(L++) Installation

1. Download the current source codes from [AgentSpeak(L++)](https://github.com/LightJason/AgentSpeak) with Git or as Zip
2. Run within the source code directory ```mvn```. AgentSpeak(L++) builds and after that you can use it

### Project Configuration

1. Copy the ```groupId```, ```artifactId``` and ```version``` from the [pom.xml](https://github.com/LightJason/AgentSpeak/blob/master/pom.xml#L27) of the current AgentSpeak(L++) project

2. Create a Maven project (we recommand the [Maven in 5 minutes tutorial](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)) with
<pre><code class="language-bash">mvn archetype:generate -DgroupId=myagentproject -DartifactId=myagentapp -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false</code></pre>

3. Open the ```pom.xml```, navigate to the ```dependency``` section and add AgentSpeak(L++) reference (you found an entry for JUnit within the section):
<pre><code class="language-xml">
    &lt;dependency&gt;
        &lt;groupId&gt;org.lightjason&lt;/groupId&gt;
        &lt;artifactId&gt;AgentSpeak&lt;/artifactId&gt;
        &lt;version&gt;version from AgentSpeak(L++) pom.xml&lt;/version&gt;
    &lt;/dependency&gt;
</code></pre>    

4. For enabeling the Java 1.8 support, add before the ```dependency``` section the following entry
<pre><code class="language-xml"> 
    &lt;properties>
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;
</code></pre>   

5. Put under the ```dependency``` section the following code of the [Maven Shade Plugin](https://maven.apache.org/plugins/maven-shade-plugin/examples/executable-jar.html) to create an executable jar
<pre><code class="language-xml">&lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-shade-plugin&lt;/artifactId&gt;
                &lt;version&gt;2.4.3&lt;/version&gt;
                &lt;executions&gt;
                    &lt;execution&gt;
                        &lt;phase&gt;package&lt;/phase&gt;
                        &lt;goals&gt;
                            &lt;goal&gt;shade&lt;/goal&gt;
                        &lt;/goals&gt;
                        &lt;configuration&gt;
                            &lt;transformers&gt;
                                &lt;transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer"&gt;
                                    &lt;!-- here must be set the full name of the class which contains the main method --&gt;
                                    &lt;mainClass&gt;myagentproject.App&lt;/mainClass&gt;
                                &lt;/transformer&gt;
                            &lt;/transformers&gt;
                        &lt;/configuration&gt;
                    &lt;/execution&gt;
                &lt;/executions&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
&lt;/build&gt;</code></pre>  

6. import you Maven project into your favorite IDE

## Agent Build and Execution

1. Create your agent class. Each agent, which you use, must be inherit from our base class {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/d3/d39/interfaceorg_1_1lightjason_1_1agentspeak_1_1agent_1_1IAgent_3_01T_01extends_01IAgent_3_04_4_01_4__coll__graph.svg" "IAgent" >}} interface, but we recommand our {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/d6/df3/classorg_1_1lightjason_1_1agentspeak_1_1agent_1_1IBaseAgent_3_01T_01extends_01IAgent_3_04_4_01_4__coll__graph_org.svg" "IBaseAgent" >}} with a fully executable mechanism:
<pre><code class="language-java">
package myagentproject;
import org.lightjason.agentspeak.agent.IBaseAgent;
import org.lightjason.agentspeak.configuration.IAgentConfiguration;
public final class MyAgent extends IBaseAgent&lt;MyAgent&gt;
{
        //constructor of the agent
        //@param p_configuration agent configuration of the agent generator
        public MyAgent( final IAgentConfiguration&lt;MyAgent&gt; p_configuration )
        {
            super( p_configuration );
        }
}
</code></pre>
__Please note__ that you need to pass your agent class as a generic parameter to the definitions of LightJason agents.

2. Create your own {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/d1/dc9/interfaceorg_1_1lightjason_1_1agentspeak_1_1generator_1_1IAgentGenerator_3_01T_01extends_01IAgent_3_04_4_01_4__inherit__graph.svg" "agent generator" >}} (agent factory). This componenent based on the [UML factory pattern](https://en.wikipedia.org/wiki/Factory_method_pattern). Within the factory the agent script (ASL) is parsed once and you can generate a lot of agents with a single factory . We support a general implementation of the factory the {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/dc/d04/classorg_1_1lightjason_1_1agentspeak_1_1generator_1_1IBaseAgentGenerator_3_01T_01extends_01IAgent_3_04_4_01_4__coll__graph.svg" "IBaseAgentGenerator" >}}:
<pre><code class="language-java">public final class MyAgentGenerator extends IBaseAgentGenerator&lt;MyAgent&gt;
{
        //constructor of the generator
        //@param p_stream ASL code as any stream e.g. FileInputStream
        public MyAgentGenerator( final InputStream p_stream ) throws Exception
        {
            super( 
                // input ASL stream
                p_stream, 
                // a set with all possible actions for the agent, here
                // we use all build-in actions of LightJason
                CCommon.actionsFromPackage().collect( Collectors.toSet() ),    
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
</code></pre>

3. Write your runtime[^runtime] within the ```main``` method and let the agents run
<pre><code class="language-java">
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
                        // runs the agent cycle
                        i.call();
                    } catch ( final Exception l_exception )
                    {
                        l_exception.printStackTrace();
                    }
                } ) );
        }
}
</code></pre>

4. Run ```mvn package``` within the source directory to build the program
5. Run ```java -jar target/myagentapp-1.0-SNAPSHOT.jar agent.asl 500 1000``` to create 500 agents based on the agent.asl nd the agents will run 1000 cycles
 
## Is there no environment?

Yes, LightJason AgentSpeak(L++) does not need any environment, but you can write it by your own. We recommand the following structur and have in mind, that all environments calls are done in parallel, so at the same time many agents can call the environment, so you must be create a __thread-safe__ data structure of your environment. If the environment throws an exception the action on the agent-side will fail.


## How can I build my own actions?

In general there are two kinds of actions:

1. actions which are standalone classes
2. actions which are methods inside an agent class




[^runtime]: for creating a complex and fast runtime you need to take a look in general object-orientated programming and Java documention. We create here only a short example to show how you can work with agents




