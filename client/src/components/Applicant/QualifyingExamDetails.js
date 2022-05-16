import React from "react";
import crossPic from "../../images/red_cross.svg";
import HelpIcon from "@mui/icons-material/Help";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

function gatePaperCodesToArray(gatePaperCodes) {
  if (gatePaperCodes === undefined) return [];
  var gatePaperCodesArr = gatePaperCodes.split(",");
  for (var i = 0; i < gatePaperCodesArr.length; i++) {
    gatePaperCodesArr[i] = gatePaperCodesArr[i].trim();
  }
  return gatePaperCodesArr;
}

function QualifyingExamDetails(props) {
  const date = new Date();
  const max_year = date.getFullYear();
  const min_year = max_year - 2;

  return (
    <div>
      <div className="px-6 py-6 mx-20 my-20 bg-[#f3f4f6] rounded-2xl">
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="ml-5 mb-2 text-left text-2xl font-medium leading-6 text-gray-900">
                  Qualifying Examination(GATE score)
                </h3>
                <p className="ml-5 text-left mt-1 text-gray-600 text-base leading-relaxed">
                  Details of GATE Score: Please fill the details of the highest
                  valid (past 3 years including this year) GATE Score obtained
                  by you . If the GATE Registration No. is filled wrong, the
                  candidate will be responsible for this. GATE{" "}
                  <span className="font-sebold">
                    {max_year - 2}/ {max_year - 1}/ {max_year}
                  </span>{" "}
                  qualified candidates are only eligible to apply.
                </p>
              </div>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={() => props.increasePageNumber()} method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="department"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Department<span style={{ color: "#ff0000" }}> *</span>
                        </label>
                        <input
                          id="department"
                          name="department"
                          defaultValue={props.offering.department}
                          readOnly
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        ></input>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="program_name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Specialization
                          <span style={{ color: "#ff0000" }}> *</span>
                        </label>
                        <input
                          id="program_name"
                          name="program_name"
                          required
                          defaultValue={props.offering.specialization}
                          readOnly
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        ></input>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="qualifying_examination"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Qualifying Examination
                          <span style={{ color: "#ff0000" }}> *</span>
                        </label>
                        <select
                          id="qualifying_examination"
                          name="qualifying_examination"
                          value={props.details[6]}
                          onChange={(e) => props.onChange(e, 6)}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>GATE</option>
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="branch_code"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Branch Code
                          <span style={{ color: "#ff0000" }}> *</span>
                        </label>
                        <select
                          id="branch_code"
                          name="branch_code"
                          required
                          value={props.details[7]}
                          onChange={(e) => props.onChange(e, 7)}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="">-- Select --</option>
                          {gatePaperCodesToArray(
                            props.offering.gate_paper_codes
                          ).map((gatePaperCode, index) => (
                            <option value={gatePaperCode} key={index}>
                              {gatePaperCode}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="year"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Year<span style={{ color: "#ff0000" }}> *</span>
                        </label>
                        <input
                          type="number"
                          name="year"
                          id="year"
                          min={min_year}
                          max={max_year}
                          value={props.details[8]}
                          onChange={(event) => props.onChange(event, 8)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="gate_enrollment_number"
                          className="block text-sm font-medium text-gray-700"
                        >
                          GATE Enrollment Number/Registration Number
                          <span style={{ color: "#ff0000" }}> *</span>
                        </label>
                        <input
                          type="text"
                          name="gate_enrollment_number"
                          id="gate_enrollment_number"
                          // pattern="[A-Z]{2}[0-9]{10}"
                          pattern={props.details[7] + "[0-9]{10}"}
                          required
                          title="Correct Format : GATE paper code followed by 10 digits"
                          value={props.details[9]}
                          onChange={(event) => props.onChange(event, 9)}
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="coap_registration_number"
                          className="block text-sm font-medium text-gray-700"
                        >
                          COAP Registration Number
                          <span style={{ color: "#ff0000" }}> *</span>
                        </label>
                        <input
                          type="text"
                          name="coap_registration_number"
                          id="coap_registration_number"
                          required
                          pattern="COAP[0-9]{9}"
                          title="Correct Format : COAP followed by 9 digits"
                          autoComplete="amount"
                          value={props.details[10]}
                          onChange={(event) => props.onChange(event, 10)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="all_india_rank"
                          className="block text-sm font-medium text-gray-700"
                        >
                          All India Rank (AIR)
                          <span style={{ color: "#ff0000" }}> *</span>
                        </label>
                        <input
                          type="number"
                          name="all_india_rank"
                          id="all_india_rank"
                          required
                          min={1}
                          value={props.details[11]}
                          onChange={(event) => props.onChange(event, 11)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="gate_score"
                          className="block text-sm font-medium text-gray-700"
                        >
                          GATE Score
                          <span style={{ color: "#ff0000" }}> * </span>
                          <HtmlTooltip
                            title={
                              <React.Fragment>
                                <Typography color="inherit"></Typography>
                                {
                                  "Please ensure that you have entered your GATE score, and not GATE marks."
                                }{" "}
                                <br />
                              </React.Fragment>
                            }
                          >
                            <HelpIcon fontSize="small"></HelpIcon>
                          </HtmlTooltip>
                        </label>
                        <input
                          type="number"
                          name="gate_score"
                          id="gate_score"
                          required
                          min={0}
                          max={1000}
                          value={props.details[12]}
                          onChange={(event) => props.onChange(event, 12)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="valid_upto"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Valid Upto
                          <span style={{ color: "#ff0000" }}> *</span>
                        </label>
                        <input
                          type="number"
                          name="valid_upto"
                          id="valid_upto"
                          min={min_year + 2}
                          max={max_year + 2}
                          required
                          value={props.details[13]}
                          onChange={(event) => props.onChange(event, 13)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-full sm:col-span-full">
                        <label
                          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                          htmlFor="gate_result"
                        >
                          Self attested copies of GATE as mentioned in the form
                          <span style={{ color: "#ff0000" }}> *</span>
                        </label>

                        {!props.details[14].name && (
                          <>
                            <input
                              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                              aria-describedby="profile-picture-desc"
                              id="gate_result"
                              name="gate_result"
                              type="file"
                              required
                              accept=".pdf"
                              onChange={(e) =>
                                props.handleFileSubmit(e, 5, 14, 1)
                              }
                            />

                            <div
                              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                              id="gate_result_help"
                            >
                              <span className="font-semibold">
                                {" "}
                                Maximum file size:{" "}
                              </span>
                              5 MB
                            </div>

                            <div
                              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                              id="gate_result_help"
                            >
                              <span className="font-semibold">
                                Allowed file formats:
                              </span>{" "}
                              .pdf
                            </div>

                            <div
                              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                              id="gate_result_help"
                            >
                              <span className="font-semibold">
                                Recommended File Name Format:
                              </span>
                              <span>
                                {" "}
                                GATE_Copies_&lt;your_email_id&gt; <br />
                                For Example: GATE_Copies_abc@gmail.com
                              </span>
                            </div>
                          </>
                        )}

                        {props.details[14].name && (
                          <>
                            <div className="flex border-2 mt-1 w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                              <input
                                className="border-none block w-full shadow-sm sm:text-sm"
                                id="gate_result"
                                name="gate_result"
                                type="text"
                                value={props.details[14].name}
                                required
                                readOnly
                              />

                              <button
                                type="button"
                                className="flex items-center ml-2 mr-2 justify-center"
                                onClick={() => props.emptyFileIndex(14)}
                              >
                                <img
                                  className="w-6 h-6"
                                  src={crossPic}
                                  alt="Cross"
                                ></img>
                              </button>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="col-span-full sm:col-span-full">
                        <label
                          htmlFor="remarks"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Remarks
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="remarks"
                            name="remarks"
                            rows={4}
                            value={props.details[15]}
                            onChange={(event) => props.onChange(event, 15)}
                            className="resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Any other relevant information (like publications,
                          patents or any other relevant information not already
                          mentioned)
                        </p>
                      </div>
                      <div className="col-span-full sm:col-span-full">
                        <label
                          htmlFor="has_given_multiple_gates"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Have you given multiple GATE exams?
                          <span style={{ color: "#ff0000" }}> *</span>
                        </label>
                        <select
                          id="has_given_multiple_gates"
                          name="has_given_multiple_gates"
                          value={props.hasGivenMultipleGates}
                          onChange={(event) =>
                            props.setHasGivenMultipleGates(event.target.value)
                          }
                          required
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="">-- Select --</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>

                      <div className="col-span-full sm:col-span-full">
                        <label
                          htmlFor="has_filled_highest_gate"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Are you sure you have filled your highest valid GATE
                          attempt information?
                          <span style={{ color: "#ff0000" }}> *</span>
                          <HtmlTooltip
                            title={
                              <React.Fragment>
                                <Typography color="inherit">
                                  Consider The Case
                                </Typography>
                                {
                                  "Suppose you have the following three valid GATE scores :"
                                }{" "}
                                <br />
                                {`GATE score ${max_year - 2} : `} <em>514</em>{" "}
                                <br />
                                {`GATE score ${max_year - 1} : `} <em>724</em>
                                <br />
                                {`GATE score ${max_year} : `} <em>612</em>{" "}
                                <br />
                                {"Then you must fill the details of year"}{" "}
                                <b>{max_year - 1}</b>{" "}
                                {"as it has the highest GATE score"}
                              </React.Fragment>
                            }
                          >
                            <HelpIcon fontSize="small"></HelpIcon>
                          </HtmlTooltip>
                        </label>
                        <select
                          id="has_filled_highest_gate"
                          name="has_filled_highest_gate"
                          required
                          value={props.hasFilledHighestGate}
                          onChange={(event) =>
                            props.setHasFilledHighestGate(event.target.value)
                          }
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="">-- Select --</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                    </div>

                    <div className="my-4 grid grid-cols-6 gap-6">
                      <button
                        type="submit"
                        className="col-start-6 col-end-7 border border-transparent shadow-sm text-sm font-medium rounded-md text-white justify-center block py-2 px-4 mr-2 items-center bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QualifyingExamDetails;
