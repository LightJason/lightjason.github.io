package {{{ package }}}.actions;

import org.lightjason.agentspeak.action.IBaseAction;
import org.lightjason.agentspeak.common.CPath;
import org.lightjason.agentspeak.common.IPath;
import org.lightjason.agentspeak.language.CCommon;
import org.lightjason.agentspeak.language.CRawTerm;
import org.lightjason.agentspeak.language.ITerm;
import org.lightjason.agentspeak.language.execution.IContext;
import org.lightjason.agentspeak.language.execution.fuzzy.CFuzzyValue;
import org.lightjason.agentspeak.language.execution.fuzzy.IFuzzyValue;

import java.util.List;
import java.util.stream.Collectors;

/**
 * external action {{{ actionname }}}
 */
public final class C{{{ actionname }}}Action  extends IBaseAction
{
    @Override
    public final IPath name()
    {
        return CPath.from( "{{ #function_tolower }}{{{ actionname }}}{{ /function_tolower }}" );
    }

    @Override
    public final int minimalArgumentNumber()
    {
        return {{{ actionarguments }}};
    }

    @Override
    public final IFuzzyValue<Boolean> execute( final IContext p_context, final boolean p_parallel, final List<ITerm> p_argument, final List<ITerm> p_return,
                                               final List<ITerm> p_annotation
    )
    {
        // unflatten all arguments for removing lists with [ [], [ [] ] ] and check unflatten arguments
        final List<ITerm> l_arguments = CCommon.flatcollection( p_argument ).collect( Collectors.toList() );
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
