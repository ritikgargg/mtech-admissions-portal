const pool = require("./db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

/** Get all the deleted admission cycles */
const get_deleted_admission_cycles = async (req, res) => {
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

  const results = await pool.query("SELECT * from deleted_admission_cycles;");

  return res.send(results.rows);
};

/** Restore a deleted admission cycle and add it to the admission cycles table */
const restore_admission_cycle = async (req, res) => {
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

  const cycle_data = await pool.query(
    "SELECT * from deleted_admission_cycles WHERE cycle_id = $1;",
    [cycle_id]
  );
  cycle_data_rows = cycle_data.rows[0];

  const results1 = await pool.query(
    "INSERT INTO admission_cycles VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);",
    [
      cycle_id,
      cycle_data_rows.name,
      cycle_data_rows.duration_start,
      cycle_data_rows.duration_end,
      cycle_data_rows.fees_gen,
      cycle_data_rows.fees_ews,
      cycle_data_rows.fees_obc,
      cycle_data_rows.fees_sc,
      cycle_data_rows.fees_st,
      cycle_data_rows.fees_pwd,
      cycle_data_rows.brochure_url,
      cycle_data_rows.rank_list_url,
    ]
  );

  const results2 = await pool.query(
    "DELETE from deleted_admission_cycles WHERE cycle_id = $1;",
    [cycle_id]
  );

  return res.send("Ok");
};

/** Delete admission cycle permanently */
const delete_cycle_permanently = async (req, res) => {
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

  const delete_from_deleted_admission_cycle_table = await pool.query(
    "DELETE FROM deleted_admission_cycles WHERE cycle_id = $1;",
    [cycle_id]
  );

  const drop_applications_table = await pool.query(
    "DROP TABLE applications_" + cycle_id + ";"
  );

  const drop_offerings_table = await pool.query(
    "DROP TABLE mtech_offerings_" + cycle_id + ";"
  );

  return res.send("Ok");
};

module.exports = {
  get_deleted_admission_cycles,
  restore_admission_cycle,
  delete_cycle_permanently,
};
