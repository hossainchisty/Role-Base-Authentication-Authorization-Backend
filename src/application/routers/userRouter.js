// Define the HTTP routes for the Listing model.
const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// POST /register
router.post("/register", userController.registerUser);

// POST /login
router.post("/login", userController.loginUser);

// GET /users
router.get("/", userController.getAllUsers);

// GET /users/:id
router.get("/:id", userController.findById);

// PUT /users/:id
router.put("/:id", userController.update);

// DELETE /users/:id
router.delete("/:id", userController.delete);


module.exports = router;
