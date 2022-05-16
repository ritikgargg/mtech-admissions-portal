import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Tooltip, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Grid } from "@mui/material";
import DeleteDisabled from "../../images/delete disabled.svg";
import spinner from "../../images/SpinnerWhite.gif";
import { getAdminType } from "./AdminTypes";
import ArchiveIcon from "../../images/archive3.png";

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const admin_type = getAdminType();

  return (
    <div>
      {admin_type === "0" ? (
        <Tooltip title="Archive">
          <button
            onClick={handleOpen}
            className="focus:outline-none hover:bg-gray-100 rounded-lg"
            style={{
              fontSize: "0.875rem",
              textTransform: "none",
              width: "35px",
              height: "35px",
            }}
          >
            <img className="w-6 h-6 mx-auto" src={ArchiveIcon} alt="Archive" />
          </button>
        </Tooltip>
      ) : (
        <Tooltip title="">
          <button
            disabled
            onClick={handleOpen}
            className="focus:outline-none cursor-not-allowed hover:bg-gray-100 rounded-lg"
            style={{
              fontSize: "0.875rem",
              textTransform: "none",
              width: "35px",
              height: "35px",
            }}
          >
            <img
              className="w-5 h-5 mx-auto"
              src={DeleteDisabled}
              alt="Delete"
            />
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
              Are you sure you want to do that ?
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              You will not be able to view or make changes to the applications
              or offerings of this admission cycle
            </p>
            <div className="flex items-center justify-end mt-8 text-xs">
              {!props.isDeleting ? (
                <button
                  type="button"
                  onClick={() => {
                    props.onDelete(props.list, props.setList, props.index);
                  }}
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
                    className="h-5 w-5+ mx-auto"
                    alt="Spinner"
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
