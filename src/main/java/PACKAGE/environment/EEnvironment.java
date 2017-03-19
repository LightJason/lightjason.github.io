package {{{ package }}}.environment;

import java.text.MessageFormat;
import java.util.Arrays;
import java.util.Locale;
import java.util.stream.Collectors;


/**
 * enum of environments
 */
public enum EEnvironment
{
    DEFAULT;

    /**
     * generates an environment instance
     */
    public final IEnvironment generate()
    {
        switch (this)
        {
            case DEFAULT : return new CEnvironment();

            default :
                throw new RuntimeException( MessageFormat.format( "environment [{0}] not exists", this ) );
        }
    }
    
    /**
     * returns a environment enum environment
     * case-insensitive ignore string name
     *
     * @param p_name string name
     * @return enironment enum
     */
    public static EEnvironment from( final String p_name )
    {
        return EEnvironment.valueOf(  p_name.toUpperCase( Locale.ROOT ) );
    }

    /**
     * returns a string with a
     * comma-separated list of enum elements
     *
     * @return string list
     */
    public static String list()
    {
        return Arrays.stream( EEnvironment.values() )
                     .map( Enum::name )
                     .map( i -> i.toLowerCase( Locale.ROOT ) )
                     .collect( Collectors.joining( ", ") );
    }
}
