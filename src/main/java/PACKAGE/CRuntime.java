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

    static
    {
        // disable logger
        LogManager.getLogManager().reset();
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
        if ( p_args.length < 2 )
            throw new RuntimeException( "arguments are not set: ASL script, number of agents" );

        // global set with agents
        final Set<IAgent<?>> l_agents;

        try
            (
                // stream woth ASL code
                final FileInputStream l_stream = new FileInputStream( p_args[0] );
            )
        {
            l_agents = Collections.unmodifiableSet(
                // create agent generator with send-action
                new MyAgentGenerator( l_stream )
                    // generate multiple agents
                    .generatemultiple( Integer.parseInt( p_args[1] ) )
                    // create set
                    .collect( Collectors.toSet() )
            );
        }
        catch ( final Exception l_exception )
        {
            l_exception.printStackTrace();
            return;
        }


        IntStream
            // define cycle range, i.e. number of cycles to run sequentially
            .range(
                0,
                p_args.length < 3
                ? Integer.MAX_VALUE
                : Integer.parseInt( p_args[2] )
            )
            .forEach( j ->
                      {

                          // iterate in parallel over all agents
                          l_agents.parallelStream().forEach( i ->
                                                             {
                                                                 try
                                                                 {
                                                                     // call each agent, i.e. trigger a new agent cycle
                                                                     i.call();
                                                                 }
                                                                 catch ( final Exception l_exception )
                                                                 {
                                                                     l_exception.printStackTrace();
                                                                     throw new RuntimeException();
                                                                 }
                                                             } );
                      } );

    }
}
