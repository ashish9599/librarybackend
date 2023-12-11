const express=require("express");
const { checkAuth } = require("../config/middleware");
const { qtyleft, addInventory, getSinglebookInventory, bookSold } = require("../contollers/inventoryController");

const router=express.Router()

router.post("/bookSold",checkAuth,bookSold);
router.post("/addInventory",checkAuth,addInventory);
router.get("/getSinglebookInventory/:bookId",checkAuth,getSinglebookInventory);
module.exports=router;