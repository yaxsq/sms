const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ msg: "No token, authorization denied" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "someverysecretkey");
    req.user = decoded;  // { userId, role }
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Token invalid" });
  }
};

module.exports = authMiddleware;
 
