const mongoose = require("mongoose");
const multer = require("multer");
const bookStorage = require("../config/storage");
const { Schema } = mongoose;
const Book = new Schema(
  {
    name: { type: String, required: true },
    desciption: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    // qty:{type:Number,required:true},
    available: { type: Boolean, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    language: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bookImage: {
      type: String,
    },
    //   rating:{
    //     type:Number,default:0
    // },stock:{
    //   type:Number,
    //   default:1
    // },numOfrReview:{
    //   type:Number,
    // default:0
    // },
    // reviews:[{
    //   name:{  type:String,
    //       required:true,
    //   },
    //   rating:{
    //       type:Number,
    //   },
    //   comment:{
    //       type:String,
    //       required:true,
    //   }
    // }],

    publishedAt: {
      type: Date,
      default: new Date(),
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

module.exports = mongoose.model("Book", Book);
