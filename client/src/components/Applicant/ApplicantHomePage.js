import DashboardNavBar from "./DashboardNavBar"
import CompleteProfile from './CompleteProfileAlert';
import {Link} from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom"
import ViewEligibility  from './ViewEligibility';

export default function ApplicantHomePage(props) {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);

    // 1 = not complete and show alert and transition
    // 2 = not complete and don't show alert
    // 3 = profile complete, open applications
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
                    <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-0">
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
                                            <>
                                            <tr key={application.offering_id}>
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
                                                <ViewEligibility eligibility={application.eligibility}/>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                <div tabIndex={0} className="collapse border border-base-300 bg-base-100 rounded-lg collapse-plus">
                                                    <div className="pl-4 collapse-title text-md font-medium">
                                                        Codes
                                                    </div>
                                                    <div className="collapse-content overflow-x-scroll"> 
                                                    <p>{application.gate_paper_codes}</p>
                                                    </div>
                                                </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{new Date(application.deadline).toLocaleDateString('en-GB')}</div>
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
                                                {isProfileComplete === 3 ?
                                                <Link to='/apply' className="text-indigo-600 hover:text-indigo-900">
                                                    Apply
                                                </Link>
                                                : <button className="text-gray-300" disabled onClick={handleCheck}>
                                                    Apply
                                                </button>
                                                }  

                                            </td>
                                            </tr>
                                            
      </>
                                            
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
  