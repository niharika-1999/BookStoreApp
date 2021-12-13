const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwtHelper = require("../../../utils/jwt");
/**
 * @description creation of schema for user collection
 */
const UserSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

var encryptedPassword;

class UserModels {
  /**
   * Function for login of the user
   * @param {Object} userDetails
   * @returns promise
   */
  loginUser = (userDetails) => {
    return User.findOne({ email: userDetails.email })
      .then((data) => {
        if (data) {
          return data;
        } else {
          throw new Error("Email not found");
        }
      })
      .catch((error) => {
        throw error;
      });
  };
  /**
   * function to create a user
   * @param {Object} userDetails
   * @returns promise with user details
   */
  createUser = (userDetails) => {
    encryptedPassword = bcrypt.hashSync(userDetails.password, 10);
    const user = new User({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      password: encryptedPassword,
      email: userDetails.email,
    });
    return user.save();
  };
  /**
   * function to get all the users
   * @returns promise with all the users
   */
  findAllUsers = () => {
    return User.find();
  };
  /**
   * function to find a particular user with userid
   * @param {Object} findId
   * @returns promise with the particular user if not error message
   */
  findUser = (findId) => {
    return User.findById(findId);
  };
  /**
   * function to update user
   * @param {Object} findId
   * @param {Object} userDetails
   * @returns promise with previous version of user
   */
  updateUser = (findId, userDetails) => {
    encryptedPassword = bcrypt.hashSync(userDetails.password, 10);
    return User.findByIdAndUpdate(findId, {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      password: encryptedPassword,
      email: userDetails.email,
    });
  };
  /**
   * function to delete a user by his id
   * @param {Object} findId user id
   * @returns status message
   */
  deleteById = (findId) => {
    return User.findByIdAndRemove(findId);
  };
  /**
   * function to send a mail if password is forgotten
   */
  forgotPassword = (email) => {
    return User.findOne({ email: email })
      .then((data) => {
        if (!data) {
          throw "Email not found";
        } else {
          let token = jwtHelper.generateToken();
          data.resetPasswordToken = token;
          return data
            .save()
            .then((data) => {
              return data;
            })
            .catch((err) => {
              throw err;
            });
        }
      })
      .catch((err) => {
        throw err;
      });
  };
  resetPassword = (token, newPassword) => {
    return User.findOne({ resetPasswordToken: token })
      .then((data) => {
        if (!data) {
          throw "token not found";
        } else {
          encryptedPassword = bcrypt.hashSync(newPassword, 10);
          (data.password = encryptedPassword),
            (data.resetPasswordToken = undefined);
          return data
            .save()
            .then((data) => {
              return data;
            })
            .catch((err) => {
              throw err;
            });
        }
      })
      .catch((err) => {
        throw err;
      });
  };
}

module.exports = new UserModels();