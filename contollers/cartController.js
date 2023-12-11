// const BOOK = require("../models/booksStore");

const Cart = require("../models/cart");

// const User = require("../models/userSchema");
exports.addCart = async (req, res) => {
  try {
    const { bookId } = req.body;
    if (bookId) {
      const cart = await Cart.findOne({ bookId });
      if (!cart) {
        await Cart.create({
          bookId,
          user: req.user._id,
        });
        const newCart = await Cart.find({ user: req.user._id });
        res
          .status(200)
          .json({
            succuss: true,
            message: "Cart added sucessfuly",
            cart: newCart,
          });
      } else {
        res.status(400).json({ succuss: false, message: "Already present" });
      }
    } else {
      res.status(400).json({ succuss: false, message: "Invalid Credential" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ succuss: false, message: error });
  }
};
exports.getUserCart = async (req, res) => {
  try {
    const newCart = await Cart.find({ user: req.user._id });
    res
      .status(200)
      .json({ succuss: true, message: "Cart get Successfull", cart: newCart });
  } catch (error) {
    res.status(400).json({ succuss: false, message: error });
  }
};

exports.removeCart = async (req, res) => {
  try {
    // const { bookId } = req.params;
    const { cartId } = req.params;

  
    if (cartId) {
      const ans = await Cart.findOneAndDelete({bookId:cartId });
  
      const newCart = await Cart.find({ user: req.user._id });
      res
        .status(200)
        .json({ succuss: true, message: "Deleted", cart: newCart });
    } else {
      res.status(400).json({ succuss: false, message: "Not found " });
    }
  } catch (error) {
    res.status(400).json({ succuss: false, message: error });
  }
};
exports.getSinglebookCart = async (req, res) => {
  try {
    const { bookId } = req.params;
    // if (bookId) {
      // await Cart.findByIdAndDelete(id);
      const newCart = await Cart.findOne({ bookId });
      if(newCart){
        res
        .status(200)
        .json({ succuss: true, message: "succefull", cart: newCart });
      
    } else {
      res.status(400).json({ succuss: false, message: "Not found " });
    }
  } catch (error) {
    res.status(400).json({ succuss: false, message: error });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const ans = await Cart.deleteMany({});
    console.log(ans);
    const newCart = await Cart.find({ user: req.user._id });
    res.status(200).json({ succuss: true, message: "Deleted", cart: newCart });
  } catch (error) {
    res.status(400).json({ succuss: false, message: error });
  }
};
