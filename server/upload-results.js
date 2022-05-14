const pool = require("./db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
var XLSX = require("xlsx");
const excel = require("excel4node");

dotenv.config();

async function generate_report(
  invalid_emails,
  wrong_status,
  under_review_list,
  count_not_selected,
  count_under_review,
  count_selected
) {
  const workbook = new excel.Workbook();
  const style = workbook.createStyle({
    font: { color: "#000000", size: 11 },
  });

  const header_style = workbook.createStyle({
    font: { color: "#ffffff", size: 10 },
    fill: { type: "pattern", patternType: "solid", fgColor: "365e9e" },
    border: { outline: true },
  });

  const worksheet1 = workbook.addWorksheet("Statistics");
  const worksheet2 = workbook.addWorksheet("Invalid Emails");
  const worksheet3 = workbook.addWorksheet("Wrong Status");
  const worksheet4 = workbook.addWorksheet("Under Review");

  /** Write worksheet 1 */
  worksheet1.cell(1, 1).string("Currently Selected").style(style);
  worksheet1.cell(1, 2).number(count_selected).style(style);
  worksheet1.cell(2, 1).string("Currently Under Review").style(style);
  worksheet1.cell(2, 2).number(count_under_review).style(style);
  worksheet1.cell(3, 1).string("Currently Not Selected").style(style);
  worksheet1.cell(3, 2).number(count_not_selected).style(style);

  /** Write worksheet 2 */
  worksheet2.cell(1, 1).string("Invalid Emails").style(header_style);
  invalid_emails.forEach((element, rowIndex) => {
    worksheet2
      .cell(rowIndex + 2, 1)
      .string(element)
      .style(style);
  });

  /** Write worksheet 3 */
  worksheet3.cell(1, 1).string("Wrong Status").style(header_style);
  wrong_status.forEach((element, rowIndex) => {
    worksheet3
      .cell(rowIndex + 2, 1)
      .string(element)
      .style(style);
  });

  /** Write worksheet 4 */
  worksheet4.cell(1, 1).string("Under Review").style(header_style);
  under_review_list.forEach((element, rowIndex) => {
    worksheet4
      .cell(rowIndex + 2, 1)
      .string(element["email_id"])
      .style(style);
  });

  /** Return */
  return workbook;
}

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
  if (userRole !== 0 && userRole !== 1 && userRole !== 3) {
    return res.send("1");
  }

  var workbook = XLSX.read(req.files["result_excel"][0]["buffer"]);
  var sheet_name_list = workbook.SheetNames;
  var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {
    defval: "",
  });

  /** Delete the last line */
  xlData.pop();

  /** Check if first line empty */
  if (xlData.length === 0) {
    return res.send("2");
  }

  var keys = Object.keys(xlData[0]);

  const keys_copy = keys.map((element) => {
    return element.toLowerCase();
  });

  /** Check headers */
  if (
    keys_copy.indexOf("status") <= -1 ||
    keys_copy.indexOf("status remark") <= -1 ||
    keys_copy.indexOf("email id") <= -1
  ) {
    return res.send("2");
  }

  var header_status = keys[keys_copy.indexOf("status")];
  var header_status_remark = keys[keys_copy.indexOf("status remark")];
  var header_email_id = keys[keys_copy.indexOf("email id")];

  /**
   * Required:
   * 1. List of invalid emails
   * 2. Count of selected/not selected/under review
   * 3. List of wrong status
   * 4. List of candidates still under review(check from database)
   */

  var invalid_emails = []; /** Calculate while processing data */
  var count_selected = 0,
    count_under_review = 0,
    count_not_selected = 0; /** Calculate after updating data */
  var wrong_status = []; /** Calculate while processing data */
  var under_review_list = []; /** Calculate after updating data */
  var offering_id = req.body.offering_id;
  var cycle_id = req.body.cycle_id;

  /** 0 for reject, 1 for under review, 2 for select */
  /** Update Db and fill invalid emails and wrong status arrays  */
  for (var i = 0; i < xlData.length; i++) {
    var element = xlData[i];
    var email = element[header_email_id];
    var status = element[header_status];
    var status_remark = element[header_status_remark];

    let status_check =
      status.toLowerCase() !== "selected" &&
      status.toLowerCase() !== "not selected" &&
      status.toLowerCase() !== "under review";

    if (status_check === true) {
      const result = await pool.query(
        "SELECT * from applications_" +
          cycle_id +
          " WHERE email_id = $1 AND offering_id = $2;",
        [email, offering_id]
      );

      if (result.rows.length === 0) {
        invalid_emails.push(email);
      } else {
        wrong_status.push(email);
      }
    } else {
      var db_status =
        status.toLowerCase() === "selected"
          ? 2
          : status.toLowerCase() === "under review"
          ? 1
          : 0;
      const result = await pool.query(
        "UPDATE applications_" +
          cycle_id +
          " SET status = $1, status_remark = $2 WHERE email_id = $3 AND offering_id = $4 RETURNING application_id;",
        [db_status, status_remark, email, offering_id]
      );

      if (result.rows.length === 0) {
        invalid_emails.push(email);
      }
    }
  }

  /** Calculate under review list */
  const under_review_query = await pool.query(
    "SELECT email_id from applications_" +
      cycle_id +
      " WHERE offering_id = $1 AND status = 1;",
    [offering_id]
  );
  under_review_list = under_review_query.rows;

  /** Calculate counts */
  const counts = await pool.query(
    "SELECT status, count(status) from applications_" +
      cycle_id +
      " WHERE offering_id = $1 GROUP BY status;",
    [offering_id]
  );

  counts.rows.forEach((element) => {
    if (element["status"] === 0) {
      count_not_selected = Number(element["count"]);
    } else if (element["status"] === 1) {
      count_under_review = Number(element["count"]);
    } else if (element["status"] === 2) {
      count_selected = Number(element["count"]);
    }
  });

  /** Generate report */
  let report_workbook = await generate_report(
    invalid_emails,
    wrong_status,
    under_review_list,
    count_not_selected,
    count_under_review,
    count_selected
  );
  report_workbook.write("Report.xlsx", res);
};

module.exports = {
  upload_results,
};
