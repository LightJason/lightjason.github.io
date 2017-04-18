package {{{ package }}}.agents;

{{ #internalaction }}
import org.lightjason.agentspeak.action.binding.IAgentAction;
import org.lightjason.agentspeak.action.binding.IAgentActionFilter;
import org.lightjason.agentspeak.action.binding.IAgentActionName;
{{ /internalaction }}
import org.lightjason.agentspeak.language.score.IAggregation;
import org.lightjason.agentspeak.configuration.IAgentConfiguration;
import {{{ package }}}.environment.IEnvironment;


/**
 * agent class to represent
 * a type of agent
 */
{{ #internalaction }}@IAgentAction{{ /internalaction }}
public final class C{{{ agentname }}}Agent extends IEnvironmentAgent<C{{{ agentname }}}Agent>
{

    /**
     * constructor
     *
     * @param p_configuration agent configuration
     * @param p_environment environment reference
     * @param p_name name of the agent
     */
    private C{{{ agentname }}}Agent( final IAgentConfiguration<IEnvironmentAgent<C{{{ agentname }}}Agent>> p_configuration, final IEnvironment p_environment, final String p_name )
    {
        super( p_configuration, p_environment, p_name );
    }

    {{ #internalaction }}
    @IAgentActionFilter
    @IAgentActionName( name = "{{{ name }}}" )
    private {{{ return }}} {{{ name }}}( {{{ argument }}} )
    {

    }
    
    {{ /internalaction }}


        /**
     * generator of a specified type of agents
     */
    public static final class CGenerator extends IEnvironmentAgentGenerator<C{{{ agentname }}}Agent>
    {

        /**
         * constructor
         *
         * @param p_stream ASL input stream
         * @param p_defaultaction default actions
         * @param p_environment environment reference
         * @param p_agents map with agents and names
         */
        public CGenerator(final InputStream p_stream, final Stream<IAction> p_defaultaction, final IEnvironment p_environment, final Map<String, IAgent<?>> p_agents ) throws Exception
        {
            super(p_stream, Stream.concat( p_defaultaction, CCommon.actionsFromAgentClass( C{{{ agentname }}}Agent.class ) ), IAggregation.EMPTY, p_environment, p_agents );
        }

        @Override
        public final C{{{ agentname }}}Agent generatesingle( final Object... p_data )
        {
            return this.initializeagent(
                    new C{{{ agentname }}}Agent(
                            m_configuration,
                            m_environment,
                            MessageFormat.format( "{0} {1}", "DefaultAgent", m_counter.getAndIncrement() )
                    )
            );
        }

    }
}
