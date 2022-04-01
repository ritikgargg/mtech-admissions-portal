const stream = require("stream");
const excel = require("excel4node");
const pool = require("./db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

function generate_excel(info) {
    const workbook = new excel.Workbook();
    const style = workbook.createStyle({
        font: { color: "#000000", size: 11 }
    });

    const worksheet = workbook.addWorksheet("Sheet 1");

    const arrayToWrite = Array.from({length: 10}, (v, k) => [`Row ${k+1}, Col 1`,`Row ${k+1}, Col 2`]);
    arrayToWrite.forEach((row, rowIndex) => {
        row.forEach((entry, colIndex) => { 
            worksheet.cell(rowIndex + 1, colIndex + 1).string(entry).style(style); 
        })
    });

    return workbook;
}

const get_applicants_in_excel = async (req, res) => {
    /**
     * Verify using authToken
     */
    // authToken = req.headers.authorization;
    // let jwtSecretKey = process.env.JWT_SECRET_KEY;

    // var verified = null;

    // try {
    //     verified = jwt.verify(authToken, jwtSecretKey);
    // } catch (error) {
    //     return res.send("1"); /** Error, logout on user side */
    // }

    // if (!verified) {
    //     return res.send("1"); /** Error, logout on user side */
    // }

    // /** Get role */
    // var userRole = jwt.decode(authToken).userRole;
    // if(userRole !== 0 || userRole !== 1) {
    //     return res.send("1");
    // }

    let workbook = generate_excel(req.body);
    workbook.write('Applicant_List.xlsx', res);
};

module.exports = {
    get_applicants_in_excel
};