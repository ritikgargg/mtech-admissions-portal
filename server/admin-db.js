const pool = require("./db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

/** Add admission cycle and make it the current cycle */
const add_admission_cycle = async (req, res) => {
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
  if (userRole !== 0) {
    return res.send("1");
  }

  let info = req.body;
  let fees = JSON.parse(req.body.fees);
  const results = await pool.query(
    "INSERT INTO admission_cycles(name, duration_start, duration_end, fees_gen, fees_obc, fees_ews, fees_sc, fees_st, fees_pwd, brochure_url, rank_list_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING cycle_id;",
    [
      info.name,
      info.start,
      info.end,
      fees[0],
      fees[1],
      fees[2],
      fees[3],
      fees[4],
      fees[5],
      info.brochure,
      info.ranklist,
    ]
  );

  var new_cycle_id = results.rows[0].cycle_id;

  const create_offerings_table = await pool.query(
    "CREATE TABLE mtech_offerings_" +
      new_cycle_id +
      " (offering_id SERIAL PRIMARY KEY, department TEXT, specialization TEXT, seats TEXT, \
    gate_paper_codes TEXT, eligibility TEXT, deadline TIMESTAMP, is_accepting_applications BOOLEAN, \
    is_draft_mode BOOLEAN, is_result_published INT DEFAULT 0, \
    is_result_published_by_faculty INT DEFAULT 0);"
  );

  const create_applications_table = await pool.query(
    "CREATE TABLE applications_" +
      new_cycle_id +
      " (application_id SERIAL, \
    offering_id INT, email_id TEXT, status INT, status_remark TEXT, \
    full_name TEXT, fathers_name TEXT, profile_image_url TEXT, date_of_birth TEXT, \
    aadhar_card_number TEXT, category TEXT, category_certificate_url TEXT, \
    is_pwd TEXT, marital_status TEXT, nationality TEXT, gender TEXT, \
    communication_address TEXT, communication_city TEXT, \
    communication_state TEXT, communication_pincode TEXT, \
    permanent_address TEXT, permanent_city TEXT, \
    permanent_state TEXT, permanent_pincode TEXT, \
    mobile_number TEXT, alternate_mobile_number TEXT, \
    degree_10th TEXT, board_10th TEXT, percentage_cgpa_format_10th TEXT, \
    percentage_cgpa_value_10th TEXT, year_of_passing_10th TEXT, \
    remarks_10th TEXT, marksheet_10th_url TEXT, \
    degree_12th TEXT, board_12th TEXT, percentage_cgpa_format_12th TEXT, \
    percentage_cgpa_value_12th TEXT, year_of_passing_12th TEXT, remarks_12th TEXT, marksheet_12th_url TEXT, \
    degrees TEXT[][], \
    other_remarks TEXT, is_last_degree_completed TEXT, \
    amount TEXT, transaction_id TEXT, bank TEXT, \
    transaction_slip_url TEXT, date_of_transaction TEXT, \
    qualifying_examination TEXT, branch_code TEXT, year TEXT, \
    gate_enrollment_number TEXT, coap_registeration_number TEXT, \
    all_india_rank TEXT, gate_score TEXT, valid_upto TEXT, \
    self_attested_copies_url TEXT, remarks TEXT, \
    signature_url TEXT, date_of_declaration TEXT, place_of_declaration TEXT, \
    CONSTRAINT fk_email FOREIGN KEY(email_id) REFERENCES applicants(email_id), \
    CONSTRAINT fk_offering FOREIGN KEY(offering_id) REFERENCES mtech_offerings_" +
      new_cycle_id +
      "(offering_id), \
    PRIMARY KEY(email_id, offering_id));"
  );

  if (info.make_current === "true") {
    const change_current_cycle = await pool.query(
      "UPDATE current_cycle SET cycle_id = $1;",
      [new_cycle_id]
    );
  }

  return res.send("Ok");
};

/** Get all the admission cycles */
const get_admission_cycles = async (req, res) => {
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

  const cycle = await pool.query("SELECT cycle_id from current_cycle;");
  let cycle_id = cycle.rows[0].cycle_id;

  const results = await pool.query("SELECT * from admission_cycles;");

  return res.send({ results: results.rows, current_cycle_id: cycle_id });
};

/** Delete admission cycle */
const delete_admission_cycle = async (req, res) => {
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
  if (userRole !== 0) {
    return res.send("1");
  }

  let cycle_id = req.body.cycle_id;

  const results = await pool.query(
    "DELETE from admission_cycles WHERE cycle_id = $1",
    [cycle_id]
  );

  const cycle = await pool.query("SELECT cycle_id from current_cycle;");
  let current_cycle_id = cycle.rows[0].cycle_id;

  if (current_cycle_id === Number(cycle_id)) {
    const update_current_cycle = await pool.query(
      "UPDATE current_cycle SET cycle_id = 0;"
    );
  }

  return res.send("Ok");
};

/** Edit admission cycle */
const edit_admission_cycle = async (req, res) => {
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
  if (userRole !== 0) {
    return res.send("1");
  }

  let info = req.body;

  const results = await pool.query(
    "UPDATE admission_cycles SET name = $1, duration_start = $2, duration_end = $3, fees_gen = $4, fees_obc = $5, fees_ews = $6, fees_sc = $7, fees_st = $8, fees_pwd = $9 WHERE cycle_id = $10;",
    [
      info.name,
      info.duration_start,
      info.duration_end,
      info.fees_gen,
      info.fees_obc,
      info.fees_ews,
      info.fees_sc,
      info.fees_st,
      info.fees_pwd,
      info.cycle_id,
    ]
  );

  const cycle = await pool.query("SELECT cycle_id from current_cycle;");
  let current_cycle_id = cycle.rows[0].cycle_id;

  /** Making a non-current cycle -> Current cycle */
  if (info.make_current === "true") {
    const make_current_cycle = await pool.query(
      "UPDATE current_cycle SET cycle_id = $1;",
      [info.cycle_id]
    );
  }

  /** Making current active cycle -> non-current */
  if (
    info.cycle_id === String(current_cycle_id) &&
    info.make_current === "false"
  ) {
    const remove_current_cycle = await pool.query(
      "UPDATE current_cycle SET cycle_id = 0;"
    );
  }

  return res.send("Ok");
};

/** Add offering to a particular cycle  */
const add_offering = async (req, res) => {
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

  var cycle_id = info.cycle_id;

  if (userRole === 0) {
    const results = await pool.query(
      "INSERT INTO mtech_offerings_" +
        cycle_id +
        " (department, specialization, seats, gate_paper_codes, eligibility, deadline, is_accepting_applications, is_draft_mode) VALUES($1, $2, $3, $4, $5, $6, $7, $8);",
      [
        info.department,
        info.specialization,
        info.seats,
        info.gate_paper_codes,
        info.eligibility,
        info.deadline,
        info.is_accepting_applications,
        info.is_draft_mode,
      ]
    );
  } else {
    const results = await pool.query(
      "INSERT INTO mtech_offerings_" +
        cycle_id +
        " (department, specialization, seats, gate_paper_codes, eligibility, deadline, is_accepting_applications, is_draft_mode) VALUES($1, $2, $3, $4, $5, $6, false, true);",
      [
        info.department,
        info.specialization,
        info.seats,
        info.gate_paper_codes,
        info.eligibility,
        info.deadline,
      ]
    );
  }

  return res.send("Ok");
};

/** Edit offering */
const edit_offering = async (req, res) => {
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

  var cycle_id = info.cycle_id;

  const results = await pool.query(
    "UPDATE mtech_offerings_" +
      cycle_id +
      " SET department = $1, specialization = $2, seats = $3, gate_paper_codes = $4, eligibility = $5, deadline = $6, is_accepting_applications = $7, is_draft_mode = $8 WHERE offering_id = $9",
    [
      info.department,
      info.specialization,
      info.seats,
      info.gate_paper_codes,
      info.eligibility,
      info.deadline,
      info.is_accepting_applications,
      info.is_draft_mode,
      info.offering_id,
    ]
  );

  return res.send("Ok");
};

/** Delete offering */
const delete_offering = async (req, res) => {
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
  if (userRole !== 0) {
    return res.send("1");
  }

  let info = req.body;

  var cycle_id = info.cycle_id;

  const delete_applications = await pool.query(
    "DELETE FROM applications_" + cycle_id + " WHERE offering_id = $1;",
    [info.offering_id]
  );

  const results = await pool.query(
    "DELETE from mtech_offerings_" + cycle_id + " WHERE offering_id = $1;",
    [info.offering_id]
  );

  return res.send("Ok");
};

/** Get offerings */
const get_offerings = async (req, res) => {
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
  var userEmail = jwt.decode(authToken).userEmail;
  let department_query_info = await pool.query(
    "SELECT * FROM admins WHERE email_id = $1;",
    [userEmail]
  );
  var department = department_query_info.rows[0].department;

  if (userRole !== 0 && userRole !== 1 && userRole !== 3) {
    return res.send("1");
  }

  let cycle_id = req.headers.cycle_id;

  const cycle_name = await pool.query(
    "SELECT NAME, brochure_url, rank_list_url FROM admission_cycles WHERE cycle_id = $1;",
    [cycle_id]
  );

  if (cycle_name.rows.length === 0) {
    return res.send("1");
  }

  let results = null;
  if (userRole === 0) {
    results = await pool.query(
      "SELECT * FROM mtech_offerings_" + cycle_id + ";"
    );
  } else {
    let x = "(" + department.map((d) => `'${d}'`).join(",") + ")";
    let temp =
      "SELECT * FROM mtech_offerings_" +
      cycle_id +
      " WHERE department IN " +
      x +
      ";";

    results = await pool.query(temp);
  }

  return res.send({
    offerings: results.rows,
    cycle_name: cycle_name.rows[0].name,
    brochure_url: cycle_name.rows[0].brochure_url,
    rank_list_url: cycle_name.rows[0].rank_list_url,
    department: department,
  });
};

/** Get applications for an offering */
const get_offering_applications = async (req, res) => {
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
    "SELECT * FROM applications_" + cycle_id + " WHERE offering_id = $1;",
    [offering_id]
  );

  return res.send({
    applications: results.rows,
    cycle_name: cycle_name.rows[0].name,
    offering_name: offering_details.rows[0].specialization,
    is_result_published: offering_details.rows[0].is_result_published,
    is_result_published_by_faculty:
      offering_details.rows[0].is_result_published_by_faculty,
  });
};

/** Get application info for an submitted application */
const get_application_info_admin = async (req, res) => {
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

  cycle_id = req.headers.cycle_id;
  application_id = req.headers.application_id;

  /** Check if cycle exists */
  const cycle_name = await pool.query(
    "SELECT NAME FROM admission_cycles WHERE cycle_id = $1;",
    [cycle_id]
  );

  if (cycle_name.rows.length === 0) {
    return res.send("1");
  }

  /** Check if application exists */
  const query_result = await pool.query(
    "SELECT email_id FROM applications_" +
      cycle_id +
      " WHERE application_id = $1;",
    [application_id]
  );

  if (query_result.rows.length === 0) {
    return res.send("1");
  }

  const results = await pool.query(
    "SELECT * FROM mtech_offerings_" +
      cycle_id +
      " as MO, applications_" +
      cycle_id +
      " as A WHERE application_id = $1 AND MO.offering_id = A.offering_id;",
    [application_id]
  );

  return res.send(results.rows[0]);
};

/** Add admin */
const add_admin = async (req, res) => {
  /**
   * 1. Perform jwt authentication
   * 2. Add admin (before that check that no other admin has already this id)
   */

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
  if (userRole !== 0) {
    return res.send("1");
  }

  let info = req.body;

  /** Check if this email is already an admin */
  const check = await pool.query(
    "SELECT * FROM login_verification WHERE email_id = $1;",
    [info.email_id]
  );

  if (check.rows.length !== 0) {
    return res.send("2"); /** Email ID already exists */
  }

  /** Add email_id */
  const add = await pool.query(
    "INSERT INTO admins(name, email_id, admin_type, department) VALUES($1, $2, $3, $4);",
    [info.name, info.email_id, info.admin_type, JSON.parse(info.department)]
  );

  return res.send("Ok");
};

/** Edit admin */
const edit_admin = async (req, res) => {
  /**
   * 1. Perform jwt authentication
   * 2. Edit admin info
   */

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
  if (userRole !== 0) {
    return res.send("1");
  }

  let info = req.body;

  /** Edit admin_info */
  const edit = await pool.query(
    "UPDATE admins SET name = $1, admin_type = $2, department = $3 WHERE email_id = $4;",
    [info.name, info.admin_type, JSON.parse(info.department), info.email_id]
  );

  return res.send("Ok");
};

/** Get admins */
const get_admins = async (req, res) => {
  /**
   * 1. Perform jwt auth
   * 2. Return all the admins (except this one, so that he cannot delete himself)
   */

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
  if (userRole !== 0) {
    return res.send("1");
  }

  /** Get email */
  var email = jwt.decode(authToken).userEmail;

  const results = await pool.query(
    "SELECT * from admins WHERE email_id <> $1;",
    [email]
  );

  return res.send(results.rows);
};

/** Delete admins */
const delete_admin = async (req, res) => {
  /**
   * 1. Perform jwt auth
   * 2. Delete the given admin
   * 3. Delete the correpsonding entry from the login_verification table
   */

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
  if (userRole !== 0) {
    return res.send("1");
  }

  let info = req.body;

  const delete_from_admins_table = await pool.query(
    "DELETE FROM admins WHERE email_id = $1;",
    [info.email_id]
  );
  const delete_from_login_verification_table = await pool.query(
    "DELETE FROM login_verification WHERE email_id = $1;",
    [info.email_id]
  );

  return res.send("Ok");
};

const get_admin_profile = async (req, res) => {
  /**
   * 1. Perform jwt auth
   * 2. Return admn profile data
   */

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

  /** Get email */
  var email = jwt.decode(authToken).userEmail;

  const results = await pool.query(
    "SELECT * from admins WHERE email_id = $1;",
    [email]
  );

  return res.send(results.rows[0]);
};

/** Edit admin */
const edit_admin_profile = async (req, res) => {
  /**
   * 1. Perform jwt authentication
   * 2. Edit admin info
   */

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

  /** Edit admin_info */
  const edit = await pool.query(
    "UPDATE admins SET name = $1 WHERE email_id = $2;",
    [info.name, info.email_id]
  );

  return res.send("Ok");
};

/**
 * Publish/Unpublish Results
 */
const publish_unpublish_results = async (req, res) => {
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

  var cycle_id = info.cycle_id;

  if (userRole === 0) {
    const results = await pool.query(
      "UPDATE mtech_offerings_" +
        cycle_id +
        " SET is_result_published = $1 WHERE offering_id = $2",
      [info.is_result_published, info.offering_id]
    );
  } else {
    const results = await pool.query(
      "UPDATE mtech_offerings_" +
        cycle_id +
        " SET is_result_published_by_faculty = $1 WHERE offering_id = $2",
      [info.is_result_published_by_faculty, info.offering_id]
    );
  }

  return res.send("Ok");
};

/**
 * Publish all results
 */
const publish_all_results = async (req, res) => {
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

  var cycle_id = info.cycle_id;
  if (userRole === 0) {
    const results = await pool.query(
      "UPDATE mtech_offerings_" + cycle_id + " SET is_result_published = 1"
    );
  } else {
    const results = await pool.query(
      "UPDATE mtech_offerings_" +
        cycle_id +
        " SET is_result_published_by_faculty = 1"
    );
  }

  return res.send("Ok");
};

/**
 * Unpublish all results
 */
const unpublish_all_results = async (req, res) => {
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

  var cycle_id = info.cycle_id;

  if (userRole === 0) {
    const results = await pool.query(
      "UPDATE mtech_offerings_" + cycle_id + " SET is_result_published = 0"
    );
  } else {
    const results = await pool.query(
      "UPDATE mtech_offerings_" +
        cycle_id +
        " SET is_result_published_by_faculty = 0"
    );
  }

  return res.send("Ok");
};

/**
 * Open all offerings
 */
const open_all_offerings = async (req, res) => {
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
  if (userRole !== 0) {
    return res.send("1");
  }

  let info = req.body;

  var cycle_id = info.cycle_id;

  const results = await pool.query(
    "UPDATE mtech_offerings_" +
      cycle_id +
      " SET is_accepting_applications = true"
  );

  return res.send("Ok");
};

/**
 * Close all offerings
 */
const close_all_offerings = async (req, res) => {
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
  if (userRole !== 0) {
    return res.send("1");
  }

  let info = req.body;

  var cycle_id = info.cycle_id;

  const results = await pool.query(
    "UPDATE mtech_offerings_" +
      cycle_id +
      " SET is_accepting_applications = false"
  );

  return res.send("Ok");
};

/** Delete application */
const delete_application = async (req, res) => {
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
  if (userRole !== 0) {
    return res.send("1");
  }

  let info = req.body;

  var cycle_id = info.cycle_id;

  const results = await pool.query(
    "DELETE from applications_" + cycle_id + " WHERE application_id = $1",
    [info.application_id]
  );

  return res.send("Ok");
};

module.exports = {
  add_admission_cycle,
  get_admission_cycles,
  delete_admission_cycle,
  edit_admission_cycle,
  add_offering,
  edit_offering,
  delete_offering,
  get_offerings,
  get_offering_applications,
  get_application_info_admin,
  add_admin,
  edit_admin,
  get_admins,
  delete_admin,
  get_admin_profile,
  edit_admin_profile,
  publish_unpublish_results,
  publish_all_results,
  unpublish_all_results,
  delete_application,
  open_all_offerings,
  close_all_offerings,
};
