const express = require("express");
const { checkAuth } = require("../config/middleware");
const {
  getUserCart,
  addCart,
  removeCart,
  getSinglebookCart,
  deleteAll,
} = require("../contollers/cartController");

const router = express.Router();

router.get("/getCart", checkAuth, getUserCart);
router.post("/addtoCart", checkAuth, addCart);
router.delete("/removeCart/:cartId", checkAuth, removeCart);
router.delete("/deleteAll", checkAuth, deleteAll);
router.get("/getSingleCart/:bookId", checkAuth, getSinglebookCart);

module.exports = router;
