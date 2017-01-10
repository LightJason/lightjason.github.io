#!/bin/bash

TMP=$(mktemp)
html-minifier --html5 --remove-redundant-attributes --remove-tag-whitespace --case-sensitive -o $TMP $1
mv -f $TMP $1

