#!/usr/bin/env bash

if [ ! -f "./src/.env" ]; then
    echo "Generating config files..."
    cp src/.env.example src/.env
fi

if [ ! -d "./src/vendor" ]; then
    cd src
    echo "Installing composer dependencies..."
    docker run --rm -v /$(pwd):/app composer install
    cd ..
fi

if [ ! -d "./src/node_modules" ]; then
    cd src
    echo "Installing node dependencies..."
    npm install
    cd ..
fi

# Sobe os containers Docker
echo "Configuring Docker containers"
docker-compose down
docker-compose up -d
