import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getToken } from "../SignIn_SignUp/Sessions";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Tooltip } from "@mui/material";
import noDataPic from "../../images/no-data.jpg";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import screenSpinner from "../../images/2300-spinner.gif";
import ExportExcelModal from './ExportExcelModal';
import UploadResultModal from './UploadResultModal';
import PublishResultsModal from "./PublishResultsModal";

export default function OfferingList() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [startCount, setStartCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isFetching, setIsFetching] = useState(true);
  const [cycleName, setCycleName] = useState("Admission Cycle");
  const [offeringName, setOfferingName] = useState("Offering");
  const [isResultPublished, setIsResultPublished] = useState(0);
  const params = useParams();

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
          setCycleName(response.data.cycle_name);
          setOfferingName(response.data.offering_name);
          setIsResultPublished(response.data.is_result_published)
          console.log(response.data)
          setIsFetching(false);
          // console.log(response.data);
          // if(response.data.length >= 0)
          //   setStartCount(1)
        }
      })
      .catch((err) => console.log(err));
  }, []);

  
  // const onExport = (template_id) => {
  //   Axios.get("/get-applications-in-excel", { 
  //     responseType: 'arraybuffer',
  //     headers: {
  //       Authorization: getToken(),
  //       template_id: 1,
  //       cycle_id: params.cycle_id,
  //       offering_id: params.offering_id,
  //     },
  //   })
  //     .then((response) => {
  //       if (response.data === 1) {
  //         navigate("/logout");
  //       } else {
  //         var blob = new Blob([response.data], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
  //         let fileName = "Applications_List_" + offeringName + "_" + cycleName;
  //         fileSaver.saveAs(blob, fileName);
  //         window.location.reload();
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

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
            
            <div className="flex justify-between">
              <div className="flex">
              <span className="mr-2 mt-7 text-sm">
                  Show
              </span>
              <div className="mt-4 w-20">
                <label
                  htmlFor="limit"
                  className="block text-sm font-medium text-gray-700"
                >
                </label>
                <select
                  id="limit"
                  name="limit"
                  value={limit}
                  onChange={(event) => {
                    setStartCount(1)
                    setLimit(parseInt(event.target.value))
                  console.log(parseInt(event.target.value))}
                  }
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
              <span className="ml-2 mt-7 text-sm">
                  entries
              </span>
              </div>
              <div className="flex gap-2">
                <PublishResultsModal  cycle_id={params.cycle_id} offering_id={params.offering_id} offeringName={offeringName} isResultPublished={isResultPublished}/>
                <UploadResultModal cycle_id={params.cycle_id} offering_id={params.offering_id}/>
                <ExportExcelModal cycle_id={params.cycle_id} offering_id={params.offering_id} offeringName={offeringName} cycleName={cycleName}/>
              </div>
              {/* <button onClick={() => onExport()} className="focus:outline-none w-1/2 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-300 font-medium inline-flex items-center justify-center rounded-lg text-sm my-4 px-3 py-2 text-center sm:w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd" />
                </svg>
                Export
              </button> */}
            </div>



          </div>
          <div className="block sm:flex items-center md:divide-x md:divide-gray-100">
            {/* <form className="sm:pr-3 mb-4 sm:mb-0" action="#" method="GET">
              <label htmlFor="products-search" className="sr-only">
                Search
              </label>
              <div className="mt-1 relative sm:w-64 xl:w-96">
                <input
                  type="text"
                  name="email"
                  id="products-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Search for products"
                />
              </div>
            </form> */}
            <div className="flex items-center sm:justify-end w-full">
              {/* <div className="hidden md:flex pl-2 space-x-1"> */}
              {/* <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a> */}
              {/* <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a> */}
              {/* <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a> */}
              {/* <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </a> */}
              {/* </div> */}
              {/* <button type="button" data-modal-toggle="add-product-modal" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto">
                    <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                    Add product
                  </button> */}
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
                        Math.min(startCount + limit - 1, applications.length) - 1
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
                        <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                          {/* {new Date(applications[i].deadline) >= new Date() && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Open
                            </span>
                          )}
                          {new Date(applications[i].deadline) < new Date() && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Closed
                            </span>
                          )} */}
                        </td>
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
                            {/* <img className="h-7 w-7 text-indigo-600" alt="eye-icon" src="https://cdn-icons-png.flaticon.com/512/535/535193.png"/> */}
                            <Tooltip title="View Application">
                              <VisibilityIcon />
                            </Tooltip>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
              {(isFetching)?
              <img className="mx-auto h-[200px] w-[200px]" alt="Spinner" src={screenSpinner}/>
              :
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
              {startCount}-{Math.min(startCount + limit - 1, applications.length)}
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
      {/* <div className="hidden overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center h-modal sm:h-full" id="product-modal" aria-hidden="true">
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
              <div className="bg-white rounded-lg shadow relative">
                <div className="flex items-start justify-between p-5 border-b rounded-t">
                  <h3 className="text-xl font-semibold">
                    Edit product
                  </h3>
                  <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="product-modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <form action="#">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="product-name" className="text-sm font-medium text-gray-900 block mb-2">Product Name</label>
                        <input type="text" name="product-name" id="product-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Apple Imac 27”" required />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="category" className="text-sm font-medium text-gray-900 block mb-2">Category</label>
                        <input type="text" name="category" id="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Electronics" required />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="brand" className="text-sm font-medium text-gray-900 block mb-2">Brand</label>
                        <input type="text" name="brand" id="brand" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Apple" required />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">Price</label>
                        <input type="number" name="price" id="price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="$2300" required />
                      </div>
                      <div className="col-span-full">
                        <label htmlFor="product-details" className="text-sm font-medium text-gray-900 block mb-2">Product Details</label>
                        <textarea id="product-details" rows={6} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz" defaultValue={""} />
                      </div>
                    </div>
                  </form></div>
                <div className="p-6 border-t border-gray-200 rounded-b">
                  <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Save all</button>
                </div>
              </div>
            </div>
          </div> */}
      {/* <div className="hidden overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center h-modal sm:h-full" id="add-product-modal" aria-hidden="true">
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
              <div className="bg-white rounded-lg shadow relative">
                <div className="flex items-start justify-between p-5 border-b rounded-t">
                  <h3 className="text-xl font-semibold">
                    Add product
                  </h3>
                  <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="add-product-modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <form action="#">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="product-name" className="text-sm font-medium text-gray-900 block mb-2">Product Name</label>
                        <input type="text" name="product-name" id="product-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Apple Imac 27”" required />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="category" className="text-sm font-medium text-gray-900 block mb-2">Category</label>
                        <input type="text" name="category" id="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Electronics" required />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="brand" className="text-sm font-medium text-gray-900 block mb-2">Brand</label>
                        <input type="text" name="brand" id="brand" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Apple" required />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">Price</label>
                        <input type="number" name="price" id="price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="$2300" required />
                      </div>
                      <div className="col-span-full">
                        <label htmlFor="product-details" className="text-sm font-medium text-gray-900 block mb-2">Product Details</label>
                        <textarea id="product-details" rows={6} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz" defaultValue={""} />
                      </div>
                    </div>
                  </form></div>
                <div className="p-6 border-t border-gray-200 rounded-b">
                  <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Add product</button>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center h-modal sm:h-full" id="delete-product-modal" aria-hidden="true"> */}
      {/* <div className="relative w-full max-w-md px-4 h-full md:h-auto">
              <div className="bg-white rounded-lg shadow relative">
                <div className="flex justify-end p-2">
                  <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="delete-product-modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBofx="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  </button>
                </div>
                <div className="p-6 pt-0 text-center">
                  <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Are you sure you want to delete this product?</h3>
                  <a href="#" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                    Yes, I'm sure
                  </a>
                  <a href="#" className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center" data-modal-toggle="delete-product-modal">
                    No, cancel
                  </a>
                </div>
              </div>
            </div> */}
      {/* </div> */}
    </main>
  );
}
