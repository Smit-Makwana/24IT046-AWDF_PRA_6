// server.js
// Practical Concept: Practical 4, Practical 5, Practical 6 & Practical 7
// (Express Server, MongoDB Connection, Authentication & Middleware Pipeline)

// 1. Import dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

// Import custom middleware and routes
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const eventRoutes = require("./routes/eventRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");

// Register EventEmitter listeners
require("./listeners");

// 2. Load environment variables from .env file
dotenv.config();

// 3. Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/management_system_db";

// 4. Connect to MongoDB Database (only if not in test environment)
if (process.env.NODE_ENV !== "test") {
  mongoose.connect(
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/management_system_db"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));
}

// 5. Built-in middleware to parse incoming JSON payloads
app.use(express.json());

// 6. Enable Cross-Origin Resource Sharing (CORS) so React frontend (port 5173) can talk to Express (port 5000)
app.use(cors());

// 7. Use custom request logging middleware
app.use(logger);

// Health check / welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Event & Task Management System API!",
    status: "Running",
    endpoints: {
      auth: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login",
        me: "GET /api/auth/me (Bearer Token Required)",
      },
      events: {
        getAllEvents: "GET /api/events",
        getSingleEvent: "GET /api/events/:id",
        createEvent: "POST /api/events (Protected)",
        updateEvent: "PUT /api/events/:id (Protected)",
        deleteEvent: "DELETE /api/events/:id (Protected)",
      },
      tasks: {
        getAllTasks: "GET /api/tasks (Protected)",
        getSingleTask: "GET /api/tasks/:id (Protected)",
        createTask: "POST /api/tasks (Protected)",
        updateTask: "PUT /api/tasks/:id (Protected)",
        deleteTask: "DELETE /api/tasks/:id (Protected)",
      },
    },
  });
});

// 8. Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);

// 9. 404 Handler for undefined API routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// 10. Register global error handling middleware (Must be registered last)
app.use(errorHandler);

// 11. Start Express Server (only when directly executed)
let server;
if (process.env.NODE_ENV !== "test") {
  server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
