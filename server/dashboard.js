const pool = require("./db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const get_dashboard_info = async (req, res) => {
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
    if(userRole !== 0 && userRole !== 1) {
        return res.send("1");
    }

    const cycle = await pool.query("SELECT cycle_id from current_cycle;");
    let current_cycle_id = cycle.rows[0].cycle_id;

    const current_cycle_info = await pool.query("SELECT * FROM admission_cycles WHERE cycle_id = $1;", [current_cycle_id]);
    const applications_count = await pool.query("SELECT count(*) FROM applications_" + current_cycle_id + ";");
    const offerings_count = await pool.query("SELECT count(*) FROM mtech_offerings_" + current_cycle_id + ";");
    const offerings = await pool.query("SELECT offering_id, specialization FROM mtech_offerings_" + current_cycle_id + ";");
    let category_distribution = {}
    
    let category_distribution_per_offering = []
    for(let i = 0; i < offerings.rows.length; i++){
        category_distribution_per_offering = await pool.query("SELECT category, count(*) FROM applications_" + current_cycle_id + " WHERE offering_id = $1 GROUP BY category;", [offerings.rows[i].offering_id]);
        category_distribution[offerings.rows[i].offering_id] = category_distribution_per_offering.rows
    }
    
    return res.send({
        current_cycle_info: current_cycle_info.rows[0],
        applications_count: applications_count.rows[0],
        offerings_count: offerings_count.rows[0],
        offerings: offerings.rows,
        category_distribution: category_distribution,
    });
}

module.exports = {
    get_dashboard_info
};
  