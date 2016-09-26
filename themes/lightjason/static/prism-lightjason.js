Prism.languages.lightjason = Prism.languages.extend('clike', {
    'keyword': /\b([a-z][\w|\-|/]*)\b/,
    'variable': /\b([A-Z][\w|\-|/]*)\b/,
    'operator': /[~=><:\-+?@;|!{1,2}$.]+/,
    'boolean': /\b(true|success|false|fail)\b/
} );