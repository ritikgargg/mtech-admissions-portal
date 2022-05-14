const pool = require("./db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

/** Add template for a user */
const add_template = async (req, res) => {
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

  /** Get email */
  var email = jwt.decode(authToken).userEmail;

  if (info.scope === "GLOBAL") {
    email = "global@template";
  }

  const check = await pool.query(
    "SELECT name FROM templates WHERE email_id = $1 AND name = $2;",
    [email, info.name]
  );

  if (check.rows.length !== 0) {
    return res.send("2");
  }

  const insert_template = await pool.query(
    "INSERT INTO templates(email_id, name, type, column_list, column_list_compact) VALUES($1, $2, $3, $4, $5);",
    [
      email,
      info.name,
      info.type,
      JSON.parse(info.column_list),
      JSON.parse(info.column_list_compact),
    ]
  );

  return res.send("Ok");
};

/** Delete template for a user */
const delete_template = async (req, res) => {
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

  let info = req.body;

  const delete_template = await pool.query(
    "DELETE FROM templates WHERE template_id = $1",
    [info.template_id]
  );

  return res.send("Ok");
};

/** Get templates for a user */
const get_templates = async (req, res) => {
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

  const select_templates = await pool.query(
    "SELECT * FROM templates WHERE email_id = $1 OR email_id = 'global@template' OR email_id = 'default@template';",
    [email]
  );

  return res.send(select_templates.rows);
};

module.exports = {
  add_template,
  delete_template,
  get_templates,
};
