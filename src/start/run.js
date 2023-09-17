const { connect } = require("mongoose");
const config = require("../../config")

const run = async(app) => {
    await connect(config.dbUri)
    app.listen(config.port,()=>{
        console.log(+config.port);
    })
}

module.exports = run