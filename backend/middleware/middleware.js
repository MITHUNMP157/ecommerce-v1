const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(404).json({ valid: false, message: "No Token Provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ valid: false, message: "Invalid Token" });
    }

    req.user = decoded;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Access denied — Admin only" });
};

module.exports = { verifyToken, isAdmin };
