const path = require("path");
const {format} = require('util');
const { Storage } = require("@google-cloud/storage");
const pool = require("./db")
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { info } = require("console");
const { file } = require("googleapis/build/src/apis/file");

dotenv.config();

const gc = new Storage({
  keyFilename: path.join(__dirname, "./phd-pg-admission-iit-ropar-0aa094c57f3e.json"),
  projectId: "phd-pg-admission-iit-ropar"
});

const applicantBucket = gc.bucket("applicant-iit-ropar");

/**
 * Update/save applicant communcation info
 */
const save_communication_details = async (req, res) => {
  /**
   * Verify using authToken
   */
  authToken = req.headers.authorization;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
  var verified = null

  try {
      verified = jwt.verify(authToken, jwtSecretKey);
  } catch (error) {
      return res.send("1"); /** Error, logout on user side */
  }
    
  if(!verified) {
      return res.send("1"); /** Error, logout on user side */
  }

  /** Get email */
  var email = jwt.decode(authToken).userEmail

  var info = req.body;

  await pool.query("UPDATE applicants SET communication_address = $1, communication_city = $2, communication_state = $3, \
                    communication_pincode = $4, permanent_address = $5, permanent_city = $6, permanent_state = $7, \
                    permanent_pincode = $8, mobile_number = $9, alternate_mobile_number = $10 WHERE email_id = $11;", 
                    [info.communication_address, info.communication_city, info.communication_state, info.communication_pincode, 
                    info.permanent_address, info.permanent_city, info.permanent_state, info.permanent_pincode, 
                    info.mobile_number, info.alternate_mobile_number, email]);
  
  return res.status(200).send("Ok")
}

/**
 * Update/save applicant education details
 */
const save_education_details = async (req, res) => {
  /**
   * Verify using authToken
   */
  authToken = req.headers.authorization;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
  var verified = null

  try {
      verified = jwt.verify(authToken, jwtSecretKey);
  } catch (error) {
      return res.send("1"); /** Error, logout on user side */
  }
    
  if(!verified) {
      return res.send("1"); /** Error, logout on user side */
  }

  /** Get email */
  var email = jwt.decode(authToken).userEmail

  var info = req.body

  degrees = JSON.parse(info.degrees)

  await pool.query("UPDATE applicants SET degrees = $1, degree_10th = $2, board_10th = $3, percentage_cgpa_format_10th = $4, \
                    percentage_cgpa_value_10th = $5, year_of_passing_10th = $6, remarks_10th = $7, degree_12th = $8, \
                    board_12th = $9, percentage_cgpa_format_12th = $10, percentage_cgpa_value_12th = $11, \
                    year_of_passing_12th = $12, remarks_12th = $13, other_remarks = $14, is_last_degree_completed = $15 WHERE email_id = $16;", 
                    [degrees, info.degree_10th, info.board_10th, info.percentage_cgpa_format_10th, 
                    info.percentage_cgpa_value_10th, info.year_of_passing_10th, info.remarks_10th, info.degree_12th, 
                    info.board_12th, info.percentage_cgpa_format_12th, info.percentage_cgpa_value_12th, info.year_of_passing_12th,
                    info.remarks_12th, info.other_remarks, info.is_last_degree_completed, email]);

  let promises = []
  let vals = Object.values(req.files)

  for(let f of vals) {
    const gcsname = f[0].originalname + '_' + Date.now()
    const file = applicantBucket.file(gcsname)

    const stream = file.createWriteStream({
      metadata: {
        contentType: f[0].mimetype
      },
      resumable: false
    })

    stream.on('error', (err) => {
      f[0].cloudStorageError = err
      next(err)
    })

    stream.end(f[0].buffer)

    promises.push(
      new Promise ((resolve, reject) => {
        stream.on('finish', async () => {
          url = format(`https://storage.googleapis.com/${applicantBucket.name}/${file.name}`);

          if(f[0].fieldname === 'marksheet_10th_url') {
            await pool.query("UPDATE applicants SET marksheet_10th_url = $1 WHERE email_id = $2;", [url, email]);
          }
          else if(f[0].fieldname === 'marksheet_12th_url') {
            await pool.query("UPDATE applicants SET marksheet_12th_url = $1 WHERE email_id = $2;", [url, email]);
          }
          else {
            str = f[0].fieldname
            first = str.substring(0, str.length - 1);
            lastChar = str.substr(str.length - 1);

            x =  parseInt(lastChar) + 1
            y = (first === 'upload_marksheet') ? 9 : 10

            // console.log(x, y, first, lastChar, str)

            await pool.query("UPDATE applicants SET degrees[$1][$2] = $3 WHERE email_id = $4;", [x, y, url, email]);
          }

          f[0].cloudStorageObject = gcsname;
          file.makePublic().then(() => {
            resolve()
          })
        })
      })
    )
  }

  Promise.all(promises)
  
  return res.status(200).send("Ok")
}

/**
 * Update/save applicant personal info
 */
const save_personal_info = async (req, res) => {
  /**
   * Verify using authToken
   */
  authToken = req.headers.authorization;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
  var verified = null

  try {
      verified = jwt.verify(authToken, jwtSecretKey);
  } catch (error) {
      return res.send("1"); /** Error, logout on user side */
  }
     
  if(!verified) {
      return res.send("1"); /** Error, logout on user side */
  }

  /** Get email */
  var email = jwt.decode(authToken).userEmail

  var info = req.body

  await pool.query("UPDATE applicants SET full_name = $1, fathers_name = $2, \
                  date_of_birth = $3, aadhar_card_number = $4, category = $5, is_pwd = $6, marital_status = $7, \
                  nationality = $8, gender = $9 WHERE email_id = $10;", 
                  [info.full_name, info.fathers_name, info.date_of_birth, info.aadhar_card_number, 
                  info.category, info.is_pwd, info.marital_status, info.nationality, info.gender, email]);

  let promises = []
  let vals = Object.values(req.files)

  for(let f of vals) {
    const gcsname = f[0].originalname + '_' + Date.now()
    const file = applicantBucket.file(gcsname)

    const stream = file.createWriteStream({
      metadata: {
        contentType: f[0].mimetype
      },
      resumable: false
    })

    stream.on('error', (err) => {
      f[0].cloudStorageError = err
      next(err)
    })

    stream.end(f[0].buffer)

    promises.push(
      new Promise ((resolve, reject) => {
        stream.on('finish', async () => {
          url = format(`https://storage.googleapis.com/${applicantBucket.name}/${file.name}`);
          
          if(f[0].fieldname === 'category_certificate') {
            await pool.query("UPDATE applicants SET category_certificate_url = $1 WHERE email_id = $2", [url, email])
          }
          else {
            await pool.query("UPDATE applicants SET profile_image_url = $1 WHERE email_id = $2", [url, email])
          }

          f[0].cloudStorageObject = gcsname;
          file.makePublic().then(() => {
            resolve()
          })
        })
      })
    )
  }

  Promise.all(promises)

  return res.status(200).send("Ok") /** Confirm, rerender */
}

/**
 * Get applicant profile info
 */
const get_profile_info = async (req, res) => {
  /**
   * Verify using authToken
   */
  // console.log("huehue");
   authToken = req.headers.authorization;
   let jwtSecretKey = process.env.JWT_SECRET_KEY;

   var verified = null

    try {
        verified = jwt.verify(authToken, jwtSecretKey);
    } catch (error) {
        return res.send("1"); /** Error, logout on user side */
    }
      
    if(!verified) {
        return res.send("1"); /** Error, logout on user side */
    }
 
   /** Get email */
   var email = jwt.decode(authToken).userEmail

   const results = await pool.query("SELECT full_name, fathers_name, profile_image_url, date_of_birth, aadhar_card_number, \
                              category, is_pwd, marital_status, category_certificate_url, nationality, gender, communication_address, communication_city, \
                              communication_state, communication_pincode, permanent_address, permanent_city, permanent_state, \
                              permanent_pincode, mobile_number, email_id, degree_10th, board_10th, percentage_cgpa_value_10th, \
                              year_of_passing_10th, marksheet_10th_url, degree_12th, board_12th, percentage_cgpa_value_12th, \
                              year_of_passing_12th, marksheet_12th_url, degrees from applicants \
                              WHERE email_id = $1;", [email]);
    
    return res.send(results.rows[0]);
}

/**
 * Get applicant personal info
 */
 const get_personal_info = async (req, res) => {
  /**
   * Verify using authToken
   */
   authToken = req.headers.authorization;
   let jwtSecretKey = process.env.JWT_SECRET_KEY;

   var verified = null

    try {
        verified = jwt.verify(authToken, jwtSecretKey);
    } catch (error) {
        return res.send("1"); /** Error, logout on user side */
    }
      
    if(!verified) {
        return res.send("1"); /** Error, logout on user side */
    }
 
   /** Get email */
   var email = jwt.decode(authToken).userEmail

   const results = await pool.query("SELECT full_name, fathers_name, profile_image_url, date_of_birth, aadhar_card_number, \
                              category, is_pwd, marital_status, nationality, gender from applicants \
                              WHERE email_id = $1;", [email]);
    
    return res.send(results.rows[0]);
}

/**
 * Save application info
 */
const save_application_info = async (req, res) => {
  /**
   * Verify using authToken
   */
  authToken = req.headers.authorization;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
  var verified = null

  try {
      verified = jwt.verify(authToken, jwtSecretKey);
  } catch (error) {
      return res.send("1"); /** Error, logout on user side */
  }
    
  if(!verified) {
      return res.send("1"); /** Error, logout on user side */
  }

  /** Get email */
  var email = jwt.decode(authToken).userEmail

  var info = req.body

  app_details = JSON.parse(info.applicant_details)

  await pool.query("INSERT INTO applications(email_id, amount, transaction_id, bank, date_of_transaction, qualifying_examination, \
                    branch_code, year, gate_enrollment_number, coap_registeration_number, all_india_rank, gate_score, valid_upto, \
                    remarks, date_of_declaration, place_of_declaration) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, \
                    $13, $14, $15, $16);", [email, app_details[1], app_details[2], app_details[3], app_details[5], app_details[6], 
                    app_details[7], app_details[8], app_details[9], app_details[10], app_details[11], app_details[12], app_details[1], 
                    app_details[1], app_details[1], app_details[1]]);

  let promises = []
  let vals = Object.values(req.files)

  for(let f of vals) {
    const gcsname = f[0].originalname + '_' + Date.now()
    const file = applicantBucket.file(gcsname)

    const stream = file.createWriteStream({
      metadata: {
        contentType: f[0].mimetype
      },
      resumable: false
    })

    stream.on('error', (err) => {
      f[0].cloudStorageError = err
      next(err)
    })

    stream.end(f[0].buffer)

    promises.push(
      new Promise ((resolve, reject) => {
        stream.on('finish', async () => {
          url = format(`https://storage.googleapis.com/${applicantBucket.name}/${file.name}`);

          if(f[0].fieldname === 'marksheet_10th_url') {
            await pool.query("UPDATE applicants SET marksheet_10th_url = $1 WHERE email_id = $2;", [url, email]);
          }
          else if(f[0].fieldname === 'marksheet_12th_url') {
            await pool.query("UPDATE applicants SET marksheet_12th_url = $1 WHERE email_id = $2;", [url, email]);
          }
          else {
            str = f[0].fieldname
            first = str.substring(0, str.length - 1);
            lastChar = str.substr(str.length - 1);

            x =  parseInt(lastChar) + 1
            y = (first === 'upload_marksheet') ? 9 : 10

            // console.log(x, y, first, lastChar, str)

            await pool.query("UPDATE applicants SET degrees[$1][$2] = $3 WHERE email_id = $4;", [x, y, url, email]);
          }

          f[0].cloudStorageObject = gcsname;
          file.makePublic().then(() => {
            resolve()
          })
        })
      })
    )
  }

  Promise.all(promises)
  
  return res.status(200).send("Ok")
}


module.exports = {
    save_personal_info,
    save_communication_details,
    save_education_details,
    get_profile_info,
    // get_personal_info,
    save_application_info
}