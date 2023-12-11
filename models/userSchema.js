const mongoose = require("mongoose");
const { Schema } = mongoose;
const Users = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true, minLength: 4 },
    email: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },

    userImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", Users);
