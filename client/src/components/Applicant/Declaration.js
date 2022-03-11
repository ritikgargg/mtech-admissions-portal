import React from 'react';
import DatePicker from "./DatePicker";

function Declaration(props){
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
                  I hereby declare that I have carefully read the instructions and particulars supplied to me and that the entries made in
this application form are correct to the best of my knowledge and belief. If selected for admission, I promise to abide by
the rules and discipline of the Institute. I note that the decision of the Institute is final in regard to selection for admission
and assignment to a particular Department and field of study. The Institute shall have the right to expel me from the
Institute at any time after my admission, provided it is satisfied that I was admitted on false particulars furnished by me
or my antecedents prove that my continuance in the Institute is not desirable. I agree that I shall abide by the decision
of the Institute, which shall be final.
                  </p>
                </div>
              </div>
              



              <div className="mt-5 md:mt-0 md:col-span-full">
                <form action="#" method="POST">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Write your full name if you agree to the above declaration<span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <input
                            type="text"
                            name="amount"
                            id="amount"
                            value={props.details[16]}
                            onChange={e => props.onChange(e, 16)}
                            autoComplete="amount"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        
                    
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                            htmlFor="user_avatar"
                          >
                            Upload your Signature<span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <input
                            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="profile-picture-desc"
                            id="transaction_flip"
                            name="transaction_slip"
                            type="file"
                            // value={props.details[4].name}
                            // ref={props.ref}
                            required
                            accept=".pdf, .jpeg, .jpg"
                            onChange={(e) => props.handleFileSubmit(e, 2, 17)}
                            />
                          <div
                            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                            id="user_avatar_help"
                          >
                            Files must be less than 1 MB. Allowed file types: gif jpg jpeg png.
                          </div>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700"
                          >
                           Place<span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <input
                            type="text"
                            name="amount"
                            id="amount"
                            value={props.details[18]}
                            onChange={e => props.onChange(e, 18)}
                            autoComplete="amount"
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
                            type="date"
                            value={props.details[19]}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            onChange={e=>props.onChange(e, 19)}
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
                    type="button"
                    onClick={() => props.increasePageNumber()}
                    className="col-start-6 col-end-7 border border-transparent shadow-sm text-sm font-medium rounded-md text-white justify-center block py-2 px-4 mr-2 items-center bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Next
                    </button>
                  </div>
                    </div>
                  
                    {/* <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="button"
                        className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Submit
                      </button>
                    </div> */}
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
