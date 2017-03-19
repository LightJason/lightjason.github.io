package {{{ package }}}.generators;

import {{{ package }}}.agents.IEnvironmentAgent;
import {{{ package }}}.environment.IEnvironment;

import org.lightjason.agentspeak.common.CCommon;
import org.lightjason.agentspeak.action.IAction;
import org.lightjason.agentspeak.agent.IAgent;
import org.lightjason.agentspeak.generator.IBaseAgentGenerator;
import org.lightjason.agentspeak.language.score.IAggregation;
import {{{ package }}}.agents.C{{{ agentname }}}Agent;

import java.io.InputStream;
import java.text.MessageFormat;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Stream;
import java.util.stream.Collectors;


/**
 * generator of a specified type of agents
 */
public final class C{{{ agentname }}}AgentGenerator extends IBaseAgentGenerator<IEnvironmentAgent<C{{{ agentname }}}Agent>>
{
    /**
     * environment reference
     */
    private final IEnvironment m_environment;
    /**
     * map with agent names and agent objects
     */
    private final Map<String, IAgent<?>> m_agents;
    /**
     * agent number counter
     */
    private final AtomicInteger m_counter = new AtomicInteger();

    /**
     * constructor
     *
     * @param p_stream ASL input stream
     * @param p_environment environment reference
     * @param p_defaultaction default actions
     * @param p_agents map with agents and names
     */
    public C{{{ agentname }}}AgentGenerator( final InputStream p_stream, final IEnvironment p_environment, final Stream<IAction> p_defaultaction, final Map<String, IAgent<?>> p_agents ) throws Exception
    {
        super( p_stream, Stream.concat( p_defaultaction, CCommon.actionsFromAgentClass( C{{{ agentname }}}Agent.class )  ).collect( Collectors.toSet() ), IAggregation.EMPTY );
        m_environment = p_environment;
        m_agents = p_agents;
    }

    @Override
    public final C{{{ agentname }}}Agent generatesingle( final Object... p_data )
    {
        final C{{{ agentname }}}Agent l_agent = m_environment.initializeagent( new C{{{ agentname }}}Agent( m_configuration, m_environment ) );
        m_agents.putIfAbsent( MessageFormat.format( "{0} {1}", "{{{ agentname }}}", m_counter.getAndIncrement() ), l_agent );
        return l_agent;
    }

}
