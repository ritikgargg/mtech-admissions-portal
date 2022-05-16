import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import noDataPic from "../../images/no-data.svg";
import screenSpinner from "../../images/2300-spinner.gif";

function Openings() {
  const [applications, setApplications] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    axios
      .get("/get-open-positions-landing")
      .then((response) => {
        setApplications(response.data);
        setIsFetching(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen">
      {applications.length !== 0 && (
        <>
          <table className="w-full">
            <tbody>
              {applications.map((application) => (
                <tr key={application.offering_id}>
                  <td>
                    <div className="bg-white mx-12 px-10 pb-4">
                      <div
                        tabIndex="0"
                        className="collapse collapse-arrow border hover:bg-gray-100 border-base-300 bg-transparent rounded-lg"
                      >
                        <div className="items-center collapse-title text-lg font-medium">
                          <div className="font-bold">
                            {application.specialization}
                          </div>
                          <div className="text-sm opacity-50">
                            {application.department}
                          </div>
                        </div>
                        <div className="collapse-content">
                          <div className="px-4 pb-1 sm:grid sm:grid-cols-6 sm:px-6">
                            <h1 className="font-bold">Seats</h1>
                            <p className="sm:mt-0 sm:col-span-2">
                              {application.seats}
                            </p>
                          </div>

                          <div className="px-4 py-1 sm:grid gap-2 sm:grid-cols-6 sm:px-6">
                            <h1 className="font-bold">GATE Paper Codes</h1>
                            <p className="sm:mt-0 sm:col-span-2">
                              {application.gate_paper_codes}
                            </p>
                          </div>

                          <div className="px-4 pt-1 sm:grid sm:grid-cols-6 sm:px-6">
                            <h1 className="font-bold">Eligibility</h1>
                            <p
                              className="sm:mt-0 sm:col-span-5"
                              style={{ whiteSpace: "pre-wrap" }}
                            >
                              {application.eligibility}
                            </p>
                          </div>

                          <div className="px-4 pt-1 sm:grid sm:grid-cols-6 sm:px-6">
                            <h1 className="font-bold">Status</h1>
                            <p
                              className="sm:mt-0 sm:col-span-5"
                              style={{ whiteSpace: "pre-wrap" }}
                            >
                              {application.is_accepting_applications
                                ? "Currently accepting applications"
                                : "No longer accepting applications"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {isFetching ? (
        <img
          className="mx-auto h-[200px] w-[200px]"
          alt="Spinner"
          src={screenSpinner}
        />
      ) : (
        applications.length === 0 && (
          <div className="bg-white">
            <div className="w-3/5 mx-auto my-50 text-center">
              <div className="h-5" />
              <img alt="No Data" src={noDataPic} />
              <p className="text-2xl font-semibold mb-5">
                No positions open currently!
              </p>
              <div className="h-5" />
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Openings;
