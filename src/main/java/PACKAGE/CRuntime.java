package {{{ package }}};

import {{{ package }}}.actions.CBroadcastAction;
import {{{ package }}}.actions.CSendAction;
{{ #externalactionlist }}
import {{{ package }}}.actions.C{{{ name }}}Action;
{{ /externalactionlist }}
import {{{ package }}}.environment.EEnvironment;
import {{{ package }}}.environment.IEnvironment;
import {{{ package }}}.generators.EGenerator;

import com.codepoetics.protonpack.StreamUtils;
import org.lightjason.agentspeak.agent.IAgent;
import org.lightjason.agentspeak.action.IAction;
import org.lightjason.agentspeak.common.CCommon;

import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.HelpFormatter;
import org.apache.commons.cli.Options;

import java.text.MessageFormat;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.StandardCopyOption;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.LogManager;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import java.util.concurrent.Callable;


/**
 * main application with runtime
 */
public final class CRuntime
{

    static
    {
        // logger
        {{{ disablelogger }}}LogManager.getLogManager().reset();
    }


    /**
     * private constructor to avoid any instantiation
     */
    private CRuntime()
    {}


    // === main ================================================================================================================================================

    /**
     * creates build-in ASL files
     *
     * @return execution flag
     */
    private static boolean createasl()
    {
        Stream.of(
            {{ #agentlist }}
            "{{{ name }}}Agent.asl"{{ ^last }},{{ /last }}
            {{ /agentlist }}
        ).forEach( i -> {
               try
               {
                   Files.copy(
                       CRuntime.class.getResourceAsStream( i ), FileSystems.getDefault().getPath( i ), StandardCopyOption.REPLACE_EXISTING
                   );
               }
               catch ( final IOException l_exception )
               {
                   {{{ disablelogger }}}l_exception.printStackTrace();
               }
        } );

        return true;
    }

    /**
     * main method
     *
     * @param p_args command-line arguments
     */
    public static void main( final String[] p_args )
    {
        final CommandLine l_cli = CRuntime.parsearguments( p_args );
        if ( l_cli == null )
            System.exit( -1 );

        // creates agents ASL files
        if ( l_cli.hasOption("create") && ( CRuntime.createasl() ) )
            System.exit( 0 );  


        // execute simulation
        CRuntime.execute(
            CRuntime.initialize( l_cli ),
            l_cli.hasOption( "steps" ) ? Integer.parseInt( l_cli.getOptionValue( "steps" ) ) : Integer.MAX_VALUE,
            l_cli.hasOption( "sequential" )
        );       
    }

    /**
     * initialize the simulation structure, generate data-structure
     * for all agents with name, environment, actions and return
     * collection with agents for execution
     *
     * @param p_cli command-line parameter
     * @return collection with agents for execution
     */
    private static Collection<IAgent<?>> initialize( final CommandLine p_cli )
    {
        // runtime agent collection
        final Map<String, IAgent<?>> l_agents = new ConcurrentHashMap<>();

        // generate envrionment and agents
        final IEnvironment l_environment = EEnvironment.from( p_cli.getOptionValue( "env", "default" ) ).generate();

        // global set with all possible agent actions
        final Set<IAction> l_actions = Collections.unmodifiableSet(
                Stream.concat(
                        Stream.of(
                                {{ #externalactionlist }}
                                new C{{{ name }}}Action(),
                                {{ /externalactionlist }}
                                new CSendAction( l_agents ),
                                new CBroadcastAction( l_agents )
                        ),
                        CCommon.actionsFromPackage()
                ).collect( Collectors.toSet() )
        );


        StreamUtils.zip(

                // read counter values to generate the set of agents
                Arrays.stream( p_cli.getOptionValue( "agents", "" ).split( ",") )
                        .map( String::trim )
                        .filter( i -> !i.isEmpty() )
                        .mapToInt( Integer::parseInt )
                        .boxed(),


                StreamUtils.zip(

                        // read the generator type for each ASL file
                        Arrays.stream( p_cli.getOptionValue( "generator", "" ).split(",") )
                                .map( String::trim )
                                .filter( i -> !i.isEmpty() ),

                        // read each ASL file
                        Arrays.stream( p_cli.getOptionValue( "asl", "" ).split( ",") )
                                .map( String::trim )
                                .filter( i -> !i.isEmpty() ),

                        // create a tuple for each ASL the generator and ASL file
                        ( i, j ) -> new AbstractMap.SimpleImmutableEntry<>( EGenerator.from( i ), j )
                )
                        // read the file data and create the generator
                        .map( i -> {
                            try
                                    (
                                            final FileInputStream l_stream = new FileInputStream( i.getValue() );
                                    )
                            {
                                return i.getKey().generate( l_stream, l_environment, l_actions.stream(), l_agents );
                            }
                            catch ( final Exception l_exception )
                            {
                                l_exception.printStackTrace();
                                return null;
                            }
                        } )
                        .filter( Objects::nonNull ),

                // create a tuple of generator and number of agents
                (i, j) -> new AbstractMap.SimpleImmutableEntry<>( j, i )
        )

                // generate the agents
                .forEach( i -> i.getKey().generatemultiple( i.getValue() ) );

        return l_agents.values();
    }


    // === runtime execution ===================================================================================================================================

    /**
     * executes the simulation
     *
     * @param p_agents collection with all agents
     * @param p_steps number of simulation steps
     * @param p_parallel run agents in parallel
     */
    private static void execute( final Collection<IAgent<?>> p_agents, final int p_steps, final boolean p_parallel )
    {
            if ( p_agents.size() == 0 )
            {
                System.err.println( "no agents exists for execution" );
                System.exit( -1 );
            }

            IntStream.range( 0, p_steps )
                 .forEach( i -> CRuntime.optionalparallelstream( p_agents.stream(), p_parallel ).forEach( CRuntime::execute ) );

    }

    /**
     * creates an optional parallel stream
     *
     * @param p_stream input stream
     * @param p_parallel parallel execution
     * @tparam T stream element type
     * @return stream
     */
    private static <T> Stream<T> optionalparallelstream( final Stream<T> p_stream, final boolean p_parallel )
    {
        return p_parallel ? p_stream.parallel() : p_stream;
    }

    /**
     * execute callable object with catching exception
     *
     * @param p_object callable
     */
    private static void execute( final Callable<?> p_object )
    {
        try
        {
            p_object.call();
        }
        catch ( final Exception l_exception )
        {
            l_exception.printStackTrace();
        }
    }


    // === command-line parsing ================================================================================================================================

    /**
     * parsing command-line arguments
     */
    private static CommandLine parsearguments( final String[] p_args )
    {
        // --- define CLI options ------------------------------------------------------------------------------------------------------------------------------
        final Options l_clioptions = new Options();

        l_clioptions.addOption( "help", false, "shows this information" );
        l_clioptions.addOption( "create", false, "creates within the current directory the agent ASL files" );
        l_clioptions.addOption( "sequential", false, "agents run in sequential order [default value: parallel]" );
        l_clioptions.addOption( "env", true, MessageFormat.format( "environment definition [default value: default, elements: {0}]", EEnvironment.list() ) );
        l_clioptions.addOption( "asl", true, "comma-sparated list of ASL files" );
        l_clioptions.addOption( "agents", true, "comma-sparated list of generating agent numbers (equal to asl-flag)" );
        l_clioptions.addOption( "generator", true, MessageFormat.format( "comma-separated list of generator names [elements: {0}]", EGenerator.list() ) );
        l_clioptions.addOption( "steps", true, "number of simulation steps [default: integer maximum]" );


        // --- process CLI arguments and initialize configuration ----------------------------------------------------------------------------------------------
        final CommandLine l_cli;
        try
        {
            l_cli = new DefaultParser().parse( l_clioptions, p_args );
        }
        catch ( final Exception l_exception )
        {
            System.err.println( "command-line arguments parsing error" );
            return null;
        }

        if ( l_cli.hasOption( "help" ) )
        {
            new HelpFormatter().printHelp( new java.io.File( CRuntime.class.getProtectionDomain().getCodeSource().getLocation().getPath() ).getName(), l_clioptions );
            System.exit( 0 );
        }

        return l_cli;
    }
}
