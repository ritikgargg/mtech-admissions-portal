import React, { useState, useEffect } from "react";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import screenSpinner from "../../images/2300-spinner.gif";
import RestoreDeletedCycle from "./RestoreDeletedCycle";
import EmptyTrashSvg from "../../images/image.svg";
import ViewFeesModal from "./ViewFeesModal";

export default function Archive() {
  const navigate = useNavigate();
  const [deletedAdmissionCycles, setDeletedAdmissionCycles] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    Axios.get("/get-deleted-admissions-cycles", {
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else {
          setDeletedAdmissionCycles(response.data);
          setIsFetching(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-gray-100 p-10">
      <div className="shadow-xl bg-white min-h-screen rounded-lg p-4 sm:p-6 xl:p-8">
        <div className="flex justify-between">
          <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
            Deleted Admission Cycles
          </h3>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-10 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                  Name
                </th>
                <th className="px-10 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                  Duration Start
                </th>
                <th className="text-left px-10 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold uppercase border-l-0 border-r-0 whitespace-nowrap">
                  Duration End
                </th>
                <th className="bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap" />
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {deletedAdmissionCycles.map((cycle) => (
                <tr
                  key={cycle.cycle_id}
                  className="text-gray-500 border-b border-gray-100"
                >
                  <td className="border-t-0 px-10 align-middle text-md font-normal whitespace-nowrap py-4 text-left">
                    {cycle.name}
                  </td>
                  <td className="border-t-0 px-10 align-middle  text-sm font-normal text-gray-900 whitespace-nowrap py-4">
                    {cycle.duration_start}
                  </td>
                  <td className="border-t-0 px-10 align-middle  text-sm font-normal text-gray-900 whitespace-nowrap py-4">
                    {cycle.duration_end}
                  </td>
                  <td className="border-t-0 pl-16 pr-4 align-middle  text-sm font-normal text-gray-900 whitespace-nowrap py-4">
                    <div className="flex gap-2 justify-end">
                      <ViewFeesModal cycle={cycle} />
                      <RestoreDeletedCycle
                        cycle_id={cycle.cycle_id}
                        cycle_name={cycle.name}
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
            deletedAdmissionCycles.length === 0 && (
              <div className="bg-white">
                <div className="w-2/5 mx-auto my-24 text-center">
                  <img alt="Empty Trash" src={EmptyTrashSvg} />
                  <div className="h-5" />
                  <p className="text-2xl font-semibold">Nothing in Archive!</p>
                  <div className="h-6" />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
