import React, { useState, useEffect } from "react";
import AddAdminModal from "./AddAdminModal";
import DeleteAdminModal from "./DeleteAdminModal";
import EditAdminModal from "./EditAdminModal";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import screenSpinner from "../../images/2300-spinner.gif";
import adminsPic from "../../images/manage-admins.svg";
import ViewDepartmentModal from "./ViewDepartmentModal";

export default function ManageAdmin() {
  // ek list with email id, role and (if faculty then department)
  const navigate = useNavigate();
  const [adminList, setAdminList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  // 0 -> show nothing, 1 -> success message
  const [reRender, setReRender] = useState(0);
  if (sessionStorage.getItem("alert") !== "1") {
    sessionStorage.setItem("alert", "0");
  }

  function renderAdmin(param) {
    switch (param) {
      case 0:
        return "ADMIN";
      case 1:
        return "FACULTY";
      default:
        return "STAFF";
    }
  }

  function renderAdminStyles(param) {
    switch (param) {
      case 0:
        return "py-3 text-center rounded-lg font-semibold bg-red-50 text-red-900 border border-red-200";
      case 1:
        return "py-3 text-center rounded-lg font-semibold bg-yellow-50 text-yellow-900 border border-yellow-200";
      default:
        return "py-3 text-center rounded-lg font-semibold bg-green-50 text-green-900 border border-green-200";
    }
  }

  useEffect(() => {
    Axios.get("/get-admins", {
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else {
          setAdminList(response.data);
          setIsFetching(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-10 bg-gray-100">
      {sessionStorage.getItem("alert") === "1" ? (
        <div
          id="alert"
          className="flex p-4 mb-4 bg-green-100 rounded-b-lg dark:bg-green-200"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-green-700 dark:text-green-800"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className="ml-3 text-sm font-medium text-green-700 dark:text-green-800">
            Admin added successfully.
          </div>
          <button
            type="button"
            onClick={() => sessionStorage.setItem("alert", 0)}
            className="ml-auto focus:outline-none -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300"
            data-collapse-toggle="alert"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="bg-white shadow-xl rounded-lg p-4 sm:p-6 xl:p-8 min-h-screen">
        <div className="flex justify-between">
          <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
            List of Admins
          </h3>
          <AddAdminModal />
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-10 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                  Name
                </th>
                <th className="px-10 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                  Email Address
                </th>
                <th className="text-center px-10 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap">
                  Admin Role
                </th>
                <th className="bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap" />
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {adminList.map((admin) => (
                <tr
                  key={admin.email_id}
                  className="text-gray-500 border-b border-gray-100"
                >
                  <th className="border-t-0 px-10 align-middle text-md font-normal whitespace-nowrap py-4 text-left">
                    {admin.name}
                  </th>
                  <td className="border-t-0 px-10 align-middle  text-sm font-normal text-gray-900 whitespace-nowrap py-4">
                    {admin.email_id}
                  </td>
                  <td className="border-t-0 align-middle text-sm font-normal text-gray-900 whitespace-nowrap py-4">
                    <div className={renderAdminStyles(admin.admin_type)}>
                      {renderAdmin(admin.admin_type)}
                    </div>
                  </td>
                  <td className="border-t-0 pl-16 pr-4 align-middle  text-sm font-normal text-gray-900 whitespace-nowrap py-4">
                    <div className="flex gap-2 justify-end">
                      <ViewDepartmentModal admin={admin} />
                      <EditAdminModal admin={admin} />
                      <DeleteAdminModal
                        email_id={admin.email_id}
                        setReRender={setReRender}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isFetching ? (
            <img
              className="mx-auto h-[200px] w-[200px]"
              alt="Spinner"
              src={screenSpinner}
            />
          ) : (
            adminList.length === 0 && (
              <div className="bg-white">
                <div className="w-3/5 mx-auto my-50 text-center">
                  <div className="h-5" />
                  <img alt="No admins added yet" src={adminsPic} />
                  <p className="text-2xl font-semibold">No admins added yet!</p>
                  <div className="h-6"></div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
