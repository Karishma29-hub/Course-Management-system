const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const app = express();

const connectDB = require("./config/db");
const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const profileRoutes = require("./routes/profileRoutes");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Student Course Management API is running"
    });
});

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "API is healthy"
    });
});

// Versioned API routes
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/profile", profileRoutes);

// Existing API route (backward compatibility)
app.use("/api/courses", courseRoutes);

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Centralized error handler
app.use(errorHandler);

// Start server only after MongoDB connects
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();