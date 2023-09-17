const { Schema, model } = require("mongoose");
const schem = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    description:{
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    countofRoom: {
        type: Number,
        required: true
    },
    toWhom:{     
        type:String,
        enum: ["toboys","togirls","tofamily"],
        required: true
    },
    status:{
        type:String,    
        enum: ["yangi","remont","eski"],
        required: true
    },
    typeofHome:{
        type:String,
        enum: ["dom","hovli"],
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    photos: {
        type: Array,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("rent", schem);
