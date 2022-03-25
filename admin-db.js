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
      " (department, specialization, seats, gate_paper_codes, eligibility, deadline) VALUES($1, $2, $3, $4, $5, $6);",
    [
      info.department,
      info.specialization,
      info.seats,
      info.gate_paper_codes,
      info.eligibility,
      info.deadline,
    ]
  );

  return res.send("Ok");
};

module.exports = {
  add_admission_cycle,
  add_offering,
  get_admission_cycles,
};
