/*
 * Language: AgentSpeak(L)
 * Author: Philipp Kraus <philipp@lightjason.org>
 */

hljs.registerLanguage( 'lightjason', function(p_hljs) {
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

    var LINE_COMMENT = {
        className: 'comment',
        begin: /#/, end: /$/,
        contains: [p_hljs.PHRASAL_WORDS_MODE]
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
        LINE_COMMENT,
        p_hljs.C_BLOCK_COMMENT_MODE,
        p_hljs.QUOTE_STRING_MODE,
        p_hljs.APOS_STRING_MODE,
        p_hljs.C_NUMBER_MODE
    ];

    PARENTED.contains = inner;
    LIST.contains = inner;

    return {
        contains: inner.concat([
            {begin: /\.$/} // relevance booster
        ])
    };

} );
