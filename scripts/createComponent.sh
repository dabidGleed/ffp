#!/bin/bash

mkdir ./imports/ui/components/$1

touch ./imports/ui/components/$1/$1.html
touch ./imports/ui/components/$1/$1.js
touch ./imports/ui/components/$1/$1.tests.js

echo "<h1>$1</h1>" >> ./imports/ui/components/$1/$1.html

cat ./scripts/js.template >> ./imports/ui/components/$1/$1.js
cat ./scripts/tests.template >> ./imports/ui/components/$1/$1.tests.js
