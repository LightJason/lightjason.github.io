package {{{ package }}}.environment;

import java.text.MessageFormat;
import java.util.Locale;

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
        return EEnvironment.valueof( p_name.toUpperCase( Locale.ROOT ) );
    }

}
