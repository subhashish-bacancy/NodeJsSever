const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, reqired: true },
  roles: {
    User: { type: Number, default: 2001 },
    Editor: Number,
    Admin: Number,
  },
  password: { type: String, require: true },
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema); //will look for users
