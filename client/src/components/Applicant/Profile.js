import React from 'react'
import { PaperClipIcon } from '@heroicons/react/solid'
import { PencilIcon } from '@heroicons/react/outline'
import PersonalInfo from './PersonalInfo'
import CommunicationDetails from './CommunicatonDetails'
import EducationalDetails from './EducationalDetails'
import DashboardNavBar from './DashboardNavBar'
import { useState, useEffect } from 'react'
import axios from "axios"
import { getToken } from "../SignIn_SignUp/Sessions"
import { useNavigate } from "react-router-dom"


export default function Profile (props) {
  const navigate = useNavigate();
    
    var degrees = [
        { degree: '10th', board_uni: 'CBSE', per_cgpa: '85.5', yop: '2015', att: '10th_certificate.pdf' },
        { degree: '12th', board_uni: 'CBSE', per_cgpa: '95.5', yop: '2017', att: '12th_certificate.pdf' },
        { degree: 'B-Tech', board_uni: 'IIT Ropar', per_cgpa: '7.67', yop: '2021', att: 'graduation_certificate.pdf' }
    ]

    const [profileInfo, setProfileInfo] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:8080/get-profile-info", {
            headers: {
                Authorization: getToken()
            }
        })
        .then(response => {
            if(response.data === 1) {
              navigate("/logout");
            }
            else {
                setProfileInfo(response.data)
            }
          })
        .catch(err => console.log(err));
    });

    var overlayHidden = false;

    return (
        <>
        <DashboardNavBar currentFlag={2} user={props.user}/>
        <div className='flex'>
            <div className='flex-2 my-20 mx-20'>
            {/* ring-2 ring-gray-900 shadow-2xl block h-40 w-40 rounded-full */}
                <img className="ring-2 ring-gray-700 block h-40 w-40 rounded-full" src={profileInfo.profile_image_url ? profileInfo.profile_image_url : '#'} alt="Your Profile Picture"/>
            </div>
            <div className="mr-20 my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="flex space-x-3 px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Details</h3>

                    <button data-modal-toggle="personalDetailsModal" data-tooltip-target="tooltip-animation" type="button" className="w-5 text-indigo-600" onClick={()=>{overlayHidden = !overlayHidden}}><PencilIcon/></button>
                    <PersonalInfo/>
                    
            
                    <div id="tooltip-animation" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                        Edit Details
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
                <div className="border-t border-gray-300">
                    <dl>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Full name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.full_name ? profileInfo.full_name : 'Your Full Name'}</dd>
                        </div>
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Father's Name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.fathers_name ? profileInfo.fathers_name : 'Your Father\'s Name'}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.date_of_birth ? profileInfo.date_of_birth : 'Your Date of Birth'}</dd>

                            <dt className="text-sm font-medium text-gray-500">Gender</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.gender ? profileInfo.gender : 'Your Gender'}</dd>
                        </div>  
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Nationality</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.nationality ? profileInfo.nationality : 'Your Nationality'}</dd>

                            <dt className="text-sm font-medium text-gray-500">Category</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.category ? profileInfo.category : 'Your Category'}</dd>   
                        </div>
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Aadhaar Card Number</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.aadhar_card_number ? profileInfo.aadhar_card_number : 'Your Aadhar Card Number'}</dd>

                            <dt className="text-sm font-medium text-gray-500">Marital Status</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.marital_status ? profileInfo.marital_status : 'Your Marital Status'}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Belongs to PWD</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.is_pwd ? profileInfo.is_pwd : 'Your PWD Status'}</dd>    
                        </div>
                    </dl>
                </div>
            </div>
        </div>
        <div className='flex my-10 mx-20'>
            <div className="my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="flex space-x-3 px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Communication Details</h3>

                    <button  data-modal-toggle="communicationDetailsModal" data-tooltip-target="tooltip-animation" type="button" className="w-5 text-indigo-600"><PencilIcon/></button>
                    <CommunicationDetails/>
                </div>
                <div className="border-t border-gray-300">
                    <dl>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Address for communication</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.communication_address ? profileInfo.communication_address : 'Your Communication Address'}</dd>
    
                            <dt className="text-sm font-medium text-gray-500">City</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.communication_city ? profileInfo.communication_city : 'Your City'}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">State</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.communication_state ? profileInfo.communication_state : 'Your State'}</dd>

                            <dt className="text-sm font-medium text-gray-500">PIN Code</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.communication_pincode ? profileInfo.communication_pincode : 'Your Pincode'}</dd>
                        </div>  
                    </dl>
                    <dl className="my-2 border-t border-gray-200">
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Permanent Address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.permanent_address ? profileInfo.permanent_address : 'Your Permanent Address'}</dd>

                            <dt className="text-sm font-medium text-gray-500">City</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.permanent_city ? profileInfo.permanent_city : 'Your City'}</dd>   
                        </div>
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">State</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.permanent_state ? profileInfo.permanent_state : 'Your State'}</dd>

                            <dt className="text-sm font-medium text-gray-500">PIN Code</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.permanent_pincode ? profileInfo.permanent_pincode : 'Your Pincode'}</dd>
                        </div>
                    </dl>
                    <dl className="my-2 border-t border-gray-200">
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.email_id ? profileInfo.email_id : 'Your Email ID'}</dd>

                            <dt className="text-sm font-medium text-gray-500">Mobile Number</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.mobile_number ? profileInfo.mobile_number : 'Your Mobile Number'}</dd>    
                        </div>
                    </dl>
                </div>
            </div>
        </div>

        <div className='flex mx-20 my-10'>
            <div className="my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="flex space-x-3 px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Education Details</h3>

                        <button data-modal-toggle="educationalDetailsModal" data-tooltip-target="tooltip-animation" type="button" className="w-5 text-indigo-600"><PencilIcon/></button>
                        <EducationalDetails/>
                </div>
                <div className="border-t border-gray-300">
                    <dl className="py-3 border-t border-gray-200">
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Degree</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.degree_10th ? profileInfo.degree_10th : 'Your 10th Degree'}</dd>
    
                            <dt className="text-sm font-medium text-gray-500">Board/University</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.board_10th ? profileInfo.board_10th : 'Your 10th Board'}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Percentage/CGPA</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.percentage_cgpa_value_10th ? profileInfo.percentage_cgpa_value_10th : 'Your Percentage/CGPA in 10th'}</dd>

                            <dt className="text-sm font-medium text-gray-500">Year of Passing</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.year_of_passing_10th ? profileInfo.year_of_passing_10th : 'Your Year of Passing of Class 10th'}</dd>
                        </div>  
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <div className="pr-4 flex items-center justify-between text-sm">
                                    <div className="w-0 flex-1 flex items-center">
                                        <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                        <span className="ml-2 flex-1 w-0 truncate">10th_certificate.pdf</span>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <a href={profileInfo.marksheet_10th_url ? profileInfo.marksheet_10th_url : '#'} target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Download
                                        </a>
                                    </div>
                                </div>
                            </dd>
                        </div>
                    </dl>
                </div>
                <div className="border-t border-gray-300">
                    <dl className="py-3 border-t border-gray-200">
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Degree</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.degree_12th ? profileInfo.degree_12th : 'Your 12th Degree'}</dd>
    
                            <dt className="text-sm font-medium text-gray-500">Board/University</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.board_12th ? profileInfo.board_12th : 'Your 12th Board'}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Percentage/CGPA</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.percentage_cgpa_value_12th ? profileInfo.percentage_cgpa_value_12th : 'Your Percentage/CGPA in 12th'}</dd>

                            <dt className="text-sm font-medium text-gray-500">Year of Passing</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileInfo.year_of_passing_12th ? profileInfo.year_of_passing_12th : 'Your Year of Passing of Class 12th'}</dd>
                        </div>  
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <div className="pr-4 flex items-center justify-between text-sm">
                                    <div className="w-0 flex-1 flex items-center">
                                        <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                        <span className="ml-2 flex-1 w-0 truncate">12th_certificate.pdf</span>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <a href={profileInfo.marksheet_12th_url ? profileInfo.marksheet_12th_url : '#'} target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Download
                                        </a>
                                    </div>
                                </div>
                            </dd>
                        </div>
                    </dl>
                </div>
                <div className="border-t border-gray-300">
                    {degrees.map((Degree) => (
                        <dl className="py-3 border-t border-gray-200">
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Degree</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{Degree.degree}</dd>
    
                            <dt className="text-sm font-medium text-gray-500">Board/University</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{Degree.board_uni}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Percentage/CGPA</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{Degree.per_cgpa}</dd>

                            <dt className="text-sm font-medium text-gray-500">Year of Passing</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{Degree.yop}</dd>
                        </div>  
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <div className="pr-4 flex items-center justify-between text-sm">
                                    <div className="w-0 flex-1 flex items-center">
                                        <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                        <span className="ml-2 flex-1 w-0 truncate">{Degree.att}</span>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Download
                                        </a>
                                    </div>
                                </div>
                            </dd>
                        </div>
                    </dl>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}