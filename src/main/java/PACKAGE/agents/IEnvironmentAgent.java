package {{{ package }}}.agents;

import {{{ package }}}.environment.IEnvironment;
import org.lightjason.agentspeak.agent.IBaseAgent;
import org.lightjason.agentspeak.configuration.IAgentConfiguration;

/**
 * abstract class to define an
 * agent with environment
 */
{{ #environmentactionlist }}@IAgentAction{{ /environmentactionlist }}
public abstract class IEnvironmentAgent<T extends IEnvironmentAgent<?>> extends IBaseAgent<IEnvironmentAgent<T>>
{
    /**
     * reference to environment
     */
    protected final IEnvironment m_environment;

    /**
     * ctor
     *
     * @param p_configuration agent configuration
     * @param p_environment environment reference
     */
    protected IEnvironmentAgent( final IAgentConfiguration<IEnvironmentAgent<T>> p_configuration, final IEnvironment p_environment )
    {
        super( p_configuration );
        m_environment = p_environment;
    }


    {{ #environmentactionlist }}
    @Override
    @IAgentActionFilter
    @IAgentActionName( name = "{{{ name }}}" )
    private {{{ return }}} {{{ name }}}( {{{ argument }}} )
    {
    }

    {{ /environmentactionlist }}
}
