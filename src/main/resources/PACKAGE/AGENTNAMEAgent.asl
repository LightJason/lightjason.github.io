!main.



+!main <-
    generic/print( "initial plan" );

    NumberData = 1;
    StringData = "FooBar";

    {{{ sendfunctor }}}( "agentname 0", NumberData, StringData );
    {{{ broadcastfunctor }}}( "regular expression of agent names", NumberData, StringData )
.    


+!{{{ receivefunctor }}}( message(M), from(F) ) <-
    generic/print( "receive message", M, "from", F )
.    
