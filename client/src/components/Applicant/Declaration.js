import React from "react";
import crossPic from "../../images/red_cross.svg";

function Declaration(props) {
  return (
    <div>
      <div className="px-6 py-6 mx-20 my-20 bg-[#f3f4f6] rounded-2xl">
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-full">
              <div className="px-4 sm:px-0">
                <h3 className="ml-5 mb-4 text-left text-2xl font-medium leading-6 text-gray-900">
                  Declaration
                </h3>
                <p className="ml-5 text-left mt-1 text-gray-600 text-base leading-relaxed">
                  I hereby declare that I have carefully read the instructions
                  and particulars supplied to me and that the entries made in
                  this application form are correct to the best of my knowledge
                  and belief. If selected for admission, I promise to abide by
                  the rules and discipline of the Institute. I note that the
                  decision of the Institute is final in regard to selection for
                  admission and assignment to a particular Department and field
                  of study. The Institute shall have the right to expel me from
                  the Institute at any time after my admission, provided it is
                  satisfied that I was admitted on false particulars furnished
                  by me or my antecedents prove that my continuance in the
                  Institute is not desirable. I agree that I shall abide by the
                  decision of the Institute, which shall be final.
                </p>
              </div>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-full">
              <form onSubmit={() => props.increasePageNumber()} method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="full_name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Write your full name if you agree to the above
                          declaration
                          <span style={{ color: "#ff0000" }}> *</span>
                        </label>
                        <input
                          type="text"
                          name="full_name"
                          id="full_name"
                          required
                          pattern={props.full_name}
                          title="Please match your full name that you have entered in your profile."
                          value={props.details[16]}
                          onChange={(e) => props.onChange(e, 16)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                          htmlFor="signature"
                        >
                          Upload your Signature
                          <span style={{ color: "#ff0000" }}> *</span>
                        </label>

                        {!props.details[17].name ? (
                          <>
                            <input
                              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                              aria-describedby="profile-picture-desc"
                              id="signature"
                              name="signature"
                              type="file"
                              required
                              accept=".png, .jpeg, .jpg, .gif"
                              onChange={(e) =>
                                props.handleFileSubmit(e, 1, 17, 3)
                              }
                            />

                            <div
                              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                              id="marksheet_help"
                            >
                              <span className="font-semibold">
                                Maximum file size:
                              </span>{" "}
                              1 MB{" "}
                              <span className="font-semibold">
                                Allowed file formats:
                              </span>{" "}
                              .jpeg, .png, .jpg, .gif
                            </div>

                            <div
                              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                              id="profile-picture-desc"
                            >
                              <span className="font-semibold">
                                Recommended File Name Format:
                              </span>
                              <span>
                                {" "}
                                Signature_&lt;your_email_id&gt; <br />
                                For Example: Signature_abc@gmail.com
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex border-2 mt-1 w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                              <input
                                className="border-none block w-full shadow-sm sm:text-sm"
                                id="signature"
                                name="signature"
                                type="text"
                                value={props.details[17].name}
                                // ref={props.ref}
                                required
                                readOnly
                              />

                              <button
                                type="button"
                                className="flex items-center ml-2 mr-2 justify-center"
                                onClick={() => props.emptyFileIndex(17)}
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
                          htmlFor="place"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Place<span style={{ color: "#ff0000" }}> *</span>
                        </label>
                        <input
                          type="text"
                          name="place"
                          id="place"
                          value={props.details[18]}
                          onChange={(e) => props.onChange(e, 18)}
                          required
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="date-of-birth"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Date
                          <span style={{ color: "#ff0000" }}> *</span>
                        </label>
                        <input
                          id="date"
                          name="date"
                          type="date"
                          disabled={true}
                          value={props.details[19]}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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

export default Declaration;
