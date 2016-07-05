/*
 * Language: AgentSpeak(L)
 * Author: Philipp Kraus <philipp@lightjason.org>
 */

hljs.registerLanguage( "agentspeak", function(p_hightlight) {
    var ATOM = {
        begin: /[a-z][A-Za-z0-9_\/-]*/,
        relevance: 0
    };
    
    var VAR = {
        className: "symbol",
        variants: [
            { begin: /[A-Z][a-zA-Z0-9_]*/ },
            { begin: /_[A-Za-z0-9_]*/ },
        ],
        relevance: 0
    };

    var PARENTED = {
        begin: /\(/,
        end: /\)/,
        relevance: 0
    };

    var RULE_OP = {
        begin: /:-/
    };

    var PLAN_OP = {
        begin: /<-/
    };

    var LIST = {
        begin: /\[/,
        end: /\]/
    };    

    var l_elements = [
        ATOM,
        VAR,
        PARENTED,
        PLAN_OP,
        RULE_OP,
        LIST,
        p_hightlight.C_BLOCK_COMMENT_MODE,
        p_hightlight.QUOTE_STRING_MODE,
        p_hightlight.APOS_STRING_MODE,
        p_hightlight.C_NUMBER_MODE
    ];

    PARENTED.contains = l_elements;
    LIST.contains = l_elements;

    return {
        contains: l_elements.concat([
            { begin: /\.$/ }
        ])
    };
});
