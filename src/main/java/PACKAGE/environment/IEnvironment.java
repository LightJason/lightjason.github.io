package {{{ package }}}.environment;

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

}
