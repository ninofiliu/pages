#!/bin/sh -e
rm -rf build
npx snowpack build
cd build
touch .nojekyll
for page in color-distance
do
  mkdir $page
  cp index.html $page/index.html
done
git init
git add .
git commit -m deploy
git remote add origin git@github.com:ninofiliu/ninofiliu.github.io
git push -f
cd -
