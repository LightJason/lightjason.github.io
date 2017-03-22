package {{{ package }}}.generators;

import {{{ package }}}.agents.IEnvironmentAgent;
import {{{ package }}}.environment.IEnvironment;

import org.lightjason.agentspeak.action.IAction;
import org.lightjason.agentspeak.agent.IAgent;
import org.lightjason.agentspeak.agent.IPlanBundle;
import org.lightjason.agentspeak.common.CCommon;
import org.lightjason.agentspeak.generator.IBaseAgentGenerator;
import org.lightjason.agentspeak.language.execution.IVariableBuilder;
import org.lightjason.agentspeak.language.score.IAggregation;

import java.io.InputStream;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * abstract agent generatorclass for all agents
 */
public abstract class IEnvironmentAgentGenerator<T extends IEnvironmentAgent<?>> extends IBaseAgentGenerator<IEnvironmentAgent<T>>
{
    /**
     * agent number counter
     */
    protected final AtomicInteger m_counter = new AtomicInteger();
    /**
     * environment reference
     */
    protected final IEnvironment m_environment;
    /**
     * map with agent names and agent objects
     */
    private final Map<String, IAgent<?>> m_agents;



    /**
     * constructor
     *
     * @param p_stream ASL input stream
     * @param p_actions action stream
     * @param p_aggregation aggregation function
     * @param p_environment environment reference
     * @param p_agents agent map
     * @throws Exception on any error
     */
    protected IEnvironmentAgentGenerator( final InputStream p_stream, final Stream<IAction> p_actions,
                                          final IAggregation p_aggregation, final IEnvironment p_environment,
                                          final Map<String, IAgent<?>> p_agents ) throws Exception
    {
        super( p_stream,
               Stream.concat(
                       CCommon.actionsFromAgentClass( IEnvironmentAgent.class ),
                       p_actions
               ).collect(Collectors.toSet() ),
               p_aggregation
        );

        m_agents = p_agents;
        m_environment = p_environment;
    }


    /**
     * constructor
     *
     * @param p_stream ASL input stream
     * @param p_actions action stream
     * @param p_aggregation aggregation function
     * @param p_variablebuilder variable builder
     * @param p_environment environment reference
     * @param p_agents agent map
     * @throws Exception on any error
     */
    protected IEnvironmentAgentGenerator( final InputStream p_stream, final Stream<IAction> p_actions,
                                          final IAggregation p_aggregation, final IVariableBuilder p_variablebuilder,
                                          final IEnvironment p_environment, final Map<String, IAgent<?>> p_agents )
            throws Exception
    {
        super( p_stream,
                Stream.concat(
                        CCommon.actionsFromAgentClass( IEnvironmentAgent.class ),
                        p_actions
                ).collect(Collectors.toSet() ),
                p_aggregation,
                p_variablebuilder
        );

        m_agents = p_agents;
        m_environment = p_environment;
    }


    /**
     * constructor
     *
     * @param p_stream ASL input stream
     * @param p_actions action stream
     * @param p_aggregation aggregation function
     * @param p_planbundle planbundles
     * @param p_variablebuilder variable builder
     * @param p_environment environment reference
     * @param p_agents agent map
     * @throws Exception on any error
     */
    protected IEnvironmentAgentGenerator( final InputStream p_stream, final Stream<IAction> p_actions,
                                          final IAggregation p_aggregation, final Set<IPlanBundle> p_planbundle,
                                          final IVariableBuilder p_variablebuilder, final IEnvironment p_environment,
                                          final Map<String, IAgent<?>> p_agents ) throws Exception
    {
        super( p_stream,
                Stream.concat(
                        CCommon.actionsFromAgentClass( IEnvironmentAgent.class ),
                        p_actions
                ).collect(Collectors.toSet() ),
                p_aggregation,
                p_planbundle,
                p_variablebuilder
        );

        m_agents = p_agents;
        m_environment = p_environment;
    }


    /**
     * initialize the agent for the simulation
     *
     * @param p_name agent name
     * @param p_agent agent object
     * @return agent object
     */
    protected final T initializeagent( final String p_name, final T p_agent )
    {
        m_agents.putIfAbsent( p_name, p_agent );
        return m_environment.initializeagent( p_agent );
    }

}
