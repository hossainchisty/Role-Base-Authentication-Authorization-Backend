// Basic Lib Import
const bcrypt = require("bcryptjs");
const UserService = require("../../domain/services/UserServices");

// Handle HTTP requests related to the User model.
const userController = {
  registerUser: async (req, res, next) => {
    try {
      const user = req.body;
      const userExists = await UserService.findByEmail(user.email);
      if (userExists) {
        res.status(400);
        throw new Error("User already exists");
      }
      await UserService.registerUser({ email: user.email, password: user.password, role: user.role});
      if (user) {
        res.status(201).json({
          _id: user.id,
          email: user.email,
          role: user.role,
          token: UserService.generateToken(user._id),
          message: 'User created successfully'
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    } catch (error) {
      next(error);
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserService.loginUser({ email, password });
      if (user) {
        res.json({
          _id: user.id,
          email: user.email,
          role: user.role,
          token: UserService.generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  findById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await UserService.getUserById(id);
      if (!user) {
        res.status(200).json({ message: "User is not found" });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      next(error);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const users = await UserService.getUsers();
      if (!users) {
        res.status(200).json({ message: "User is empty" });
      } else {
        res.status(200).json(users);
      }
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      await UserService.update(id, data);
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      await UserService.delete(id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
