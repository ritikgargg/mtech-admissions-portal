import React, { useState, useEffect } from "react";
import DashboardNavBar from "./DashboardNavBar";
import { Link } from "react-router-dom";
import axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import ViewModal from "./ViewModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import noDataGirlPic from "../../images/no-data-girl.svg";
import screenSpinner from "../../images/2300-spinner.gif";
import ReApplyModal from "./ReApplyModal";
import { Tooltip } from "@mui/material";

function MyApplications(props) {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    axios
      .get("/get-applications", {
        headers: {
          Authorization: getToken(),
        },
      })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else {
          setApplications(response.data);
          setIsFetching(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <DashboardNavBar currentFlag={1} />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <header className="bg-white">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-0">
              <h1 className="text-3xl font-bold text-gray-900">
                Submitted Applications
              </h1>
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
                          Deadline
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Application Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Remarks
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {/* Reapply */}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {/* View */}
                        </th>
                      </tr>
                    </thead>

                    {applications.length !== 0 && (
                      <tbody className="bg-white divide-y divide-gray-200">
                        {applications.map((application) => (
                          <tr key={application.application_id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {application.department}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {application.specialization}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {new Date(
                                  application.deadline
                                ).toLocaleDateString("en-GB")}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {application.is_accepting_applications ===
                                true && (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Open
                                </span>
                              )}
                              {application.is_accepting_applications ===
                                false && (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  Closed
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {application.is_result_published === 1 ? (
                                application.status === 0 ? (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    Not Selected
                                  </span>
                                ) : application.status === 1 ? (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    Under Review
                                  </span>
                                ) : (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Selected
                                  </span>
                                )
                              ) : (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                  Under Review
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <ViewModal
                                header={"Remarks"}
                                data={
                                  application.is_result_published === 1
                                    ? application.status_remark
                                    : "The results are not out yet!"
                                }
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">
                              <Link
                                to={"/view/" + application.application_id}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                <Tooltip title="View Application">
                                  <VisibilityIcon />
                                </Tooltip>
                              </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">
                              <ReApplyModal application={application} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                  {isFetching ? (
                    <img
                      className="mx-auto h-[200px] w-[200px]"
                      alt="Spinner"
                      src={screenSpinner}
                    />
                  ) : (
                    applications.length === 0 && (
                      <div className="bg-white">
                        <div className="w-2/5 mx-auto my-50 text-center">
                          <div className="h-5" />
                          <img alt="No Data" src={noDataGirlPic} />
                          <p className="text-2xl font-semibold">
                            No applications submitted yet!
                          </p>
                          <div className="h-6"></div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyApplications;
