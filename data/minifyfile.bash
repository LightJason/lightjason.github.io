#!/bin/bash

TMP=$(mktemp)
minify $1 > $TMP
mv -f $TMP $1

