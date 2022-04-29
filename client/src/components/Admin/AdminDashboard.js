import React, { useState, useEffect } from "react";
import ChartBar from "./ChartBar";
import ChartBarGender from "./ChartBarGender";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import calendar from "../../images/calendar_1.png";
import screenSpinner from "../../images/2300-spinner.gif";
import dashboardImg from "../../images/dashboard.jpg"
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [currentCycleName, setCurrentCycleName] = useState(null);
    const [currentCycleStart, setCurrentCycleStart] = useState(null);
    const [currentCycleEnd, setCurrentCycleEnd] = useState(null);
    const [offeringsCount, setOfferingsCount] = useState(null);
    const [applicationsCount, setApplicationsCount] = useState(null);
    const [currentOffering, setCurrentOffering] = useState(null);
    const [currentOffering2, setCurrentOffering2] = useState(null);
    const [offerings, setOfferings] = useState([]);
    const [categoryDistribution, setCategoryDistribution] = useState(null);
    const [genderDistribution, setGenderDistribution] = useState(null);
    const [displayData, setDisplayData] = useState(null);
    const [displayData2, setDisplayData2] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [isCurrentCyclePresent, setIsCurrentCyclePresent] = useState('');

    const labels = [
        'GEN',
        'EWS',
        'OBC',
        'SC',
        'ST'
    ];

    const labels2 = [
      'Male',
      'Female'
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

    const onChange2 = (offering_id) => {
      if(offering_id === "") {
        let dataValues = []
        for(let i = 0; i < labels2.length; i++){
          dataValues.push(0);
        }
        setDisplayData2(dataValues)
      }else{
        let temp = genderDistribution[offering_id];
        let dataValues = []
        for(let i = 0; i < labels2.length; i++){
            let cnt = 0;
            for(let j = 0; j < temp.length; j++){
                if(temp[j]['gender'] === labels2[i]){
                    cnt = parseInt(temp[j]['count'])
                    break;
                }
            }
            dataValues.push(cnt);
        }
        setDisplayData2(dataValues)
        console.log("Gender");
        console.log(dataValues);
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
            }
            if(response.data === 2){
              setIsFetching(false);
              setOfferingsCount(0);
              setApplicationsCount(0);
              setCurrentCycleName("No Current Cycle Selected");
              setIsCurrentCyclePresent(false);

            }
             else {
                console.log(response.data)
                setOfferingsCount(response.data.offerings_count)
                setApplicationsCount(response.data.applications_count.count)
                setCurrentCycleName(response.data.current_cycle_info.name)
                setCurrentCycleStart(response.data.current_cycle_info.duration_start)
                setCurrentCycleEnd(response.data.current_cycle_info.duration_end)
                setOfferings(response.data.offerings)
                setCategoryDistribution(response.data.category_distribution)
                setGenderDistribution(response.data.gender_distribution)
                setIsFetching(false);
                setIsCurrentCyclePresent(true);
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
    (isCurrentCyclePresent)?
      <div className="bg-gray-100 pt-10 pb-10">
        <div className="mt-4">
        <div className="flex flex-wrap -mx-6 px-12">
          <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/4 xl:mt-0">
            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white justify-center">
              <div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
                {/* <svg className="h-8 w-8 text-white" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z" fill="currentColor" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />
                  <path d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z" stroke="currentColor" strokeWidth={2} />
                </svg> */}
                <SummarizeOutlinedIcon fontSize="large" style={{ color: "white" }}/>
              </div>
              <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">{offeringsCount}</h4>
                <div className="text-gray-500">Total Offerings</div>
              </div>
            </div>
          </div>
          <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/2 sm:mt-0">
            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white justify-center">
              <div className="p-3 rounded-full bg-orange-600 bg-opacity-75">
                {/* <svg className="h-8 w-8 text-white" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.19999 1.4C3.4268 1.4 2.79999 2.02681 2.79999 2.8C2.79999 3.57319 3.4268 4.2 4.19999 4.2H5.9069L6.33468 5.91114C6.33917 5.93092 6.34409 5.95055 6.34941 5.97001L8.24953 13.5705L6.99992 14.8201C5.23602 16.584 6.48528 19.6 8.97981 19.6H21C21.7731 19.6 22.4 18.9732 22.4 18.2C22.4 17.4268 21.7731 16.8 21 16.8H8.97983L10.3798 15.4H19.6C20.1303 15.4 20.615 15.1004 20.8521 14.6261L25.0521 6.22609C25.2691 5.79212 25.246 5.27673 24.991 4.86398C24.7357 4.45123 24.2852 4.2 23.8 4.2H8.79308L8.35818 2.46044C8.20238 1.83722 7.64241 1.4 6.99999 1.4H4.19999Z" fill="currentColor" />
                  <path d="M22.4 23.1C22.4 24.2598 21.4598 25.2 20.3 25.2C19.1403 25.2 18.2 24.2598 18.2 23.1C18.2 21.9402 19.1403 21 20.3 21C21.4598 21 22.4 21.9402 22.4 23.1Z" fill="currentColor" />
                  <path d="M9.1 25.2C10.2598 25.2 11.2 24.2598 11.2 23.1C11.2 21.9402 10.2598 21 9.1 21C7.9402 21 7 21.9402 7 23.1C7 24.2598 7.9402 25.2 9.1 25.2Z" fill="currentColor" />
                </svg> */}
                <CalendarTodayIcon fontSize="large" style={{ color: "white" }}/>
              </div>
              <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">{currentCycleName}</h4>
                <div className="text-gray-500">{currentCycleStart} - {currentCycleEnd}</div>
              </div>
            </div>
          </div>
          <div className="w-full px-6 sm:w-1/2 xl:w-1/4">
            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white justify-center">
              <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                <svg className="h-8 w-8 text-white" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z" fill="currentColor" />
                  <path d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z" fill="currentColor" />
                  <path d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z" fill="currentColor" />
                  <path d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z" fill="currentColor" />
                  <path d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z" fill="currentColor" />
                  <path d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z" fill="currentColor" />
                </svg>
              </div>
              <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">{applicationsCount}</h4>
                <div className="text-gray-500">Total Application</div>
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* Filter div */}        
        <div className="px-10 mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
            <div className="flex items-center">
              <div className="mr-5 w-0 flex items-center flex-1 text-base font-bold">
                  <img className="w-12 h-12" alt="Calendar Icon" src={calendar}/>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-xl sm:text-xl leading-none font-bold text-gray-900">{currentCycleName}</span>
                  <h3 className="text-base font-normal text-gray-500">{currentCycleStart} - {currentCycleEnd}</h3>
                </div>
              
            </div>
          </div> */}
          {/* <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
            <div className="flex items-center">
              <div className="mr-5 w-0 flex items-center flex-1 text-base font-bold">
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
                  <img className="w-12 h-12" alt="Calendar Icon" src={calendar}/>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{applicationsCount}</span>
                  <h3 className="text-base font-normal text-gray-500">Total Applications</h3>
                </div>
              
            </div>
          </div> */}
        
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
      
        <div className="px-3 md:px-8 mt-12">
          <div className="flex gap-4">
            <div className="container mx-auto w-1/2">
            <ChartBar currentCycleName={currentCycleName} offerings={offerings} currentOffering={currentOffering} setCurrentOffering={setCurrentOffering} labels={labels} displayData={displayData} onChange={onChange}
                        />
            </div>
            <div className="container mx-auto w-1/2">
            <ChartBarGender currentCycleName={currentCycleName} offerings={offerings} currentOffering={currentOffering2} setCurrentOffering={setCurrentOffering2} labels={labels2} displayData={displayData2} onChange={onChange2}
                        />
            </div>
          </div>
        </div>


        {/* <div className="px-3 md:px-8 -mt-24">
            <div className="container mx-auto max-w-full">
                <div className="grid grid-cols-1 xl:grid-cols-5">
                    <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                        <ChartBar currentCycleName={currentCycleName} offerings={offerings} currentOffering={currentOffering} setCurrentOffering={setCurrentOffering} labels={labels} displayData={displayData} onChange={onChange}/>
                    </div>
                    <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                        <ChartBarGender currentCycleName={currentCycleName} offerings={offerings} currentOffering={currentOffering} setCurrentOffering={setCurrentOffering} labels={labels} displayData={displayData} onChange={onChange}/>
                    </div>
                </div>
            </div>
        </div> */}

        {/* <div className="px-3 md:px-8  mt-12">
            <div className="container mx-auto w-2/3">
            <ChartBarGender currentCycleName={currentCycleName} offerings={offerings} currentOffering={currentOffering} setCurrentOffering={setCurrentOffering} labels={labels} displayData={displayData} onChange={onChange}
                        />
            </div>
        </div> */}
        
    </div>
    :
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
  }
    </div>
  );
}