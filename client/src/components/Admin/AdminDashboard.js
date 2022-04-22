import React, { useState, useEffect } from "react";
import ChartBar from "./ChartBar";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import calendar from "../../images/calendar_1.png";
import screenSpinner from "../../images/2300-spinner.gif";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [currentCycleName, setCurrentCycleName] = useState(null);
    const [currentCycleStart, setCurrentCycleStart] = useState(null);
    const [currentCycleEnd, setCurrentCycleEnd] = useState(null);
    const [offeringsCount, setOfferingsCount] = useState(null);
    const [applicationsCount, setApplicationsCount] = useState(null);
    const [currentOffering, setCurrentOffering] = useState(null);
    const [offerings, setOfferings] = useState([]);
    const [categoryDistribution, setCategoryDistribution] = useState(null);
    const [displayData, setDisplayData] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    const labels = [
        'GEN',
        'EWS',
        'OBC',
        'SC',
        'ST'
    ];

    const onChange = (offering_id) => {
        if(offering_id === "") {
          let dataValues = []
          for(let i = 0; i < labels.length; i++){
            dataValues.push(0);
          }
          setDisplayData(dataValues)
        }else{
          let temp = categoryDistribution[offering_id];
          let dataValues = []
          for(let i = 0; i < labels.length; i++){
              let cnt = 0;
              for(let j = 0; j < temp.length; j++){
                  if(temp[j]['category'] === labels[i]){
                      cnt = parseInt(temp[j]['count'])
                      break;
                  }
              }
              dataValues.push(cnt);
          }
          setDisplayData(dataValues)
          console.log(dataValues)
      }  
    }
    
    useEffect(() => {
        Axios.get("/get-dashboard-info", {
          headers: {
            Authorization: getToken(),
          },
        })
          .then((response) => {
            if (response.data === 1) {
              navigate("/logout");
            } else {
                console.log(response.data)
                setOfferingsCount(response.data.offerings_count)
                setApplicationsCount(response.data.applications_count.count)
                setCurrentCycleName(response.data.current_cycle_info.name)
                setCurrentCycleStart(response.data.current_cycle_info.duration_start)
                setCurrentCycleEnd(response.data.current_cycle_info.duration_end)
                setOfferings(response.data.offerings)
                setCategoryDistribution(response.data.category_distribution)
                setIsFetching(false);
            }
          })
          .catch();
      }, []);

  return (
    <div>
    {(isFetching)
      ? 
      <div className="mt-40"><img className="mx-auto h-[200px] w-[200px]" alt="Spinner" src={screenSpinner}/> </div>
    : 
    <div className="bg-gray-100 pt-10 pb-10">
        {/* Filter div */}        
        <div className="px-10 mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
            <div className="flex items-center">
              <div className="mr-5 w-0 flex items-center flex-1 text-base font-bold">
                  {/* 14.6% */}
                  {/* <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg> */}
                  <img className="w-12 h-12" alt="Calendar Icon" src={calendar}/>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-xl sm:text-xl leading-none font-bold text-gray-900">{currentCycleName}</span>
                  <h3 className="text-base font-normal text-gray-500">{currentCycleStart} - {currentCycleEnd}</h3>
                </div>
              
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
            <div className="flex items-center">
              <div className="mr-5 w-0 flex items-center flex-1 text-base font-bold">
                  {/* 14.6% */}
                  {/* <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg> */}
                  <img className="w-12 h-12" alt="Calendar Icon" src={calendar}/>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{offeringsCount}</span>
                  <h3 className="text-base font-normal text-gray-500">Total Offerings</h3>
                </div>
              
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
            <div className="flex items-center">
              <div className="mr-5 w-0 flex items-center flex-1 text-base font-bold">
                  {/* 14.6% */}
                  {/* <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg> */}
                  <img className="w-12 h-12" alt="Calendar Icon" src={calendar}/>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{applicationsCount}</span>
                  <h3 className="text-base font-normal text-gray-500">Total Applications</h3>
                </div>
              
            </div>
          </div>
        
        {/* <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{offeringsCount}</span>
              <h3 className="text-base font-normal text-gray-500">Total Offerings</h3>
            </div>
            <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
              32.9%
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div> */}
        {/* <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{applicationsCount}</span>
              <h3 className="text-base font-normal text-gray-500">Total Applications</h3>
            </div>
            <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
              -2.7%
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div> */}
      </div>
        <div className="px-3 md:px-8  mt-12">
            <div className="container mx-auto w-2/3">
            <ChartBar currentCycleName={currentCycleName} offerings={offerings} currentOffering={currentOffering} setCurrentOffering={setCurrentOffering} labels={labels} displayData={displayData} onChange={onChange}
                        />
                {/* <div className="grid grid-cols-1 xl:grid-cols-5">
                    <div className="xl:col-start-1 xl:col-end-4 px-4">
                        <ChartBar offerings={offerings} currentOffering={currentOffering} setCurrentOffering={setCurrentOffering} labels={labels} displayData={displayData} onChange={onChange}
                        />
                    </div>
                </div> */}
            </div>
        </div>

        {/* <div className="px-3 md:px-8">
            <div className="container mx-auto max-w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
                    <StatusCard
                        color="pink"
                        icon="trending_up"
                        title="Traffic"
                        amount="350,897"
                        percentage="3.48"
                        percentageIcon="arrow_upward"
                        percentageColor="green"
                        date="Since last month"
                    />
                    <StatusCard
                        color="orange"
                        icon="groups"
                        title="New Users"
                        amount="2,356"
                        percentage="3.48"
                        percentageIcon="arrow_downward"
                        percentageColor="red"
                        date="Since last week"
                    />
                    <StatusCard
                        color="purple"
                        icon="paid"
                        title="Sales"
                        amount="924"
                        percentage="1.10"
                        percentageIcon="arrow_downward"
                        percentageColor="orange"
                        date="Since yesterday"
                    />
                    <StatusCard
                        color="blue"
                        icon="poll"
                        title="Performance"
                        amount="49,65%"
                        percentage="12"
                        percentageIcon="arrow_upward"
                        percentageColor="green"
                        date="Since last month"
                    />
                </div>
            </div>
        </div> */}

        {/* <div className="px-3 md:px-8 h-auto">
            <div className="container mx-auto max-w-full">
                <div className="grid grid-cols-1 xl:grid-cols-5">
                    <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                        <PageVisitsCard />
                    </div>
                    <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                        <TrafficCard />
                    </div>
                </div>
            </div>
        </div> */}
    </div>
    }
    </div>
  );
}