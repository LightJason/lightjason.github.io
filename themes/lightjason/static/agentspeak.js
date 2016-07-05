/*
 * Language: AgentSpeak(L)
 * Author: Philipp Kraus <philipp@lightjason.org>
 */

hljs.registerLanguage( "asl", function (p_hightlight) {
    var ATOM = {
        begin: /[a-z][A-Za-z0-9_\/-]*/,
        relevance: 0
    };

    var VAR = {
        className: 'symbol',
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

    var LIST = {
        begin: /\[/,
        end: /\]/
    };

    var LINE_COMMENT = {
        className: 'comment',
        begin: /%/, end: /$/,
        contains: [p_hightlight.PHRASAL_WORDS_MODE]
    };

    var BACKTICK_STRING = {
        className: 'string',
        begin: /`/, end: /`/,
        contains: [p_hightlight.BACKSLASH_ESCAPE]
    };
    var CHAR_CODE = {
        className: 'string', // 0'a etc.
        begin: /0\'(\\\'|.)/
    };

    var SPACE_CODE = {
        className: 'string',
        begin: /0\'\\s/ // 0'\s
    };

    var RULE_OP = {
        begin: /:-/
    };

    var PLAN_OP = {
        begin: /:-/
    };

    var inner = [
        ATOM,
        VAR,
        PARENTED,
        PLAN_OP,
        RULE_OP,
        LIST,
        LINE_COMMENT,
        p_hightlight.C_BLOCK_COMMENT_MODE,
        p_hightlight.QUOTE_STRING_MODE,
        p_hightlight.APOS_STRING_MODE,
        BACKTICK_STRING,
        CHAR_CODE,
        SPACE_CODE,
        p_hightlight.C_NUMBER_MODE
    ];

    PARENTED.contains = inner;
    LIST.contains = inner;

    return {
        contains: inner.concat([
            { begin: /\.$/ }
        ])
    };
});
