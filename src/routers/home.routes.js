const router = require("express").Router()
const isAuth = require("../middlewares/isAuth.middleware")
const isAdmin = require("../middlewares/isAdmin.middleware")
const homeValidation = require("../validations/home.validation")
const fileUpload = require("../middlewares/fileUpload")
const { createHome, filterHome, getOneHome, updateHome, deleteHome } = require("../controllers/home.controller")

router.post("/home",isAuth,isAdmin,homeValidation,fileUpload,createHome);
router.get("/home",filterHome);
router.get("/home/:id",getOneHome);
router.put("/home/:id",isAuth,isAdmin,homeValidation,fileUpload,updateHome);
router.delete("/home/:id",isAuth,isAdmin,deleteHome);

module.exports = router