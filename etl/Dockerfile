# Use official lightweight Python base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy dependency list
COPY requirements.txt .

# Install system dependencies and Python libraries
RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential \
        gfortran \
    && pip install --no-cache-dir -U pip setuptools wheel \
    && pip install --no-cache-dir -r requirements.txt \
    && apt-get remove -y build-essential gfortran \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

# Copy your ETL scripts into the container
COPY . .

# Default command (adjust to your entrypoint script)
#CMD ["python", "main.py"]
