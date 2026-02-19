# Deploying Scout Arena to Render

Render is a great free alternative to Google Cloud. It connects directly to your GitHub repository and automatically deploys your code.

## 1. Push your code to GitHub
Since Render works by pulling from GitHub, you need to have your project in a repository:
1. Create a new repository on GitHub.
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

## 2. Deploy using the Blueprint (Easiest)
I have created a `render.yaml` file in your root folder. This is a "Blueprint" that tells Render how to set up all 3 services at once.

1. Go to [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** -> **Blueprint**.
3. Connect your GitHub repository.
4. Render will detect the `render.yaml` file and show you the services to create.
5. **Important**: You will need to provide your `MONGO_URI` (from MongoDB Atlas) when prompted.
6. Click **Apply**.

## 3. Manual Deployment (If Blueprint is not used)

If you prefer to create them one by one:

### A. Backend (Web Service)
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Env Vars**: Add `MONGO_URI` and `JWT_SECRET`.

### B. AI Service (Web Service)
- **Root Directory**: `ai-service`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn app:app`

### C. Frontend (Static Site)
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Env Vars**: Add `VITE_API_URL` pointing to your Backend URL.

## Summary of Services
- **Backend**: Handles API and Sockets.
- **AI Service**: Handles video scoring simulation.
- **Frontend**: The user interface.

Your app will be live with a `.onrender.com` URL! 🚀
