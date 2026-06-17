const validatePassword = require("../../utils/validatePassword");

function validateUpdateUser(req, res, next) {
  const { id } = req.params;
  const { email, password } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "User id is required",
    });
  }

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

module.exports = validateUpdateUser;