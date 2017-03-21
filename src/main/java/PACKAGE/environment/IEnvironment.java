package {{{ package }}}.environment;

import {{{ package }}}.agents.IEnvironmentAgent;

/**
 * interface to represent
 * an environment
 */
public interface IEnvironment
{
    
    /**
     * is called if an agent is generated
     * (before the first agent cycle)
     *
     * @param p_agent agent
     * @return agent
     * @tparam T agent type
     */
    <T extends IEnvironmentAgent<?>> T initializeagent( final T p_agent );

    {{ #environmentactionlist }}
    <T extends IEnvironmentAgent<?>> {{{ return }}} {{{ name }}}( final T p_agent{{{ #argument }}}, {{{ argument }}}{{{ /argument }}} );

    {{ /environmentactionlist }}

}
