const express = require("express")
const {format} = require('util');
const cors = require('cors')
const pool = require("./db")
const auth = require("./auth")
const path = require("path");
const multer = require("multer");
const upload = multer();
const applicantdB = require("./applicant-db")

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post('/auth/signin/otp', auth.signin_otp);

app.post('/auth/signin/verify', auth.signin_verify);

app.post('/auth/signup/otp', auth.signup_otp);

app.post('/auth/signup/verify', auth.signup_verify);

app.post('/save-personal-info', upload.fields([{name:"profile_image", maxCount : 1}, {name:"category_certificate", maxCount : 1}]), applicantdB.save_personal_info);

app.post('/save-communication-details', applicantdB.save_communication_details);

app.post('/save-education-details', applicantdB.save_education_details);

app.get('/get-personal-info', applicantdB.get_personal_info)

app.post('/temp', upload.fields([]), applicantdB.temp);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});