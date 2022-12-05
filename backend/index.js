require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const projectsRoutes = require("./routes/projects");
const tasksRoutes = require("./routes/tasks");
const todoRoutes = require("./routes/todo");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/projects/tasks", tasksRoutes);
app.use("/api/todo", todoRoutes);

const port = process.env.PORT || 8080;
(app.listen(port, console.log(`Listening on port ${port}...`)) && console.log("Database Connected!"));