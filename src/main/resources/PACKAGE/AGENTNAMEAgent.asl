!main.



+!main <-
    generic/print( "initial plan" );

    NumberData = 1;
    StringData = "FooBar";

    {{ #function_tolower }}{{{ sendfunctor }}}{{ /function_tolower }}( "{{{ agentname }}} 0", NumberData, StringData );
    {{ #function_tolower }}{{{ broadcastfunctor }}}{{ /function_tolower }}( "regular expression of agent names", NumberData, StringData )
.    


+!{{{ receivefunctor }}}( message(M), from(F) ) <-
    generic/print( "receive message", M, "from", F )
.    
