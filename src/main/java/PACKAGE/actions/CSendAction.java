package {{{ package }}}.actions;

import org.lightjason.agentspeak.action.IBaseAction;
import org.lightjason.agentspeak.agent.IAgent;
import org.lightjason.agentspeak.common.CPath;
import org.lightjason.agentspeak.common.IPath;
import org.lightjason.agentspeak.language.CCommon;
import org.lightjason.agentspeak.language.CLiteral;
import org.lightjason.agentspeak.language.CRawTerm;
import org.lightjason.agentspeak.language.ITerm;
import org.lightjason.agentspeak.language.execution.IContext;
import org.lightjason.agentspeak.language.execution.fuzzy.CFuzzyValue;
import org.lightjason.agentspeak.language.execution.fuzzy.IFuzzyValue;
import org.lightjason.agentspeak.language.instantiable.plan.trigger.CTrigger;
import org.lightjason.agentspeak.language.instantiable.plan.trigger.ITrigger;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


final class CSend extends IBaseAction
{

    private final Map<String, IAgent<?>> m_agents;

    public CSend( final Map<String, IAgent<?>> p_agents )
    {
        m_agents = p_agents;
    }

    @Override
    public final IPath name()
    {
        return CPath.from( "{{{ sendfunctor }}}" );
    }

    @Override
    public final int minimalArgumentNumber()
    {
        return 1;
    }

    @Override
    public final IFuzzyValue<Boolean> execute( final IContext p_context, final boolean p_parallel, final List<ITerm> p_argument,
                                               final List<ITerm> p_return, final List<ITerm> p_annotation )
    {
        final List<ITerm> l_arguments = CCommon.flatcollection( p_argument ).collect( Collectors.toList() );
        if ( l_arguments.size() < 2 )
            return CFuzzyValue.from( false );

        final IAgent<?> l_receiver = m_agents.get( l_arguments.get( 0 ).<String>raw() );
        if ( l_receiver == null )
            return CFuzzyValue.from( false );

        final ITerm l_sender = CLiteral.from( "from", CRawTerm.from(l_arguments.get( 0 ).<String>raw() ) );
        l_arguments.stream()
                   .skip( 1 )
                   .map( ITerm::raw )
                   .map( CRawTerm::from )
                   .map( i -> CTrigger.from( "{{{ receivefunctor }}}", CLiteral.from( "content", i ), l_sender ) )
                   .forEach( i -> l_receiver.trigger( i ) );

        return CFuzzyValue.from( true );
    }

}
