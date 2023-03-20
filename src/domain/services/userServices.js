// Basic Lib Imports
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserRepository = require("../../infrastructure/repositories/userRepository");
const User = require("../../domain/models/UserModel");


// Handle all the services related to the UserRepository.
const UserService = {
  getUsers: async () => {
    return await UserRepository.getAllUsers();
  },

  getUserById: async (id) => {
    return await UserRepository.findById(id);
  },

  findByEmail: async (email) => {
    return await UserRepository.findByEmail(email);
  },

  registerUser: async ({ email, password, role }) => {
    const user = new User({ email, password, role });
    await UserRepository.save(user);
    return user;
  },

  loginUser: async ({ email, password }) => {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("Incorrect Email");

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      throw new Error("Incorrect Password");
    }
    return user;
  },

  // Generate JWT Token
  generateToken: (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  },

  authenticateUser: async ({ email, password }) => {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return user;
  },

  updateUser: async (id, userData) => {
    return await UserRepository.updateUser(id, userData);
  },

  deleteUser: async (id) => {
    return await UserRepository.deleteUser(id);
  },
};

module.exports = UserService;
