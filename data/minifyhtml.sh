#!/bin/zsh

MINIFY=$(which html-minifier)

TMP=$(mktemp)
$MINIFY --case-sensitive --collapse-boolean-attributes --collapse-whitespace --decode-entities --html5 --minify-css --minify-js --quote-character \" --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-style-link-type-attributes --remove-tag-whitespace --sort-attributes --sort-class-name --trim-custom-fragments --use-short-doctype -o $TMP $1
mv -f $TMP $1
