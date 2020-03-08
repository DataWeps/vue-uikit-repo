#!/bin/bash
if ! git diff-index --quiet HEAD --; then
    echo "Working tree is not clean";
    echo "Exiting"
    exit 1
else
    echo "Starting Development build"
    git checkout master &&
    NODE_ENV=production npm run build &&
    npm run docs:build &&
    git add -A . &&
    git commit -m 'Production build' &&
    git push origin master &&
    npm publish --access public
    echo "Done"
    exit 0
fi