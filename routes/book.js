const express = require("express");

const { checkAuth } = require("../config/middleware");
const {
  addbook,
  getBook,
  getSingleBook,
  updateBook,
  removeBook,
  searchBook,
  searchBookByCategory,
  searchBookBylanguage,
  userBook,
} = require("../contollers/bookController");
const { bookImageMulter } = require("../config/storage");

const router = express.Router();

router.post("/add", bookImageMulter, checkAuth, addbook);
router.get("/userBook", checkAuth, userBook);
router.put("/update/:id", bookImageMulter, checkAuth, updateBook);
router.delete("/remove/:id", checkAuth, removeBook);

router.get("/getSinglebook/:id", getSingleBook);
router.get("/getbook", getBook);
router.get("/search", searchBook);
router.get("/searchCategory", searchBookByCategory);
router.get("/searchBylanguage", searchBookBylanguage);

module.exports = router;
