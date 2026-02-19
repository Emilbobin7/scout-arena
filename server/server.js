const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");

dotenv.config();

const connectDB = require("./config/db");
connectDB();

const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = require("socket.io")(server, {
    cors: { origin: "*" }
});

// Track online users: userId -> socketId
const onlineUsers = {};

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Register user as online
    socket.on("userOnline", (userId) => {
        onlineUsers[userId] = socket.id;
        io.emit("onlineUsers", Object.keys(onlineUsers));
    });

    // Send message to specific receiver
    socket.on("sendMessage", (data) => {
        const receiverSocket = onlineUsers[data.receiverId];
        if (receiverSocket) {
            io.to(receiverSocket).emit("receiveMessage", data);
        }
        // Also emit back to sender for confirmation
        socket.emit("receiveMessage", data);
    });

    // Typing indicator
    socket.on("typing", ({ receiverId, senderName }) => {
        const receiverSocket = onlineUsers[receiverId];
        if (receiverSocket) {
            io.to(receiverSocket).emit("typing", { senderName });
        }
    });

    socket.on("stopTyping", ({ receiverId }) => {
        const receiverSocket = onlineUsers[receiverId];
        if (receiverSocket) {
            io.to(receiverSocket).emit("stopTyping");
        }
    });

    socket.on("disconnect", () => {
        // Remove from online users
        for (const [userId, sid] of Object.entries(onlineUsers)) {
            if (sid === socket.id) {
                delete onlineUsers[userId];
                break;
            }
        }
        io.emit("onlineUsers", Object.keys(onlineUsers));
        console.log("User disconnected:", socket.id);
    });
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/videos", require("./routes/videoRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/follow", require("./routes/followRoutes"));
app.use("/api/athlete", require("./routes/athleteRoutes"));
app.use("/api/scout", require("./routes/scoutRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/activity", require("./routes/activityRoutes"));

server.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port", process.env.PORT || 5000);
});
