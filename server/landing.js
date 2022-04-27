const pool = require("./db");
const dotenv = require("dotenv");

dotenv.config();

/** Get Fees Info */
const get_fees_info = async (req, res) => {
  const cycle = await pool.query("SELECT cycle_id from current_cycle;");
  let cycle_id = cycle.rows[0].cycle_id;

  const results = await pool.query(
    "SELECT fees_gen, fees_obc, fees_ews, fees_sc, fees_st, fees_pwd from admission_cycles where cycle_id = $1;",
    [cycle_id]
  );

  return res.send(results.rows[0]);
};

module.exports = {
<<<<<<< HEAD
  get_fees_info
};
=======
  get_fees_info,
};
>>>>>>> 767881c63ea35825a496d45a5f11863ac7844e70
