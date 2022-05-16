const express = require("express");
const cors = require("cors");
const auth = require("./auth");
const path = require("path");
const multer = require("multer");
const upload = multer();
const applicantdB = require("./applicant-db");
const admindB = require("./admin-db");
const templateGenerator = require("./template-generator");
const uploadResults = require("./upload-results");
const generateResults = require("./merit-list-generator");
const templates = require("./templates");
const recycleBin = require("./recyclebin.js");
const dashboard = require("./dashboard.js");
const landing = require("./landing.js");
var bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/auth/signin/otp", auth.signin_otp);

app.post("/auth/signin/verify", auth.signin_verify);

app.post("/auth/signup/otp", auth.signup_otp);

app.post("/auth/signup/verify", auth.signup_verify);

app.post("/contact-us", auth.contact_us);

app.post(
  "/save-personal-info",
  upload.fields([
    { name: "profile_image", maxCount: 1 },
    { name: "category_certificate", maxCount: 1 },
  ]),
  applicantdB.save_personal_info
);

app.post(
  "/save-communication-details",
  upload.fields([]),
  applicantdB.save_communication_details
);

app.post(
  "/save-education-details",
  upload.fields([
    { name: "marksheet_10th_url", maxCount: 1 },
    { name: "marksheet_12th_url", maxCount: 1 },
    { name: "upload_marksheet0", maxCount: 1 },
    { name: "upload_degree0", maxCount: 1 },
    { name: "upload_marksheet1", maxCount: 1 },
    { name: "upload_degree1", maxCount: 1 },
    { name: "upload_marksheet2", maxCount: 1 },
    { name: "upload_degree2", maxCount: 1 },
    { name: "upload_marksheet3", maxCount: 1 },
    { name: "upload_degree3", maxCount: 1 },
    { name: "upload_marksheet4", maxCount: 1 },
    { name: "upload_degree4", maxCount: 1 },
  ]),
  applicantdB.save_education_details
);

app.get("/get-profile-info", applicantdB.get_profile_info);

app.get("/check-applicant-info", applicantdB.check_applicant_info);

app.get(
  "/reapply-check-applicant-info",
  applicantdB.reapply_check_applicant_info
);

app.get("/get-open-positions", applicantdB.get_open_positions);

app.get("/get-open-positions-landing", landing.get_open_positions_landing);

app.get("/get-cycle-duration", landing.get_cycle_duration);

app.get("/get-user-info", applicantdB.get_user_info);

app.get("/get-offering-info", applicantdB.get_offering_info);

app.get("/get-applications", applicantdB.get_applications);

app.get("/get-application-info", applicantdB.get_application_info);

app.post(
  "/save-application-info",
  upload.fields([
    { name: "transaction_slip", maxCount: 1 },
    { name: "self_attested_copies", maxCount: 1 },
    { name: "signature", maxCount: 1 },
  ]),
  applicantdB.save_application_info
);

app.post(
  "/reapply-save-application-info",
  upload.fields([
    { name: "transaction_slip", maxCount: 1 },
    { name: "self_attested_copies", maxCount: 1 },
    { name: "signature", maxCount: 1 },
  ]),
  applicantdB.reapply_save_application_info
);

app.post(
  "/add-admission-cycle",
  upload.fields([]),
  admindB.add_admission_cycle
);

app.get("/get-admission-cycles", admindB.get_admission_cycles);

app.post(
  "/delete-admission-cycle",
  upload.fields([]),
  admindB.delete_admission_cycle
);

app.post(
  "/edit-admission-cycle",
  upload.fields([]),
  admindB.edit_admission_cycle
);

app.post("/add-offering", upload.fields([]), admindB.add_offering);

app.post("/edit-offering", upload.fields([]), admindB.edit_offering);

app.post("/delete-offering", upload.fields([]), admindB.delete_offering);

app.get("/get-offerings", admindB.get_offerings);

app.get("/get-offering-applications", admindB.get_offering_applications);

app.get("/get-application-info-admin", admindB.get_application_info_admin);

app.post(
  "/upload-result",
  upload.fields([{ name: "result_excel", maxCount: 1 }]),
  uploadResults.upload_results
);

app.post("/add-admin", upload.fields([]), admindB.add_admin);

app.post("/edit-admin", upload.fields([]), admindB.edit_admin);

app.post("/delete-admin", upload.fields([]), admindB.delete_admin);

app.post("/edit-admin-profile", upload.fields([]), admindB.edit_admin_profile);

app.get("/get-admins", admindB.get_admins);

app.get("/get-admin-profile", admindB.get_admin_profile);

app.post(
  "/publish-unpublish-results",
  upload.fields([]),
  admindB.publish_unpublish_results
);

app.post(
  "/publish-all-results",
  upload.fields([]),
  admindB.publish_all_results
);

app.post(
  "/unpublish-all-results",
  upload.fields([]),
  admindB.unpublish_all_results
);

app.post("/open-all-offerings", upload.fields([]), admindB.open_all_offerings);

app.post(
  "/close-all-offerings",
  upload.fields([]),
  admindB.close_all_offerings
);

app.post("/add-template", upload.fields([]), templates.add_template);

app.post("/delete-template", upload.fields([]), templates.delete_template);

app.post("/delete-application", upload.fields([]), admindB.delete_application);

app.get("/get-templates", templates.get_templates);

app.get(
  "/get-applications-in-excel",
  templateGenerator.get_applications_in_excel
);

app.post("/get-merit-list", upload.fields([]), generateResults.get_merit_list);

app.get("/get-applicants-branches", generateResults.get_applicants_branches);

app.get(
  "/get-deleted-admissions-cycles",
  recycleBin.get_deleted_admission_cycles
);

app.get("/get-dashboard-info", dashboard.get_dashboard_info);

app.get("/get-fees-info", landing.get_fees_info);

app.get("/get-brochure-ranklist-url", landing.get_brochure_ranklist_urls);

app.post(
  "/restore-cycle",
  upload.fields([]),
  recycleBin.restore_admission_cycle
);

app.post(
  "/delete-cycle-permanently",
  upload.fields([]),
  recycleBin.delete_cycle_permanently
);

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
