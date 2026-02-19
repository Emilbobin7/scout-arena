# Use official Python runtime as a parent image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose port 8080 (Google Cloud Run default)
EXPOSE 8080

# Run with Gunicorn (Production standard)
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app"]
