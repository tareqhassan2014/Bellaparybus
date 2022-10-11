#!/bin/sh

# Set the timeout
export DOCKER_CLIENT_TIMEOUT=180
export COMPOSE_HTTP_TIMEOUT=180

# Stop previous dockers
docker-compose stop
docker-compose down

# Run dockers as daemon
docker-compose up -d --build

# Remove caches
yes | docker system prune