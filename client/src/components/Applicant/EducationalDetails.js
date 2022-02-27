import React, { useState } from "react";
import CollegeDegreeSection from "./CollegeDegreeSection.js";

function EducationalDetails(props) {
  const [count, setCount] = useState(1);

  return (
    <div id="educationalDetailsModal" aria-hidden="true" className="hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0">
        <div className="relative object-center overflow-y-auto overflow-x-hidden overscroll-none px-4 w-full max-w-7xl h-5/6">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex justify-between items-start rounded-t border-b dark:border-gray-600">
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm m-3 p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="educationalDetailsModal">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>  
              </button>
            </div>
            {/* Modal body */}
            
    <div>
      <div className="px-6 py-6 mx-10 bg-[#f3f4f6] ">
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="ml-5 mb-2 text-left text-2xl font-medium leading-6 text-gray-900">
                Educational Details
              </h3>
              <p className="ml-5 text-left mt-1 text-gray-600 text-base">
                Please share your educational details
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-full sm:col-span-full">
                      <div className="outline rounded outline-[#f3f4f6] px-8 py-8 grid grid-cols-6 gap-6">
                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Degree<span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <select
                            id="category"
                            name="category"
                            autoComplete="category"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option>10th</option>
                          </select>
                        </div>

                        <div className="col-span-8 sm:col-span-4">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Board<span style={{ color: "#ff0000" }}> *</span>
                          </label>

                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Percentage/CGPA
                            <span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <select
                            id="category"
                            name="category"
                            autoComplete="category"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option>- Select -</option>
                            <option>Percentage</option>
                            <option>CGPA</option>
                          </select>
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Percentage/CGPA
                            <span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Year of Passing
                            <span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-full sm:col-span-full">
                          <label
                            htmlFor="about"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Remarks (if any)
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="AddressForCommunication"
                              name="AddressForCommunication"
                              rows={2}
                              className="resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                              defaultValue={""}
                            />
                          </div>
                        </div>

                        <div className="col-span-full sm:col-span-full">
                          <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            htmlFor="user_avatar"
                          >
                            10th Certificate/Marksheet
                            <span style={{ color: "#ff0000" }}> *</span>
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
                            Allowed file types: pdf.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-full sm:col-span-full">
                      <div className="outline rounded outline-[#f3f4f6] px-8 py-8 grid grid-cols-6 gap-6">
                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Degree<span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <select
                            id="category"
                            name="category"
                            autoComplete="category"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option>12th</option>
                          </select>
                        </div>

                        <div className="col-span-8 sm:col-span-4">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Board/University/Institute
                            <span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Percentage/CGPA
                            <span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <select
                            id="category"
                            name="category"
                            autoComplete="category"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option>- Select -</option>
                            <option>Percentage</option>
                            <option>CGPA</option>
                          </select>
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Percentage/CGPA
                            <span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Year of Passing
                            <span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-full sm:col-span-full">
                          <label
                            htmlFor="about"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Remarks (if any)
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="AddressForCommunication"
                              name="AddressForCommunication"
                              rows={2}
                              className="resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                              defaultValue={""}
                            />
                          </div>
                        </div>

                        <div className="col-span-full sm:col-span-full">
                          <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            htmlFor="user_avatar"
                          >
                            12th Certificate/Marksheet
                            <span style={{ color: "#ff0000" }}> *</span>
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
                            Allowed file types: pdf.
                          </div>
                        </div>
                      </div>
                    </div>

                    {[...Array(count)].map((_, i) => (
                      <CollegeDegreeSection key={i} />
                    ))}

                    <div className="flex mb-4 col-span-4">
                    {count === 4 ? (
                        <div></div>
                      ) : (<button
                        type="button"
                        onClick={() => setCount(count + 1)}
                        className="border border-teal-500 text-teal-500 block rounded-sm font-bold py-2 px-4 mr-2 items-center hover:bg-teal-500 hover:text-white"
                      >
                        Add Section
                      </button>)}
                      {count === 1 ? (
                        <div></div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setCount(count - 1)}
                          className="border border-teal-500 text-teal-500 block rounded-sm font-bold py-2 px-4 mr-2 items-center hover:bg-teal-500 hover:text-white"
                        >
                          Remove Section
                        </button>
                      )}
                    </div>
                  </div>

                  
                  <div className="col-span-full sm:col-span-full">
                      <div className="outline rounded outline-[#f3f4f6] px-8 py-8 grid grid-cols-6 gap-6">
                      <div className="col-span-full sm:col-span-full">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Any other educational highlights/information
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="AddressForCommunication"
                          name="AddressForCommunication"
                          rows={3}
                          className="resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          defaultValue={""}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                      
                      </p>
                    </div>
                  
                        
                        <div className="col-span-full sm:col-span-full">
                          <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Whether you have completed your last degree: <span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <select
                            id="category"
                            name="category"
                            autoComplete="category"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option>- Select -</option>
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                        </div>



                      </div>
                    </div>

                  {/* <div className="my-4 grid grid-cols-6 gap-6">
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
                  </div> */}
                </div>
                
               
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
    {/* Modal footer */}
    <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              <button data-modal-toggle="educationalDetailsModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
              <button data-modal-toggle="educationalDetailsModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Cancel</button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default EducationalDetails;
