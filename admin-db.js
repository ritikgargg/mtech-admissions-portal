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

  const cycle = await pool.query("SELECT cycle_id from current_cycle;");
  let cycle_id = cycle.rows[0].cycle_id;

  let info = req.body;

  const results = await pool.query(
    "INSERT INTO admission_cycles(name, duration_start, duration_end) VALUES($1, $2, $3) RETURNING cycle_id;",
    [info.name, info.start, info.end]
  );

  var new_cycle_id = results.rows[0].cycle_id;

  const change_current_cycle = await pool.query(
    "UPDATE current_cycle SET cycle_id = $1;",
    [new_cycle_id]
  );

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

  const cycle = await pool.query("SELECT cycle_id from current_cycle;");
  let cycle_id = cycle.rows[0].cycle_id;

  const results = await pool.query("SELECT * from admission_cycles;");

  return res.send({ results: results.rows, current_cycle_id: cycle_id });
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

  let info = req.body;

  const cycle = await pool.query("SELECT cycle_id from current_cycle;");
  let cycle_id = cycle.rows[0].cycle_id;

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

  let info = req.body;

  const cycle = await pool.query("SELECT cycle_id from current_cycle;");
  let cycle_id = cycle.rows[0].cycle_id;

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

  let info = req.body;

  const cycle = await pool.query("SELECT cycle_id from current_cycle;");
  let cycle_id = cycle.rows[0].cycle_id;

  const results = await pool.query(
    "DELETE from mtech_offerings_" + cycle_id + " WHERE offering_id = $1",
    [info.offering_id]
  );

  return res.send("Ok");
};

/**
 * Get offerings
 * Add check for browser link
 */
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

  var email = jwt.decode(authToken).userEmail;

  const cycle = await pool.query("SELECT cycle_id from current_cycle;");
  let cycle_id = cycle.rows[0].cycle_id;

  // const check_offerings_table = await pool.query(
  //   "SELECT EXISTS (SELECT table_name FROM information_schema.tables WHERE table_name = $1);",
  //   ["mtech_offerings_" + cycle_id]
  // );

  // let offering_table_exists = check_offerings_table.rows[0].exists;

  // if (offering_table_exists === false) {
  //   return res.send([]);
  // }

  const results = await pool.query(
    "SELECT * FROM mtech_offerings_" + cycle_id + ";"
  );

  return res.send(results.rows);
};

module.exports = {
  add_admission_cycle,
  add_offering,
  get_admission_cycles,
  edit_offering,
  delete_offering,
  get_offerings,
};
