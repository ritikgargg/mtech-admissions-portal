import React, { useState, useRef, useEffect } from "react";
import ChartBar from "./ChartBar";
import { useTransition, animated } from "react-spring";
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const animatedComponents = makeAnimated();
    const [isAdmissionCycleModalVisible, setIsAdmissionCycleModalVisible] = useState(false);
    const transition = useTransition(isAdmissionCycleModalVisible, {
        from: { x: 0, y: 0, opacity: 0 },
        enter: { x: 0, y: 0, opacity: 1 },
        leave: { x: 0, y: 0, opacity: 0 }
    });
    
    const [admissionCycles, setAdmissionCycles] = useState([]);                     // cycles fetched from server
    const [selectedAdmissionCycles, setSelectedAdmissionCycles] = useState([]);     // cycles locally change on handleChange
    const [finalSelectedAdmissionCycles, setFinalSelectedAdmissionCycles] = useState([]);   // final filtered cycles

    const handleAdmissionCycleChange = (options) => {
        setSelectedAdmissionCycles(options);
    };
    const handleAdmissionCycleSubmit = () => {
        if (selectedAdmissionCycles.length != 0) {
            setFinalSelectedAdmissionCycles(selectedAdmissionCycles);
        }
        else {
            setFinalSelectedAdmissionCycles(admissionCycles);
        }
    };


    useEffect(() => {
        Axios.get("/get-admission-cycles", {
          headers: {
            Authorization: getToken(),
          },
        })
          .then((response) => {
            if (response.data === 1) {
              navigate("/logout");
            } else {
                let c = [];
                response.data.results.map((cycle)=>{
                    c.push({
                        label: cycle.name,
                        value: cycle.cycle_id,
                    });
                });
                setAdmissionCycles(c);
            }
          })
          .catch();
      }, []);

    // TODO : FETCH INFORMATION IF ANY DATA IS CHANGED "OR" RELOAD PAGE ?

    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsAdmissionCycleModalVisible(false);
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

  return (
    <div className="bg-gray-100 pt-10">
        {/* Filter div */}
        <div className="flex justify-around h-40">

            {/* Admission Cycles Filter */}
            <div>
                <button 
                    className="focus:outline-none p-4 text-left items-center bg-white h-18 w-60 rounded-lg shadow-lg border border-gray-100"
                    onClick={() => {
                        setIsAdmissionCycleModalVisible((v) => !v);
                    }}>
                    <div>
                        <h2 className="font-semibold text-lg">Admission Cycles</h2>
                        <p className="text-gray-500">
                            { admissionCycles.length === finalSelectedAdmissionCycles.length ? "All Cycles" : `${finalSelectedAdmissionCycles.length} Cycles Selected`}
                        </p>
                    </div>                
                </button>

                {/* Multi Select : Admission Cycle Filter */}
                {transition((style, item) =>
                    item ?
                    <animated.div ref={wrapperRef} style={style} className={isAdmissionCycleModalVisible ? "bg-white rounded-lg border z-50 border-gray-200" : "hidden"}>
                        <Select
                            // className='mt-1 w-full p-3 pr-12 text-sm border-gray-200 rounded-lg shadow-sm'
                            isClearable={false}
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    ...style,
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    borderRadius: "8px",
                                    width: "235px",
                                    padding: "5px",
                                    outline: state.isFocused ? "none" : "",
                                    border: "0px solid rgb(229 231 235)",
                                    // boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
                              })}}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti={true}
                            options={admissionCycles}
                            menuPortalTarget={document.body}
                            onChange={handleAdmissionCycleChange}
                            // maxMenuHeight={150}
                        />
                        <button className="rounded-b-lg h-8 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-sm font-semibold" onClick={handleAdmissionCycleSubmit}>
                            Submit
                        </button>
                    </animated.div>
                    :
                    ""
                )}
            </div>

            {/* Offerings Filter */}
            {/* <div className="bg-white h-18 w-60 rounded-lg shadow-lg border border-gray-100">
                <div className="m-4">
                    <h2 className="font-semibold text-lg">Offerings</h2>
                    <p className="text-gray-500">3 Offerings Selected</p>
                </div>
            </div> */}

            {/* Category Filter */}
            {/* <div className="bg-white h-18 w-60 rounded-lg shadow-lg border border-gray-100">
                <div className="m-4">
                    <h2 className="font-semibold text-lg">Categories</h2>
                    <p className="text-gray-500">5 Categories Selected</p>
                </div>
            </div> */}

        </div>

        <div className="px-3 md:px-8 mt-12">
            <div className="container mx-auto max-w-full">
                <div className="grid grid-cols-1 xl:grid-cols-5">
                    <div className="xl:col-start-1 xl:col-end-4 px-4">
                        {/* <ChartLine /> */}
                        <ChartBar />
                    </div>
                    {/* <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                        <ChartBar />
                    </div> */}
                </div>
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
  );
}