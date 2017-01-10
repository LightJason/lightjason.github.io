#!/bin/bash

TMP=$(mktemp)
htmlmin -o $TMP $1
mv -f $TMP $1

