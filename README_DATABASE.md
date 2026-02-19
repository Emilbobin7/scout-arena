# Database Setup Instructions

To run **Scout Arena**, you need a MongoDB database. Since you chose to **maintain MongoDB**, follow one of these two options:

## Option A: Install MongoDB Locally (Recommended)

1.  **Download**: Visit [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2.  **Select**:
    *   Version: (Current)
    *   Platform: Windows
    *   Package: MSI
3.  **Install**:
    *   Run the downloaded `.msi` file.
    *   Choose **"Complete"** setup.
    *   **IMPORTANT**: Check the box **"Install MongoDB as a Service"**.
    *   You can uncheck "Install MongoDB Compass" if you want to save space, but it's a useful tool to see your data.
4.  **Verify**:
    *   Open a new terminal and type: `mongosh` or check if the service is running.
5.  **Done!** The current configuration (`mongodb://localhost:27017/scout-arena`) will work automatically.

## Option B: Use MongoDB Atlas (Cloud)

If you don't want to install anything, use a free cloud database:

1.  Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2.  Create a free account and a free cluster.
3.  Go to **Database Access** -> Create a database user (e.g., `admin` / `password123`).
4.  Go to **Network Access** -> Add IP address -> **Allow Access from Anywhere** (`0.0.0.0/0`).
5.  Click **Connect** -> **Connect your application** -> Copy the connection string.
6.  **Paste the connection string** in the chat, and I will update your configuration.

---

**Once you have done Option A or Option B, simply try registering again!**
