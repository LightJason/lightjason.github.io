package {{ package }};

import org.lightjason.agentspeak.agent.IAgent;

import java.io.FileInputStream;
import java.util.Collections;
import java.util.Set;
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


    static
    {
        // logger
        {{ disablelogger }}LogManager.getLogManager().reset();

        // action initialize
        ACTION = {{ actions }};
    }


    /**
     * private constructor to avoid any instantiation
     */
    private CRuntime()
    {
    }


    /**
     * main method
     *
     * @param p_args command-line arguments
     */
    public static void main( final String[] p_args )
    {
        final CommandLine l_cli = CRuntime.parsearguments( p_args );
    }


    /**
     * parsing command-line arguments
     */
    private static CommandLine parsearguments( final String[] p_args )
    {
        // --- define CLI options ------------------------------------------------------------------------------------------------------------------------------
        final Options l_clioptions = new Options();

        l_clioptions.addOption( "help", false, "shows this information" );
        l_clioptions.addOption( "asl", true, "comma-sparated list of ASL files" );


        // --- process CLI arguments and initialize configuration ----------------------------------------------------------------------------------------------
        final CommandLine l_cli;
        try
        {
            l_cli = new DefaultParser().parse( l_clioptions, p_args );
        }
        catch ( final Exception l_exception )
        {
            System.err.println( "command-line arguments parsing error" );
            System.exit( -1 );
            return;
        }

        if ( l_cli.hasOption( "help" ) )
        {
            new HelpFormatter().printHelp( new java.io.File( CRuntime.class.getProtectionDomain().getCodeSource().getLocation().getPath() ).getName(), l_clioptions );
            System.exit( 0 );
        }

        return l_cli;
    }
}
