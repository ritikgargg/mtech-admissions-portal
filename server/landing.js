const pool = require("./db");
const dotenv = require("dotenv");

dotenv.config();

/** Get Fees Info */
const get_fees_info = async (req, res) => {
  const cycle = await pool.query("SELECT cycle_id from current_cycle;");
  let cycle_id = cycle.rows[0].cycle_id;

  if (cycle_id === 0) return res.send("1");

  const results = await pool.query(
    "SELECT fees_gen, fees_obc, fees_ews, fees_sc, fees_st, fees_pwd from admission_cycles where cycle_id = $1;",
    [cycle_id]
  );

  return res.send(results.rows[0]);
};

/**
 * Get open positions
 */
const get_open_positions_landing = async (req, res) => {
  const cycle = await pool.query("SELECT cycle_id from current_cycle;");
  let cycle_id = cycle.rows[0].cycle_id;

  const check_offerings_table = await pool.query(
    "SELECT EXISTS (SELECT table_name FROM information_schema.tables WHERE table_name = $1);",
    ["mtech_offerings_" + cycle_id]
  );

  let offering_table_exists = check_offerings_table.rows[0].exists;

  if (offering_table_exists === false) {
    return res.send([]);
  }

  const results = await pool.query(
    "SELECT * FROM mtech_offerings_" + cycle_id + " WHERE is_draft_mode = FALSE"
  );

  return res.send(results.rows);
};

/** Get Fees Info */
const get_cycle_duration = async (req, res) => {
  const cycle = await pool.query("SELECT cycle_id from current_cycle;");
  let cycle_id = cycle.rows[0].cycle_id;

  if (cycle_id === 0) return res.send("1");

  const results = await pool.query(
    "SELECT duration_start, duration_end from admission_cycles where cycle_id = $1;",
    [cycle_id]
  );

  return res.send(results.rows[0]);
};

/** Get brochure and ranklist urls */
const get_brochure_ranklist_urls = async (req, res) => {
  const cycle = await pool.query("SELECT cycle_id from current_cycle;");
  let cycle_id = cycle.rows[0].cycle_id;

  if (cycle_id === 0) return res.send("1");

  const results = await pool.query(
    "SELECT brochure_url, rank_list_url from admission_cycles where cycle_id = $1;",
    [cycle_id]
  );

  return res.send(results.rows[0]);
};

module.exports = {
  get_fees_info,
  get_open_positions_landing,
  get_cycle_duration,
  get_brochure_ranklist_urls,
};
