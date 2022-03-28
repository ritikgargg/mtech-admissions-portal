import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Tooltip, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Grid } from "@mui/material";
import Delete from "../../images/delete.png";

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

  return (
    <div>
      <Tooltip title="Delete">
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
          <img className="w-5 h-5 mx-auto" src={Delete} alt="Delete" />
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
              <Typography id="modal-modal-title" variant="h6" component="h2">

              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton className="focus:outline-none" aria-label="Close" onClick={handleClose}>
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
              You will not be able to view or make changes to the applications or offerings of this admission cycle
            </p>
            <div className="flex items-center justify-end mt-8 text-xs">
              <button
                type="button"
                onClick={() => {
                  props.onDelete(props.list, props.setList, props.index);
                  handleClose();
                }}
                className="focus:outline-none px-4 py-2 font-medium text-red-600 rounded bg-red-50"
              >
                Yes, I'm sure
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="focus-outline-none px-4 py-2 ml-2 font-medium text-gray-600 rounded bg-gray-50"
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
