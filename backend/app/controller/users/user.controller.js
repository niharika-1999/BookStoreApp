/**
 * @file            : user.controller.js
 * @author          : Niharika Rao
 * @version         : 1.0
 * @since           : 16-12-2021
 */
const logger = require("../../../config/logger");
const userService = require("../../service/users/user.service");
const { validationResult } = require("express-validator");
const dtoObj = require("./user.responseSchema");
let responseObject;

class UserOperations {
  loginUser = (req, res) => {
    let userDetails = req.body;
    userService.login(userDetails)
      .then((data) => {
        responseObject = dtoObj.userApiSuccess;
        responseObject.message = data;
        res.send(responseObject);
      })
      .catch((err) => {
        logger.error(err);
        responseObject = dtoObj.userApiFailure;
        responseObject.message = err.message;
        return res.send(responseObject);
      });
  };
  //create a user
  create = (req, res) => {
    userService.createNewUser(req.body)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        logger.error(err);
        responseObject = dtoObj.userApiFailure;
        responseObject.message = err.message;
        return res.send(responseObject);
      });
  };
  // Retrieve and return all notes from the database.
  findAll = (req, res) => {
    userService.getUsers()
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        logger.error(err);
        responseObject = dtoObj.userApiFailure;
        responseObject.message = err.message;
        return res.send(responseObject);
      });
  };
  // Find a single note with a noteId
  findOne = (req, res) => {
    userService.getUser(req.params.userId)
      .then((data) => {
        responseObject = dtoObj.userApiSuccess;
        responseObject.message = data;
        res.send(responseObject);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          logger.error("user not found with id");
          responseObject = dtoObj.userApiFindFailure;
          res.send(responseObject);
        }
        responseObject = dtoObj.userApiFailure;
        responseObject.message = err.message;
        res.send(responseObject);
      });
  };
  // Find note and update it with the request body
  update = (req, res) => {
    let id = req.params.userId;
    let userDetails = req.body;
    userService.updateUsers(id, userDetails)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          logger.error("user not found with id");
          responseObject = dtoObj.userApiFindFailure;
          res.send(responseObject);
        }
        responseObject = dtoObj.userApiFailure;
        responseObject.message = err.message;
        res.send(responseObject);
      });
  };

  // Delete a note with the specified noteId in the request
  delete = (req, res) => {
    userService.deleteUsers(req.params.userId)
      .then((result) => {
        res.send({ message: "user deleted successfully!" });
      })
      .catch((err) => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          logger.error("user not found with id " + req.params.noteId);
          responseObject = dtoObj.userApiFindFailure;
          res.send(responseObject);
        }
        responseObject = dtoObj.userApiFailure;
        responseObject.message = err.message;
        res.send(responseObject);
      });
  };

  forgotPassword = (req, res) => {
    let email = req.body.email;
    userService.forgot(email)
      .then((data) => {
        res.send("Result:" + data);
      })
      .catch((err) => {
        logger.error(err);
        console.log("error:" + err);
        res.send(err);
      });
  };

  resetPassword = (req, res) => {
    let token = req.params.token;
    let password = req.body.password;
    userService.reset(token, password)
      .then((data) => {
        res.json({ message: "Password updated successfully", "Result:": data });
      })
      .catch((err) => {
        logger.error(err);
        console.log("error:" + err);
        res.send(err);
      });
  };
}
module.exports = new UserOperations();