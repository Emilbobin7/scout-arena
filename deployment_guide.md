# Deploying Scout Arena to Google Cloud Platform (GCP)

This guide walks you through deploying your Scout Arena application to Google Cloud. We will use **Cloud Run** for the backend/AI services (containerized, serverless) and **Firebase Hosting** for the frontend (fast, global CDN).

## Prerequisites

1.  **Google Cloud Project**: Create one at [console.cloud.google.com](https://console.cloud.google.com/).
2.  **Google Cloud SDK**: Install the `gcloud` CLI.
3.  **Firebase CLI**: Install with `npm install -g firebase-tools`.
4.  **Docker**: Ensure Docker is running locally (optional but recommended for testing builds).

## 1. Setup & Authentication

Open a terminal and run:

```bash
# Login to Google Cloud
gcloud auth login

# Set your project ID
gcloud config set project YOUR_PROJECT_ID

# Enable necessary services (Cloud Run, Container Registry)
gcloud services enable run.googleapis.com containerregistry.googleapis.com cloudbuild.googleapis.com
```

## 2. Deploying the Backend (Node.js)

We'll deploy the Express server to Cloud Run.

```bash
cd server

# Build and deploy (replace SERVICE_NAME, e.g., scout-backend)
gcloud run deploy scout-backend --source . --region us-central1 --allow-unauthenticated
```

**Note:** The output will give you a **Service URL** (e.g., `https://scout-backend-xyz.a.run.app`). Save this! You need it for the frontend environment variables.

## 3. Deploying the AI Service (Python)

Deploy the Flask AI service to Cloud Run.

```bash
cd ../ai-service

# Build and deploy
gcloud run deploy scout-ai --source . --region us-central1 --allow-unauthenticated
```

**Note:** Save the **Service URL** (e.g., `https://scout-ai-xyz.a.run.app`). You need to update your Backend config to point to this URL if they communicate.

## 4. Configuring Environment Variables

Update your backend to use the production DB and AI service URL.
You can set environment variables in Cloud Run via the Console or CLI:

```bash
gcloud run services update scout-backend --update-env-vars \
  MONGO_URI="your_mongodb_atlas_connection_string", \
  AI_SERVICE_URL="https://scout-ai-xyz.a.run.app", \
  JWT_SECRET="your_secure_secret"
```

## 5. Deploying the Frontend (React + Firebase)

Firebase Hosting is the easiest way to host React apps on Google Cloud.

1.  **Initialize Firebase**:
    ```bash
    cd ../frontend
    firebase login
    firebase init hosting
    # Select "Use an existing project" (your GCP project)
    # Public directory: "dist" (Vite builds to dist)
    # Configure as single-page app? Yes
    # Set up automatic builds and deploys with GitHub? Optional
    ```

2.  **Update Environment Variables**:
    Create a `.env.production` file in `frontend/`:
    ```env
    VITE_API_URL=https://scout-backend-xyz.a.run.app/api
    ```

3.  **Build and Deploy**:
    ```bash
    npm run build
    firebase deploy
    ```

## Alternative: Deploy Frontend to Cloud Run (Docker)

If you prefer using a Docker container for the frontend (Nginx), use the provided `Dockerfile`.

```bash
cd frontend
gcloud run deploy scout-frontend --source . --region us-central1 --allow-unauthenticated
```

## Summary

-   **Frontend**: Hosted on Firebase (or Cloud Run).
-   **Backend**: Hosted on Cloud Run (Scales to 0 when not used).
-   **AI Service**: Hosted on Cloud Run.
-   **Database**: Use **MongoDB Atlas** (easiest) or **Google Cloud SQL** (for PostgreSQL).

Your app is now live on Google infrastructure! 🚀
