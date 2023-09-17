const fileUpload = require("express-fileupload");
const routers = require("../routers");
const {errorHandler} = require("../middlewares/error-handler")



const modules = (app, express) => {
    app.use(express.json())
    app.use(fileUpload())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static(process.cwd() + "/uploads"))
    app.use("/api", routers)
    app.use(errorHandler)
}


module.exports = modules