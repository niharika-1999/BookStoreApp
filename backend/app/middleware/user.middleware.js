const { body, validationResult } = require("express-validator");

/**
 * validation rules set for user details 
 */
const userValidationRules = () => {
  return [
    body("email").exists().isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Please enter a valid password with at least 6 characters."),
  ];
};
/**
 * to print the error messages
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(422).json({ errors: extractedErrors });
};

module.exports = {
  userValidationRules,
  validate,
};