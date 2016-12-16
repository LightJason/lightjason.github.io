---
title: "Basic Knowledge: Agent scenario in 15 minutes"
---
This tutorial explains how to build a simple, but full working scenario in 15 minutes with the current developing source code.

## Tools you need

* Working Maven $\geq$ 3.1 [installation](http://maven.apache.org/install.html)
* Java JDK 1.8 installation which can be found by Maven


## Tutorial

### AgentSpeak(L++) Installation

1. Download the current source codes from [AgentSpeak(L++)](https://github.com/LightJason/AgentSpeak) with Git via ```git clone https://github.com/LightJason/AgentSpeak.git``` or as a Zip archive.
2. Run ```mvn``` within the source code directory. AgentSpeak(L++) should build and you can use it.

### Project Configuration

1. Copy the ```groupId```, ```artifactId``` and ```version``` from the [pom.xml](https://github.com/LightJason/AgentSpeak/blob/master/pom.xml#L27) of the current AgentSpeak(L++) project.

2. Create a Maven project (we recommend the [Maven in 5 minutes tutorial](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)) with
<pre><code class="language-bash">mvn archetype:generate -DgroupId=myagentproject -DartifactId=myagentapp -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false</code></pre>

3. Open the ```pom.xml```, navigate to the ```dependency``` section and add AgentSpeak(L++) reference (you will find an entry for JUnit within the section):
<pre><code class="language-xml">
    &lt;dependency&gt;
        &lt;groupId&gt;org.lightjason&lt;/groupId&gt;
        &lt;artifactId&gt;AgentSpeak&lt;/artifactId&gt;
        &lt;version&gt;version from AgentSpeak(L++) pom.xml&lt;/version&gt;
    &lt;/dependency&gt;
</code></pre>    

4. For enabling the Java 1.8 support, add the following entry before the ```dependency``` section:
<pre><code class="language-xml"> 
    &lt;properties>
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;
</code></pre>   

5. Put the following code under the ```dependency``` section of the [Maven Shade Plugin](https://maven.apache.org/plugins/maven-shade-plugin/examples/executable-jar.html) to create an executable jar
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

6. Import your Maven project into your favorite IDE.

## Agent Build and Execution

1. Create your agent class. Each agent, which you use, must be inherited from our base class {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/d3/d39/interfaceorg_1_1lightjason_1_1agentspeak_1_1agent_1_1IAgent_3_01T_01extends_01IAgent_3_04_4_01_4__coll__graph.svg" "IAgent" >}} interface, but we recommand our {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/d6/df3/classorg_1_1lightjason_1_1agentspeak_1_1agent_1_1IBaseAgent_3_01T_01extends_01IAgent_3_04_4_01_4__coll__graph_org.svg" "IBaseAgent" >}} with a fully executable mechanism:

<pre><code class="language-java">
package myagentproject;

import org.lightjason.agentspeak.agent.IBaseAgent;
import org.lightjason.agentspeak.configuration.IAgentConfiguration;

public final class MyAgent extends IBaseAgent MyAgent
{
    // constructor of the agent
    // @param p_configuration agent configuration of the agent generator
    public MyAgent( final IAgentConfiguration MyAgent  p_configuration )
    {
        super( p_configuration );
    }
}
</code></pre>

__Please note__ that you need to pass your agent class as a generic parameter to the definitions of LightJason agents.

2. Create your own {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/d1/dc9/interfaceorg_1_1lightjason_1_1agentspeak_1_1generator_1_1IAgentGenerator_3_01T_01extends_01IAgent_3_04_4_01_4__inherit__graph.svg" "agent generator" >}} (agent factory). This component is based on the [UML factory pattern](https://en.wikipedia.org/wiki/Factory_method_pattern). Within the factory the agent script (ASL) is parsed once and you can generate a lot of agents with a single factory. We support a general implementation of the factory the {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/dc/d04/classorg_1_1lightjason_1_1agentspeak_1_1generator_1_1IBaseAgentGenerator_3_01T_01extends_01IAgent_3_04_4_01_4__coll__graph.svg" "IBaseAgentGenerator" >}}:

<pre><code class="language-java">
package myagentproject;

import org.lightjason.agentspeak.common.CCommon;
import org.lightjason.agentspeak.generator.IBaseAgentGenerator;
import org.lightjason.agentspeak.language.score.IAggregation;

import java.util.stream.Stream;
import java.io.InputStream;
import java.util.stream.Collectors;


public final class MyAgentGenerator extends IBaseAgentGenerator<MyAgent>
{
    //constructor of the generator
    //@param p_stream ASL code as any stream e.g. FileInputStream
    public MyAgentGenerator( final InputStream p_stream ) throws Exception
    {
        super(
            // input ASL stream
            p_stream,
            // a set with all possible actions for the agent, here
            // we use all build-in actions of LightJason and add our own action
            Stream.concat(
                CCommon.actionsFromPackage(),
                Stream.of(
                    new MyAction()
                )
            ).collect( Collectors.toSet() ),
            // aggregation function for the optimisation function, here
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
5. Run ```java -jar target/myagentapp-1.0-SNAPSHOT.jar agent.asl 500 1000``` to create 500 agents based on the ```agent.asl``` and the agents will run 1000 cycles.
 
## How can I build my own actions?

In general there are two kinds of actions:

1. actions which are standalone classes e.g. for complex calculations. Just use the {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/d0/dfe/interfaceorg_1_1lightjason_1_1agentspeak_1_1action_1_1IAction__coll__graph.svg" "IAction" >}} interface or the {{< lightbox "http://lightjason.github.io/AgentSpeak/sources/dd/d3e/classorg_1_1lightjason_1_1agentspeak_1_1action_1_1IBaseAction__coll__graph.svg" "IBaseAction" >}} to create your actions. 

<pre><code class="language-java">
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
</code></pre>



2. Actions which are methods inside an agent class
<pre><code class="language-java">
</code></pre>


## Is there no environment?

Yes, LightJason's AgentSpeak(L++) does not need any environment, but you can easily write your own. We recommend the following structure. Keep in mind, that all environments calls are done in parallel, so many agents might access the environment at the same time. Therefore you must create a thread-safe data structure for your environment. If the environment throws an exception the action on the agent-side will fail.


[^runtime]: For creating a complex and fast runtime you need to take a look at general object-orientated programming and the Java documentation. Here we only provide you with a short example to show you how you can work with LightJason and Agentspeak(L++).




