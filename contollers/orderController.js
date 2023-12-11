const Order = require("../models/order");
const BOOK = require("../models/booksStore");
exports.addOrder = async (req, res) => {
  const { bookId, price, qty } = req.body;
  try {
    if (bookId) {
      
        await Order.create({
          price,
          qty,
          bookId,
          user: req.user._id,
        });
        const newOrder = await Order.find({ user: req.user._id });
        res.status(200).json({
          succuss: true,
          message: "Order added sucessfuly",
          order: newOrder,
        });
     
    } else {
      res.status(400).json({ succuss: false, message: "Invalid Credential" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ succuss: false, message: error });
  }
};
exports.getUserOrder = async (req, res) => {
  try {
    const newOrder = await Order.find({ user: req.user._id });
    res.status(200).json({
      succuss: true,
      message: "User Order get Successfull",
      order: newOrder,
    });
  } catch (error) {
    res.status(400).json({ succuss: false, message: error });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (orderId) {
      const ans = await Order.findByIdAndDelete(orderId );
      const newOrder = await Order.find({ user: req.user._id });
      res
        .status(200)
        .json({ succuss: true, message: "Deleted", order: newOrder });
    } else {
      res.status(400).json({ succuss: false, message: "Not found " });
    }
  } catch (error) {
    res.status(400).json({ succuss: false, message: error });
  }
};

exports.getSinglebookOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    // const { orderId } = req.params;
    const newOrder = await Order.findById(orderId);
    if (newOrder) {
      // await Cart.findByIdAndDelete(id);
      res
        .status(200)
        .json({ succuss: true, message: "found", order: newOrder });
    } else {
      res.status(400).json({ succuss: false, message: "Not found " });
    }
  } catch (error) {
    res.status(400).json({ succuss: false, message: error });
  }
};
