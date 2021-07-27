const mongoose = require("mongoose");
const moment = require("moment");
const connection = require("../db/connection");
const { encrypt } = require("../utils/encrypt");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  pic: {
    type: String,
    default:
      "https://res.cloudinary.com/pbu/image/upload/v1627421531/profilepic_djc1zm.jpg",
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  created_at: {
    type: Date,
    default: moment().unix() * 1000,
  },
});

userSchema.pre("save", function () {
  let user = this;
  user.password = encrypt(user.password);
  user.created_at = moment().unix() * 1000;
});

module.exports = mongoose.model("User", userSchema);
