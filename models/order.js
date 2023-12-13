const mongoose = require("mongoose");
const { Schema } = mongoose;
const order = new Schema(
  {
    qty: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
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
  },{
    writeConcern: {
      
      j: true,
      wtimeout: 1000
    }
  }
);

module.exports = mongoose.model("Order", order);
