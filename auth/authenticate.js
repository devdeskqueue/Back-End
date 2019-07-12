const jwt = require("jsonwebtoken");

const jwtKey =
  process.env.JWT_SECRET ||
  "add a .env file to root of project with the JWT_SECRET variable";

// implementation details
function authenticate(req, res, next) {
  const token = req.get("Authorization");

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: "No token provided, must be set on the Authorization Header"
    });
  }
}

const inputDataChecker = (arr, target) => target.every(v => arr.includes(v));

const requiredData = (dataChecker, dataFields) => {
  return (req, res, next) => {
    if (!req.body || !Object.keys(req.body).length) {
      res.status(400).json({ message: `Missing user data` });
    } else if (!dataChecker(Object.keys(req.body), dataFields)) {
      res.status(400).json({ message: `Missing required field.` });
    } else {
      next();
    }
  };
};

module.exports = {
  inputDataChecker,
  requiredData,
  authenticate
};
