#!/bin/bash

hugo
git push origin :master
mv public /tmp
git push origin :master
git branch -D master
git checkout --orphan master
rm -Rf *
mv /tmp/public/* .
git add --all .
git commit -m "current documentation"
git push origin master
