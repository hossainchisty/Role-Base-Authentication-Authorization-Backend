// Basic Lib Imports
const express = require("express");
const dotenv = require("dotenv").config();

// Middlewares
const {
  errorHandler,
} = require("./src/application/middlewares/errorMiddleware");

const requireRole = require("./src/application/middlewares/requireRole");

// Database connection with mongoose
const connectDB = require("./src/infrastructure/mongodb/db");
connectDB();

// Routers
const userRouter = require("./src/application/routers/userRouter");

// Express app initialization
const port = process.env.PORT || 3000;
const app = express();

// Required for parsing request bodies
app.use(express.json());

// Error handler middleware
app.use(errorHandler);

// Application routes
app.use("/api/v1/users/", userRouter);

app.listen(port, () =>
  console.log(`Server started on port http://localhost:${port}`)
);