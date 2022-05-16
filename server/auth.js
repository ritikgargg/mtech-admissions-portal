const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const pool = require("./db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  secureConnection: true,
  port: 465,
  pool: true,
  maxConnections: 20,
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: true,
  },
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

/**
 * Auth role tokens:
 * 0 for super-admin
 * 1 for faculty-admins/supervisors
 * 2 for applicants
 * 3 for staff from academics
 */

const signin_otp = async (req, res) => {
  email = req.body.email;

  if (email === "") return res.send("0");

  const result = await pool.query(
    "select * from login_verification where email_id = $1",
    [email]
  );

  if (result.rowCount === 0) return res.send("1");

  const filePath = path.join(__dirname, "otp_email.html");
  const html = fs.readFileSync(filePath, "utf-8").toString();
  var template = handlebars.compile(html);

  otp = otpGenerator.generate(6, { specialChars: false });

  var replacements = {
    VERIFICATION_CODE: otp,
  };
  var htmlToSend = template(replacements);

  var mailOptions = {
    from: "IIT Ropar",
    to: "email_id_to_send_otp",
    subject: "OTP for Sign-in",
    html: htmlToSend,
  };

  mailOptions.to = email;
  console.log(otp);

  /** encrypt otp and save in db */
  await bcrypt.hash(otp, saltRounds, async function (err, hash) {
    await pool.query(
      "UPDATE login_verification SET hashed_otp = $1, expiration_time = to_timestamp($2) WHERE email_id = $3",
      [hash, Date.now() / 1000.0 + 600, email]
    );
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });

  return res.send("2");
};

const signin_verify = async (req, res) => {
  const { email, otp } = req.body;

  if (otp === "") return res.send({ result: 3 });

  /** encrypt and check for otp in db and return accordingly */
  const result = await pool.query(
    "select * from login_verification where email_id = $1",
    [email]
  );
  const result_row = result.rows[0];

  /** check if otp is expired */
  if (Date.now() > new Date(result_row.expiration_time.getTime())) {
    return res.send({ result: 2 });
  }

  await bcrypt.compare(
    otp,
    result_row.hashed_otp,
    async function (err, result) {
      if (result === true) {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
          userEmail: email,
          userRole: null,
          department: null,
        };

        let if_admin = await pool.query(
          "SELECT * from admins where email_id = $1",
          [email]
        );
        if (if_admin.rows.length === 0) {
          data.userRole = 2;
          const authToken = jwt.sign(data, jwtSecretKey);
          return res.send({ result: 1, token: authToken });
        } else if (if_admin.rows[0].admin_type === 0) {
          data.userRole = 0;
          data.department = if_admin.rows[0].department;
          const authToken = jwt.sign(data, jwtSecretKey);
          return res.send({ result: 4, token: authToken, admin_type: 0 });
        } else if (if_admin.rows[0].admin_type === 1) {
          data.userRole = 1;
          data.department = if_admin.rows[0].department;
          const authToken = jwt.sign(data, jwtSecretKey);
          return res.send({ result: 5, token: authToken, admin_type: 1 });
        } else if (if_admin.rows[0].admin_type === 3) {
          data.userRole = 3;
          data.department = if_admin.rows[0].department;
          const authToken = jwt.sign(data, jwtSecretKey);
          return res.send({ result: 6, token: authToken, admin_type: 3 });
        }
      } else {
        return res.send({ result: 0 });
      }
    }
  );
};

const signup_otp = async (req, res) => {
  email = req.body.email;

  if (email === "") return res.send("0");

  const result = await pool.query(
    "select * from login_verification where email_id = $1",
    [email]
  );

  if (result.rowCount === 1) return res.send("1");

  const filePath = path.join(__dirname, "otp_email.html");
  const html = fs.readFileSync(filePath, "utf-8").toString();
  var template = handlebars.compile(html);

  otp = otpGenerator.generate(6, { specialChars: false });

  var replacements = {
    VERIFICATION_CODE: otp,
  };
  var htmlToSend = template(replacements);

  var mailOptions = {
    from: "IIT Ropar",
    to: "email_id_to_send_otp",
    subject: "OTP for Sign-up",
    html: htmlToSend,
  };

  mailOptions.to = email;
  console.log(otp);

  const ifexists = await pool.query(
    "select * from signup_verification where email_id = $1",
    [email]
  );

  /** encrypt otp and save in db */
  if (ifexists.rowCount === 0) {
    /** First time sign-up */
    await bcrypt.hash(otp, saltRounds, async function (err, hash) {
      await pool.query(
        "INSERT INTO signup_verification(email_id, hashed_otp, expiration_time) VALUES($1, $2, to_timestamp($3))",
        [email, hash, Date.now() / 1000.0 + 600]
      );
    });
  } else {
    /** If there is already an entry (helpful for resend OTP feature) */
    await bcrypt.hash(otp, saltRounds, async function (err, hash) {
      await pool.query(
        "UPDATE signup_verification SET hashed_otp = $1, expiration_time = to_timestamp($2) WHERE email_id = $3",
        [hash, Date.now() / 1000.0 + 600, email]
      );
    });
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });

  return res.send("2");
};

const signup_verify = async (req, res) => {
  const { email, otp } = req.body;

  if (otp === "") return res.send({ result: 3 });

  /** encrypt and check for otp in db and return accordingly */
  const result = await pool.query(
    "select * from signup_verification where email_id = $1",
    [email]
  );
  const result_row = result.rows[0];

  /** check if otp is expired */
  if (Date.now() > new Date(result_row.expiration_time.getTime())) {
    return res.send({ result: 2 });
  }

  await bcrypt.compare(
    otp,
    result_row.hashed_otp,
    async function (err, result) {
      if (result === true) {
        await pool.query("insert into applicants(email_id) values($1)", [
          email,
        ]);
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
          userEmail: email,
          userRole: 2,
          department: null,
        };
        const authToken = jwt.sign(data, jwtSecretKey);
        return res.send({ result: 1, token: authToken });
      } else {
        return res.send({ result: 0 });
      }
    }
  );
};

const contact_us = async (req, res) => {
  const info = req.body;

  var mailOptions = {
    from: "A person with query",
    to: process.env.EMAIL,
    subject: "Query",
    text: "",
  };

  mailOptions.text += "NAME: " + info.firstName + " " + info.lastName + "\n";
  mailOptions.text += "EMAIL: " + info.email + "\n";
  mailOptions.text += "PHONE: " + info.phone + "\n";
  mailOptions.text += "MESSAGE/QUERY: " + info.message;

  transporter.sendMail(mailOptions, function (error, infos) {
    if (error) {
      console.log(error);
    }
  });

  return res.status(200).send("Ok");
};

function application_submission(email, app_id, dep, spec) {
  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Application submitted successfully!",
    text: "",
  };

  mailOptions.text +=
    "Your application for MTech admission at IIT Ropar has been submitted successfully. It's details are as follows: \n";
  mailOptions.text += "Application ID: " + app_id + "\n";
  mailOptions.text += "Department: " + dep + "\n";
  mailOptions.text += "Specialization: " + spec + "\n";
  mailOptions.text += "Thanks!";

  transporter.sendMail(mailOptions, function (error, infos) {
    if (error) {
      console.log(error);
    }
  });
}

module.exports = {
  signin_otp,
  signin_verify,
  signup_otp,
  signup_verify,
  contact_us,
  application_submission,
};
