#!/bin/bash

cd tests
tsc
cd ..
# --require tests/tests/setup.js
./node_modules/.bin/mocha tests/tests/*_test.js
exit 0