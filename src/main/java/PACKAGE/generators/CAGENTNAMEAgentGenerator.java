package {{{ package }}}.generators;

import {{{ package }}}.environment.IEnvironment;

import org.lightjason.agentspeak.common.CCommon;
import org.lightjason.agentspeak.action.IAction;
import org.lightjason.agentspeak.generator.IBaseAgentGenerator;
import org.lightjason.agentspeak.language.score.IAggregation;
import {{{ package }}}.agents.C{{{ agentname }}}Agent;

import java.io.InputStream;
import java.util.stream.Stream;
import java.util.stream.Collectors;


/**
 * generator of a specified type of agents
 */
public final class C{{{ agentname }}}AgentGenerator extends IBaseAgentGenerator<C{{{ agentname }}}Agent>
{
    /**
     * environment reference
     */
    private final IEnvironment m_environment;

    /**
     * constructor
     *
     * @param p_stream ASL input stream
     * @param p_environment environment reference
     * @param p_defaultaction default actions
     */
    public C{{{ agentname }}}AgentGenerator( final InputStream p_stream, final IEnvironment p_environment, final Stream<IAction> p_defaultaction ) throws Exception
    {
        super( p_stream, Stream.concat( p_defaultaction, CCommon.actionsFromAgentClass( C{{{ agentname }}}Agent.class )  ).collect( Collectors.toSet() ), IAggregation.EMPTY );
        m_environment = p_environment;
    }

    @Override
    public final C{{{ agentname }}}Agent generatesingle( final Object... p_data )
    {
        return new C{{{ agentname }}}Agent( m_configuration, m_environment );
    }

}
