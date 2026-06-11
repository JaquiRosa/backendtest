const bcrypt = require("bcrypt");

async function comparePassword(password, hashedPassword) {
  const passwordMatch = await bcrypt.compare(password, hashedPassword);
  return passwordMatch;
}

module.exports = comparePassword;