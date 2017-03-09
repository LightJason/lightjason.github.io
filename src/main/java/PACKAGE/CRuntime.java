package {{ package }};

import org.lightjason.agentspeak.agent.IAgent;
import org.lightjason.agentspeak.action.IAction;
import org.lightjason.agentspeak.common.CCommon;

import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.HelpFormatter;
import org.apache.commons.cli.Options;

import java.io.FileInputStream;
import java.util.Arrays;
import java.util.Collections;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.LogManager;
import java.util.stream.Collectors;
import java.util.stream.IntStream;


/**
 * main application with runtime
 */
final class CRuntime
{
    /**
     * global set with all possible agent actions
     */
    private static final Set<IAction> ACTIONS;
    /**
     * runtime agent collection
     */
    private static final Map<String, IAgent<?>> AGENTS = new ConcurrentHashMap<>();


    static
    {
        // logger
        {{ disablelogger }}LogManager.getLogManager().reset();

        // action initialize and storing within an unmodifyable structure
        ACTIONS = Collections.unmodifiableSet( {{ actions }}.collect( Collectors.toSet() ) );
    }


    /**
     * private constructor to avoid any instantiation
     */
    private CRuntime()
    {}


    /**
     * main method
     *
     * @param p_args command-line arguments
     */
    public static void main( final String[] p_args )
    {
        final CommandLine l_cli = CRuntime.parsearguments( p_args );
        if (l_cli == null)
            System.exit( -1 );


        // generate agents
        Arrays.stream( l_cli.getOptionValue( "asl", "" ).split( ",") )
              .map( String::trim )
              .forEach( System.out::println );

        Arrays.stream( l_cli.getOptionValue( "agents", "" ).split(",") )
              .mapToInt( Integer::parseInt )
              .forEach( System.out::println );


        // execute simulation
        CRuntime.execute(
            l_cli.hasOption( "steps" ) ? Integer.parseInt( l_cli.getOptionValue( "steps" ) ) : Integer.MAX_VALUE,
            l_cli.hasOption( "sequential" )
        );       
    }


        /**
     * executes the simulation
     *
     * @param p_steps number of simulation steps
     * @param p_parallel run agents in parallel
     */
    private static void execute( final int p_steps, final boolean p_parallel )
    {
        if (p_parallel)
            IntStream.range( 0, p_steps )
                 .forEach( i -> AGENTS.values()
                                      .parallelStream()
                                      .forEach( j -> {
                                          try
                                          {
                                             j.call();
                                          }
                                          catch ( final Exception l_exception )
                                          {
                                             {{ disablelogger }}l_exception.printStackTrace();
                                          }
                                      } )
                 );
        else
            IntStream.range( 0, p_steps )
                 .forEach( i -> AGENTS.values()
                                      .forEach( j -> {
                                          try
                                          {
                                              j.call();
                                          }
                                          catch ( final Exception l_exception )
                                          {
                                              {{ disablelogger }}l_exception.printStackTrace();
                                          }
                                      } )
                 );
    }


    /**
     * parsing command-line arguments
     */
    private static CommandLine parsearguments( final String[] p_args )
    {
        // --- define CLI options ------------------------------------------------------------------------------------------------------------------------------
        final Options l_clioptions = new Options();

        l_clioptions.addOption( "help", false, "shows this information" );
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
