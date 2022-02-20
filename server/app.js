const express = require("express");
const nodemailer = require('nodemailer');
const cors = require('cors')
const otpGenerator = require('otp-generator')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secureConnection: true, 
  port: 465,
  pool: true,
  maxConnections: 20,
  tls: {
     ciphers:'SSLv3',
     rejectUnauthorized: true
  },
  auth: {
      user: '18tarun2001@gmail.com',
      pass: 'inwrovrslpmuimzj'
  }
});

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post('/signin', (req, res) => {
  email = req.body.email;

  otp = otpGenerator.generate(6, { specialChars: false });

  var mailOptions = {
    from: 'IIT Ropar',
    to: 'email', 
    subject: 'Register/Sign-in', 
    text: 'Your OTP is ' 
  };

  mailOptions.to = email;
  mailOptions.text += otp;
  console.log(otp);

  // transporter.sendMail(mailOptions, function(error, info){
  //   if (error) {
  //     console.log(error);
  //   } 
  //   // else {
  //   //   console.log('Email sent: ' + info.response);
  //   // }
  // });

  res.send(otp);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
