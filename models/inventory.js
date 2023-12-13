const mongoose = require("mongoose");
const { Schema } = mongoose;
const Inventory = new Schema(
  {
    bookLeft: {
      type: Number,
      required: true,
    },
    bookSold: {
      type: Number,
      default:0
    },
    totalBook: {
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
  { writeConcern: {
    j: true,
    wtimeout: 1000
  }
},
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Inventory", Inventory);
