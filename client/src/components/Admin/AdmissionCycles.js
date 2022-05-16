import React, { useState, useEffect } from "react";
import Calendar from "../../images/calendar_1.svg";
import Plus from "../../images/plus.svg";
import DeleteAdmissionCycleModal from "./DeleteAdmissionCycleModal";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import EditAdmissionCycleModal from "./EditAdmissionCycleModal";
import FormControlLabel from "@mui/material/FormControlLabel";
import Toggle from "./Toggle";
import background from "../../images/background.jpg";
import spinner from "../../images/SpinnerWhite.gif";
import screenSpinner from "../../images/2300-spinner.gif";
import { getAdminType } from "./AdminTypes";

function AdmissionCycles() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentCycles, setCurrentCycles] = useState([]);
  const [brochure, setBrochure] = useState("");
  const [ranklist, setRanklist] = useState("");
  const [fees, setFees] = useState(["0", "0", "0", "0", "0", "0"]);
  const empty_cycle = {
    name: "",
    duration_start: "",
    duration_end: "",
  };
  const [addAdmissionCycle, setAddAdmissionCycle] = useState(false);
  const [cycleInfo, setCycleInfo] = useState(empty_cycle);
  const [previousCycles, setPreviousCycles] = useState([]);
  const [makeCurrent, setMakeCurrent] = React.useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const admin_type = getAdminType();

  const onChangeFees = (event, index) => {
    let copy = [...fees];
    copy[index] = event.target.value;
    setFees(copy);
  };

  const handleChangeCurrent = (event) => {
    setMakeCurrent(event.target.checked);
  };

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

  const handleFileSubmit = (e, setVariable) => {
    const file = e.target.files[0];

    if (file.type !== "application/pdf") {
      e.target.value = null;
      alert("File format not followed! Allowed formats: .pdf");
      return;
    }
    setVariable(file);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", String(cycleInfo["name"]));
    formData.append("start", String(cycleInfo["duration_start"]));
    formData.append("end", String(cycleInfo["duration_end"]));
    formData.append("fees", JSON.stringify(fees));
    formData.append("make_current", makeCurrent);

    formData.append("brochure", brochure);
    formData.append("ranklist", ranklist);

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
    setIsDeleting(true);
    let copy = [...list];
    let deletedCycle = copy.splice(index, 1);

    const formData = new FormData();
    formData.append("cycle_id", deletedCycle[0].cycle_id);

    Axios.post("/delete-admission-cycle", formData, {
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
      .catch();
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

          response.data.results.reverse().map((cycle) => {
            if (cycle.cycle_id === response.data.current_cycle_id) {
              cc.push(cycle);
            } else {
              pc.push(cycle);
            }
          });
          setCurrentCycles(cc);
          setPreviousCycles(pc);
          setIsFetching(false);
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
      ) : (
        <div
          className="min-h-screen overflow-hidden"
          style={{
            backgroundImage: `url(${background})`,
          }}
        >
          {(admin_type === "0" || currentCycles.length !== 0) && (
            <div className="pt-14 pb-14 w-4/5 mx-auto sm:w-3/5 md:w-2/5">
              <div className="font-medium">Current Admission Cycles</div>
              <div className="mt-1 items-start h-[1px] bg-gray-300" />

              {admin_type === "0" && (
                <>
                  {addAdmissionCycle ? (
                    <div className="mt-5 space-y-4 ">
                      <div className="max-w-lg mx-auto border border-gray-300 rounded-lg shadow-xl bg-white">
                        <form
                          onSubmit={handleSubmit}
                          className="p-8 mb-0 space-y-4 "
                        >
                          <div className="flex">
                            <p className="text-lg font-medium">
                              New Admission Cycle
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                setCycleInfo(empty_cycle);
                                setAddAdmissionCycle(false);
                              }}
                              className="text-gray-400 focus:outline-none bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                            <label
                              htmlFor="email"
                              className="text-sm font-medium"
                            >
                              Name
                            </label>
                            <div className="relative mt-1">
                              <input
                                type="text"
                                id="name"
                                onChange={(e) => handleChange(e, "name")}
                                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                placeholder="Admissions for AY 2022-23"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="password"
                              className="text-sm font-medium"
                            >
                              Duration
                            </label>
                            <div className="relative mt-1 flex">
                              <input
                                type="month"
                                required
                                id="start-date"
                                onChange={(e) =>
                                  handleMonthChange(e, "duration_start")
                                }
                                name="start-date"
                                className="w-full p-4 mr-2 text-sm border-gray-200 rounded-lg shadow-sm-2"
                              />
                              <input
                                type="month"
                                required
                                id="end-date"
                                onChange={(e) =>
                                  handleMonthChange(e, "duration_end")
                                }
                                name="end-date"
                                className="w-full p-4 ml-2 text-sm border-gray-200 rounded-lg shadow-sm-2"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="fees-GEN"
                              className="text-sm font-medium"
                            >
                              Category-wise Application Fees
                            </label>
                            <div className="relative gap-3 flex mt-1">
                              <div>
                                <div className="flex">
                                  <label
                                    htmlFor="fees-GEN"
                                    className="text-sm mr-2 my-auto font-medium"
                                  >
                                    GEN
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    id="fees-GEN"
                                    onChange={(e) => onChangeFees(e, 0)}
                                    name="fees-GEN"
                                    pattern="[0-9]*"
                                    title="Only numbers are allowed"
                                    className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm-2"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="flex">
                                  <label
                                    htmlFor="password"
                                    className="text-sm mr-2 my-auto font-medium"
                                  >
                                    OBC
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    id="fees-OBC"
                                    onChange={(e) => onChangeFees(e, 1)}
                                    name="fees-OBC"
                                    pattern="[0-9]*"
                                    title="Only numbers are allowed"
                                    className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm-2"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="flex">
                                  <label
                                    htmlFor="fees-GEN"
                                    className="text-sm mr-2 my-auto font-medium"
                                  >
                                    EWS
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    id="fees-EWS"
                                    onChange={(e) => onChangeFees(e, 2)}
                                    name="fees-EWS"
                                    pattern="[0-9]*"
                                    title="Only numbers are allowed"
                                    className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm-2"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="relative gap-3 flex mt-3">
                              <div>
                                <div className="flex">
                                  <label
                                    htmlFor="fees-GEN"
                                    className="text-sm ml-3 mr-2 my-auto font-medium"
                                  >
                                    SC
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    id="fees-SC"
                                    onChange={(e) => onChangeFees(e, 3)}
                                    name="fees-SC"
                                    pattern="[0-9]*"
                                    title="Only numbers are allowed"
                                    className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm-2"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="flex">
                                  <label
                                    htmlFor="password"
                                    className="text-sm ml-3 mr-2 my-auto font-medium"
                                  >
                                    ST
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    id="fees-ST"
                                    onChange={(e) => onChangeFees(e, 4)}
                                    name="fees-ST"
                                    pattern="[0-9]*"
                                    title="Only numbers are allowed"
                                    className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm-2"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="flex">
                                  <label
                                    htmlFor="fees-GEN"
                                    className="text-sm mr-2 my-auto font-medium"
                                  >
                                    PWD
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    id="fees-PWD"
                                    onChange={(e) => onChangeFees(e, 5)}
                                    name="fees-PWD"
                                    pattern="[0-9]*"
                                    title="Only numbers are allowed"
                                    className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm-2"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="brochure"
                              className="text-sm font-medium"
                            >
                              Brochure for M.Tech. Admissions
                            </label>
                            <div className="relative mt-1">
                              <input
                                type="text"
                                id="brochure"
                                onChange={(e) => setBrochure(e.target.value)}
                                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                placeholder="Public URL of the brochure PDF"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="ranklist"
                              className="text-sm font-medium"
                            >
                              GATE opening and closing score
                            </label>
                            <div className="relative mt-1">
                              <input
                                type="text"
                                id="ranklist"
                                onChange={(e) => setRanklist(e.target.value)}
                                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                placeholder="Public URL of the opening-closing-score PDF"
                                required
                              />
                            </div>
                          </div>

                          <div className="p-3">
                            <FormControlLabel
                              control={
                                <Toggle
                                  checked={makeCurrent}
                                  onChange={handleChangeCurrent}
                                  sx={{ m: 1 }}
                                />
                              }
                              label="Make Current Admission Cycle"
                            />
                          </div>
                          {!isLoading ? (
                            <button
                              type="submit"
                              className="block w-full focus:outline-none px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
                            >
                              Add new cycle
                            </button>
                          ) : (
                            <button
                              type="button"
                              disbaled
                              className="block w-full focus:outline-none px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
                            >
                              <img
                                className="h-5 w-5 mx-auto"
                                alt="spinner"
                                src={spinner}
                              />
                            </button>
                          )}
                        </form>
                      </div>
                    </div>
                  ) : (
                    <button
                      // className="bg-gradient-to-tr from-[#000000] to-[#090909] mt-4 h-auto block py-5 px-8 w-full border border-gray-300 hover:shadow-xl rounded-xl ease-in-out duration-200"
                      className="bg-white mt-4 focus:outline-none h-auto block py-5 px-8 w-full border border-gray-300 hover:shadow-xl rounded-xl ease-in-out duration-200"
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
                          <h5 className="text-lg font-semibold text-gray-900">
                            Add New
                          </h5>
                          <p>Click to add a new admission cycle</p>
                        </div>
                      </div>
                    </button>
                  )}
                </>
              )}

              <div className="mt-4 mx-auto space-y-4">
                {currentCycles.length !== 0 &&
                  currentCycles.map((cycle, ind) => (
                    <div
                      key={cycle.cycle_id}
                      className="bg-white h-auto block py-5 pl-8 w-full border border-gray-300 hover:shadow-xl rounded-xl ease-in-out duration-200"
                    >
                      <div className="grid grid-cols-11 items-center justify-center content-center text-gray-500 sm:pr-8">
                        <Link
                          className="col-span-9 grid grid-cols-9"
                          to={"/admin/offerings/" + cycle.cycle_id}
                        >
                          <img
                            className="col-span-2 mr-5 h-10 sm:w-12 sm:h-12"
                            src={Calendar}
                            alt="Calendar"
                          />
                          <div className="col-span-7 text-left">
                            <h5 className=" text-lg font-semibold text-gray-900">
                              {cycle.name}
                            </h5>
                            <p>
                              {cycle.duration_start} - {cycle.duration_end}
                            </p>
                          </div>
                        </Link>
                        <EditAdmissionCycleModal
                          className="col-span-1"
                          cycle={cycle}
                          is_current={true}
                        />
                        <DeleteAdmissionCycleModal
                          className="col-span-1"
                          onDelete={handleDelete}
                          list={currentCycles}
                          setList={setCurrentCycles}
                          index={ind}
                          isDeleting={isDeleting}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {previousCycles.length !== 0 && (
            <div className="pt-4 pb-14 w-4/5 mx-auto sm:w-3/5 md:w-2/5">
              <div className="font-medium">Previous Admission Cycles</div>
              <div className="mt-1 items-start h-[1px] bg-gray-300" />

              <div className=" mt-5 mx-auto space-y-4">
                {previousCycles.map((previousCycle, ind) => (
                  <div className="bg-[#fcfcfc] h-auto block py-5 pl-8 w-full border border-gray-300 hover:shadow-xl rounded-xl ease-in-out duration-200">
                    <div className="grid grid-cols-11 items-center justify-center content-center text-gray-500 sm:pr-8">
                      <Link
                        className="col-span-9 grid grid-cols-9"
                        to={"/admin/offerings/" + previousCycle.cycle_id}
                      >
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
                      </Link>
                      <EditAdmissionCycleModal
                        className="col-span-1"
                        cycle={previousCycle}
                        is_current={false}
                      />
                      <DeleteAdmissionCycleModal
                        className="col-span-1"
                        onDelete={handleDelete}
                        list={previousCycles}
                        setList={setPreviousCycles}
                        index={ind}
                        isDeleting={isDeleting}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdmissionCycles;
