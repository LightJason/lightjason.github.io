package {{{ package }}}.agents;

{{ #internalaction }}
import org.lightjason.agentspeak.action.binding.IAgentAction;
import org.lightjason.agentspeak.action.binding.IAgentActionFilter;
import org.lightjason.agentspeak.action.binding.IAgentActionName;
{{ /internalaction }}
import org.lightjason.agentspeak.agent.IBaseAgent;
import org.lightjason.agentspeak.configuration.IAgentConfiguration;


{{ #internalaction }}@IAgentAction{{ /internalaction }}
public final class C{{{ agentname }}}Agent extends IBaseAgent<C{{{ agentname }}}Agent>
{

    /**
     * constructor of the agent
     *
     * @param p_configuration agent configuration of the agent generator
     */
    public C{{{ agentname }}}Agent( final IAgentConfiguration<C{{{ agentname }}}Agent> p_configuration )
    {
        super( p_configuration );
    }

    {{ #internalaction }}
    @IAgentActionFilter
    @IAgentActionName( name = "{{{ name }}}" )
    private {{{ return }}} {{{ name }}}( {{{ argument }}} )
    {

    }

    {{ /internalaction }}
}
