#!/bin/bash

set -euxo pipefail

GIT_COMMIT="$(git log master --format="%H" -n 1)"

echo "Building and pushing backend docker image"
docker build -t  emiln17/edico-be:dev backend/
docker push emiln17/edico-be:dev

echo "Building and pushing frontend docker image"

docker build -t emiln17/edico-fe:$GIT_COMMIT frontend/
docker push emiln17/edico-fe:$GIT_COMMIT




