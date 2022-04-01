const stream = require("stream");
const excel = require("excel4node");
const pool = require("./db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

async function generate_excel(info) {
    const workbook = new excel.Workbook();
    const style = workbook.createStyle({
        font: { color: "#000000", size: 11 }
    });

    const header_style = workbook.createStyle({
        font: { color: "#ffffff", size: 10 },
        fill: { type: 'pattern', patternType: 'solid', fgColor: '365e9e' },
        border: { outline: true }
    });

    const worksheet = workbook.addWorksheet("Sheet 1");

    const template = await pool.query("SELECT * from templates WHERE template_id = $1;", [info.template_id]);
    
    let column_list = template.rows[0].column_list;

    // console.log("column_length", column_list.length);
    // let size = Array({length: column_list.length}, ()=>0);
    // console.log(size);
    
    column_list.forEach((element, columnIndex) => {
        // size[columnIndex] = max(size[columnIndex], element.length);
        worksheet.cell(1, columnIndex + 1).string(element.replaceAll('_', ' ').toUpperCase()).style(header_style);
        // worksheet.column(columnIndex + 1).setWidth(size[columnIndex]);
    });

    const applications = await pool.query("SELECT * FROM applications_" + info.cycle_id + " WHERE offering_id = $1;",
    [info.offering_id]);

    let data = applications.rows;

    console.log(data);

    data.forEach((element, rowIndex) => {
        columnIndex = 1;
        for(var i = 0; i < column_list.length; i++) {
            worksheet.cell(rowIndex + 2, columnIndex).string(element[column_list[i]]).style(style);
            columnIndex++;
        }
    });

    return workbook;
}

const get_applications_in_excel = async (req, res) => {
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

    let workbook = await generate_excel(req.headers);
    workbook.write('Applicant_List.xlsx', res);
}

module.exports = {
    get_applications_in_excel
};