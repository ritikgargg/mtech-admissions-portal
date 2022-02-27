import React from 'react';

function QualifyingExamDetails(props){
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
                  Details of GATE Score: (Please fill the higher GATE Score obtained by you. If the GATE Registration No. is filled wrong,
the candidate will be responsible for this. GATE <span className="font-sebold">2020/ 2021/ 2022</span> qualified candidates are only eligible to apply.)
                  </p>
                </div>
              </div>
              



              <div className="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Qualifying Examination<span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <select
                            id="category"
                            name="category"
                            autoComplete="category"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option>GATE</option>
                          </select>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Branch Code<span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <select
                            id="category"
                            name="category"
                            autoComplete="category"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option>- Select -</option>
                          </select>
                        </div>
                        
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Year<span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <input
                            type="number"
                            name="amount"
                            id="amount"
                            autoComplete="amount"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
    
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Gate Enrollment Number/Registration Number
                            <span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <input
                            type="number"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
    
                       
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700"
                          >
                            COAP Registration Number<span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <input
                            type="number"
                            name="amount"
                            id="amount"
                            autoComplete="amount"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
    
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            All India Rank
                            <span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <input
                            type="number"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div> 
    
                        
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Gate Score<span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <input
                            type="number"
                            name="amount"
                            id="amount"
                            autoComplete="amount"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
    
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Valid Upto
                            <span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <input
                            type="number"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div> 

                        <div className="col-span-full sm:col-span-full">
                          <label
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                            htmlFor="user_avatar"
                          >
                            Self Attested copies of GATE as mentioned in the form<span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <input
                            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="user_avatar_help"
                            id="user_avatar"
                            type="file"
                          />
                          <div
                            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                            id="user_avatar_help"
                          >
                            Files must be less than 5 MB.
                          </div>
                          <div
                            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                            id="user_avatar_help"
                          >
                            Allowed file types: pdf.
                          </div>
                        </div>
    
                        
                        <div className="col-span-full sm:col-span-full">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Remarks
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="AddressForCommunication"
                          name="AddressForCommunication"
                          rows={4}
                          className="resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          defaultValue={""}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                      Any other relevant information (like publications, patents or any other relevant information not already mentioned)
                      </p>
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
