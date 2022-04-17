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
  if(userRole !== 0 && userRole !== 1) {
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
  if(userRole !== 0) {
    return res.send("1");
  }

  let cycle_id = req.body.cycle_id;

  const results = await pool.query(
    "DELETE from admission_cycles WHERE cycle_id = $1",
    [cycle_id]
  );

  const cycle = await pool.query("SELECT cycle_id from current_cycle;");
  let current_cycle_id = cycle.rows[0].cycle_id;

  if (current_cycle_id === cycle_id) {
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
  if(userRole !== 0) {
    return res.send("1");
  }

  let info = req.body;

  const results = await pool.query(
    "UPDATE admission_cycles SET name = $1, duration_start = $2, duration_end = $3 WHERE cycle_id = $4;",
    [info.name, info.duration_start, info.duration_end, info.cycle_id]
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
  if(userRole !== 0 && userRole !== 1) {
    return res.send("1");
  }

  let info = req.body;

  var cycle_id = info.cycle_id;

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

  /** Get role */
  var userRole = jwt.decode(authToken).userRole;
  if(userRole !== 0 && userRole !== 1) {
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
  if(userRole !== 0 && userRole !== 1) {
    return res.send("1");
  }

  let info = req.body;

  var cycle_id = info.cycle_id;

  const results = await pool.query(
    "DELETE from mtech_offerings_" + cycle_id + " WHERE offering_id = $1",
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
  var department  = jwt.decode(authToken).department;

  if(userRole !== 0 && userRole !== 1) {
    return res.send("1");
  }

  let cycle_id = req.headers.cycle_id;

  const cycle_name = await pool.query(
    "SELECT NAME FROM admission_cycles WHERE cycle_id = $1;",
    [cycle_id]
  );

  if (cycle_name.rows.length === 0) {
    return res.send("1");
  }

  // const check_offerings_table = await pool.query(
  //   "SELECT EXISTS (SELECT table_name FROM information_schema.tables WHERE table_name = $1);",
  //   ["mtech_offerings_" + cycle_id]
  // );

  // let offering_table_exists = check_offerings_table.rows[0].exists;

  // if (offering_table_exists === false) {
  //   return res.send("1");
  // }

  let results = null;
  
  if(userRole === 0) {
    results = await pool.query(
      "SELECT * FROM mtech_offerings_" + cycle_id + ";"
    );

  }
  else {
    results = await pool.query(
      "SELECT * FROM mtech_offerings_" + cycle_id + " WHERE department = $1;", [department]
    );
  }
  return res.send({
    offerings: results.rows,
    cycle_name: cycle_name.rows[0].name,
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
  if(userRole !== 0 && userRole !== 1) {
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

  // const check_offerings_table = await pool.query(
  //   "SELECT EXISTS (SELECT table_name FROM information_schema.tables WHERE table_name = $1);",
  //   ["applications_" + cycle_id]
  // );

  // let offering_table_exists = check_offerings_table.rows[0].exists;

  // if (offering_table_exists === false) {
  //   return res.send("1");
  // }

  const offering_details = await pool.query(
    "SELECT specialization, is_result_published FROM mtech_offerings_" +
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
    is_result_published: offering_details.rows[0].is_result_published
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
  if(userRole !== 0 && userRole !== 1) {
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

  /** Check if applications table exists **/
  // const check_applications_table = await pool.query(
  //   "SELECT EXISTS (SELECT table_name FROM information_schema.tables WHERE table_name = $1);",
  //   ["applications_" + cycle_id]
  // );
  // let applications_table_exists = check_applications_table.rows[0].exists;

  // if (applications_table_exists === false) {
  //   return res.send("1"); /** No application table */
  // }

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
  if(userRole !== 0) {
    return res.send("1");
  }

  let info = req.body;

  /** Check if this email is already an admin */
  const check = await pool.query("SELECT * FROM admins WHERE email_id = $1;", [info.email_id]);

  if(check.rows.length !== 0) {
    return res.send("2"); /** Email ID already exists */
  }

  /** Add email_id */
  const add = await pool.query("INSERT INTO admins(name, email_id, admin_type, department) VALUES($1, $2, $3, $4);", [info.name, info.email_id, info.admin_type, info.department]);

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
  if(userRole !== 0) {
    return res.send("1");
  }

  let info = req.body;

  /** Edit admin_info */
  const edit = await pool.query("UPDATE admins SET name = $1, admin_type = $2, department = $3 WHERE email_id = $4;", [info.name, info.admin_type, info.department, info.email_id]);

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
  if(userRole !== 0) {
    return res.send("1");
  }

  /** Get email */
  var email = jwt.decode(authToken).userEmail;

  const results = await pool.query("SELECT * from admins WHERE email_id <> $1;", [email]);

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
  if(userRole !== 0) {
    return res.send("1");
  }

  let info = req.body;

  console.log(info);

  const delete_from_admins_table = await pool.query("DELETE FROM admins WHERE email_id = $1;", [info.email_id]);  
  const delete_from_login_verification_table = await pool.query("DELETE FROM login_verification WHERE email_id = $1;", [info.email_id]);

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
  if(userRole !== 0 && userRole !== 1) {
    return res.send("1");
  }

  /** Get email */
  var email = jwt.decode(authToken).userEmail;

  const results = await pool.query("SELECT * from admins WHERE email_id = $1;", [email]);

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
  if(userRole !== 0 && userRole !== 1) {
    return res.send("1");
  }

  let info = req.body;

  /** Edit admin_info */
  const edit = await pool.query("UPDATE admins SET name = $1 WHERE email_id = $2;", [info.name, info.email_id]);

  return res.send("Ok");
};

/**
   * Publish/Unpublish Results
   */
const publish_unpublish_results = async(req, res) => {
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
 
   var cycle_id = info.cycle_id;
 
   const results = await pool.query(
     "UPDATE mtech_offerings_" +
       cycle_id +
       " SET is_result_published = $1 WHERE offering_id = $2",
     [
       info.is_result_published,
       info.offering_id,
     ]
   );
 
   return res.send("Ok");

}

/**
   * Publish all results
   */
const publish_all_results = async(req, res) => {
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
 
   var cycle_id = info.cycle_id;
 
   const results = await pool.query(
     "UPDATE mtech_offerings_" +
       cycle_id +
       " SET is_result_published = 1"
   );
 
   return res.send("Ok");

}

/**
   * Unpublish all results
   */
const unpublish_all_results = async(req, res) => {
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
 
   var cycle_id = info.cycle_id;
 
   const results = await pool.query(
     "UPDATE mtech_offerings_" +
       cycle_id +
       " SET is_result_published = 0",
   );
 
   return res.send("Ok");

}

// const get_admin_type = async (req, res) => {
//   /**
//    * Verify using authToken
//    */
//   authToken = req.headers.authorization;
//   let jwtSecretKey = process.env.JWT_SECRET_KEY;

//   var verified = null;

//   try {
//     verified = jwt.verify(authToken, jwtSecretKey);
//   } catch (error) {
//     return res.send("1"); /** Error, logout on user side */
//   }

//   if (!verified) {
//     return res.send("1"); /** Error, logout on user side */
//   }

//   /** Get role */
//   var userRole = jwt.decode(authToken).userRole;
//   return res.send({admin_type: parseInt(userRole)});
// };


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
  // get_admin_type
};
