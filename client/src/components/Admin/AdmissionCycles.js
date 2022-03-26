import React, { useState, useEffect } from "react";
import Calendar from "../../images/calendar_1.png";
import Plus from "../../images/plus.png";
import DeleteAdmissionCycleModal from "./DeleteAdmissionCycleModal";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";

function AdmissionCycles() {
  // [DONE] new cycle add wale section se dates month mei lena hai
  // [DONE] delete functionality dalni hai (locally)
  // baakki backend topatop
  const navigate = useNavigate();
  const [currentCycles, setCurrentCycles] = useState([]);
  const empty_cycle = {
    name: "",
    duration_start: "",
    duration_end: "",
  };
  const [addAdmissionCycle, setAddAdmissionCycle] = useState(false);
  const [cycleInfo, setCycleInfo] = useState(empty_cycle);
  const [previousCycles, setPreviousCycles] = useState([]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function assign(obj, prop, value) {
    if (typeof prop === "string") prop = prop.split(".");

    if (prop.length > 1) {
      var e = prop.shift();
      assign(
        (obj[e] =
          Object.prototype.toString.call(obj[e]) === "[object Object]"
            ? obj[e]
            : {}),
        prop,
        value
      );
    } else obj[prop[0]] = value;
  }

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", String(cycleInfo["name"]));
    formData.append("start", String(cycleInfo["duration_start"]));
    formData.append("end", String(cycleInfo["duration_end"]));

    Axios.post("/add-admission-cycle", formData, {
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        if (response.data === 1) {
          navigate("/logout");
        } else {
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  function handleChange(event, key) {
    let copy = { ...cycleInfo };
    assign(copy, key, event.target.value);
    setCycleInfo(copy);
  }

  function handleMonthChange(event, key) {
    let copy = { ...cycleInfo };
    const date = event.target.value.split("-");
    assign(copy, key, months[parseInt(date[1] - 1)] + " " + date[0]);
    setCycleInfo(copy);
  }

  function handleDelete(list, setList, index) {
    let copy = [...list];
    let deletedCycle = copy.splice(index, 1);
    setList(copy);

    console.log("deteledCycleName: ", deletedCycle[0]["name"]);
    console.log("deteledCycleStart: ", deletedCycle[0]["start"]);
    console.log("deteledCycleEnd: ", deletedCycle[0]["end"]);

    // Axios.post("/delete-admission-cycle", deletedCycle.cycle_id, {
    //   headers: {
    //     Authorization: getToken(),
    //   },
    // })
    //   .then((response) => {
    //     if (response.data === 1) {
    //       navigate("/logout");
    //     } else {
    //       window.location.reload();
    //     }
    //   })
    //   .catch();
  }

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
          let cc = [];
          let pc = [];
          console.log(response.data);
          response.data.results.reverse().map((cycle) => {
            if (cycle.cycle_id === response.data.current_cycle_id) {
              cc.push(cycle);
            } else {
              pc.push(cycle);
            }
          });
          setCurrentCycles(cc);
          setPreviousCycles(pc);
        }
      })
      .catch();
  }, []);

  return (
    <div className="min-h-[400px]">
      <div className="mt-10 w-4/5 mx-auto sm:w-3/5 md:w-2/5">
        <div className="">Current Admission Cycles</div>
        <div className="mt-1 items-start h-[1px] bg-gray-300" />
        {addAdmissionCycle ? (
          <div className="mt-5 space-y-4 ">
            <div className="max-w-lg mx-auto border border-gray-300 rounded-lg shadow-xl bg-white">
              <form onSubmit={handleSubmit} className="p-8 mb-0 space-y-4 ">
                <div className="flex">
                  <p className="text-lg font-medium">New Admission Cycle</p>
                  <button
                    type="button"
                    onClick={() => {
                      setCycleInfo(empty_cycle);
                      setAddAdmissionCycle(false);
                    }}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
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
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium">
                    Name
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      id="name"
                      onChange={(e) => handleChange(e, "name")}
                      className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                      placeholder="Admission Cycle for 2020-2021"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="text-sm font-medium">
                    Duration
                  </label>
                  <div className="relative mt-1 flex">
                    <input
                      type="month"
                      required
                      id="start-date"
                      onChange={(e) => handleMonthChange(e, "duration_start")}
                      name="start-date"
                      className="w-full p-4 mr-2 text-sm border-gray-200 rounded-lg shadow-sm-2"
                    />
                    <input
                      type="month"
                      required
                      id="end-date"
                      onChange={(e) => handleMonthChange(e, "duration_end")}
                      name="end-date"
                      className="w-full p-4 ml-2 text-sm border-gray-200 rounded-lg shadow-sm"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
                >
                  Add new cycle
                </button>
              </form>
            </div>
          </div>
        ) : (
          <button
            className="bg-white mt-4 h-auto block py-5 px-8 w-full border border-gray-300 hover:shadow-xl rounded-xl ease-in-out duration-200"
            onClick={() => {
              setCycleInfo(empty_cycle);
              setAddAdmissionCycle(true);
            }}
          >
            <div className="grid grid-cols-10 items-center justify-center content-center text-gray-500 sm:pr-8">
              <img
                className="col-span-2 mr-5 h-10 sm:w-12 sm:h-12"
                src={Plus}
                alt="Plus"
              />
              <div className="col-span-7 text-left">
                <h5 className="text-lg font-semibold text-gray-900">Add New</h5>
                <p>Click to add a new admission cycle</p>
              </div>
            </div>
          </button>
        )}

        <div className="mt-4 space-y-4">
          {currentCycles.length !== 0 &&
            currentCycles.map((cycle, ind) => (
              <button className="bg-white h-auto block py-5 pl-8 w-full border border-gray-300 hover:shadow-xl rounded-xl ease-in-out duration-200">
                <div className="grid grid-cols-10 items-center justify-center content-center text-gray-500 sm:pr-8">
                  <img
                    className="col-span-2 mr-5 h-10 sm:w-12 sm:h-12"
                    src={Calendar}
                    alt="Calendar"
                  />
                  <div className="col-span-7 text-left">
                    <h5 className="text-lg font-semibold text-gray-900">
                      {cycle.name}
                    </h5>
                    <p>
                      {cycle.duration_start} - {cycle.duration_end}
                    </p>
                  </div>
                  <DeleteAdmissionCycleModal
                    className="col-span-1"
                    onDelete={handleDelete}
                    list={currentCycles}
                    setList={setCurrentCycles}
                    index={ind}
                  />
                </div>
              </button>
            ))}
        </div>
      </div>

      {previousCycles.length !== 0 && (
        <div className="my-14 w-4/5 mx-auto sm:w-3/5 md:w-2/5">
          <div className="">Previous Admission Cycles</div>
          <div className="mt-1 items-start h-[1px] bg-gray-300" />

          <div className=" mt-5 mx-auto space-y-4">
            {previousCycles.map((previousCycle, ind) => (
              <button className="bg-[#fcfcfc] h-auto block py-5 pl-8 w-full border border-gray-300 hover:shadow-xl rounded-xl ease-in-out duration-200">
                <div className="grid grid-cols-10 items-center justify-center content-center text-gray-500 sm:pr-8">
                  <img
                    className="col-span-2 mr-5 h-10 sm:w-12 sm:h-12"
                    src={Calendar}
                    alt="Calendar"
                  />
                  <div className="col-span-7 text-left">
                    <h5 className=" text-lg font-semibold text-gray-900">
                      {previousCycle.name}
                    </h5>
                    <p>
                      {previousCycle.duration_start} -{" "}
                      {previousCycle.duration_end}
                    </p>
                  </div>
                  <DeleteAdmissionCycleModal
                    className="col-span-1"
                    onDelete={handleDelete}
                    list={previousCycles}
                    setList={setPreviousCycles}
                    index={ind}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdmissionCycles;
