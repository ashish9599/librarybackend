const express = require("express");
const router = express.Router();

router.use("/api/v1/auth", require("./auth"));
router.use("/api/v1/book", require("./book"));

router.use("/api/v1/cart", require("./cart"));
router.use("/api/v1/order", require("./order"));
router.use("/api/v1/inventory", require("./inventory"));

module.exports = router;
