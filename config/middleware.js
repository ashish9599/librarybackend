const bcrypt = require("bcryptjs");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

exports.checkAuth = async (req, res, next) => {
  //  Get the token from req.header -auth-token
  try {
    const token = req.header("authtoken");
  // console.log(token);
    if (token) {
      const { userId } = jwt.verify(token, process.env.JWTSecretKey);
      const user = await User.findById(userId).select("-password");
      req.user = user;
      next();
    } else {
      res.status(400).json({ succuss: false, message: "Logid in first" });
    }
  } catch (error) {
    res.status(400).json({ succuss: false, message: error });
  }
};
