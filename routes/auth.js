const express = require("express");
const {
  creatUser,
  loginUser,
  getUserProfile,
  changePassword,
  update,
  search,
} = require("../contollers/authController");
const { checkAuth } = require("../config/middleware");
const { userImageMulter } = require("../config/storage");
const router = express.Router();

router.post("/signIN", creatUser);
router.post("/login", loginUser);
router.post("/changePassword", changePassword);

// Authentication needed

router.get("/getUser", checkAuth, getUserProfile);
router.put("/UpdateProfile", userImageMulter, checkAuth, update);
router.get("/search", checkAuth, search);

module.exports = router;
