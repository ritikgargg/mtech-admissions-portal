import React, { useState, useRef, useEffect } from "react";
import ChartBar from "./ChartBar";
import Select from 'react-select';
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import calendar from "../../images/calendar_1.png";

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
                setOfferingsCount(response.data.offerings_count.count)
                setApplicationsCount(response.data.applications_count.count)
                setCurrentCycleName(response.data.current_cycle_info.name)
                setCurrentCycleStart(response.data.current_cycle_info.duration_start)
                setCurrentCycleEnd(response.data.current_cycle_info.duration_end)
                setOfferings(response.data.offerings)
                setCategoryDistribution(response.data.category_distribution)
            }
          })
          .catch();
      }, []);

  return (
    <div></div>
    // <div className="bg-gray-100 pt-10">
        
    //     <div className="px-10 mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    //       <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
    //         <div className="flex items-center">
    //           <div className="mr-5 w-0 flex items-center flex-1 text-base font-bold">
    //               <img className="w-12 h-12" alt="Calendar Icon" src={calendar}/>
    //             </div>
    //             <div className="flex-shrink-0">
    //               <span className="text-xl sm:text-xl leading-none font-bold text-gray-900">{currentCycleName}</span>
    //               <h3 className="text-base font-normal text-gray-500">{currentCycleStart} - {currentCycleEnd}</h3>
    //             </div>
              
    //         </div>
    //       </div>
    //       <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
    //         <div className="flex items-center">
    //           <div className="mr-5 w-0 flex items-center flex-1 text-base font-bold">
    //               <img className="w-12 h-12" alt="Calendar Icon" src={calendar}/>
    //             </div>
    //             <div className="flex-shrink-0">
    //               <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{offeringsCount}</span>
    //               <h3 className="text-base font-normal text-gray-500">Total Offerings</h3>
    //             </div>
              
    //         </div>
    //       </div>

    //       <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
    //         <div className="flex items-center">
    //           <div className="mr-5 w-0 flex items-center flex-1 text-base font-bold">
    //               <img className="w-12 h-12" alt="Calendar Icon" src={calendar}/>
    //             </div>
    //             <div className="flex-shrink-0">
    //               <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{applicationsCount}</span>
    //               <h3 className="text-base font-normal text-gray-500">Total Applications</h3>
    //             </div>
              
    //         </div>
    //       </div>
        
    //   </div>
    //     <div className="px-3 md:px-8  my-12">
    //         <div className="container mx-auto w-2/3">
    //         <ChartBar currentCycleName={currentCycleName} offerings={offerings} currentOffering={currentOffering} setCurrentOffering={setCurrentOffering} labels={labels} displayData={displayData} onChange={onChange}
    //                     />
    //         </div>
    //     </div>
    // </div>
  );
}