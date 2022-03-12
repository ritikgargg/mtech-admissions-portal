import React from 'react';

function QualifyingExamDetails(props){

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
                  Details of GATE Score: Please fill the details of the highest valid (past 3 years including this year) GATE Score obtained by you . If the GATE Registration No. is filled wrong,
the candidate will be responsible for this. GATE <span className="font-sebold">{max_year-2}/ {max_year-1}/ {max_year}</span> qualified candidates are only eligible to apply.
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
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Qualifying Examination<span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <select
                            id="qualifying_examination"
                            name="qualifying_examination"
                            value={props.details[6]}
                            onChange={e => props.onChange(e, 6)}
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
                            Branch Code<span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <select
                            id="branch_code"
                            name="branch_code"
                            required
                            value={props.details[7]}
                            onChange={e => props.onChange(e, 7)}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="">-- Select --</option>
                            <option value="CS">CS</option>
                            <option value="EE">EE</option>
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
                            
                            min = {min_year}
                            max = {max_year}
                            value={props.details[8]}
                            onChange={(event) => props.onChange(event,8)}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
    
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="gate_enrollment_number"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Gate Enrollment Number/Registration Number
                            <span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <input
                            type="text"
                            name="gate_enrollment_number"
                            id="gate_enrollment_number"
                            pattern="[A-Za-z0-9]{11}"
                            required
                            title="Only alpha-numeric characters are allowed and length must be 11"
                            value={props.details[9]}
                            onChange={(event) => props.onChange(event,9)}
                            autoComplete="family-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
    
                       
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="coap_registration_number"
                            className="block text-sm font-medium text-gray-700"
                          >
                            COAP Registration Number<span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <input
                            type="text"
                            name="coap_registration_number"
                            id="coap_registration_number"
                            required
                            pattern="[A-Za-z0-9]{12}"
                            title="Only alpha-numeric characters are allowed and length must be 12"
                            autoComplete="amount"
                            value={props.details[10]}
                            onChange={(event) => props.onChange(event,10)}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
    
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="all_india_rank"
                            className="block text-sm font-medium text-gray-700"
                          >
                            All India Rank
                            <span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <input
                            type="number"
                            name="all_india_rank"
                            id="all_india_rank"
                            required
                            min = {1}
                           
                            value={props.details[11]}
                            onChange={(event) => props.onChange(event,11)}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div> 
    
                        
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="gate_score"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Gate Score<span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          <input
                            type="number"
                            name="gate_score"
                            id="gate_score"
                            required
                            min = {0}
                            max = {1000}
                         
                            value={props.details[12]}
                            onChange={(event) => props.onChange(event,12)}
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
                            min = {min_year+2}
                            max = {max_year+2}
                            required
                            value = {props.details[13]}
                            onChange={(event) => props.onChange(event,13)}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div> 

                        <div className="col-span-full sm:col-span-full">
                          <label
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                            htmlFor="gate_result"
                          >
                            Self Attested copies of GATE as mentioned in the form<span style={{ color: "#ff0000" }}> *</span>
                          </label>
                          {/* <input
                            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="user_avatar_help"
                            id="user_avatar"
                            type="file"
                          /> */}
                          <input
                            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="profile-picture-desc"
                            id="gate_result"
                            name="gate_result"
                            type="file"
                            // value={props.details[4].name}
                            // ref={props.ref}
                            required
                            accept=".pdf"
                            onChange={(e) => props.handleFileSubmit(e, 2, 14)}
                            />
                         <div
                                      className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                      id="marksheet_help"
                                    >
                                      {/* Files must be less than 2 MB., Allowed file types: pdf. */}
                                      <span className="font-semibold">Maximum file size:</span> 5 MB <span className="font-semibold">Allowed file formats:</span> .pdf
                                    </div>
                                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="profile-picture-desc">
                                      <span className="font-semibold">File Name Format:</span> 
                                      <span> GateCopy_&lt;your_email_id&gt; For Example: GateCopy__abc@gmail.com</span>
                                    </div>
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
                          onChange={(event) => props.onChange(event,15)}
                          className="resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
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
