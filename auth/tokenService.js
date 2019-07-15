const jwt = require("jsonwebtoken"); // installed this library

const secret = process.env.JWT_SECRET;

module.exports = {
  generateToken
};

/**
 * Creates a new jwt for the specific user
 * @param user
 * @returns {*} signed jwt
 */
function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}
