package {{ package }}.agents;

import org.lightjason.agentspeak.action.binding.IAgentAction;
import org.lightjason.agentspeak.action.binding.IAgentActionFilter;
import org.lightjason.agentspeak.action.binding.IAgentActionName;
import org.lightjason.agentspeak.agent.IBaseAgent;
import org.lightjason.agentspeak.configuration.IAgentConfiguration;


@IAgentAction
final class C{{ agent }}Agent extends IBaseAgent<C{{ agent }}Agent>
{

    /**
     * constructor of the agent
     *
     * @param p_configuration agent configuration of the agent generator
     */
    C{{ agent }}Agent( final IAgentConfiguration<C{{ agent }}Agent> p_configuration )
    {
        super( p_configuration );
    }

}
