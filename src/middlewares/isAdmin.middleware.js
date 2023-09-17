const CustomError = require("../utils/custom-error");
const userModel = require("../models/user.model")

const isAdmin = async (req, res, next) => {
  try {
    const {id} = req.verify;
    const user = await userModel.findById(id);
    if (!user.status=="admin" || !user.status=="super") throw new CustomError("Permission denied", 403);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAdmin;
