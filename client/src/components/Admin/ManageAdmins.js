import React, { useState, useEffect } from "react";
import AddAdminModal from "./AddAdminModal"
import DeleteAdminModal from "./DeleteAdminModal";
import EditAdminModal from "./EditAdminModal";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import screenSpinner from "../../images/2300-spinner.gif";

export default function ManageAdmin() {
  // ek list with email id, role and (if faculty then department)
  const navigate = useNavigate();
  const [adminList, setAdminList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(()=>{
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
      .catch((err) => console.log(err))
    },[]);
  

  return <>
  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 m-10 min-h-screen">
      <div className="flex justify-between">
        <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
          List of Admins
        </h3>
        <AddAdminModal/>
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
              <th className="px-10 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                Department
              </th>
              <th className="text-center px-10 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap">
                Admin Role
              </th>
              <th className="bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap" />
            </tr>
          </thead>
 
          <tbody className="divide-y divide-gray-100">
              {
              adminList.map((admin)=> (
                <tr className="text-gray-500 border-b border-gray-100">
                  <th className="border-t-0 px-10 align-middle text-md font-normal whitespace-nowrap py-4 text-left">
                    {admin.name}
                  </th>
                  <td className="border-t-0 px-10 align-middle  text-sm font-normal text-gray-900 whitespace-nowrap py-4">
                    {admin.email_id}
                  </td>
                  <td className="border-t-0 px-10 align-middle text-sm font-normal text-gray-900 whitespace-nowrap py-4">
                    {admin.department}
                  </td>
                  <td className="border-t-0 align-middle text-sm font-normal text-gray-900 whitespace-nowrap py-4">
                    <div className={
                      admin.admin_type === 0 ? 
                      "py-3 text-center rounded-lg font-semibold bg-red-50 text-red-900 border border-red-200" :
                      "py-3 text-center rounded-lg font-semibold bg-yellow-50 text-yellow-900 border border-yellow-200"}>
                      {admin.admin_type === 1 ? "DEPARTMENT ADMIN" : "SUPER ADMIN"}
                    </div>
                  </td>
                  <td className="border-t-0 pl-16 pr-4 align-middle  text-sm font-normal text-gray-900 whitespace-nowrap py-4">       
                    <div className="flex gap-2 justify-end">  
                      <EditAdminModal admin={admin}/>
                      <DeleteAdminModal email_id={admin.email_id}/>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {(isFetching)? <img className="mx-auto h-[200px] w-[200px]" alt="Spinner" src={screenSpinner}/> : ""}
      </div>
    </div>
  </>;
}
