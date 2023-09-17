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
    status:{
        type: String,
        enum: ["yangi","remont","eski"],
        required: true
    },
    typeofHome:{
        type: String,
        enum: ["dom","hovli"],
        required: true
    },
    price: {
        type: String,
        required: true
    },
    currency:{
        type: String,
        enum: ["usd","evro","uzs"],
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    kv: {
        type: Number,
        required: true
    },
    countofRoom: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isSale: {
        type: Boolean,
        default: false
    },
    photos: {
        type: Array,
        required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("home", schem);
