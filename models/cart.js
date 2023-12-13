const mongoose = require("mongoose");
const { Schema } = mongoose;
const cart = new Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { writeConcern: {
    j: true,
    wtimeout: 1000
  }
},
  {
    timestamps: true,
  },
  
);

module.exports = mongoose.model("Cart", cart);
