package {{{ package }}}.generators;

package {{{ package }}}.environment.IEnvironment;

import org.lightjason.agentspeak.action.IAction;
import org.lightjason.agentspeak.generator.IBaseAgentGenerator;
import org.lightjason.agentspeak.language.score.IAggregation;
import {{{ package }}}.agents.C{{{ agentname }}}Agent;

import java.io.InputStream;
import java.util.Set;


public final class C{{{ agentname }}}AgentGenerator extends IBaseAgentGenerator<C{{{ agentname }}}Agent>
{
    private final IEnvironment m_environment;

    public C{{{ agentname }}}AgentGenerator( final InputStream p_stream, final IEnvironment p_environment, final Set<IAction> p_actions ) throws Exception
    {
        super( p_stream, p_actions, IAggregation.EMPTY );
        m_environment = p_environment;
    }

    @Override
    public final C{{{ agentname }}}Agent generatesingle( final Object... p_data )
    {
        return new C{{{ agentname }}}Agent( m_configuration, m_environment );
    }

}
