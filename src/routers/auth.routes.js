const { register, login, forgetPass, updatePass } = require("../controllers/auth.controller");
const loginValidation = require("../validations/login.validation");
const userValidation = require("../validations/user.validate");
const isAuth2 = require("../middlewares/isAuth2")
const isAuth = require("../middlewares/isAuth.middleware")
const isAdmin = require("../middlewares/isAdmin.middleware")
const isSuper = require("../middlewares/isSuper.middleware")
const router = require("express").Router()

router.post("/auth/register",isAuth,isAdmin,isSuper,userValidation,register);
router.post("/auth/login",loginValidation,login);
router.post("/auth/forgetpass",forgetPass);
router.put("/auth/changepass/:token",isAuth2, updatePass);
router.delete("/auth/remove/:id",isAuth,isSuper, updatePass);

module.exports = router