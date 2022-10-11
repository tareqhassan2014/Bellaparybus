#!/bin/bash
set -e

service cron start
certbot --nginx --email ssl@gmail.com --noninteractive --agree-tos -d www.bellapartybus.com || true
certbot --nginx --email ssl@gmail.com --noninteractive --agree-tos -d dev.bellapartybus.com || true
service nginx stop
/docker-entrypoint.sh nginx -g "daemon off;"