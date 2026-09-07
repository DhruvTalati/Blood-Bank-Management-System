const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Token is missing.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists.",
      });
    }

    if (user.status !== "Active") {
      return res.status(403).json({
        success: false,
        message: "User account is inactive.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "Administrator") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Administrator access required.",
  });
};

module.exports = {
  protect,
  adminOnly,
};
