const excel = require("excel4node");
const pool = require("./db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

function write_header(workbook, worksheet, rowIndex, type) {
  /** Header Stylesheet json */
  const header_style = workbook.createStyle({
    font: { color: "#ffffff", size: 12 },
    fill: { type: "pattern", patternType: "solid", fgColor: "365e9e" },
    border: { outline: true },
  });

  /** Merit Position Header Stylesheet json */
  const merit_position_header = workbook.createStyle({
    font: { color: "#ffffff", size: 12 },
    fill: { type: "pattern", patternType: "solid", fgColor: "c25f46" },
    border: { outline: true },
  });

  /** For master file */
  header_list_1 = [
    "S.No.",
    "Application Number (SID)",
    "Category(UR/OBC/SC/ST/PWD)",
    "COAP REGN.NO.",
    "Candidate's  Name",
    "Father's Name",
    "Date of Birth",
    "EMAIL",
    "MOBILE NO.",
    "GATE Paper Code",
    "GATE REGISTRATION NO.",
    "Valid GATE Score",
    "Eligible for Admission (YES / No)",
    "Reasons, if not eligible",
  ];

  /** For consolidated merit list */
  header_list_2 = [
    "S.No.",
    "Application Number (SID)",
    "Category(UR/OBC/SC/ST/PWD)",
    "COAP REGN.NO.",
    "Candidate's  Name",
    "Father's Name",
    "Date of Birth",
    "EMAIL",
    "MOBILE NO.",
    "GATE Paper Code",
    "GATE REGISTRATION NO.",
    "Valid GATE Score",
    "Merit Position",
    "Eligible for Admission (YES / No)",
    "Reasons, if not eligible",
  ];

  /** For other merit lists */
  header_list_3 = [
    "S.No.",
    "Application Number (SID)",
    "COAP REGN.NO.",
    "Candidate's  Name",
    "Father's Name",
    "Date of Birth",
    "EMAIL",
    "MOBILE NO.",
    "GATE Paper Code",
    "GATE REGISTRATION NO.",
    "Valid GATE Score",
    "Merit Position",
    "REMARKS",
  ];

  if (type === 1) {
    header_list_1.forEach((element, columnIndex) => {
      const columnWidth = element.length * 1.1;
      worksheet.column(columnIndex + 1).setWidth(columnWidth);
      worksheet
        .cell(rowIndex, columnIndex + 1)
        .string(element)
        .style(header_style);
    });
  } else if (type == 2) {
    header_list_2.forEach((element, columnIndex) => {
      const columnWidth = element.length * 1.1;
      worksheet.column(columnIndex + 1).setWidth(columnWidth);
      worksheet
        .cell(rowIndex, columnIndex + 1)
        .string(element)
        .style(header_style);
      if (columnIndex == 12) {
        worksheet.cell(rowIndex, columnIndex + 1).style(merit_position_header);
      }
    });
  } else {
    header_list_3.forEach((element, columnIndex) => {
      const columnWidth = element.length * 1.1;
      worksheet.column(columnIndex + 1).setWidth(columnWidth);
      worksheet
        .cell(rowIndex, columnIndex + 1)
        .string(element)
        .style(header_style);
    });
  }
}

function sort_function(application_1, application_2) {
  /** Compare gate score */
  if (Number(application_1["gate_score"]) > Number(application_2["gate_score"]))
    return -1;
  if (Number(application_1["gate_score"]) < Number(application_2["gate_score"]))
    return 1;

  /** Compare degree marks */
  var percentage_1 = 0,
    percentage_2 = 0;
  var degree_1_data_type = application_1.degrees[0][4];
  var degree_1_value = application_1.degrees[0][5];
  var degree_1_cgpa_scale = application_1.degrees[0][6];
  var degree_2_data_type = application_2.degrees[0][4];
  var degree_2_value = application_2.degrees[0][5];
  var degree_2_cgpa_scale = application_2.degrees[0][6];

  if (degree_1_data_type === "CGPA") {
    if (degree_1_cgpa_scale !== "") {
      percentage_1 =
        (Number(degree_1_value) / Number(degree_1_cgpa_scale)) * 100;
    } else {
      percentage_1 = Number(degree_1_value) * 10;
    }
  } else {
    percentage_1 = Number(degree_1_value);
  }

  if (degree_2_data_type === "CGPA") {
    if (degree_2_cgpa_scale !== "") {
      percentage_2 =
        (Number(degree_2_value) / Number(degree_2_cgpa_scale)) * 100;
    } else {
      percentage_2 = Number(degree_2_value) * 10;
    }
  } else {
    percentage_2 = Number(degree_2_value);
  }

  if (percentage_1 > percentage_2) return -1;
  if (percentage_1 < percentage_2) return 1;

  /** Compare date of birth */
  var date_1 = new Date(application_1["date_of_birth"]);
  var date_2 = new Date(application_2["date_of_birth"]);
  if (date_1 > date_2) return -1;
  if (date_1 < date_2) return 1;

  return 0;
}

function get_merit_positions(data) {
  merit_positions = [];

  if (data.length === 0) {
    return merit_positions;
  }

  merit_positions.push(1);

  if (data.length === 1) {
    return merit_positions;
  }

  let current_position = 1,
    backlog = 0;
  for (var i = 1; i < data.length; i++) {
    if (sort_function(data[i], data[i - 1]) === 0) {
      merit_positions.push(current_position);
      backlog += 1;
    } else {
      merit_positions.push(current_position + backlog + 1);
      current_position += backlog + 1;
      backlog = 0;
    }
  }

  return merit_positions;
}

function write_data(worksheet, data, rowIndex, type) {
  /** For master file */
  header_list_1 = [
    "S.No.",
    "application_id",
    "category",
    "coap_registeration_number",
    "full_name",
    "fathers_name",
    "date_of_birth",
    "email_id",
    "mobile_number",
    "branch_code",
    "gate_enrollment_number",
    "gate_score",
    "Eligible for Admission (YES / No)",
    "Reasons, if not eligible",
  ];

  /** For consolidated merit list */
  header_list_2 = [
    "S.No.",
    "application_id",
    "category",
    "coap_registeration_number",
    "full_name",
    "fathers_name",
    "date_of_birth",
    "email_id",
    "mobile_number",
    "branch_code",
    "gate_enrollment_number",
    "gate_score",
    "Merit Position",
    "Eligible for Admission (YES / No)",
    "Reasons, if not eligible",
  ];

  /** For other merit lists */
  header_list_3 = [
    "S.No.",
    "application_id",
    "coap_registeration_number",
    "full_name",
    "fathers_name",
    "date_of_birth",
    "email_id",
    "mobile_number",
    "branch_code",
    "gate_enrollment_number",
    "gate_score",
    "Merit Position",
    "REMARKS",
  ];

  if (type === 1) {
    data.forEach((element) => {
      columnIndex = 1;

      for (var i = 0; i < header_list_1.length - 2; i++) {
        if (i === 0) {
          worksheet.cell(rowIndex, columnIndex).number(rowIndex - 1);
        } else if (i === 1) {
          worksheet
            .cell(rowIndex, columnIndex)
            .number(+element[header_list_1[i]]);
        } else if (i === 11) {
          worksheet
            .cell(rowIndex, columnIndex)
            .number(+element[header_list_1[i]]);
        } else {
          worksheet
            .cell(rowIndex, columnIndex)
            .string(element[header_list_1[i]]);
        }

        columnIndex++;
      }

      rowIndex++;
    });
  } else if (type === 2) {
    merit_positions = get_merit_positions(data);

    data.forEach((element, index) => {
      columnIndex = 1;

      for (var i = 0; i < header_list_2.length - 2; i++) {
        if (i === 0) {
          worksheet.cell(rowIndex, columnIndex).number(rowIndex - 1);
        } else if (i === 1) {
          worksheet
            .cell(rowIndex, columnIndex)
            .number(+element[header_list_2[i]]);
        } else if (i === 11) {
          worksheet
            .cell(rowIndex, columnIndex)
            .number(+element[header_list_2[i]]);
        } else if (i === header_list_2.length - 3) {
          worksheet.cell(rowIndex, columnIndex).number(merit_positions[index]);
        } else {
          worksheet
            .cell(rowIndex, columnIndex)
            .string(element[header_list_2[i]]);
        }

        columnIndex++;
      }

      rowIndex++;
    });
  } else {
    merit_positions = get_merit_positions(data);

    data.forEach((element, index) => {
      columnIndex = 1;

      for (var i = 0; i < header_list_3.length - 1; i++) {
        if (i === 0) {
          worksheet.cell(rowIndex, columnIndex).number(rowIndex - 1);
        } else if (i === 1) {
          worksheet
            .cell(rowIndex, columnIndex)
            .number(+element[header_list_3[i]]);
        } else if (i === 10) {
          worksheet
            .cell(rowIndex, columnIndex)
            .number(+element[header_list_3[i]]);
        } else if (i === header_list_3.length - 2) {
          worksheet.cell(rowIndex, columnIndex).number(merit_positions[index]);
        } else {
          worksheet
            .cell(rowIndex, columnIndex)
            .string(element[header_list_3[i]]);
        }

        columnIndex++;
      }

      rowIndex++;
    });
  }
}

async function generate_merit_list(info, eligible_branches) {
  /** Create workbook */
  const workbook = new excel.Workbook();

  /** Create text style */
  const style = workbook.createStyle({
    font: { color: "#000000", size: 11 },
  });

  /** Create worksheets */
  const master = workbook.addWorksheet("MASTER FILE");
  const consolidated = workbook.addWorksheet("CONSOLIDATED MERIT LIST");
  const obc = workbook.addWorksheet("OBC MERIT LIST");
  const sc = workbook.addWorksheet("SC MERIT LIST");
  const st = workbook.addWorksheet("ST MERIT LIST");
  const ews = workbook.addWorksheet("EWS MERIT LIST");
  const pwd = workbook.addWorksheet("PWD MERIT LIST");

  /** Row indices for sheets */
  let row_indices = [1, 1, 1, 1, 1, 1, 1];

  /** Write headers */
  write_header(workbook, master, row_indices[0], 1);
  write_header(workbook, consolidated, row_indices[1], 2);
  write_header(workbook, obc, row_indices[2], 3);
  write_header(workbook, sc, row_indices[3], 3);
  write_header(workbook, st, row_indices[4], 3);
  write_header(workbook, ews, row_indices[5], 3);
  write_header(workbook, pwd, row_indices[6], 3);

  /** Increment all indices */
  row_indices = row_indices.map((a) => a + 1);
  // row_indices = [2, 2, 2, 2, 2, 2, 2]

  /** Get applications */
  const applications = await pool.query(
    "SELECT application_id, category, coap_registeration_number, \
    full_name, fathers_name, date_of_birth, email_id, mobile_number, branch_code, \
    gate_enrollment_number, gate_score, degrees, is_pwd FROM applications_" +
      info.cycle_id +
      " WHERE offering_id = $1;",
    [info.offering_id]
  );

  /** All applications */
  let applications_rows = applications.rows;

  let all_applications = [];
  applications_rows.forEach((element) => {
    if (eligible_branches.includes(element.degrees[0][1])) {
      all_applications.push(element);
    }
  });

  /** consolidated applications */
  let consolidated_applications = all_applications.slice();
  consolidated_applications.sort(sort_function);

  /** obc applications */
  let obc_applications = all_applications.filter(
    (element) => element["category"] === "OBC"
  );
  obc_applications.sort(sort_function);

  /** sc applications */
  let sc_applications = all_applications.filter(
    (element) => element["category"] === "SC"
  );
  sc_applications.sort(sort_function);

  /** st applications */
  let st_applications = all_applications.filter(
    (element) => element["category"] === "ST"
  );
  st_applications.sort(sort_function);

  /** ews applications */
  let ews_applications = all_applications.filter(
    (element) => element["category"] === "EWS"
  );
  ews_applications.sort(sort_function);

  /** pwd applications */
  let pwd_applications = all_applications.filter(
    (element) => element["is_pwd"] === "YES"
  );
  pwd_applications.sort(sort_function);

  /** Write data to the worksheets */
  write_data(master, all_applications, row_indices[0], 1);
  write_data(consolidated, consolidated_applications, row_indices[1], 2);
  write_data(obc, obc_applications, row_indices[2], 3);
  write_data(sc, sc_applications, row_indices[3], 3);
  write_data(st, st_applications, row_indices[4], 3);
  write_data(ews, ews_applications, row_indices[5], 3);
  write_data(pwd, pwd_applications, row_indices[6], 3);

  /** Return */
  return workbook;
}

const get_merit_list = async (req, res) => {
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

  let info = req.body;
  //info.eligible_branches

  let workbook = await generate_merit_list(req.headers, info.eligible_branches);
  workbook.write("Merit_List.xlsx", res);
};

const get_applicants_branches = async (req, res) => {
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

  let cycle_id = req.headers.cycle_id;
  let offering_id = req.headers.offering_id;

  const cycle_name = await pool.query(
    "SELECT NAME FROM admission_cycles WHERE cycle_id = $1;",
    [cycle_id]
  );

  if (cycle_name.rows.length === 0) {
    return res.send("1");
  }

  const offering_details = await pool.query(
    "SELECT specialization, is_result_published, is_result_published_by_faculty FROM mtech_offerings_" +
      cycle_id +
      " WHERE offering_id = $1;",
    [offering_id]
  );

  if (offering_details.rows.length === 0) {
    return res.send("1");
  }

  const results = await pool.query(
    "SELECT degrees FROM applications_" + cycle_id + " WHERE offering_id = $1;",
    [offering_id]
  );

  let branches = [];
  results.rows.forEach((element) => {
    branches.push(element["degrees"][0][1]);
  });

  let uniqueBranches = [...new Set(branches)];

  return res.send(uniqueBranches);
};

module.exports = {
  get_merit_list,
  get_applicants_branches,
};
