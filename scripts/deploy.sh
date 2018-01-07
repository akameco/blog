#/bin/bash
set -e

git config user.email "akameco.t@gmail.com"
git config user.name "akameco"

npm run gh-pages -- -r https://$GH_TOKEN@github.com/akameco/blog.git
