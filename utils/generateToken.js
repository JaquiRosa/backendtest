const jwt = require("jsonwebtoken");

function generateToken(userId) {
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "2m" }
  );

  return token;
}

module.exports = generateToken;