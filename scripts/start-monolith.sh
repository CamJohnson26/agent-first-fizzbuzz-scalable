#!/bin/bash

# Start Web Server
echo "Starting Web Server..."
cd /app/web-server && node dist/index.js &

# Start Analytics Service
echo "Starting Analytics Service..."
cd /app/analytics-service && node dist/index.js &

# Start Lean Service
echo "Starting Lean Service..."
cd /app/lean-service && node dist/index.js &

# Start Nginx
echo "Starting Nginx..."
nginx -c /app/nginx.conf -g "daemon off;"
