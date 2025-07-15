#!/bin/bash
set -e

# Step 1: Build the frontend
cd "$(dirname "$0")"
echo "Building frontend..."
npm run build

# Step 2: Copy build to Django static directory
DJANGO_STATIC_DIR="../backend_django/main/static"
echo "Copying build to $DJANGO_STATIC_DIR..."
cp dist/index.html $DJANGO_STATIC_DIR/
mkdir -p $DJANGO_STATIC_DIR/assets
cp -r dist/assets/* $DJANGO_STATIC_DIR/assets/

# Step 3: Collect static files
cd ../backend_django
echo "Collecting static files..."
python3 manage.py collectstatic --noinput

# Step 4: Deploy to Fly.io
echo "Deploying to Fly.io..."
fly deploy --no-cache --app laaroussihealing

echo "✅ Frontend build, static collection, and deployment complete!" 