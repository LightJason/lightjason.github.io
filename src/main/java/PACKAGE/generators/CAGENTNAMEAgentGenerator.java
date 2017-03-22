package {{{ package }}}.generators;

import {{{ package }}}.environment.IEnvironment;
import {{{ package }}}.agents.C{{{ agentname }}}Agent;

import org.lightjason.agentspeak.common.CCommon;
import org.lightjason.agentspeak.action.IAction;
import org.lightjason.agentspeak.agent.IAgent;
import org.lightjason.agentspeak.generator.IBaseAgentGenerator;
import org.lightjason.agentspeak.language.score.IAggregation;

import java.io.InputStream;
import java.text.MessageFormat;
import java.util.Map;
import java.util.stream.Stream;


/**
 * generator of a specified type of agents
 */
public final class C{{{ agentname }}}AgentGenerator extends IEnvironmentAgentGenerator<C{{{ agentname }}}Agent>
{

    /**
     * constructor
     *
     * @param p_stream ASL input stream
     * @param p_defaultaction default actions
     * @param p_environment environment reference
     * @param p_agents map with agents and names
     */
    public C{{{ agentname }}}AgentGenerator( final InputStream p_stream, final Stream<IAction> p_defaultaction, final IEnvironment p_environment, final Map<String, IAgent<?>> p_agents ) throws Exception
    {
        super(p_stream, Stream.concat( p_defaultaction, CCommon.actionsFromAgentClass( C{{{ agentname }}}Agent.class ) ), IAggregation.EMPTY, p_environment, p_agents);
        m_environment = p_environment;
        m_agents = p_agents;
    }

    @Override
    public final C{{{ agentname }}}Agent generatesingle( final Object... p_data )
    {
        return this.initializeagent(
                MessageFormat.format( "{0} {1}", "{{{ agentname }}}", m_counter.getAndIncrement() ),
                new C{{{ agentname }}}Agent( m_configuration, m_environment )
        );
    }

}
