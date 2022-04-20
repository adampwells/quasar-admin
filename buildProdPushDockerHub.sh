#!/bin/bash
GIT=$(git rev-parse --short HEAD)
rm -Rf dist
echo $GIT
DEST_ENV=prod quasar build
docker buildx build --build-arg GIT=$GIT --platform linux/amd64 -t apwells/markster-web-staging:$GIT -t apwells/markster-web-staging:latest .
docker push -a apwells/markster-web-staging
