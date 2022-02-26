import React from 'react';
import DatePicker from "../DatePicker";

function ApplicationFeeDetails(){
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
                    Submit your application fee through <a className="underline text-blue-700" target="_blank" rel="noopener noreferrer" href="https://www.onlinesbi.com/sbicollect/icollecthome.htm">SB Collect</a>.
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
                            Category<span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <select
                            id="category"
                            name="category"
                            autoComplete="category"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option>- Select -</option>
                            <option>GEN</option>
                            <option>GEN-EWS</option>
                            <option>OBC</option>
                            <option>SC</option>
                            <option>ST</option>
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
                            Trasaction ID
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
                            htmlFor="bank"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Bank
                            <span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <input
                            type="text"
                            name="aadhar-number"
                            id="aadhar-number"
                            autoComplete="aadhar"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                            htmlFor="user_avatar"
                          >
                            Transaction Slip<span style={{ color: "#ff0000" }}> *</span>
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
                            Files must be less than 2 MB.
                          </div>
                          <div
                            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                            id="user_avatar_help"
                          >
                            Allowed file types: jpg jpeg pdf.
                          </div>
                        </div>
    
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="date-of-birth"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Date of Transaction
                            <span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <DatePicker />
                        </div>
    
                        
    
                        
  
    
                        
    
                       
    
                        
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="button"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Next
                      </button>
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