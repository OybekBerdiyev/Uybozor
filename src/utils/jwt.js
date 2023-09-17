const jwt = require("jsonwebtoken");
const  config  = require("../../config")
const secretKey = config.jwtsecret

const generate = (payload) => jwt.sign(payload, secretKey, {expiresIn: config.jwtDead});
const verify = (payload, callback) => jwt.verify(payload, secretKey, callback);

module.exports = {
  generate,
  verify,
};