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
  {
    timestamps: true,
  },
  {
    writeConcern: {
    
      j: true,
      wtimeout: 1000
    }
  }
);

module.exports = mongoose.model("Cart", cart);
