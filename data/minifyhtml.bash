#!/bin/bash

TMP=$(mktemp)
/usr/local/bin/html-minifier --html5 --remove-redundant-attributes --remove-tag-whitespace --case-sensitive -o $TMP $1
mv -f $TMP $1

