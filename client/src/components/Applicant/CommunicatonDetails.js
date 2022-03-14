import React from "react";
import {useForm} from "react-hook-form";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "../SignIn_SignUp/Sessions";

//TODO:: Confirm Email
function CommunicationDetails(props){
  const navigate = useNavigate();

  const {register, handleSubmit, errors} = useForm();
  const onSubmit = (data) => {
  const formData = new FormData();
    
    formData.append("communication_address", props.localProfileInfo.communication_address);
    formData.append("communication_city", props.localProfileInfo.communication_city)
    formData.append("communication_state", props.localProfileInfo.communication_state)
    formData.append("communication_pincode", props.localProfileInfo.communication_pincode)
    formData.append("permanent_address", props.localProfileInfo.permanent_address);
    formData.append("permanent_city", props.localProfileInfo.permanent_city);
    formData.append("permanent_state", props.localProfileInfo.permanent_state);
    formData.append("permanent_pincode", props.localProfileInfo.permanent_pincode);
    formData.append("mobile_number", props.localProfileInfo.mobile_number)
    formData.append("alternate_mobile_number", props.localProfileInfo.alternate_mobile_number)

    Axios.post("http://localhost:8080/save-communication-details", formData, {
      headers: {
        Authorization: getToken()
      }
    })
      .then(response => {
        if(response.data === 1) {
          navigate("/logout");
        }
        else {
          window.location.reload();
        }
      })
      .catch(err => console.log(err));
  }
  
  return (
    <div id="communicationDetailsModal" aria-hidden="true" className="hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0">
        <div className="relative object-center overflow-y-auto overflow-x-hidden overscroll-none px-4 w-full max-w-7xl h-5/6">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex justify-between items-start rounded-t border-b dark:border-gray-600">
              <button onClick={props.syncLocalGlobalData} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm m-3 p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="communicationDetailsModal">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>  
              </button>
            </div>
            {/* Modal body */}
            
    <div>
      <div  className="px-6 py-6 mx-10 bg-[#f3f4f6]">
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="ml-5 mb-2 text-left text-2xl font-medium leading-6 text-gray-900">
                Communication Details
              </h3>
              <p className="ml-5 text-left mt-1 text-gray-600 text-base">
                Please share your communication details.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="outline rounded outline-[#f3f4f6] px-8 py-8 grid grid-cols-6 gap-6">
                    <div className="col-span-full sm:col-span-full">
                      <label
                        htmlFor="communication_address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address for Communication
                        <span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="communication_address"
                          name="communication_address"
                          defaultValue={props.localProfileInfo.communication_address}
                          onChange={(event)=>props.onChange(event, 'communication_address')}
                          rows={4}
                          className="resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          required
                         
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        (with city, state and Pincode)
                      </p>
                    </div>

                    <div className="col-span-4 sm:col-span-2">
                      <label
                        htmlFor="communication_city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                        <span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <input
                        type="text"
                        id="communication_city"
                        defaultValue={props.localProfileInfo.communication_city}
                        name="communication_city"
                        onChange={(event)=>props.onChange(event, 'communication_city')}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-2">
                      <label
                        htmlFor="communication_state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State
                        <span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <input
                        type="text"
                        defaultValue={props.localProfileInfo.communication_state}
                        name="communication_state"
                        onChange={(event)=>props.onChange(event, 'communication_state')}
                        id="communication_state"
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-2">
                      <label
                        htmlFor="communication_pincode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        PIN Code
                        <span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <input
                        type="text"
                        id="communication_pincode"
                        defaultValue={props.localProfileInfo.communication_pincode}
                        name="communication_pincode"
                        onChange={(event)=>props.onChange(event, 'communication_pincode')}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="mt-8 outline rounded outline-[#f3f4f6] px-8 py-8 grid grid-cols-6 gap-6">
                    <div className="col-span-full sm:col-span-full">
                      <label
                        htmlFor="permanent_address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Permanent Address
                        <span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="permanent_address"
                          rows={4}
                          required
                          defaultValue={props.localProfileInfo.permanent_address}
                          onChange={(event)=>props.onChange(event, 'permanent_address')}
                          name="permanent_address"
                          className="resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        (with city, state and Pincode)
                      </p>
                    </div>

                    <div className="col-span-4 sm:col-span-2">
                      <label
                        htmlFor="permanent_city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                        <span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <input
                        type="text"
                        defaultValue={props.localProfileInfo.permanent_city}
                        onChange={(event)=>props.onChange(event, 'permanent_city')}
                        name="permanent_city"
                        id="permanent_city"
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-2">
                      <label
                        htmlFor="permanent_state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State
                        <span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <input
                        type="text"
                        id="permanent_state"
                        defaultValue={props.localProfileInfo.permanent_state}
                        onChange={(event)=>props.onChange(event, 'permanent_state')}
                        name="permanent_state"
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-2">
                      <label
                        htmlFor="permanent_pincode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        PIN Code
                        <span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <input
                        type="text"
                        required
                        id="permanent_pincode"
                        defaultValue={props.localProfileInfo.permanent_pincode}
                        onChange={(event)=>props.onChange(event, 'permanent_pincode')}
                        name="permanent_pincode"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="mt-8 outline rounded outline-[#f3f4f6] px-8 py-8 grid grid-cols-6 gap-6">
                    {/* <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                        <span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <input
                        type="email"
                        required
                        {...register("email")}
                        id="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="confirm_email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm Email address
                        <span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <input
                        type="email"
                        required
                        id="confirm_email"
                        {...register("confirm_email")}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div> */}

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="mobile_number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Mobile Number
                        <span style={{ color: "#ff0000" }}> *</span>
                      </label>
                      <input
                        type="text"
                        pattern="[1-9]{1}[0-9]{9}"
                        title="Mobile Number must be of 10 digits"
                        required
                        defaultValue={props.localProfileInfo.mobile_number}
                        onChange={(event)=>props.onChange(event, 'mobile_number')}
                        name="mobile_number"
                        id="mobile_number"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="alternate_mobile_number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Alternate Mobile Number{" "}
                      </label>
                      <input
                        type="text"
                        pattern="[1-9]{1}[0-9]{9}"
                        title="Mobile Number must be of 10 digits"
                        defaultValue={props.localProfileInfo.alternate_mobile_number}
                        onChange={(event)=>props.onChange(event, 'alternate_mobile_number')}
                        name="alternate_mobile_number"
                        id="alternate_mobile_number"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                 </div>                  
                </div>
                <div className="flex items-center mt-4 space-x-2 rounded-b border-gray-200 dark:border-gray-600">
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                  <button onClick={props.syncLocalGlobalData} data-modal-toggle="communicationDetailsModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Cancel</button>
                </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
    {/* Modal footer */}
    <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              {/* <button data-modal-toggle="communicationDetailsModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
              <button data-modal-toggle="communicationDetailsModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Cancel</button> */}
            </div>
          </div>
        </div>
      </div>
  );
}

export default CommunicationDetails;
