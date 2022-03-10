const path = require("path");
const {format} = require('util');
const { Storage } = require("@google-cloud/storage");
const pool = require("./db")

const gc = new Storage({
  keyFilename: path.join(__dirname, "./phd-pg-admission-iit-ropar-0aa094c57f3e.json"),
  projectId: "phd-pg-admission-iit-ropar"
});

const applicantBucket = gc.bucket("applicant-iit-ropar");

/**
 * Update/save applicant communcation info
 * ALERT: DO NOT CHANGE EMAIL
 */
const save_communication_details = async (req, res) => {
  hash = req.headers.authorization;

  const result = await pool.query("select * from applicants where email_hash = $1", [hash]);

  if(result.rowCount === 0) return res.send("1"); /** Error, logout on user side */

  info = req.body;

  await pool.query("UPDATE applicants SET communication_address = $1, communication_city = $2, communication_state = $3, \
                    communication_pincode = $4, permanent_address = $5, permanent_city = $6, permanent_state = $7, \
                    permanent_pincode = $8, mobile_number = $9, alternate_mobile_number = $10 WHERE email_hash = $11;", 
                    [info.communication_address, info.communication_city, info.communication_state, info.communication_pincode, 
                    info.permanent_address, info.permanent_city, info.permanent_state, info.permanent_pincode, 
                    info.mobile_number, info.alternate_mobile_number, hash]);
  
  return res.send(info) /** Confirm, rerender */
}

/**
 * Update/save applicant education details
 * ALERT: NOT CORRECT
 * TODO: Chenge since there are multiple education details possible
 */
const save_education_details = async (req, res) => {
  hash = req.headers.authorization;

  const result = await pool.query("select * from applicants where email_hash = $1", [hash]);

  if(result.rowCount === 0) return res.send("1"); /** Error, logout on user side */

  info = req.body;

  await pool.query("UPDATE applicants SET communication_address = $1, communication_city = $2, communication_state = $3, \
                    communication_pincode = $4, permanent_address = $5, permanent_city = $6, permanent_state = $7, \
                    permanent_pincode = $8, mobile_number = $9, alternate_mobile_number = $10 WHERE email_hash = $11;", 
                    [info.communication_address, info.communication_city, info.communication_state, info.communication_pincode, 
                    info.permanent_address, info.permanent_city, info.permanent_state, info.permanent_pincode, 
                    info.mobile_number, info.alternate_mobile_number, hash]);
  
  return res.send(info) /** Confirm, rerender */
}

/**
 * Update/save applicant personal info
 */
const save_personal_info = async (req, res) => {
  /**
   * hash => if hash not found, return error; else, insert [hash will be given in header]
   */
  hash = req.headers.authorization;

  const result = await pool.query("SELECT * FROM applicants WHERE email_id = $1", [hash]);

  if(result.rowCount === 0) return res.send("1"); /** Error, logout on user side */

  info = req.body;

  let profile_image_url, category_certificate_url;
  const blob = applicantBucket.file(req.files.profile_image[0].originalname);
  const blobStream = blob.createWriteStream();
  
  blobStream.on('error', err => {
    next(err);
  });

  blobStream.on('finish', async () => {
    // The public URL can be used to directly access the file via HTTP.
    profile_image_url = format(
      `https://storage.googleapis.com/${applicantBucket.name}/${blob.name}`
    );
    try {
      await applicantBucket.file(req.files.profile_image[0].originalname).makePublic();
    }
    catch(err) {
      console.log(err)
    }
    console.log(profile_image_url);
    
    if("category_certificate" in req.files){
      const blob2 = applicantBucket.file(req.files.category_certificate[0].originalname);
      const blobStream2 = blob2.createWriteStream();
  
      blobStream2.on('error', err => {
        next(err);
      });
  
      blobStream2.on('finish', async () => {
        // The public URL can be used to directly access the file via HTTP.
        category_certificate_url = format(
          `https://storage.googleapis.com/${applicantBucket.name}/${blob2.name}`
          );
        console.log(category_certificate_url);

        await pool.query("UPDATE applicants SET category_certificate_url = $1 WHERE email_id = $2;", 
                  [category_certificate_url, hash]);
      });

      blobStream2.end(req.files.category_certificate[0].buffer);
    }

    await pool.query("UPDATE applicants SET full_name = $1, fathers_name = $2, profile_image_url = $3, \
                  date_of_birth = $4, aadhar_card_number = $5, category = $6, is_pwd = $7, marital_status = $8, \
                  nationality = $9, gender = $10 WHERE email_id = $11;", 
                  [info.full_name, info.fathers_name, profile_image_url, info.date_of_birth, info.aadhar_card_number, 
                  info.category, info.is_pwd, info.marital_status, info.nationality, info.gender, hash]);
  });

  blobStream.end(req.files.profile_image[0].buffer);

  res.status(200)
}

/**
 * Get applicant personal info
 */
const get_personal_info = async (req, res) => {
  /**
   * hash => if hash not found, return error; else, insert [hash will be given in header]
   */
   hash = req.headers.authorization;

   const result = await pool.query("SELECT * FROM applicants WHERE email_id = $1", [hash]);
 
   if(result.rowCount === 0) return res.send("1"); /** Error, logout on user side */

   const results = await pool.query("SELECT full_name, fathers_name, profile_image_url, date_of_birth, aadhar_card_number, \
                              category, is_pwd, marital_status, nationality, gender from applicants \
                              WHERE email_id = $1;", [hash]);
    
    return res.send(results.rows[0]);
}

const temp = async (req, res) => {
  info = req.body;
  console.log(info.lemao);
}

module.exports = {
    save_personal_info,
    save_communication_details,
    save_education_details,
    get_personal_info,
    temp
}