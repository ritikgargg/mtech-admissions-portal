import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Tooltip, IconButton } from "@mui/material";
import Edit from "../../images/edit.png";
import Toggle from "./Toggle";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useForm } from "react-hook-form";
import spinner from "../../images/SpinnerWhite.gif";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export default function DeleteAlertModal(props) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
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
    formData.append("make_current", makeCurrent);

    Axios.post("http://localhost:8080/edit-admission-cycle", formData, {
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
      <Tooltip title="Delete">
        <button
          onClick={handleOpen}
          className="hover:bg-gray-100 rounded-lg"
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            id="modal-modal-description"
            className="mb-0 space-y-4 "
          >
            <div className="flex">
              <p className="text-lg font-medium">Edit Admission Cycle</p>
              <button
                type="button"
                onClick={handleClose}
                // onClick={() => {
                //   //   setCycleInfo(empty_cycle);
                //   //   setAddAdmissionCycle(false);
                // }}
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
                  {...register("name")}
                  //   onChange={(e) => handleChange(e, "name")}
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
                  //   onChange={(e) => handleMonthChange(e, "duration_start")}
                  name="start-date"
                  className="w-full p-4 mr-2 text-sm border-gray-200 rounded-lg shadow-sm-2"
                />
                <input
                  type="month"
                  required
                  id="end-date"
                  {...register("duration_end")}
                  //   onChange={(e) => handleMonthChange(e, "duration_end")}
                  name="end-date"
                  className="w-full p-4 ml-2 text-sm border-gray-200 rounded-lg shadow-sm"
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
            <button
              type="submit"
              className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
            >
              <div>
                {!isLoading ? (
                  "Edit cycle"
                ) : (
                  <img
                    className="h-5 w-5 mx-auto"
                    src={spinner}
                    alt="Spinner"
                  />
                )}
              </div>
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
