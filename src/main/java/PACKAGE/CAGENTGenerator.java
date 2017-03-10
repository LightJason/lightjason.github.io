package {{ package }};

import org.lightjason.agentspeak.action.IAction;
import org.lightjason.agentspeak.generator.IBaseAgentGenerator;
import org.lightjason.agentspeak.language.score.IAggregation;

import java.io.InputStream;
import java.util.Set;


final class C{{ agent }}Generator extends IBaseAgentGenerator<C{{ agent }}Agent>
{

    /**
     * constructor of the generator
     *
     * @param p_actions set with actions
     * @param p_stream asl stream
     * @throws Exception on any error
     */
    C{{ agent }}Generator( final Set<IAction> p_actions, final InputStream p_stream ) throws Exception
    {
        super( p_stream, p_actions, IAggregation.EMPTY );
    }

    @Override
    public final C{{ agent }}Agent generatesingle( final Object... p_data )
    {
        return new C{{ agent }}Agent( m_configuration );
    }

}
