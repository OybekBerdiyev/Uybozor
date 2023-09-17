const userModel = require("../models/user.model")
const CustomError = require("../utils/custom-error")
const bcrypt = require("bcrypt");
const { generate } = require("../utils/jwt");
const sendMail = require("../utils/sendMail")

const register = async(req,res,next) => {
try {
    const {name,email,password} = req.body;
    const user = await userModel.findOne({email})
    if (user) {throw new CustomError (401,"Email already exists") };
    const hashedPass = await bcrypt.hash(password, 12)
    const users = await userModel.create({name,email: email.toLowerCase(),password: hashedPass});
    const token = generate({id: users.id})
    res.status(201).json({message: "success",data: token});
} catch (error) {
    next(error);
}

}

const login = async (req,res,next) => {
try {
    const data = req.body;
    const user = await userModel.findOne({email: data.email.toLowerCase(),isActive:true});
    if(!user) throw new CustomError(403,"Emial or password incorrect");
    const compare = await bcrypt.compare(data.password, user.password);
    if(!compare) throw new CustomError(403,"Emial or password incorrect");
    const token = generate({id: user.id})
    res.json({messaage: "success",token: token})
} catch (error) {
    next(error)
}
}


const forgetPass = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await userModel.findOne({ email: email.toLowerCase(), isActive: true });
      if (!user) return res.status(403).json({ message: "Email not exists" });
  
      const token = generate({ id: user.id });
  
      const html = `
        <html>
          <head>
            <style>
              body {
                background-color: #f4f4f4;
                font-family: Arial, sans-serif;
              }
              .container {
                text-align: center;
                background-color: white;
                border-radius: 5px;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                width: 400px;
                margin: 0 auto;
                margin-top: 20px;
              }
              h1 {
                color: #333;
              }
              .change-password-link {
                display: inline-block;
                padding: 15px 30px;
                background-color: azure;
                text-decoration: none;
                color: #333;
                border-radius: 5px;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Hi ${user.name},</h1>
              <p>Follow this link to change your password:</p>
              <a href="http://localhost:4000/api/auth/changepass/${token}" class="change-password-link">Change your Password</a>
            </div>
          </body>
        </html>
      `;
  
      sendMail({ to: email, html });
      res.json({ message: "Check your email" });
    } catch (error) {
      next(error);
    }
  };
    
  const updatePass = async (req, res, next) => {
    try {
      const { id } = req.verify;
      const { newPassword } = req.body;
      const hashedPass = await bcrypt.hash(newPassword, 12);
      const user = await userModel.findByIdAndUpdate(id, { password: hashedPass });
      res.json({ message: "Success", data: user });
    } catch (error) {
      next(error);
    }
  };
  
  const deleteAdmin = async (req, res, next) => {
    try {
        const {id} = req.params;
        await userModel.findByIdAndUpdate(id, {isActive:false }, { new: true });   
        res.json({message: "Success"});
    } catch (error) {
        next(error)
    }
}
  

module.exports = {register, login, forgetPass , updatePass ,deleteAdmin};