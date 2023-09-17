const router = require("express").Router()
const isAuth = require("../middlewares/isAuth.middleware")
const isAdmin = require("../middlewares/isAdmin.middleware")
const fileUpload = require("../middlewares/fileUpload")
const rentValidation = require("../validations/rent.validation")
const {  createRent,filterRent, /* getAllRent */ getOneRent,updateRent,deleteRent } = require("../controllers/rent.controller")

router.post("/rent",isAuth,isAdmin,rentValidation,fileUpload,createRent);
router.get("/rent",filterRent);
router.get("/rent/:id",getOneRent);
router.put("/rent/:id",isAuth,isAdmin,rentValidation,fileUpload,updateRent);
router.delete("/rent/:id",isAuth,isAdmin,deleteRent);

module.exports = router