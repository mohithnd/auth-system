const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../../config/server_config");

function checkPassword(plainPassword, encryptedPassword) {
  try {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
  } catch (err) {
    throw err;
  }
}

function createToken(input) {
  try {
    return jwt.sign(input, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  checkPassword,
  createToken,
};
