const { Schema, model } = require("mongoose");
const schem = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status:{
      type:String,    
      enum: ["super","admin"],
      default: "admin"
  },
    isActive: {
        type: Boolean,
        default: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("users", schem);
