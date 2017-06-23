package {{{ package }}}.actions;

import {{{ package }}}.agents.IEnvironmentAgent;

import org.lightjason.agentspeak.action.IBaseAction;
import org.lightjason.agentspeak.agent.IAgent;
import org.lightjason.agentspeak.common.CPath;
import org.lightjason.agentspeak.common.IPath;
import org.lightjason.agentspeak.language.CCommon;
import org.lightjason.agentspeak.language.CLiteral;
import org.lightjason.agentspeak.language.CRawTerm;
import org.lightjason.agentspeak.language.ITerm;
import org.lightjason.agentspeak.language.execution.IContext;
import org.lightjason.agentspeak.language.fuzzy.CFuzzyValue;
import org.lightjason.agentspeak.language.fuzzy.IFuzzyValue;
import org.lightjason.agentspeak.language.instantiable.plan.trigger.CTrigger;
import org.lightjason.agentspeak.language.instantiable.plan.trigger.ITrigger;

import javax.annotation.Nonnegative;
import javax.annotation.Nonnull;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import java.util.stream.Collectors;


/**
 * external broadcast action for sending
 * messages to a set of agents based on
 * a regular expression
 */
public final class CBroadcastAction extends IBaseAction
{
    /**
     * serial id
     */
    private static final long serialVersionUID = 923344428639087998L;
    /**
     * map with agent names and agent objects
     */
    private final Map<String, IAgent<?>> m_agents;

    /**
     * constructor
     *
     * @param p_agents map with agent names and objects
     */
    public CBroadcastAction( @Nonnull final Map<String, IAgent<?>> p_agents )
    {
        m_agents = p_agents;
    }

    @Nonnull
    @Override
    public final IPath name()
    {
        return CPath.from( "{{ #function_tolower }}{{{ broadcastfunctor }}}{{ /function_tolower }}" );
    }

    @Nonnegative
    @Override
    public final int minimalArgumentNumber()
    {
        return 1;
    }

    @Nonnull
    @Override
    public final IFuzzyValue<Boolean> execute( final boolean p_parallel, @Nonnull final IContext p_context, 
                                               @Nonnull final List<ITerm> p_argument, @Nonnull final List<ITerm> p_return )
    {
        final List<ITerm> l_arguments = CCommon.flatten( p_argument ).collect( Collectors.toList() );
        if ( l_arguments.size() < 2 )
            return CFuzzyValue.from( false );

        final ITerm l_sender = CLiteral.from( "from", CRawTerm.from( p_context.agent().<IEnvironmentAgent<?>>raw().name() ) );
        final List<ITrigger> l_trigger = l_arguments.stream()
                                                       .skip( 1 )
                                                       .map( ITerm::raw )
                                                       .map( CRawTerm::from )
                                                       .map( i -> CTrigger.from(
                                                           ITrigger.EType.ADDGOAL,
                                                           CLiteral.from( "{{{ receivefunctor }}}", CLiteral.from( "message", i ), l_sender )
                                                       ) )
                                                       .collect( Collectors.toList() );

        final Pattern l_regex = Pattern.compile( l_arguments.get( 0 ).<String>raw() );
        m_agents.entrySet()
                .parallelStream()
                .filter( i -> l_regex.matcher( i.getKey() ).matches() )
                .map( Map.Entry::getValue )
                .forEach( i -> l_trigger.forEach( j -> i.trigger( j ) ) );

        return CFuzzyValue.from( true );
    }
}
