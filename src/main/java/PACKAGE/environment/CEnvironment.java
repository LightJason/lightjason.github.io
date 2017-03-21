package {{{ package }}}.environment;

import {{{ package }}}.agents.IEnvironmentAgent;

/**
 * environment class
 */
public final class CEnvironment implements IEnvironment
{

    @Override
    public final <T extends IEnvironmentAgent<?>> T initializeagent( final T p_agent )
    {
        return p_agent;
    }

    {{ #environmentactionlist }}
    @Override
    public final <T extends IEnvironmentAgent<?>> {{{ return }}} {{{ name }}}( final T p_agent{{ #argument }}, {{{ argument }}}{{ /argument }} )
    {

    }

    {{ /environmentactionlist }}

}
