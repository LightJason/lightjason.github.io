package {{{ package }}}.agents;

import {{{ package }}}.environment.IEnvironment;

{{ #internalaction }}
import org.lightjason.agentspeak.action.binding.IAgentAction;
import org.lightjason.agentspeak.action.binding.IAgentActionFilter;
import org.lightjason.agentspeak.action.binding.IAgentActionName;
{{ /internalaction }}
import org.lightjason.agentspeak.agent.IBaseAgent;
import org.lightjason.agentspeak.configuration.IAgentConfiguration;


/**
 * agent class to represent
 * a type of agent
 */
{{ #internalaction }}@IAgentAction{{ /internalaction }}
public final class C{{{ agentname }}}Agent extends IBaseAgent<C{{{ agentname }}}Agent>
{
    /**
     * reference to environment
     */
    private final IEnvironment m_environment;

    /**
     * constructor
     *
     * @param p_configuration agent configuration
     * @param p_environment environment reference
     */
    public C{{{ agentname }}}Agent( final IAgentConfiguration<C{{{ agentname }}}Agent> p_configuration, final IEnvironment p_environment )
    {
        super( p_configuration );
        m_environment = p_environment;
    }

    {{ #internalaction }}
    @IAgentActionFilter
    @IAgentActionName( name = "{{{ name }}}" )
    private {{{ return }}} {{{ name }}}( {{{ argument }}} )
    {

    }

    {{ /internalaction }}
}
