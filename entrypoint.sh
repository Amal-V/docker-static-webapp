#!/usr/bin/env bash

sed -i "s/www.example1.com/$SERVICE_URL_1/"  /opt/server/app/config/app-config.js && \
sed -i "s/www.example2.com/$SERVICE_URL_2/"  /opt/server/app/config/app-config.js && \
http-server /opt/server