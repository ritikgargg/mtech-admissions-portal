import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Tooltip, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Grid } from "@mui/material";
import spinner from "../../images/SpinnerWhite.gif";
import Toggle from "./Toggle";
import FormControlLabel from "@mui/material/FormControlLabel";
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

export default function PublishResultsModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const publishResults = () => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append("cycle_id", props.cycle_id);
    formData.append("offering_id", props.offering_id);
    formData.append(
      "is_result_published",
      props.isResultPublished === 0 ? 1 : 0
    );

    Axios.post("/publish-unpublish-results", formData, {
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
      <Tooltip title="Publish Result">
        <button
          onClick={handleOpen}
          type="button"
          className="focus:outline-none w-1/2 font-medium inline-flex items-center justify-center rounded-lg text-sm text-center sm:w-auto"
        >
          <FormControlLabel
            control={
              <Toggle
                checked={props.isResultPublished === 1 ? true : false}
                sx={{ m: 1 }}
              />
            }
            className="items-center justify-center"
            label="Publish Results"
          />
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
              Are you sure you want to{" "}
              {props.isResultPublished === 0 ? "publish" : "unpublish"} the
              results for{" "}
              <span className="italic font-semibold">{props.offeringName}</span>
              ?
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              <span>
                The results will {props.isResultPublished === 0 ? "" : "not"} be
                shown to the corresponding applicants.
              </span>
            </p>
            <div className="flex items-center justify-end mt-8 text-xs">
              {props.isResultPublished === 0 ? (
                !isLoading ? (
                  <button
                    type="button"
                    onClick={publishResults}
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
                )
              ) : !isLoading ? (
                <button
                  type="button"
                  onClick={publishResults}
                  className="hover:shadow-lg transition duration-200 border border-red-400 hover:bg-red-600 hover:text-white focus:outline-none w-28 px-4 py-2 font-medium text-red-600 rounded bg-red-50"
                >
                  Yes, I'm sure
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="focus:outline-none w-28 px-4 py-2 font-medium text-white rounded bg-red-600"
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
