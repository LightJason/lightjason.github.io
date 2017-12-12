#!/bin/zsh -e

MINIFY=$(which svgo)

$MINIFY --config=$(dirname $0)/svgo.config $1