import React, { useState } from "react";
import DatePicker from "./DatePicker";
import { CountryDropdown } from "react-country-region-selector";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom"
import crossPic from "../../images/red_cross.png"

// import { useEffect } from 'react'
// import axios from "axios";

function PersonalInfo(props) {
  const navigate = useNavigate();

  const [profile_image, setProfileImage] = useState(null);
  const [categoryCertificate, setCategoryCertificate] = useState(null);
  
  const onSubmit = () => {
    const formData = new FormData();
    
    formData.append("full_name", props.localProfileInfo.full_name);
    formData.append("fathers_name", props.localProfileInfo.fathers_name);    
    formData.append("date_of_birth", props.localProfileInfo.date_of_birth);
    formData.append("aadhar_card_number", props.localProfileInfo.aadhar_card_number);
    formData.append("category", props.localProfileInfo.category);
    formData.append("is_pwd", props.localProfileInfo.is_pwd);
    formData.append("marital_status", props.localProfileInfo.marital_status);
    formData.append("nationality", props.localProfileInfo.nationality);
    formData.append("gender", props.localProfileInfo.gender);
    formData.append("profile_image", profile_image);
    formData.append("category_certificate", categoryCertificate);

    Axios.post("http://localhost:8080/save-personal-info", formData, {
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

  const handleFileSubmit = (e, maxSize, setVariable) => {
    const file = e.target.files[0];
    if (file.size > maxSize*1000000){
        e.target.value = null;
        const error = "File size cannot exceed more than " + maxSize.toString() + "MB";
        alert(error);
    }
    else {
        setVariable(file);
    }
  }

  // const handleDateChange = (value) => {
  //   updateDateOfBirth(value);
  // };

  // useEffect(() => {
  //   axios.get("http://localhost:8080/get-personal-info", {
  //       headers: {
  //           Authorization: getToken()
  //       }
  //   })
  //   .then(response => {
  //       if(response.data === 1) {
  //         navigate("/logout");
  //       }
  //       else {
  //           setPersonalInfo(response.data)
  //       }
  //     })
  //   .catch(err => console.log(err));
  // });
  // const s_idx = props.localProfileInfo.category_certificate_url.lastIndexOf('/') + 1
  // const e_idx = props.localProfileInfo.category_certificate_url.lastIndexOf('_')
  return (
    <div id="personalDetailsModal" aria-hidden="true" className="hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0">
        <div className="relative overflow-y-auto overflow-x-hidden object-center  overscroll-none px-4 w-full max-w-7xl h-5/6">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

            {/* Modal header and Cross button */}
            <div className="flex justify-between items-start rounded-t border-b dark:border-gray-600">
              <button onClick={props.syncLocalGlobalData} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm m-3 p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="personalDetailsModal">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>  
              </button>
            </div>
          
            {/* Personal Info Content */}
            <div>
              <div className="px-6 py-6 mx-8 bg-[#f3f4f6]">
              <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">

                  {/* Personal Details Heading and Sub Heading  */}
                  <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                      <h3 className="ml-5 mb-2 text-left text-2xl font-medium leading-6 text-gray-900">
                        Personal Details
                      </h3>
                      <p className="ml-5 text-left mt-1 text-gray-600 text-base">
                        Please share your personal information.
                      </p>
                    </div>
                  </div>

                  {/* Main form */}
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    {/* <form action="/save-personal-info" method="POST"> */}
                    <form onSubmit={onSubmit}>
                      <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                          <div className="grid grid-cols-6 gap-6">

                            {/* Applicant's Name */}
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Full Name<span style={{ color: "#ff0000" }}> *</span>
                              </label>
                              <input
                                type="text"
                                name = "full_name"
                                defaultValue={props.localProfileInfo.full_name}
                                id="name"
                                onChange={(event)=>props.onChange(event, 'full_name')}
                                required
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>

                            {/* Applicant's Father's Name */}
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="father-name"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Father's Name
                                <span style={{ color: "#ff0000" }}> *</span>
                              </label>
                              <input
                                type="text"
                                name= "fathers_name"
                                defaultValue={props.localProfileInfo.fathers_name}
                                onChange={(event)=>props.onChange(event, 'fathers_name')}
                                id="father-name"  
                                required
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>

                            {/* Upload Applicant's photograph */}
                            <div className="col-span-full sm:col-span-full">
                              <label
                                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                                htmlFor="profile_picture"
                              >
                                Upload your recent photograph<span style={{ color: "#ff0000" }}> *</span>
                              </label>
                              {(!props.localProfileInfo.profile_image_url)?
                              <>
                              <input
                                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                aria-describedby="profile-picture-desc"
                                id="profile_picture"
                                type="file"
                                required
                                accept=".jpeg, .jpg, .png"
                                onChange={(e) => handleFileSubmit(e, 2, setProfileImage)}
                                />
                              <div
                                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                id="profile-picture-desc"
                              >
                                <span className="font-semibold">Maximum file size:</span> 2 MB,  <span className="font-semibold">Allowed file formats:</span> .jpg, .png, .jpeg 
                                <br/>
                                <div className="mt-1">
                                <span className="font-semibold">File Name Format:</span> 
                                <span> Photograph_&lt;your_email_id&gt; For Example: Photograph_abc@gmail.com</span>
                                </div>
                              </div>                             
                            </>
                            :
                            <>
                              <div className="flex border-2 mt-1 w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                              <input
                                className="border-none block w-full shadow-sm sm:text-sm"
                                id="profile_picture"
                                name="profile_picture"
                                type="text"
                                defaultValue={props.localProfileInfo.profile_image_url.substring(props.localProfileInfo.profile_image_url.lastIndexOf('/') + 1, props.localProfileInfo.profile_image_url.lastIndexOf('_'))}
                                readOnly
                                />
                            
                                <button type="button" className="flex items-center ml-2 mr-2 justify-center" onClick={() => props.emptyFile('profile_image_url')}>
                                  <img className="w-6 h-6" src ={crossPic}></img>
                                </button>
                              </div>
                            </>
                            }
                            </div>


                            {/* Date of Birth */}
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="date-of-birth"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Date of Birth
                                <span style={{ color: "#ff0000" }}> *</span>
                              </label>
                              <DatePicker
                                onChange={(event)=>props.onChange(event, 'date_of_birth')}
                                defaultValue={props.localProfileInfo.date_of_birth}
                                />
                            </div>


                            {/* Aadhar Card Number */}
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="aadhar-number"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Aadhar Card Number
                                <span style={{ color: "#ff0000" }}> *</span>
                              </label>
                              <input
                                type="text"
                                defaultValue={props.localProfileInfo.aadhar_card_number}
                                onChange={(event)=>props.onChange(event, 'aadhar_card_number')}
                                name = "aadhar_card_number"
                                id="aadhar-number"
                                pattern="[1-9]{1}[0-9]{11}"
                                title="12 digit number"
                                required
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>

                              {/* Category */}
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
                                value={props.localProfileInfo.category}
                                onChange={(event)=>props.onChange(event, 'category')}
                                required
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              >
                                <option value="">Select Category</option>
                                <option value="GEN">GEN</option>
                                <option value="GEN-EWS">GEN-EWS</option>
                                <option value="OBC">OBC</option>
                                <option value="SC">SC</option>
                                <option value="ST">ST</option>
                              </select>
                            </div>


                              {/* Category Certificate */}
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                                htmlFor="user_avatar"
                              >
                                Category Certificate (SC/ST/OBC/PwD/EWS)
                              </label>
                              {(!props.localProfileInfo.category_certificate_url)?
                              <>
                              <input
                                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                aria-describedby="category-certificate-desc"
                                id="category-certificate"
                                type="file"
                                accept=".jpeg, .jpg, .png"
                               
                                onChange={(e) => handleFileSubmit(e, 2, setCategoryCertificate)}
                                />
                              <div
                                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                id="category-certificate-desc"
                              >
                                <span className="font-semibold"> Maximum file size: </span>2 MB
                              </div>
                              <div
                                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                id="category-certificate-desc"
                              >
                                <span className="font-semibold">Allowed file formats:</span> .jpg, .jpeg, .png
                              </div>
                              <div
                                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                id="category-certificate-desc"
                              >
                                <span className="font-semibold">File Name Format:</span> 
                                <span> Category_Certificate_&lt;your_email_id&gt; For Example: Category_Certificate_abc@gmail.com</span>
                              </div>
                              </>
                              :
                              <>
                              <div className="flex border-2 mt-1 w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                              <input
                                className="border-none block w-full shadow-sm sm:text-sm"
                                id="category-certificate"
                                name="category-certificate"
                                type="text"
                                defaultValue={props.localProfileInfo.category_certificate_url.substring(props.localProfileInfo.category_certificate_url.lastIndexOf('/') + 1, props.localProfileInfo.category_certificate_url.lastIndexOf('_'))}
                                readOnly
                                />
                            
                                <button type="button" className="flex items-center ml-2 mr-2 justify-center" onClick={() => props.emptyFile('category_certificate_url')}>
                                  <img className="w-6 h-6" src ={crossPic}></img>
                                </button>
                              </div>
                            </>
                              }
                            </div>
                           
                          

                              {/* PWD Category */}
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="pwd-category"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Whether belongs to PWD category
                                <span style={{ color: "#ff0000" }}> *</span>
                              </label>
                              <select
                                id="pwd-category"
                                required
                                value={props.localProfileInfo.is_pwd}
                                onChange={(event)=>props.onChange(event, 'is_pwd')}
                                name="is_pwd"
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              >
                                <option value="">Select Choice</option>
                                <option value="YES">YES</option>
                                <option value="NO">NO</option>
                              </select>
                            </div>

                              {/* Marital Status */}
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="marital-status"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Marital Status
                              </label>
                              <select
                                id="marital-status"
                                value={props.localProfileInfo.marital_status}
                                onChange={(event)=>props.onChange(event, 'marital_status')}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              >
                                <option value="">Select Status</option>
                                <option value="Unmarried">Unmarried</option>
                                <option value="Married">Married</option>
                              </select>
                            </div>

                              {/* Nationality */}
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="nationality"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Nationality
                              </label>
                              <CountryDropdown
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={props.localProfileInfo.nationality}
                                onChange={(val)=>props.onChangeNationality(val)}
                              />
                            </div>

                              {/* Gender */}
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="gender"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Gender<span style={{ color: "#ff0000" }}> *</span>
                              </label>
                              <select
                                value={props.localProfileInfo.gender}
                                onChange={(event)=>props.onChange(event, 'gender')}
                                id="gender"
                                name="gender"
                                required
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        {/* <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                          <button
                            type="button"
                            onClick={()=>props.increasePageNumber()}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Next
                          </button>
                        </div> */}
                      </div>
                      <div className="flex items-center mt-4 space-x-2 rounded-b border-gray-200 dark:border-gray-600">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                        <button onClick={props.syncLocalGlobalData} data-modal-toggle="personalDetailsModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Cancel</button>
                      </div>
                      {/* <button type="submit">Submit</button> */}
                    </form>
                  </div>
                </div>
              </div>
              </div>
            </div>

            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              {/* <button data-modal-toggle="personalDetailsModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
              <button data-modal-toggle="personalDetailsModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Cancel</button> */}
            </div>
          </div>
        </div>
      </div>
  );
}

export default PersonalInfo;