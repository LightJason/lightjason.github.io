package {{{ package }}};

import {{{ package }}}.actions.CBroadcastAction;
import {{{ package }}}.actions.CSendAction;
{{ #externalactionlist }}
import {{{ package }}}.actions.C{{{ . }}}Action;
{{ /externalactionlist }}

import com.codepoetics.protonpack.StreamUtils;
import org.lightjason.agentspeak.agent.IAgent;
import org.lightjason.agentspeak.action.IAction;
import org.lightjason.agentspeak.common.CCommon;

import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.HelpFormatter;
import org.apache.commons.cli.Options;

import java.io.IOException;
import java.nio.file.StandardCopyOption;
import java.text.MessageFormat;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.Collections;
import java.util.Map;
import java.util.Set;
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
    /**
     * runtime agent collection
     */
    private static final Map<String, IAgent<?>> AGENTS = new ConcurrentHashMap<>();

    /**
     * global set with all possible agent actions
     */
    private static final Set<IAction> ACTIONS = Collections.unmodifiableSet(
                                                    Stream.concat(
                                                        CCommon.actionsFromPackage(),
                                                        Stream.of(
                                                            new CSendAction( AGENTS ),
                                                            new CBroadcastAction( AGENTS )
                                                        )
                                                    ).collect( Collectors.toSet() )
    );


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
     * generates build-in ASL files
     * @return execution flag
     */
    private static boolean generateasl()
    {
        Stream.of(
            {{ #agentlist }}
                "{{{ name }}}Agent.asl" {{ #last }},{{ /last }}
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

        // generate agents ASL files
        if ( l_cli.hasOption("generate") && ( CRuntime.generateasl() ) )
            System.exit( 0 );  


        // generate agents
        StreamUtils.zip(
            Arrays.stream( l_cli.getOptionValue( "asl", "" ).split( ",") )
              .map( String::trim )
              .filter( i -> !i.isEmpty() ),

            Arrays.stream( l_cli.getOptionValue( "agents", "" ).split(",") )
              .map( String::trim )
              .filter( i -> !i.isEmpty() )
              .mapToInt( Integer::parseInt )
              .boxed(),

            ( i, j ) -> MessageFormat.format( "{0} - {1}", i, j )
        ).forEach( System.out::println );


        // execute simulation
        CRuntime.execute(
            l_cli.hasOption( "steps" ) ? Integer.parseInt( l_cli.getOptionValue( "steps" ) ) : Integer.MAX_VALUE,
            l_cli.hasOption( "sequential" )
        );       
    }


    // === runtime execution ===================================================================================================================================

    /**
     * executes the simulation
     *
     * @param p_steps number of simulation steps
     * @param p_parallel run agents in parallel
     */
    private static void execute( final int p_steps, final boolean p_parallel )
    {
            if ( AGENTS.size() == 0 )
            {
                System.err.println( "no agents exists for execution" );
                System.exit( -1 );
            }

            IntStream.range( 0, p_steps )
                 .forEach( i -> CRuntime.optionalparallelstream( AGENTS.values().stream(), p_parallel ).forEach( CRuntime::execute ) );

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
            {{{ disablelogger }}}l_exception.printStackTrace();
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
        l_clioptions.addOption( "generate", false, "generates within the current directory the agent ASL files" );
        l_clioptions.addOption( "sequential", false, "agents run in sequential order (default: parallel)" );
        l_clioptions.addOption( "asl", true, "comma-sparated list of ASL files" );
        l_clioptions.addOption( "agents", true, "comma-sparated list of generating agent numbers (equal to asl-flag)" );
        l_clioptions.addOption( "steps", true, "number of simulation steps (default: integer maximum)" );


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
