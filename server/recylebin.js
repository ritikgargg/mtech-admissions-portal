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
    if(userRole !== 0) {
      return res.send("1");
    }
  
    const results = await pool.query("SELECT * from deleted_admission_cycles;");
  
    return res.send(results.rows);
  };

  /** Add admission cycle and make it the current cycle */
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
    if(userRole !== 0) {
      return res.send("1");
    }
  
    let info = req.body;
  
    const results = await pool.query(
      "INSERT INTO admission_cycles(name, duration_start, duration_end) VALUES($1, $2, $3) RETURNING cycle_id;",
      [info.name, info.start, info.end]
    );
  
    var new_cycle_id = results.rows[0].cycle_id;
  
    if (info.make_current === "true") {
      const change_current_cycle = await pool.query(
        "UPDATE current_cycle SET cycle_id = $1;",
        [new_cycle_id]
      );
    }
  
    return res.send("Ok");
  };

module.exports = {
    get_deleted_admission_cycles,
    restore_admission_cycle
};