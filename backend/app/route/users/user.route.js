/**
 * @file            : user.route.js
 * @author          : Niharika Rao
 * @version         : 1.0
 * @since           : 16-12-2021
 */

const express = require("express");
const router = express.Router();
const userOperations = require("../../controller/users/user.controller");
const validateName = require("../../middleware/user.middleware");
const { body } = require("express-validator");

//User Login
router.post("/login", userOperations.loginUser);

// Create a new user
router.post(
  "/",
  body("firstName")
    .matches("^[A-Z][a-zA-Z]{2,}")
    .withMessage("Please enter a valid name with first letter capital."),
  body("lastName")
    .matches("^[A-Z][a-zA-Z]{2,}")
    .withMessage("Please enter a valid name with first letter capital."),
  body("email").isEmail().withMessage("Enter a valid Email"),
  userOperations.create
);

// Retrieve all users
router.get("/", userOperations.findAll);

// Retrieve a single user with userId
router.get("/:userId", userOperations.findOne);

// Update a user with userId
router.put(
  "/:userId",
  body("firstName")
    .matches("^[A-Z][a-zA-Z]{2,}")
    .withMessage("Please enter a valid name with first letter capital."),
  body("lastName")
    .matches("^[A-Z][a-zA-Z]{2,}")
    .withMessage("Please enter a valid name with first letter capital."),
  body("email").isEmail().withMessage("Enter a valid Email"),
  userOperations.update
);

// Delete a user with userId
router.delete("/:userId", userOperations.delete);

//forgot password route
router.post("/forgot", userOperations.forgotPassword);

//email password reset route
router.post("/reset/:token", userOperations.resetPassword);

module.exports = router;