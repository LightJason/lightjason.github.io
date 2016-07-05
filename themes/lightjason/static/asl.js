/*
Language: AgentSpeak(L)
Author: Philipp Kraus <philipp@lightjason.org>
*/

hljs.registerLanguage("asl", function(hljs) {
    var ATOM = {
        begin: /[a-z][A-Za-z0-9_]*/,
        relevance: 0
    };

    var VAR = {
        className: 'symbol',
        variants: [
            {begin: /[A-Z][a-zA-Z0-9_]*/},
            {begin: /_[A-Za-z0-9_]*/},
        ],
        relevance: 0
    };

    var PARENTED = {
        begin: /\(/,
        end: /\)/,
        relevance: 0
    };    

    var LIST = {
        begin: /\[/,
        end: /\]/
    };

    var PRED_OP = {
        begin: /:-/
    };

    var inner = [
        ATOM,
        VAR,
        PARENTED,
        PRED_OP,
        LIST,
        hljs.C_BLOCK_COMMENT_MODE,
        hljs.QUOTE_STRING_MODE,
        hljs.APOS_STRING_MODE,
        hljs.C_NUMBER_MODE
    ];

    PARENTED.contains = inner;
    LIST.contains = inner;

    return {
        contains: inner.concat([
            {begin: /\.$/} // relevance booster
        ])
    };
});
