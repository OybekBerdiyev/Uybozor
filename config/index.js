require("dotenv/config")

const {env} = process

const config = {
    port: env.PORT,
    jwtsecret: env.JWT_SECRET,
    dbUri: env.DB_URI,
    jwtDead: env.JWT_DEAD,
    smtp:{
        host:env.SMTP_HOST,
        password:env.SMTP_PASS,
        port:env.SMTP_PORT,
        mail:env.SMTP_MAIL,
    }
}

module.exports = config