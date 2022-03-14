import DashboardNavBar from "./DashboardNavBar"
import CompleteProfile from './CompleteProfileAlert';
import {Link} from 'react-router-dom'; 
import ViewEligibility  from './ViewElgibility';
import { useEffect, useState } from 'react';
import axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom"

// const applications = [
//     {
//       id: 1,
//       department: 'Computer Science and Engineering',
//       specialization: "AI",
//       seats: "20",
//       eligibility: "Candidates with B.Tech /B.E/MCA or M.Sc in the appropriate area with the valid GATE score in Computer Science and information Technology(CS),Electronics and communication Engineering (EC),and /or Mathematics (MA) ",
//       gate_paper_codes: "CS, AI",
//       deadline: "30-02-2022"
//     },
//     {
//       id: 2,
//       department: 'Electrical Engineering',
//       specialization: "VSLI",
//       seats: "20",
//       eligibility: "A bachelor's degree in engineering (BE / BTech), with a minimum of 60 percent marks (6.5 grade points on a scale of 10) and a valid GATE score. Relaxation for SC/ST candidates as per GOI rules, \nOr\n A master's degree in science (MSc / MS), or equivalent, with a minimum of 60 percent marks (6.5 grade points on a scale of 10) and a valid GATE score. Relaxation for SC/ST candidates as per GOI rules, \nOr\n A bachelor’s degree in medicine/surgery (MBBS), pharmaceutical sciences (BPharm), veterinary science (BVSc), or dental surgery (BDS), with a minimum of 60 percent marks (6.5 grade points on a scale of 10) and a valid GATE score. Relaxation for SC/ST candidates as per GOI rules B.Tech. from IITs with CGPA more than 8.0 (SC/ST 7.5) are eligible to apply without GATE .",
//       gate_paper_codes: "EE, EC",
//       deadline: "30-02-2022"
//     }, 
//   ]

export default function ApplicantHomePage(props) {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);

    // 1 = not complete and show alert
    // 2 = not complete and don't show alert
    const [isProfileComplete, setProfileComplete] = useState(1);

    useEffect(() => {
        axios.get("http://localhost:8080/get-open-positions", {
            headers: {
                Authorization: getToken()
            }
        })
        .then(response => {
            if(response.data === 1) {
              navigate("/logout");
            }
            else {
                setApplications(response.data)
                console.log(response.data)
            }
          })
        .catch(err => console.log(err));
    },[]);

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
                if(response.data.full_name && response.data.communication_address && response.data.board_10th){
                    setProfileComplete(3);
                }
                else {
                    setProfileComplete(1);
                }
            }
          })
        .catch(err => console.log(err));
    },[]);

    function handleCheck() {
        if(isProfileComplete === 1 || isProfileComplete === 2) {
            setProfileComplete(1);
        }
        else {
            navigate('/apply');
        }
    }

    return (
        <>
        <DashboardNavBar currentFlag={0} user={props.user}/>
        { isProfileComplete === 1 ? 
        <CompleteProfile setProfileComplete={setProfileComplete}/>
        : <></>}
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
                                {applications.length === 0 && 
                                    <tbody>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">No positions open currently!</div>
                                            </td>
                                        </tr>
                                    </tbody>
                                }
                                {applications.length !== 0 && 
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {applications.map((application) => (
                                            <tr key={application.offering_id}>
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
                                                    <button data-modal-toggle={application.id} type="button" data-tooltip-target="tooltip-animation" className="w-5 text-indigo-600 font-medium">View</button>
                                                    <ViewEligibility id={application.id} eligibility={application.eligibility}/>
                                                </div>
                                                <div id="tooltip-animation" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                                                    View Eligibility
                                                    <div className="tooltip-arrow" data-popper-arrow></div>
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
                                                <button type='button' onClick={handleCheck} className="text-indigo-600 hover:text-indigo-900">
                                                    Apply
                                                </button>

                                            </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                }
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
  