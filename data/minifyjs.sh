#!/bin/zsh -e

MINIFY=$(which minify)

TMP=$(mktemp)
$MINIFY --no-comments --output $TMP $1
mv -f $TMP $1
