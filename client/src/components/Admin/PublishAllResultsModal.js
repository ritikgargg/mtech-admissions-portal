import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Tooltip, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Grid } from "@mui/material";
import spinner from "../../images/SpinnerWhite.gif";
import Axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { useNavigate } from "react-router-dom";
import publishIcon from "../../images/publish.svg";
import { getAdminType } from "./AdminTypes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export default function PublishAllResultsModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const admin_type = getAdminType();

  const publishAllResults = () => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append("cycle_id", props.cycle_id);

    Axios.post("/publish-all-results", formData, {
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
      <Tooltip title="Publish all results">
        <button
          onClick={handleOpen}
          type="button"
          className="focus:outline-none w-1/2 mr-2 text-white bg-black focus:ring-4 focus:ring-gray-200 font-medium inline-flex items-center justify-center rounded-lg text-sm my-4 px-3 py-2 text-center sm:w-auto"
        >
          <img alt="Publish" className="h-6 w-6" src={publishIcon} />
        </button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container>
            <Grid item xs={11}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
              ></Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                className="focus:outline-none"
                aria-label="Close"
                onClick={handleClose}
              >
                <Close />
              </IconButton>
            </Grid>
          </Grid>
          <div
            className="pl-5 bg-white rounded-lg"
            id="modal-modal-description"
          >
            <h2 className="text-xl font-bold">
              Are you sure you want to publish the results for all offerings in{" "}
              <span className="italic font-semibold">{props.cycleName}</span>?
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {admin_type === "0"
                ? "The results of all the offerings will be shown to the corresponding applicants."
                : "The results of all the offerings will be published to the Academic Section."}
            </p>
            <div className="flex items-center justify-end mt-8 text-xs">
              {!isLoading ? (
                <button
                  type="button"
                  onClick={publishAllResults}
                  className="hover:shadow-lg transition duration-200 border border-emerald-400 hover:bg-emerald-600 hover:text-white focus:outline-none w-28 px-4 py-2 font-medium text-emerald-600 rounded bg-emerald-50"
                >
                  Yes, I'm sure
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="focus:outline-none w-28 px-4 py-2 font-medium text-white rounded bg-emerald-600"
                >
                  <img
                    src={spinner}
                    alt="spinner"
                    className="h-5 w-5 mx-auto"
                  />
                </button>
              )}
              <button
                type="button"
                onClick={handleClose}
                className="border border-gray-400 transition duration-200 hover:bg-gray-600 hover:text-gray-50 focus-outline-none px-4 py-2 ml-2 font-medium text-gray-600 rounded bg-gray-50"
              >
                No, go back
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
