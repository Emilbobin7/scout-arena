# Deployment Guide (Render)

## Prerequisites
1.  **GitHub/GitLab Repository**: Your code must be pushed to a repository.
2.  **MongoDB Atlas**: You need a cloud database. Local `mongodb://127.0.0.1` **will not work** on Render.
    - Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
    - Get the connection string: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/scoutarena?retryWrites=true&w=majority`
    - Add your IP (0.0.0.0/0) to the Network Access whitelist.

## Steps to Deploy

1.  **Login to Render**: Go to [dashboard.render.com](https://dashboard.render.com/).
2.  **New Blueprint**: Click on **New +** -> **Blueprint**.
3.  **Connect Repo**: Select your `scout-arena` repository.
4.  **Confirm Blueprint**: Render will automatically detect the `render.yaml` file.
5.  **Environment Variables**: You will be prompted to enter values for:
    -   `MONGO_URI`: Your MongoDB Atlas connection string.
    -   `JWT_SECRET`: A secure random string.
    -   `NODE_VERSION`: `20.11.0`.
6.  **Apply**: Click **Apply**.

## Troubleshooting Checklist
If the backend fails on Render, verify these points:

-   [x] **Verify Port**: The code already uses `process.env.PORT || 5000` (Required for Render).
-   [x] **CORS Configuration**: The code supports `CLIENT_URL` or localhost defaults.
-   [ ] **Environment Variables**: Double-check `MONGO_URI` and `JWT_SECRET` in settings.
-   [ ] **Check Logs**: Look at the "Logs" tab for errors like "MongoDB connection failed".
-   [ ] **Test Endpoint**: Open the backend URL in a browser to see if it responds.
-   [ ] **MongoDB Access**: Ensure Atlas allows connections from `0.0.0.0/0`.
-   [ ] **Redeploy**: Push changes or click "Manual Deploy" if needed.
