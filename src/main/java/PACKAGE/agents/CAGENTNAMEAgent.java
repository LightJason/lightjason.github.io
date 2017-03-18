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
public final class C{{{ agentname }}}Agent IEnvironmentAgent<C{{{ agentname }}}Agent>
{

    /**
     * constructor
     *
     * @param p_configuration agent configuration
     * @param p_environment environment reference
     */
    public C{{{ agentname }}}Agent( final IAgentConfiguration<IEnvironmentAgent<C{{{ agentname }}}Agent>> p_configuration, final IEnvironment p_environment )
    {
        super( p_configuration, p_environment );
    }

    {{ #internalaction }}
    @IAgentActionFilter
    @IAgentActionName( name = "{{{ name }}}" )
    private {{{ return }}} {{{ name }}}( {{{ argument }}} )
    {

    }
    
    {{ /internalaction }}
}
