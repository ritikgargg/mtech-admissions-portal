import { useState } from 'react';
import DashboardNavBar from "./DashboardNavBar"
import CompleteProfile from './CompleteProfileAlert';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { getToken } from "../SignIn_SignUp/Sessions"
import {Link} from 'react-router-dom'; 
import ViewEligibility  from './ViewElgibility';

const applications = [
    {
      id: 1,
      department: 'Computer Science and Engineering',
      specialization: "AI",
      seats: "20",
      eligibility: "B Tech/B.E in Civil, Environmental, Water resources, Agricultural Engineering and related areas with valid score of GATE.",
      gate_paper_codes: "CS, AI",
      deadline: "30-02-2022"
    },
    {
      id: 2,
      department: 'Electrical Engineering',
      specialization: "VSLI",
      seats: "20",
      eligibility: "A bachelor's degree in engineering (BE / BTech), with a minimum of 60 percent marks (6.5 grade points on a scale of 10) and a valid GATE score. Relaxation for SC/ST candidates as per GOI rules, \nOr\n A master's degree in science (MSc / MS), or equivalent, with a minimum of 60 percent marks (6.5 grade points on a scale of 10) and a valid GATE score. Relaxation for SC/ST candidates as per GOI rules, \nOr\n A bachelor’s degree in medicine/surgery (MBBS), pharmaceutical sciences (BPharm), veterinary science (BVSc), or dental surgery (BDS), with a minimum of 60 percent marks (6.5 grade points on a scale of 10) and a valid GATE score. Relaxation for SC/ST candidates as per GOI rules B.Tech. from IITs with CGPA more than 8.0 (SC/ST 7.5) are eligible to apply without GATE .",
      gate_paper_codes: "EE, EC",
      deadline: "30-02-2022"
    }, 
  ]

export default function ApplicantHomePage(props) {
    const navigate = useNavigate();


    function checkProfileComplete () {

        // if not complete then show CompleteProfileAlert
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
                if(response.data.full_name && response.data.communication_address && response.data.degree_10th){
                    navigate('/apply');
                }
                else {
                    console.log("profile not complete");
                }
            }
          })
        .catch(err => console.log(err));
        console.log("Apply Button Clicked");
    }

    return (
        <>
        <DashboardNavBar currentFlag={0} user={props.user}/>
        <CompleteProfile/>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
		    <div className="px-4 py-6 sm:px-0">
                <header className="bg-white">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-0">
                        <h1 className="text-3xl font-bold text-gray-900">Open Positions</h1>
                    </div>
                </header>
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Department
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Specialization
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Seats
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Eligibility
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Gate Paper Codes
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Deadline
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Status
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Apply</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {applications.map((application) => (
                                        <tr key={application.id}>
                                        {/* <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-full" src={application.image} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{application.name}</div>
                                                <div className="text-sm text-gray-500">{application.email}</div>
                                            </div>
                                            </div>
                                        </td> */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{application.department}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{application.specialization}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{application.seats}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                <button data-modal-toggle={application.id} type="button" className="w-5 text-indigo-600">View</button>
                                                <ViewEligibility id={application.id} eligibility={application.eligibility}/>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{application.gate_paper_codes}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{application.deadline}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {/* <button onClick={checkProfileComplete} className="mr-4 text-indigo-600 hover:text-indigo-900">
                                            Check
                                            </button> */}
                                            <Link to='/apply'  className="text-indigo-600 hover:text-indigo-900">
                                                Apply
                                            </Link>

                                        </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
  