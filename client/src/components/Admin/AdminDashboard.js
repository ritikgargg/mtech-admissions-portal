import React, { useState, useEffect } from "react";
import ChartBarCategory from "./ChartBarCategory";
import ChartBarGender from "./ChartBarGender";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import screenSpinner from "../../images/2300-spinner.gif";
import dashboardImg from "../../images/dashboard.svg";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [currentCycleName, setCurrentCycleName] = useState(null);
  const [currentCycleStart, setCurrentCycleStart] = useState(null);
  const [currentCycleEnd, setCurrentCycleEnd] = useState(null);
  const [offeringsCount, setOfferingsCount] = useState(null);
  const [applicationsCount, setApplicationsCount] = useState(null);
  const [currentOffering, setCurrentOffering] = useState("");
  const [currentOffering2, setCurrentOffering2] = useState("");
  const [offerings, setOfferings] = useState([]);
  const [categoryDistribution, setCategoryDistribution] = useState(null);
  const [genderDistribution, setGenderDistribution] = useState(null);
  const [displayData, setDisplayData] = useState(null);
  const [displayData2, setDisplayData2] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isCurrentCyclePresent, setIsCurrentCyclePresent] = useState("");

  const labels = ["GEN", "EWS", "OBC", "SC", "ST"];

  const labels2 = ["Male", "Female"];

  const onChange = (offering_id) => {
    if (offering_id === "") {
      let dataValues = [];
      for (let i = 0; i < labels.length; i++) {
        dataValues.push(0);
      }
      setDisplayData(dataValues);
    } else {
      let temp = categoryDistribution[offering_id];
      let dataValues = [];
      for (let i = 0; i < labels.length; i++) {
        let cnt = 0;
        for (let j = 0; j < temp.length; j++) {
          if (temp[j]["category"] === labels[i]) {
            cnt = parseInt(temp[j]["count"]);
            break;
          }
        }
        dataValues.push(cnt);
      }
      setDisplayData(dataValues);
    }
  };

  const onChange2 = (offering_id) => {
    if (offering_id === "") {
      let dataValues = [];
      for (let i = 0; i < labels2.length; i++) {
        dataValues.push(0);
      }
      setDisplayData2(dataValues);
    } else {
      let temp = genderDistribution[offering_id];
      let dataValues = [];
      for (let i = 0; i < labels2.length; i++) {
        let cnt = 0;
        for (let j = 0; j < temp.length; j++) {
          if (temp[j]["gender"] === labels2[i]) {
            cnt = parseInt(temp[j]["count"]);
            break;
          }
        }
        dataValues.push(cnt);
      }
      setDisplayData2(dataValues);
    }
  };

  useEffect(() => {
    Axios.get("/get-dashboard-info", {
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        }
        if (response.data === 2) {
          setIsFetching(false);
          setOfferingsCount(0);
          setApplicationsCount(0);
          setCurrentCycleName("No Current Cycle Selected");
          setIsCurrentCyclePresent(false);
        } else {
          setOfferingsCount(response.data.offerings_count);
          setApplicationsCount(response.data.applications_count.count);
          setCurrentCycleName(response.data.current_cycle_info.name);
          setCurrentCycleStart(response.data.current_cycle_info.duration_start);
          setCurrentCycleEnd(response.data.current_cycle_info.duration_end);
          setOfferings(response.data.offerings);
          setCategoryDistribution(response.data.category_distribution);
          setGenderDistribution(response.data.gender_distribution);
          setIsFetching(false);
          setIsCurrentCyclePresent(true);
        }
      })
      .catch();
  }, []);

  return (
    <div>
      {isFetching ? (
        <div className="mt-40">
          <img
            className="mx-auto h-[200px] w-[200px]"
            alt="Spinner"
            src={screenSpinner}
          />{" "}
        </div>
      ) : isCurrentCyclePresent ? (
        <div className="bg-gray-100 pt-10 pb-10">
          <div className="mt-4">
            <div className="flex flex-wrap -mx-6 px-12">
              <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/4 xl:mt-0">
                <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white justify-center">
                  <div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
                    <SummarizeOutlinedIcon
                      fontSize="large"
                      style={{ color: "white" }}
                    />
                  </div>
                  <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                      {offeringsCount}
                    </h4>
                    <div className="text-gray-500">Total Offerings</div>
                  </div>
                </div>
              </div>
              <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/2 sm:mt-0">
                <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white justify-center">
                  <div className="p-3 rounded-full bg-orange-600 bg-opacity-75">
                    <CalendarTodayIcon
                      fontSize="large"
                      style={{ color: "white" }}
                    />
                  </div>
                  <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                      {currentCycleName}
                    </h4>
                    <div className="text-gray-500">
                      {currentCycleStart} - {currentCycleEnd}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full px-6 sm:w-1/2 xl:w-1/4">
                <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white justify-center">
                  <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                    <svg
                      className="h-8 w-8 text-white"
                      viewBox="0 0 28 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                        fill="currentColor"
                      />
                      <path
                        d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                        fill="currentColor"
                      />
                      <path
                        d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                        fill="currentColor"
                      />
                      <path
                        d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                        fill="currentColor"
                      />
                      <path
                        d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                        fill="currentColor"
                      />
                      <path
                        d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                      {applicationsCount}
                    </h4>
                    <div className="text-gray-500">Total Application</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-10 mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"></div>

          <div className="px-3 md:px-8 mt-12">
            <div className="flex gap-4">
              <div className="container mx-auto w-1/2">
                <ChartBarCategory
                  currentCycleName={currentCycleName}
                  offerings={offerings}
                  currentOffering={currentOffering}
                  setCurrentOffering={setCurrentOffering}
                  labels={labels}
                  displayData={displayData}
                  onChange={onChange}
                />
              </div>
              <div className="container mx-auto w-1/2">
                <ChartBarGender
                  currentCycleName={currentCycleName}
                  offerings={offerings}
                  currentOffering={currentOffering2}
                  setCurrentOffering={setCurrentOffering2}
                  labels={labels2}
                  displayData={displayData2}
                  onChange={onChange2}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white">
          <div className="w-3/5 mx-auto my-50 text-center">
            <img alt="No data" src={dashboardImg} />
            <div className="h-5" />
            <p className="text-2xl font-semibold">
              No current cycle currently!
            </p>
            <div className="h-6" />
          </div>
        </div>
      )}
    </div>
  );
}
