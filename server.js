// Basic Lib Imports
const express = require("express");
const dotenv = require("dotenv").config();

// Middlewares
// const {
//   errorHandler,
// } = require("./src/modulers/list-service/application/middleware/errorMiddleware");

// Database connection with mongoose
// const connectDB = require("./src/modulers/list-service/infrastructure/mongodb/db");
// connectDB();

// Routers
// const listingsRouter = require("./src/modulers/list-service/application/routes/listing.routers");
// const hostRouter = require("./src/modulers/host-service/application/routes/host.routers");

// Express app initialization
const port = process.env.PORT || 3000;
const app = express();

// Required for parsing request bodies
app.use(express.json());

// Error handler middleware
// app.use(errorHandler);

// Application routes
// app.use("/api/v1/listings/", listingsRouter);
// app.use("/api/v1/host/", hostRouter);

app.listen(port, () =>
  console.log(`Server started on port http://127.0.0.1:${port}`)
);
