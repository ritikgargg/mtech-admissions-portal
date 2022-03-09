const express = require("express")
const {format} = require('util');
const cors = require('cors')
const pool = require("./db")
const auth = require("./auth")
const path = require("path");
const multer = require("multer");
const upload = multer();
const applicantdB = require("./applicant-db")
// const { Storage } = require("@google-cloud/storage");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());


// const gc = new Storage({
//   keyFilename: path.join(__dirname, "./phd-pg-admission-iit-ropar-0aa094c57f3e.json"),
//   projectId: "phd-pg-admission-iit-ropar"
// });


// const applicantBucket = gc.bucket("applicant-iit-ropar");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post('/auth/signin/otp', auth.signin_otp);

app.post('/auth/signin/verify', auth.signin_verify);

app.post('/auth/signup/otp', auth.signup_otp);

app.post('/auth/signup/verify', auth.signup_verify);

app.post('/save-personal-info', upload.fields([{name:"profile_image", maxCount : 1}, {name:"category_certificate", maxCount : 1}]), applicantdB.temp);

app.post('/save-communication-details', applicantdB.save_communication_details);

app.post('/save-education-details', applicantdB.save_education_details);

// app.post('/upload', upload.single("profile_image"), (req, res, next) => {
//   console.log(req.body);
//   console.log(req.file);
//   if (!req.file) {
//     res.status(400).send('No file uploaded.');
//     return;
//   }

//   // Create a new blob in the bucket and upload the file data.
//   const blob = applicantBucket.file(req.file.originalname);
//   const blobStream = blob.createWriteStream();

//   blobStream.on('error', err => {
//     next(err);
//   });

//   blobStream.on('finish', () => {
//     // The public URL can be used to directly access the file via HTTP.
//     const publicUrl = format(
//       `https://storage.googleapis.com/${applicantBucket.name}/${blob.name}`
//     );
//     res.status(200).send(publicUrl);
//   });

//   blobStream.end(req.file.buffer);
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});