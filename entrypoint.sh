#!/usr/bin/env bash

sed -i "s/www.example1.com/$SERVICE_URL_1/"  app/config/app-config.js && \
sed -i "s/www.example2.com/$SERVICE_URL_2/"  app/config/app-config.js && \
node index.js