package {{{ package }}}.actions;

import org.lightjason.agentspeak.action.IBaseAction;
import org.lightjason.agentspeak.common.CPath;
import org.lightjason.agentspeak.common.IPath;
import org.lightjason.agentspeak.language.CCommon;
import org.lightjason.agentspeak.language.CRawTerm;
import org.lightjason.agentspeak.language.ITerm;
import org.lightjason.agentspeak.language.execution.IContext;
import org.lightjason.agentspeak.language.fuzzy.CFuzzyValue;
import org.lightjason.agentspeak.language.fuzzy.IFuzzyValue;

import javax.annotation.Nonnegative;
import javax.annotation.Nonnull;
import java.util.List;
import java.util.stream.Collectors;

/**
 * external action {{{ actionname }}}
 */
public final class C{{{ actionname }}}Action  extends IBaseAction
{
    /**
     * serial id
     */
    private static final long serialVersionUID = 1L;
    /**
     * action name
     */
    private static final IPath NAME = CPath.from( "{{ #function_tolower }}{{{ actionname }}}{{ /function_tolower }}" );

    @Nonnull
    @Override
    public final IPath name()
    {
        return NAME;
    }

    @Nonnegative
    @Override
    public final int minimalArgumentNumber()
    {
        return {{{ actionarguments }}};
    }

    @Nonnull
    @Override
    public final IFuzzyValue<Boolean> execute( final boolean p_parallel, @Nonnull final IContext p_context, @Nonnull final List<ITerm> p_argument, @Nonnull final List<ITerm> p_return )
    {
        // unflatten all arguments for removing lists with [ [], [ [] ] ] and check unflatten arguments
        final List<ITerm> l_arguments = CCommon.flatten( p_argument ).collect( Collectors.toList() );
        // check unflatten arguments
        if ( l_arguments.size() < {{{ actionarguments }}} )
            return CFuzzyValue.from( false );

        // get first argument e.g. as string
        final String l_string = l_arguments.get( 0 ).<String>raw();

        // iterate over all other arguments
        l_arguments.stream()
                   // skip first argument
                   .skip( 1 )

                   // extract term value e.g. for number
                   .map( ITerm::<Number>raw )
                   // convert it to double (so here can we deal with integer and double)
                   .mapToDouble( Number::doubleValue )
                   // create a Double object
                   .boxed()

                   // encapsulate Java type into term type
                   .map( CRawTerm::from )
                   // add it to return argument
                   .forEach( p_return::add );

        return CFuzzyValue.from( true );
    }
    
}
