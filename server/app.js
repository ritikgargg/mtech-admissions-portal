const express = require("express")
const cors = require('cors')
const pool = require("./db")
const auth = require("./auth")
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

app.post('/save-personal-info', applicantdB.save_personal_info);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});