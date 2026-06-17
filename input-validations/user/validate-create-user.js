const validatePassword = require("../../utils/validatePassword");

function validateCreateUser(req, res, next) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      message: "Password is required",
    });
  }

  const passwordError = validatePassword(password);

  if (passwordError) {
    return res.status(400).json({
      message: passwordError,
    });
  }

  next();
}

module.exports = validateCreateUser;