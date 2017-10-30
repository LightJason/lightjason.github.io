#!/bin/zsh -e

MINIFY="../node_modules/minifier/index.js"

TMP=$(mktemp)
$MINIFY --no-comments --output $TMP $1
mv -f $TMP $1
