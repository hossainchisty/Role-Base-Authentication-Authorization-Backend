// Require necessary dependencies
const User = require("../../domain/models/UserModel");

// Handle all the database operations related to the User model.
const UserRepository = {
  async getAllUsers() {
    return await User.find();
  },

  async findById(id) {
    return await User.findById(id);
  },

  async findByEmail(email) {
    return await User.findOne({ email });
  },

  async save(user) {
    const Userdata = new User(user);
    await Userdata.save();
    return Userdata;
  },

  async updateUser(id, userData) {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  },

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  },
};

module.exports = UserRepository;
