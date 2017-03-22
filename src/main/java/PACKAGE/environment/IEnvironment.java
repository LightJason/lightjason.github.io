package {{{ package }}}.environment;

import {{{ package }}}.agents.IEnvironmentAgent;
import org.lightjason.agentspeak.language.ILiteral;

import java.util.stream.Stream;


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


    /**
     * returns the literal structure of the environment
     * based on the calling agent
     *
     * @param p_agent calling agent
     * @return literal stream
     */
    Stream<ILiteral> literal( final IEnvironmentAgent<?> p_agent );


    {{ #environmentactionlist }}
    <T extends IEnvironmentAgent<?>> {{{ return }}} {{{ name }}}( final T p_agent{{ #argument }}, {{{ argument }}}{{ /argument }} );


    {{ /environmentactionlist }}

}
