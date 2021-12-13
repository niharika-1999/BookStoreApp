const userModels = require("../../model/users/user.model");
const jwtHelper = require("../../../utils/jwt");
const emailer = require("../../../utils/nodeMailer");
const bcrypt = require("bcrypt");

class UserService {
  createNewUser = (userDetails) => {
    return userModels.createUser(userDetails);
  };
  login = (userDetails) => {
    return userModels
      .loginUser(userDetails)
      .then((data) => {
        if (bcrypt.compareSync(userDetails.password, data.password)) {
          var token = jwtHelper.generateToken(data._id);
          return token;
        } else {
          throw new Error("Password is incorrect");
        }
      })
      .catch((error) => {
        throw error;
      });
  };
  getUsers = () => {
    return userModels.findAllUsers();
  };

  getUser = (findId) => {
    return userModels.findUser(findId);
  };

  updateUsers = (findId, userDetails) => {
    return userModels.updateUser(findId, userDetails);
  };

  deleteUsers = (findId) => {
    return userModels.deleteById(findId);
  };

  forgot = (email) => {
    return userModels
      .forgotPassword(email)
      .then((data) => {
        return emailer
          .mailer(data.email, data.resetPasswordToken)
          .then((data) => {
            return data;
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  };

  reset = (token, password) => {
    return userModels
      .resetPassword(token, password)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  };
}
module.exports = new UserService();