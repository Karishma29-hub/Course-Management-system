
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
const http = require("http");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const server = http.createServer(app);

// Shared trusted frontend origins
const allowedOrigins = require("./config/cors");

// Socket.IO
const initializeSocket = require("./config/socket");
const io = initializeSocket(server);

// Database
const connectDB = require("./config/db");

// Routes
const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const profileRoutes = require("./routes/profileRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// Error handling
const errorHandler = require("./middleware/errorHandler");

// Security headers
app.use(helmet());

// Restricted CORS
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        const error = new Error("Origin not allowed by CORS");
        error.statusCode = 403;

        return callback(error);
    }
}));

// Request parsing and logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// Basic routes
app.get("/", (req, res) => {
    res.json({
        message: "Student Course Management API is running"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "API is healthy"
    });
});

// API routes
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/notifications", notificationRoutes);

// Existing course route
app.use("/api/courses", courseRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Centralized error handler
app.use(errorHandler);

// Graceful shutdown
let isShuttingDown = false;

const gracefulShutdown = async (reason, exitCode = 0) => {
    if (isShuttingDown) {
        return;
    }

    isShuttingDown = true;

    console.log(`\n${reason}`);
    console.log("Starting graceful shutdown...");

    // Prevent the application from hanging indefinitely
    const forceExitTimer = setTimeout(() => {
        console.error("Shutdown timed out. Forcing exit.");
        process.exit(1);
    }, 10000);

    forceExitTimer.unref();

    try {
        if (server.listening) {
            // Close Socket.IO and the underlying HTTP server
            await new Promise((resolve, reject) => {
                io.close((error) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve();
                });
            });
        }

        // Close MongoDB connection
        await mongoose.disconnect();

        console.log("MongoDB disconnected successfully");
        console.log("Graceful shutdown completed");

        process.exit(exitCode);

    } catch (error) {
        console.error("Error during shutdown:", error.message);
        process.exit(1);
    }
};

// Handle termination signals
process.on("SIGTERM", () => {
    gracefulShutdown("SIGTERM received");
});

process.on("SIGINT", () => {
    gracefulShutdown("SIGINT received");
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Promise Rejection:", reason);

    gracefulShutdown("Unhandled rejection detected", 1);
});

// Handle unexpected exceptions
process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);

    gracefulShutdown("Uncaught exception detected", 1);
});

// Start server after database connection
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed:", error.message);

        await mongoose.disconnect();

        process.exit(1);
    }
};

startServer();
