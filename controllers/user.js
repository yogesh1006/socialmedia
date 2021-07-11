const User = require("../models/user");
const { decrypt } = require("../utils/encrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { validationResult } = require('express-validator');

module.exports = {
  register: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          throw { message: errors.errors[0].msg };

      }
      // const { name, email, password, pic } = req.body;
      // if (!email || !password || !name) {
      //   throw { message: "please add all the fields" };                                                 
      // }

      let oldUser = await User.findOne({ email: req.body.email });
      if (oldUser) {
        throw { message: "User already exist." };
      }
      let newUser = new User(req.body);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
      let result = await newUser.save();
      res.json({
        status: "success",
        message: "user registered successfully.",
        data: result,
      });
    } catch (err) {
      res.status(400).json({
        message: (err && err.message) || "Oops! Failed to register user.",                                                                                                                                                                                                                                                                                                                                                
      });
    }
  },

  login: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw { message: errors.errors[0].msg };
      }
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw { message: "Please check your email/password." };
      } else {
        let result = decrypt(req.body.password, user.password);
        if (result) {
          let jwtPayload = {
            _id: user._id,
            email: user.email,
            name: user.name,
            followers:user.followers,
            following: user.following,
            pic:user.pic
          };
          user = user.toJSON();
          user.token = jwt.sign(jwtPayload, config.secret, {
            expiresIn: 60 * 60 * 24,
          });
          user.password = undefined;
          res.json({
            status: "success",
            message: "User logged in successfully.",
            data: user,
          });
        } else {
          throw { message: "Please check your email/password." };
        }
      }
    } catch (err) {
      res.status(400).json({
        message: (err && err.message) || "Oops! Failed to login.",
      });
    }
  },
};
