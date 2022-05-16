import React from "react";
import crossPic from "../../images/red_cross.svg";

function ApplicationFeeDetails(props) {
  return (
    <div>
      <div className="px-6 py-6 mx-20 my-20 bg-[#f3f4f6] rounded-2xl">
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="ml-5 mb-2 text-left text-2xl font-medium leading-6 text-gray-900">
                  Application Fee Details
                </h3>
                <p className="ml-5 text-left mt-1 text-gray-600 text-base">
                  Submit your application fee through{" "}
                  <a
                    className="underline text-blue-700"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.onlinesbi.com/sbicollect/icollecthome.htm"
                  >
                    SB Collect
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2">
              <form method="POST" onSubmit={() => props.increasePageNumber()}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category<span style={{ color: "#ff0000" }}> *</span>
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={props.details[0]}
                          onChange={(event) => props.onChange(event, 0)}
                          placeholder="- Select -"
                          required
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value={props.category}>
                            {props.category}
                          </option>
                        </select>
                      </div>

                      <br></br>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="amount"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Amount<span style={{ color: "#ff0000" }}> *</span>
                        </label>
                        <select
                          name="amount"
                          id="amount"
                          required
                          defaultValue={props.details[1]}
                          onChange={(event) => props.onChange(event, 1)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="">-- Select --</option>
                          <option value={props.categoryFees}>
                            {props.categoryFees}
                          </option>
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="transaction_id"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Transaction ID
                          <span style={{ color: "#ff0000" }}> *</span>
                        </label>
                        <input
                          type="text"
                          name="transaction_id"
                          id="transaction_id"
                          required
                          defaultValue={props.details[2]}
                          onChange={(event) => props.onChange(event, 2)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-full sm:col-span-full">
                        <label
                          htmlFor="bank"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Bank
                          <span style={{ color: "#ff0000" }}> *</span>
                        </label>
                        <input
                          type="text"
                          name="bank"
                          id="bank"
                          value={props.details[3]}
                          required
                          onChange={(event) => props.onChange(event, 3)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                          htmlFor="transaction_slip"
                        >
                          Transaction Slip
                          <span style={{ color: "#ff0000" }}> *</span>
                        </label>

                        {!props.details[4].name && (
                          <>
                            <input
                              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                              aria-describedby="profile-picture-desc"
                              id="transaction_slip"
                              name="transaction_slip"
                              type="file"
                              required
                              accept=".pdf, .jpeg, .jpg"
                              onChange={(e) =>
                                props.handleFileSubmit(e, 2, 4, 2)
                              }
                            />
                            <div
                              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                              id="user_avatar_help"
                            >
                              <span className="font-semibold">
                                {" "}
                                Maximum file size:{" "}
                              </span>
                              2 MB
                            </div>
                            <div
                              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                              id="user_avatar_help"
                            >
                              <span className="font-semibold">
                                Allowed file formats:
                              </span>{" "}
                              .jpg, .jpeg, .pdf
                            </div>
                            <div
                              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                              id="user_avatar_help"
                            >
                              <span className="font-semibold">
                                Recommended File Name Format:
                              </span>
                              <span>
                                {" "}
                                Transaction_Slip_&lt;your_email_id&gt; <br />
                                For Example: Transcation_Slip_abc@gmail.com
                              </span>
                            </div>
                          </>
                        )}

                        {props.details[4].name && (
                          <>
                            <div className="flex border-2 mt-1 w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                              <input
                                className="border-none block w-full shadow-sm sm:text-sm"
                                id="transaction_slip"
                                name="transaction_slip"
                                type="text"
                                value={props.details[4].name}
                                required
                                readOnly
                              />

                              <button
                                type="button"
                                className="flex items-center ml-2 mr-2 justify-center"
                                onClick={() => props.emptyFileIndex(4)}
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

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="date-of-transaction"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Date of Transaction
                          <span style={{ color: "#ff0000" }}> *</span>
                        </label>
                        <input
                          type="date"
                          required
                          id="date-of-transaction"
                          name="date-of-transaction"
                          value={props.details[5]}
                          className="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={(e) => props.onChange(e, 5)}
                        />
                      </div>
                    </div>

                    <div className="my-4 grid grid-cols-6 gap-6">
                      <button
                        type="button"
                        onClick={() => props.decreasePageNumber()}
                        className="col-start-1 col-end-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white justify-center block py-2 px-4 mr-2 items-center bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Back
                      </button>
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

export default ApplicationFeeDetails;
