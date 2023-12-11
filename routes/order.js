const express=require("express");
const { checkAuth } = require("../config/middleware");
const { addOrder, getUserOrder, cancelOrder, getSinglebookOrder, qtyleft } = require("../contollers/orderController");

const router=express.Router()

router.get("/getAllOrder",checkAuth,getUserOrder);
router.get("/getSingleOrder/:orderId",checkAuth,getSinglebookOrder);
router.post("/placedOrder",checkAuth,addOrder);
// router.post("/qtyleft",checkAuth,qtyleft);
router.delete("/cancelOrder/:orderId",checkAuth,cancelOrder);

module.exports=router;