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
  if (userRole !== 0 && userRole !== 1 && userRole !== 3) {
    return res.send("1");
  }

  const cycle = await pool.query("SELECT cycle_id from current_cycle;");
  let current_cycle_id = cycle.rows[0].cycle_id;

  if (current_cycle_id === 0) {
    return res.send("2");
  }

  const current_cycle_info = await pool.query(
    "SELECT * FROM admission_cycles WHERE cycle_id = $1;",
    [current_cycle_id]
  );
  const applications_count = await pool.query(
    "SELECT count(*) FROM applications_" + current_cycle_id + ";"
  );
  const offerings = await pool.query(
    "SELECT offering_id, specialization FROM mtech_offerings_" +
      current_cycle_id +
      ";"
  );
  let gender_distribution = {};
  let category_distribution = {};

  let category_distribution_per_offering = [];
  let gender_distribution_per_offering = [];

  let temp = {};
  temp["GEN"] = 0;
  temp["OBC"] = 0;
  temp["EWS"] = 0;
  temp["SC"] = 0;
  temp["ST"] = 0;

  let temp2 = {};
  temp2["Male"] = 0;
  temp2["Female"] = 0;

  for (let i = 0; i < offerings.rows.length; i++) {
    category_distribution_per_offering = await pool.query(
      "SELECT category, count(*) FROM applications_" +
        current_cycle_id +
        " WHERE offering_id = $1 GROUP BY category;",
      [offerings.rows[i].offering_id]
    );
    category_distribution[offerings.rows[i].offering_id] =
      category_distribution_per_offering.rows;
    for (let j = 0; j < category_distribution_per_offering.rows.length; j++) {
      temp[category_distribution_per_offering.rows[j]["category"]] += parseInt(
        category_distribution_per_offering.rows[j]["count"]
      );
    }
  }

  for (let i = 0; i < offerings.rows.length; i++) {
    gender_distribution_per_offering = await pool.query(
      "SELECT gender, count(*) FROM applications_" +
        current_cycle_id +
        " WHERE offering_id = $1 GROUP BY gender;",
      [offerings.rows[i].offering_id]
    );
    gender_distribution[offerings.rows[i].offering_id] =
      gender_distribution_per_offering.rows;
    for (let j = 0; j < gender_distribution_per_offering.rows.length; j++) {
      temp2[gender_distribution_per_offering.rows[j]["gender"]] += parseInt(
        gender_distribution_per_offering.rows[j]["count"]
      );
    }
  }

  let all_offerings = [];
  for (const [key, value] of Object.entries(temp)) {
    all_offerings.push({ category: key, count: value.toString() });
  }

  let all_offerings2 = [];
  for (const [key, value] of Object.entries(temp2)) {
    all_offerings2.push({ gender: key, count: value.toString() });
  }

  category_distribution["-1"] = all_offerings;
  gender_distribution["-1"] = all_offerings2;

  return res.send({
    current_cycle_info: current_cycle_info.rows[0],
    applications_count: applications_count.rows[0],
    offerings_count: offerings.rows.length,
    offerings: offerings.rows,
    category_distribution: category_distribution,
    gender_distribution: gender_distribution,
  });
};

const get_dashboard_info_gender = async (req, res) => {
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
  let current_cycle_id = cycle.rows[0].cycle_id;

  if (current_cycle_id === 0) {
    return res.send("2");
  }

  const current_cycle_info = await pool.query(
    "SELECT * FROM admission_cycles WHERE cycle_id = $1;",
    [current_cycle_id]
  );
  const applications_count = await pool.query(
    "SELECT count(*) FROM applications_" + current_cycle_id + ";"
  );
  const offerings = await pool.query(
    "SELECT offering_id, specialization FROM mtech_offerings_" +
      current_cycle_id +
      ";"
  );
  let gender_distribution = {};

  let gender_distribution_per_offering = [];
  let temp = {};
  temp["Male"] = 0;
  temp["Female"] = 0;
  temp[""] = 0;

  for (let i = 0; i < offerings.rows.length; i++) {
    gender_distribution_per_offering = await pool.query(
      "SELECT gender, count(*) FROM applications_" +
        current_cycle_id +
        " WHERE offering_id = $1 GROUP BY gender;",
      [offerings.rows[i].offering_id]
    );
    gender_distribution[offerings.rows[i].offering_id] =
      gender_distribution_per_offering.rows;
    for (let j = 0; j < gender_distribution_per_offering.rows.length; j++) {
      temp[gender_distribution_per_offering.rows[j]["gender"]] += parseInt(
        gender_distribution_per_offering.rows[j]["count"]
      );
    }
  }

  let all_offerings = [];
  for (const [key, value] of Object.entries(temp)) {
    all_offerings.push({ gender: key, count: value.toString() });
  }

  gender_distribution["-1"] = all_offerings;

  return res.send({
    current_cycle_info: current_cycle_info.rows[0],
    applications_count: applications_count.rows[0],
    offerings_count: offerings.rows.length,
    offerings: offerings.rows,
    gender_distribution: gender_distribution,
  });
};

module.exports = {
  get_dashboard_info,
};
