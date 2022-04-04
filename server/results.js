const pool = require("./db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
var XLSX = require('xlsx')

dotenv.config();

/** Upload Results */
const upload_results = async (req, res) => {
    /**
    * Verify using authToken
    */
    authToken = req.headers.authorization;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    var verified = null;

    try {
        verified = jwt.verify(authToken, jwtSecretKey);
    } catch (error) {
        return res.send("1"); /** Error, logout on user side */
    }

    if (!verified) {
        return res.send("1"); /** Error, logout on user side */
    }

    /** Get role */
    var userRole = jwt.decode(authToken).userRole;
    if(userRole !== 0) {
        return res.send("1");
    }

    var workbook = XLSX.read(req.files['result_excel'][0]['buffer']);
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    // console.log(xlData);

    /** Check if first line empty */
    if(xlData.length === 0) {
        return res.send("2");
    }

    var keys = Object.keys(myObject);

    const keys_copy = keys.map(element => {
        return element.toLowerCase();
    });

    /** Check headers */
    if(keys_copy.indexOf('status') <= -1 || keys_copy.indexOf('status remark') <= -1 || keys_copy.indexOf('email id') <= -1) {
        return res.send("2");
    }

    var header_status = keys[keys_copy.indexOf('status')];
    var header_status_remark = keys[keys_copy.indexOf('status remark')];
    var header_email_id = keys[keys_copy.indexOf('email id')];

    /**
     * Required:
     * 1. List of invalid emails
     * 2. Count of selected/not selected/under review
     * 3. List of wrong status
     * 4. List of candidates still under review(check from database)
     */

    var invalid_emails = []; /** Calculate while processing data */
    var count_selected = 0, count_under_review = 0, count_not_selected = 0; /** Calculate after updating data */
    var wrong_status = []; /** Calculate while processing data */
    var under_review_list = []; /** Calculate after updating data */
    var offering_id = req.body.offering_id;
    var cycle_id = req.body.cycle_id;

    /** 0 for reject, 1 for under review, 2 for select */
    /** Update Db and fill invalid emails and wrong status arrays  */
    xlData.forEach(async function(element) {
        var email = element[header_email_id];
        var status = element[header_status];
        var status_remark = element[header_status_remark];
        if(status.toLowerCase() !== 'selected' && status.toLowerCase !== 'not selected' && status.toLowerCase !== 'under review') {
            wrong_status.push(email);
        }
        else {
            var status = (status.toLowerCase() === 'selected' ? 2 : status.toLowerCase() === 'under review' ? 1 : 0);
            const result = await pool.query("UPDATE applications_" + cycle_id + " SET status = $1, status_remark = $2 WHERE email_id = $3 AND offering_id = $4 RETURNING application_id;", 
                            [status, status_remark, email, offering_id]);
            
            if(result.rows.length === 0) {
                invalid_emails.push(email);
            }
        }
    });

    /** Calculate under review list */
    const under_review_query = await pool.query("SELECT email_id from applications_" + cycle_id + " WHERE offering_id = $1 AND status = 1;", [offering_id]);
    under_review_list = under_review_query.rows;

    /** Calculate counts - not sure */
    const counts = await pool.query("SELECT status, count(status) from applications_" + cycle_id + " WHERE offering_id = $1 GROUP BY status;", [offering_id]);

};

module.exports = {
    upload_results
}