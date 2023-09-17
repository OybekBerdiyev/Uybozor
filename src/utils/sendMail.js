const nodemailer = require("nodemailer")

const {smtp} = require("../../config")

const mailConfig = {
    service: 'gmail',
    host: smtp.host,
    port: smtp.port,
    secure: false,
    auth:{
        user: smtp.mail,
        pass: smtp.password
    },
};

const transport = nodemailer.createTransport(mailConfig);

const sendMail = async ({to,html})=>{
    const data ={
        to,subject:"Change your password",html, from:smtp.mail
    }
    const res = transport.sendMail(data);

    return res;
}

module.exports = sendMail;