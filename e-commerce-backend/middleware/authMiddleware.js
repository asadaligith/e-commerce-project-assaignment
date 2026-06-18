const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  try {
    let token;

    // token from header (recommended)
    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER:", req.headers.authorization);

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};