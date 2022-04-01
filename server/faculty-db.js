const pool = require("./db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

/** This is a comment */
const function_name = async (req, res) => {
    console.log("Hello");
};

module.exports = {
    function_name
};