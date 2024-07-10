#!/bin/bash

if [ "$(uname)" == "Darwin" ]; then
    sudo git pull origin master
    sudo php artisan cache:clear
    sudo php artisan route:cache
    sudo php artisan config:cache
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    sudo git pull origin master
    sudo php artisan cache:clear
    sudo php artisan route:cache
    sudo php artisan config:cache
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
    git pull origin master
    php artisan cache:clear
    php artisan route:cache
    php artisan config:cache
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
    git pull origin master
    php artisan cache:clear
    php artisan route:cache
    php artisan config:cache
fi

