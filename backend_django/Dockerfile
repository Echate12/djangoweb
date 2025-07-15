# Use official Python image
FROM python:3.11-slim

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Django project
COPY . .

# Expose Django port
EXPOSE 8000

# Start the Django app
CMD ["gunicorn", "backend_django.wsgi:application", "--bind", "0.0.0.0:8000"] 