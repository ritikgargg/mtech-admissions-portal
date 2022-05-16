import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Tooltip } from "@mui/material";
import Edit from "../../images/edit.svg";
import EditDisabled from "../../images/edit disabled.svg";
import Toggle from "./Toggle";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useForm } from "react-hook-form";
import spinner from "../../images/SpinnerWhite.gif";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import { getAdminType } from "./AdminTypes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export default function EditAdmissionCycleModal(props) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const admin_type = getAdminType();
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    onClose();
    setOpen(false);
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

  const [makeCurrent, setMakeCurrent] = React.useState(props.is_current);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (event) => {
    setMakeCurrent(event.target.checked);
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      ...props.cycle,
      duration_start: changeDateFormat(props.cycle.duration_start),
      duration_end: changeDateFormat(props.cycle.duration_end),
    },
  });

  const onClose = () => {
    reset();
    setMakeCurrent(props.is_current);
  };

  function changeDateFormat(deadline) {
    let date = new Date(deadline);

    let month = String(date.getMonth() + 1);
    if (month.length === 1) month = "0" + month;

    date = date.getFullYear() + "-" + month;
    return date;
  }

  function handleMonthChange(date) {
    let temp = date.split("-");
    let ret = months[parseInt(temp[1] - 1)] + " " + temp[0];
    return ret;
  }

  const onSubmit = (data) => {
    setIsLoading(true);

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("duration_start", handleMonthChange(data.duration_start));
    formData.append("duration_end", handleMonthChange(data.duration_end));
    formData.append("cycle_id", props.cycle.cycle_id);
    formData.append("fees_gen", data.fees_gen);
    formData.append("fees_obc", data.fees_obc);
    formData.append("fees_ews", data.fees_ews);
    formData.append("fees_sc", data.fees_sc);
    formData.append("fees_st", data.fees_st);
    formData.append("fees_pwd", data.fees_pwd);
    formData.append("make_current", makeCurrent);

    Axios.post("/edit-admission-cycle", formData, {
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

  return (
    <div>
      {admin_type === "0" ? (
        <Tooltip title="Edit">
          <button
            onClick={handleOpen}
            className="hover:bg-gray-100 focus:outline-none rounded-lg"
            style={{
              fontSize: "0.875rem",
              textTransform: "none",
              width: "35px",
              height: "35px",
            }}
          >
            <img className="w-5 h-5 mx-auto" src={Edit} alt="Delete" />
          </button>
        </Tooltip>
      ) : (
        <Tooltip title="">
          <button
            onClick={handleOpen}
            disabled
            className="hover:bg-gray-100 cursor-not-allowed focus:outline-none rounded-lg"
            style={{
              fontSize: "0.875rem",
              textTransform: "none",
              width: "35px",
              height: "35px",
            }}
          >
            <img className="w-5 h-5 mx-auto" src={EditDisabled} alt="Delete" />
          </button>
        </Tooltip>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex mb-6">
            <p className="text-lg font-medium">Edit Admission Cycle</p>
            <button
              type="button"
              onClick={handleClose}
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            id="modal-modal-description"
            className="mb-0 space-y-4 h-5/6 overflow-y-auto overflow-x-hidden overscroll-none"
          >
            <div className="ml-2 mr-6">
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Name
                </label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
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
                    {...register("duration_start")}
                    className="w-full p-4 mr-2 text-sm border-gray-200 rounded-lg shadow-sm-2"
                  />
                  <input
                    type="month"
                    required
                    id="end-date"
                    {...register("duration_end")}
                    className="w-full p-4 ml-2 text-sm border-gray-200 rounded-lg shadow-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="fees-GEN" className="text-sm font-medium">
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
                        {...register("fees_gen")}
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
                        {...register("fees_obc")}
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
                        {...register("fees_ews")}
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
                        {...register("fees_sc")}
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
                        {...register("fees_st")}
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
                        {...register("fees_pwd")}
                        pattern="[0-9]*"
                        title="Only numbers are allowed"
                        className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm-2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="brochure" className="text-sm font-medium">
                  Brochure for M.Tech. Admissions
                </label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    id="brochure_url"
                    {...register("brochure_url")}
                    className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                    placeholder="Public URL of the brochure PDF"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="ranklist" className="text-sm font-medium">
                  GATE opening and closing score
                </label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    id="rank_list_url"
                    {...register("rank_list_url")}
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
                      onChange={handleChange}
                      sx={{ m: 1 }}
                    />
                  }
                  label="Make Current Admission Cycle"
                />
              </div>
              {!isLoading ? (
                <button
                  type="submit"
                  className="block w-full px-5 py-3 focus:outline-none text-sm font-medium text-white bg-indigo-600 rounded-lg"
                >
                  <div>Edit cycle</div>
                </button>
              ) : (
                <button
                  type="submit"
                  className="block w-full px-5 py-3 focus:outline-none text-sm font-medium text-white bg-indigo-600 rounded-lg"
                >
                  <div>
                    <img
                      className="h-5 w-5 mx-auto"
                      src={spinner}
                      alt="Spinner"
                    />
                  </div>
                </button>
              )}
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
