const express = require("express")
const {format} = require('util')
const cors = require('cors')
const pool = require("./db")
const auth = require("./auth")
const path = require("path")
const multer = require("multer")
const upload = multer()
const applicantdB = require("./applicant-db")
const dotenv = require('dotenv')
var bodyParser = require("body-parser")

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

dotenv.config();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post('/auth/signin/otp', auth.signin_otp);

app.post('/auth/signin/verify', auth.signin_verify);

app.post('/auth/signup/otp', auth.signup_otp);

app.post('/auth/signup/verify', auth.signup_verify);

app.post('/contact-us', auth.contact_us);

app.post('/save-personal-info', upload.fields([{name:"profile_image", maxCount : 1}, {name:"category_certificate", maxCount : 1}]), applicantdB.save_personal_info);

app.post('/save-communication-details', upload.fields([]), applicantdB.save_communication_details);

app.post('/save-education-details', 
        upload.fields([
          {name:"marksheet_10th_url", maxCount : 1},
          {name:"marksheet_12th_url", maxCount : 1},
          {name:"upload_marksheet0", maxCount : 1},
          {name:"upload_degree0", maxCount : 1},
          {name:"upload_marksheet1", maxCount : 1},
          {name:"upload_degree1", maxCount : 1},
          {name:"upload_marksheet2", maxCount : 1},
          {name:"upload_degree2", maxCount : 1},
          {name:"upload_marksheet3", maxCount : 1},
          {name:"upload_degree3", maxCount : 1},
          {name:"upload_marksheet4", maxCount : 1},
          {name:"upload_degree4", maxCount : 1}]),          
          applicantdB.save_education_details);

app.get('/get-profile-info', applicantdB.get_profile_info);

app.get('/check-applicant-info', applicantdB.check_applicant_info);

app.get('/get-open-positions', applicantdB.get_open_positions);

app.get('/get-user-info', applicantdB.get_user_info);

app.post('/save-application-info',
          upload.fields([
            {name:"transaction_slip", maxCount : 1},
            {name:"self_attested_copies", maxCount : 1},
            {name:"signature", maxCount : 1}
          ]), 
          applicantdB.save_application_info);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
});