#!/bin/bash

set -euxo pipefail

echo "Building and pushing backend docker image"
docker build -t  emiln17/edico-be:dev backend/
docker push emiln17/edico-be:dev

echo "Building and pushing frontend docker image"

docker build -t emiln17/edico-fe:dev frontend/
docker push emiln17/edico-fe:dev

echo "running docker-compose up" 

docker-compose down
docker-compose up -d



