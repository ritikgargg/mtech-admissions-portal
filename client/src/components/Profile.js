import React from 'react'
import { PaperClipIcon } from '@heroicons/react/solid'
import { PencilIcon } from '@heroicons/react/outline'
import PersonalInfo from './PersonalInfo'
import CommunicationDetails from './CommunicatonDetails'
import EducationalDetails from './EducationalDetails'
import CompleteProfile from './CompleteProfileAlert'


export default function Profile (props) {
    
    var degrees = [
        { degree: '10th', board_uni: 'CBSE', per_cgpa: '85.5', yop: '2015', att: '10th_certificate.pdf' },
        { degree: '12th', board_uni: 'CBSE', per_cgpa: '95.5', yop: '2017', att: '12th_certificate.pdf' },
        { degree: 'B-Tech', board_uni: 'IIT Ropar', per_cgpa: '7.67', yop: '2021', att: 'graduation_certificate.pdf' }
    ]

    var overlayHidden = false;

  return (
      <>
      <CompleteProfile/>
    <div className='flex'>
        <div className='flex-2 my-20 mx-20'>
        {/* ring-2 ring-gray-900 shadow-2xl block h-40 w-40 rounded-full */}
            <img className="ring-2 ring-gray-700 block h-40 w-40 rounded-full" src={props.user.imageUrl}/>
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
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Tom Cook</dd>
                    </div>
                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Father's Name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">John Cook</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">08/04/1987</dd>

                        <dt className="text-sm font-medium text-gray-500">Gender</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Male</dd>
                    </div>  
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Nationality</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Indian</dd>

                        <dt className="text-sm font-medium text-gray-500">Category</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">General</dd>   
                    </div>
                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Aadhaar Card Number</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">7586-7568-5865</dd>

                        <dt className="text-sm font-medium text-gray-500">Marital Status</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Married</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Belongs to PWD</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">No</dd>    
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
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">438-Avenue, Silicon Valley, California</dd>
 
                        <dt className="text-sm font-medium text-gray-500">City</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Silicon Valley</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">State</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">California</dd>

                        <dt className="text-sm font-medium text-gray-500">PIN Code</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">400709</dd>
                    </div>  
                </dl>
                <dl className="my-2 border-t border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Permanent Address</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Jiwaji Nagar, Thatipur, Gwalior</dd>

                        <dt className="text-sm font-medium text-gray-500">City</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Gwalior</dd>   
                    </div>
                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">State</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Madhya Pradesh</dd>

                        <dt className="text-sm font-medium text-gray-500">PIN Code</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">474011</dd>
                    </div>
                </dl>
                <dl className="my-2 border-t border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">tomcook@gmail.com</dd>

                        <dt className="text-sm font-medium text-gray-500">Mobile Number</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">9162783914</dd>    
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