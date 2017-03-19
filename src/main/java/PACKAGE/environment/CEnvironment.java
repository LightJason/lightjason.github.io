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

}
