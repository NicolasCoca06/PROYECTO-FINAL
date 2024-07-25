import app from "./app.js";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";
import UserModel from './models/user.model.js'; // Asegúrate de que la ruta es correcta
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';


async function main() {
  try {
    await connectDB();
    app.listen(PORT);
    console.log(`Listening on port http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`)
  } catch (error) {
    console.error(error);
  }
}

main();

app.post('/forgot-password', (req, res) => {
  const {email} = req.body;
  UserModel.findOne({email: email})
  .then(user => {
      if(!user) {
          return res.send({Status: "User not existed"})
      } 
      const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"})
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'betscom72@gmail.com',
            pass: 'xilh cwup pqlf gyaq'
          }
        });
        
        var mailOptions = {
          from: 'betscom72@gmail.com',
          to: 'user email@gmail.com',
          subject: 'Reset Password Link',
          text: `http://localhost:5173/reset_password/${user._id}/${token}`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            return res.send({Status: "Success"})
          }
        });
  })
})
