import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Tooltip, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Grid } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export default function ViewModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Tooltip title="View Eligibility">
        <Button
          className="focus:outline-none"
          onClick={handleOpen}
          style={{
            color: "rgb(88 80 236)",
            fontSize: "0.875rem",
            textTransform: "none",
          }}
        >
          View
        </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container>
            <Grid item xs={10}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {props.header}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                className="focus:outline-none"
                aria-label="Close"
                onClick={handleClose}
              >
                <Close />
              </IconButton>
            </Grid>
          </Grid>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.data !== undefined ? String(props.data) : ""}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
