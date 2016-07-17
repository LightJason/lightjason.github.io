#!/bin/bash

hugo
rm -Rf /tmp/public
mv -f public /tmp

git branch -D master
git checkout --orphan master
rm -Rf *
echo -n "*.*\n!.gitignore\n!*.html\n!*.xml\n!*.css\n!*.js\n!*.json\n!*.bib\n!*.md" > .gitignore
mv -f /tmp/public/* .
echo '# LightJason' > readme.md

git gc --prune=now
git push origin :master
git add --all .
git commit -m "current documentation"
git push origin master
git checkout developing
