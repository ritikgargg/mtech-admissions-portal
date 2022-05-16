import React from "react";
import ViewModal from "../Applicant/ViewModal";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import DeleteOfferingModal from "./DeleteOfferingModal";
import EditOfferingModal from "./EditOfferingModal";
import AddOfferingModal from "./AddOfferingModal";
import { Tooltip } from "@mui/material";
import { UserGroupIcon } from "@heroicons/react/solid";
import noDataPic from "../../images/Asset 8.svg";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import screenSpinner from "../../images/2300-spinner.gif";
import PublishAllResultsModal from "./PublishAllResultsModal";
import UnpublishAllResultsModal from "./UnpublishAllResultsModal";
import OpenAllOfferings from "./OpenAllOfferings";
import CloseAllOfferings from "./CloseAllOfferings";
import { getAdminType } from "./AdminTypes";

export default function OfferingList() {
  const navigate = useNavigate();
  const params = useParams();
  const [startCount, setStartCount] = useState(1);
  const [isFetching, setIsFetching] = useState(true);
  const [limit, setLimit] = useState(5);
  const [cycleName, setCycleName] = useState("Admission Cycle");
  const [offerings, setOfferings] = useState([]);
  const [allOfferings, setAllOfferings] = useState([]);
  const [department, setDepartment] = useState([]);
  const [searchType, setSearchType] = useState("department");
  const [textToSearch, setTextToSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("0"); // 0 - indicates default
  var admin_type = getAdminType();
  const [brochureUrl, setBrochureUrl] = useState("");
  const [rankListUrl, setRankListUrl] = useState("");

  useEffect(() => {
    axios
      .get("/get-offerings", {
        headers: {
          Authorization: getToken(),
          cycle_id: params.cycle_id,
        },
      })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else {
          setOfferings(response.data.offerings);
          let copy = [...response.data.offerings];
          setAllOfferings(copy);
          setCycleName(response.data.cycle_name);
          setDepartment(response.data.department);
          setBrochureUrl(response.data.brochure_url);
          setRankListUrl(response.data.rank_list_url);
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
    if (startCount + limit <= offerings.length) {
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
          <div className="block items-center">
            <div className="flex justify-between">
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
                    <li className="relative flex items-center">
                      <span className="absolute inset-y-0 w-4 h-10 bg-gray-100 -left-px clip">
                        {" "}
                      </span>
                      <div
                        className="flex items-center h-10 pl-8 pr-4 text-xs font-medium transition-colors bg-white hover:text-gray-900"
                        href="/collections/shirts"
                      >
                        Offerings
                      </div>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex">
                <div className="mr-3 w-24">
                  <select
                    id="sort-order"
                    name="sort-order"
                    value={sortOrder}
                    onChange={(event) => {
                      setSortOrder(event.target.value);
                      if (event.target.value === "0") {
                        let arr_offering_ids = [];
                        for (let i = 0; i < offerings.length; i++) {
                          arr_offering_ids.push(offerings[i].offering_id);
                        }
                        let temp = [];
                        for (let i = 0; i < allOfferings.length; i++) {
                          if (
                            arr_offering_ids.includes(
                              allOfferings[i].offering_id
                            )
                          ) {
                            temp.push(allOfferings[i]);
                          }
                        }
                        setOfferings(temp);
                      } else {
                        setOfferings(
                          offerings.sort(function (obj1, obj2) {
                            if (event.target.value === "1") {
                              if (obj1[searchType] < obj2[searchType]) {
                                return -1;
                              } else if (obj1[searchType] > obj2[searchType]) {
                                return 1;
                              } else {
                                return 0;
                              }
                            } else if (event.target.value === "2") {
                              if (obj1[searchType] < obj2[searchType]) {
                                return 1;
                              } else if (obj1[searchType] > obj2[searchType]) {
                                return -1;
                              } else {
                                return 0;
                              }
                            }
                          })
                        );
                      }
                    }}
                    required
                    className="mt-1 block w-full py-2.5 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="0">Default</option>
                    <option value="1">A to Z</option>
                    <option value="2">Z to A</option>
                  </select>
                </div>
                <div className="sm:pr-3 mb-4 sm:mb-0">
                  <label htmlFor="products-search" className="sr-only">
                    Search
                  </label>
                  <div className="mt-1 relative sm:w-64 xl:w-72">
                    <input
                      type="text"
                      name="textToSearch"
                      id="textToSearch"
                      value={textToSearch}
                      onChange={(event) => {
                        setTextToSearch(event.target.value);
                        setOfferings(
                          allOfferings.filter((offering) =>
                            offering[searchType]
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
                <div className="w-36">
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
                      setSortOrder("0");
                      setOfferings(allOfferings);
                      setSearchType(event.target.value);
                    }}
                    required
                    className="mt-1 block w-full py-2.5 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="department">Department</option>
                    <option value="specialization">Specialization</option>
                  </select>
                </div>
              </div>
              <AddOfferingModal
                cycle_id={params.cycle_id}
                department={department}
              />
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
                <div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 mr-2 relative inline-flex items-center mt-4 px-8 py-3 overflow-hidden text-white bg-cyan-600 rounded-lg group active:bg-cyan-500 focus:outline-none focus:ring"
                    href={brochureUrl}
                  >
                    <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                    <span className="text-sm font-medium transition-all group-hover:mr-4">
                      Brochure
                    </span>
                  </a>

                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center px-8 py-3 overflow-hidden text-cyan-600 border border-current rounded-lg group active:text-cyan-500 focus:outline-none focus:ring"
                    href={rankListUrl}
                  >
                    <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                    <span className="text-sm font-medium transition-all group-hover:mr-4">
                      Score List
                    </span>
                  </a>
                </div>
              </div>
              <div className="flex gap-1">
                {admin_type === "0" ? (
                  <div className="flex">
                    <OpenAllOfferings
                      cycleName={cycleName}
                      cycle_id={params.cycle_id}
                    />
                    <CloseAllOfferings
                      cycleName={cycleName}
                      cycle_id={params.cycle_id}
                    />
                  </div>
                ) : (
                  ""
                )}

                <div className="flex">
                  <PublishAllResultsModal
                    cycleName={cycleName}
                    cycle_id={params.cycle_id}
                  />
                  <UnpublishAllResultsModal
                    cycleName={cycleName}
                    cycle_id={params.cycle_id}
                  />
                </div>
              </div>
            </div>
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
                      Department
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Specialization
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Seats
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Eligibility
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Gate Paper Codes
                    </th>

                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Deadline
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Results
                    </th>
                    <th scope="col" className="p-4"></th>
                  </tr>
                </thead>

                {offerings.length !== 0 && (
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      ...range(
                        startCount - 1,
                        Math.min(startCount + limit - 1, offerings.length) - 1
                      ),
                    ].map((i) => (
                      <tr key={offerings[i].offering_id}>
                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                          {offerings[i].department}
                        </td>
                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                          {offerings[i].specialization}
                        </td>
                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                          {offerings[i].seats}
                        </td>
                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                          {" "}
                          <ViewModal
                            header={"Eligibility"}
                            data={offerings[i].eligibility}
                          />
                        </td>
                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                          <div className="text-sm text-gray-500">
                            <div
                              tabIndex={0}
                              className="collapse border border-base-300 bg-base-100 rounded-lg collapse-plus"
                            >
                              <div className="pl-4 collapse-title text-md font-medium">
                                Codes
                              </div>
                              <div className="collapse-content overflow-x-scroll">
                                <p>{offerings[i].gate_paper_codes}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                          {new Date(offerings[i].deadline).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                          {offerings[i].is_accepting_applications &&
                            !offerings[i].is_draft_mode && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Open
                              </span>
                            )}
                          {offerings[i].is_draft_mode && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Draft
                            </span>
                          )}
                          {!offerings[i].is_accepting_applications &&
                            !offerings[i].is_draft_mode && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Closed
                              </span>
                            )}
                        </td>

                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                          {offerings[i].is_result_published === 1 && (
                            <span className="bg-blue-100 inline-flex text-blue-800 text-xs text-center font-semibold px-2.5 py-1.5 rounded dark:bg-blue-200 dark:text-blue-800">
                              Published to Applicants
                            </span>
                          )}
                          {offerings[i].is_result_published === 0 &&
                            offerings[i].is_result_published_by_faculty ===
                              1 && (
                              <span class="bg-purple-100 inline-flex text-purple-800 text-xs text-center font-semibold px-2 py-1.5 rounded dark:bg-purple-200 dark:text-purple-900">
                                Approved by Department
                              </span>
                            )}
                          {offerings[i].is_result_published === 0 &&
                            offerings[i].is_result_published_by_faculty ===
                              0 && (
                              <span className="bg-gray-100 inline-flex text-gray-800 text-xs text-center font-semibold px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                Not Published
                              </span>
                            )}
                        </td>

                        <td className="p-6 whitespace-nowrap space-x-2 flex">
                          <Link
                            to={
                              "/admin/applications/" +
                              params.cycle_id +
                              "/" +
                              offerings[i].offering_id
                            }
                          >
                            <Tooltip title="View Applications">
                              <button
                                type="button"
                                className="text-white focus:outline-none bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                              >
                                <UserGroupIcon className="w-5 h-5" />
                              </button>
                            </Tooltip>
                          </Link>

                          <EditOfferingModal
                            department={department}
                            application={offerings[i]}
                            cycle_id={params.cycle_id}
                          />

                          <DeleteOfferingModal
                            application={offerings[i]}
                            cycle_id={params.cycle_id}
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
                offerings.length === 0 && (
                  <div className="bg-white">
                    <div className="w-3/5 mx-auto my-50 text-center">
                      <img alt="No data" src={noDataPic} />
                      <div className="h-5" />
                      <p className="text-2xl font-semibold">
                        No positions open currently!
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
              {startCount}-{Math.min(startCount + limit - 1, offerings.length)}
            </span>{" "}
            of
            <span className="text-gray-900 font-semibold">
              {" "}
              {offerings.length}
            </span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={decreaseStartCount}
            className="flex-1 focus:outline-none text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
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
            className="flex-1 focus:outline-none text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
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
