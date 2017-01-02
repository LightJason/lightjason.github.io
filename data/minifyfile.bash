#!/bin/bash

TMP=$(mktemp)
minify --output $TMP $1
mv -f $TMP $1

