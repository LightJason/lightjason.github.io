#!/bin/bash

hugo
git push origin :master
mv public /tmp
git push origin :master
git branch -D master
git checkout --orphan master
rm -Rf *
echo -n "*.*\n!.gitignore\n!*.html\n!*.xml\n!*.css\n!*.js\n!*.json"
mv /tmp/public/* .
echo '{ "name" : "LightJason.GitHub.io", "tagline" : "", "body" : "" }' > params.json
git add --all .
git commit -m "current documentation"
git push origin master
git checkout developing
