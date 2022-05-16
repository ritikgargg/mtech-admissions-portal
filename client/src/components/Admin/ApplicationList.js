import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getToken } from "../SignIn_SignUp/Sessions";
import { Tooltip } from "@mui/material";
import noDataPic from "../../images/no-data.svg";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import screenSpinner from "../../images/2300-spinner.gif";
import ExportExcelModal from "./ExportExcelModal";
import UploadResultModal from "./UploadResultModal";
import PublishResultsModal from "./PublishResultsModal";
import PublishResultsModalFaculty from "./PublishResultsModalFaculty";
import DeleteApplicationModal from "./DeleteApplicationModal";
import { getAdminType } from "./AdminTypes";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MeritListGeneration from "./MeritListGeneration";

export default function OfferingList() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [allApplications, setAllApplications] = useState([]);
  const [startCount, setStartCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isFetching, setIsFetching] = useState(true);
  const [cycleName, setCycleName] = useState("Admission Cycle");
  const [offeringName, setOfferingName] = useState("Offering");
  const [isResultPublished, setIsResultPublished] = useState(0);
  const [isResultPublishedByFaculty, setIsResultPublishedByFaculty] =
    useState(0);
  const [searchType, setSearchType] = useState("full_name");
  const [textToSearch, setTextToSearch] = useState("");
  const [isGeneratingMeritList, setIsGeneratingMeritList] = useState(false);
  const params = useParams();
  const admin_type = getAdminType();

  useEffect(() => {
    axios
      .get("/get-offering-applications", {
        headers: {
          Authorization: getToken(),
          cycle_id: params.cycle_id,
          offering_id: params.offering_id,
        },
      })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else {
          setApplications(response.data.applications);
          setAllApplications(response.data.applications);
          setCycleName(response.data.cycle_name);
          setOfferingName(response.data.offering_name);
          setIsResultPublished(response.data.is_result_published);
          setIsResultPublishedByFaculty(
            response.data.is_result_published_by_faculty
          );
          setIsFetching(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }

  const increaseStartCount = () => {
    if (startCount + limit <= applications.length) {
      setStartCount(startCount + limit);
    }
  };

  const decreaseStartCount = () => {
    setStartCount(Math.max(startCount - limit, 1));
  };
  return (
    <main>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <div>
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    "\n  .clip {\n    clip-path: polygon(0 0, 0% 100%, 100% 50%);\n  }\n",
                }}
              />
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex overflow-hidden text-gray-700 border border-gray-200 rounded-lg">
                  <li className="flex items-center">
                    <Link
                      className="flex items-center h-10 px-4 transition-colors bg-gray-100 hover:text-gray-900"
                      to="/admin/admission-cycles"
                    >
                      <CalendarTodayOutlinedIcon fontSize="small" />
                      <span className="ml-1.5 font-medium text-xs">
                        {" "}
                        {cycleName}{" "}
                      </span>
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <Link
                      className="flex items-center h-10 px-4 transition-colors bg-gray-100 hover:text-gray-900"
                      to={"/admin/offerings/" + params.cycle_id}
                    >
                      <AssignmentOutlinedIcon fontSize="small" />
                      <span className="ml-1.5 font-medium text-xs">
                        {" "}
                        {offeringName}{" "}
                      </span>
                    </Link>
                  </li>
                  <li className="relative flex items-center">
                    <span className="absolute inset-y-0 w-4 h-10 bg-gray-100 -left-px clip">
                      {" "}
                    </span>

                    <div className="flex items-center h-10 pl-8 pr-4 text-xs font-medium transition-colors bg-white hover:text-gray-900">
                      Applications
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex">
                <div className="sm:pr-3 mb-4 sm:mb-0">
                  <label htmlFor="products-search" className="sr-only">
                    Search
                  </label>
                  <div className="mt-1 relative sm:w-64 xl:w-80">
                    <input
                      type="text"
                      name="textToSearch"
                      id="textToSearch"
                      value={textToSearch}
                      onChange={(event) => {
                        setTextToSearch(event.target.value);
                        setApplications(
                          allApplications.filter((application) =>
                            application[searchType]
                              .toLowerCase()
                              .includes(event.target.value.toLowerCase())
                          )
                        );
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      placeholder="Search"
                    />
                  </div>
                </div>
                <div className="w-56">
                  <label
                    htmlFor="searchType"
                    className="block text-sm font-medium text-gray-700"
                  ></label>
                  <select
                    id="searchType"
                    name="searchType"
                    value={searchType}
                    onChange={(event) => {
                      setTextToSearch("");
                      setApplications(allApplications);
                      setSearchType(event.target.value);
                    }}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="full_name">Applicant Name</option>
                    <option value="email_id">Email Address</option>
                    <option value="coap_registeration_number">
                      COAP Registration Number
                    </option>
                    <option value="gate_enrollment_number">
                      GATE Registration Number
                    </option>
                  </select>
                </div>
              </div>
              {admin_type === "0" ? (
                <PublishResultsModal
                  cycle_id={params.cycle_id}
                  offering_id={params.offering_id}
                  offeringName={offeringName}
                  isResultPublished={isResultPublished}
                />
              ) : (
                <PublishResultsModalFaculty
                  cycle_id={params.cycle_id}
                  offering_id={params.offering_id}
                  offeringName={offeringName}
                  isResultPublished={isResultPublished}
                  isResultPublishedByFaculty={isResultPublishedByFaculty}
                />
              )}
            </div>

            <div className="flex justify-between">
              <div className="flex">
                <span className="mr-2 mt-7 text-sm">Show</span>
                <div className="mt-4 w-20">
                  <label
                    htmlFor="limit"
                    className="block text-sm font-medium text-gray-700"
                  ></label>
                  <select
                    id="limit"
                    name="limit"
                    value={limit}
                    onChange={(event) => {
                      setStartCount(1);
                      setLimit(parseInt(event.target.value));
                    }}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="2">2</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                  </select>
                </div>
                <span className="ml-2 mt-7 text-sm">entries</span>
              </div>
              <div className="flex gap-2">
                <UploadResultModal
                  cycle_id={params.cycle_id}
                  offering_id={params.offering_id}
                />
                <Tooltip title="Download Results">
                  <button
                    onClick={() => setIsGeneratingMeritList(true)}
                    type="button"
                    className="focus:outline-none w-1/2 text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200 font-medium inline-flex items-center justify-center rounded-lg text-sm my-4 px-3 py-2 text-center sm:w-auto"
                  >
                    <AssessmentIcon fontSize="small" className="mr-1" />
                    Results
                  </button>
                </Tooltip>
                <ExportExcelModal
                  cycle_id={params.cycle_id}
                  offering_id={params.offering_id}
                  offeringName={offeringName}
                  cycleName={cycleName}
                />
              </div>
            </div>
            {isGeneratingMeritList ? (
              <div className="mx-auto m-5 w-1/2">
                <MeritListGeneration
                  cycle_id={params.cycle_id}
                  offering_id={params.offering_id}
                  offeringName={offeringName}
                  cycleName={cycleName}
                  setIsGeneratingMeritList={setIsGeneratingMeritList}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="block sm:flex items-center md:divide-x md:divide-gray-100">
            <div className="flex items-center sm:justify-end w-full"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden">
              <table className="table-fixed min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Applicant Name
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Email Address
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      COAP Registration Number
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      GATE Registration Number
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      GATE Score
                    </th>

                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      AIR
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Status
                    </th>
                    <th scope="col" className="p-4"></th>
                  </tr>
                </thead>
                {applications.length !== 0 && (
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      ...range(
                        startCount - 1,
                        Math.min(startCount + limit - 1, applications.length) -
                          1
                      ),
                    ].map((i) => (
                      <tr key={applications[i].application_id}>
                        <td className="p-4 w-1/6 text-left text-sm text-gray-500 tracking-wider font-semibold">
                          <div className="break-all">
                            {applications[i].full_name}
                          </div>
                        </td>
                        <td className="p-4 w-1/5 text-left text-sm text-gray-500 tracking-wider">
                          <div className="w-full break-all">
                            {applications[i].email_id}
                          </div>
                        </td>
                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                          {applications[i].coap_registeration_number}
                        </td>
                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                          {applications[i].gate_enrollment_number}
                        </td>
                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                          {applications[i].gate_score}
                        </td>
                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                          {applications[i].all_india_rank}
                        </td>
                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider"></td>
                        <td className="p-6 whitespace-nowrap space-x-2 flex">
                          <Link
                            to={
                              "/admin/view/" +
                              params.cycle_id +
                              "/" +
                              params.offering_id +
                              "/" +
                              applications[i].application_id
                            }
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Tooltip title="View Application">
                              <button
                                type="button"
                                className="focus:outline-none text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </button>
                            </Tooltip>
                          </Link>
                          <DeleteApplicationModal
                            cycle_id={params.cycle_id}
                            application_id={applications[i].application_id}
                            email_id={applications[i].email_id}
                          />
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
                  <div className="pb-6 bg-white">
                    <div className="w-3/5 mx-auto my-50 text-center">
                      <img alt="No data" src={noDataPic} />
                      <div className="h-5" />
                      <p className="text-2xl font-semibold">
                        No applications for this offering yet!
                      </p>
                      <div className="h-6" />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
        <div className="flex items-center mb-4 sm:mb-0">
          <button
            onClick={decreaseStartCount}
            className="text-gray-500 focus:outline-none hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={increaseStartCount}
            className="text-gray-500 focus:outline-none hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center mr-2"
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <span className="text-sm font-normal text-gray-500">
            Showing{" "}
            <span className="text-gray-900 font-semibold">
              {startCount}-
              {Math.min(startCount + limit - 1, applications.length)}
            </span>{" "}
            of
            <span className="text-gray-900 font-semibold">
              {" "}
              {applications.length}
            </span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={decreaseStartCount}
            className="flex-1 text-white focus:outline-none bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
          >
            <svg
              className="-ml-1 mr-1 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Previous
          </button>
          <button
            onClick={increaseStartCount}
            className="flex-1 text-white focus:outline-none bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
          >
            Next
            <svg
              className="-mr-1 ml-1 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
