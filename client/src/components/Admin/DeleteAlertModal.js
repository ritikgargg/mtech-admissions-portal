import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Tooltip, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Grid } from '@mui/material';
import DeleteAlert from "./DeleteAlert"
import Delete from '../../images/delete.png'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 5
};

export default function DeleteAlertModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Tooltip title="Delete">
        <Button onClick={handleOpen} style={{color: "rgb(184,184,184)", fontSize: "0.875rem", textTransform: "none"}}>
            <img className="w-5 h-5" src={Delete}/> 
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
            <Grid item xs={11}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {props.header}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton aria-label="Close" onClick={handleClose}>
                <Close />
              </IconButton>
            </Grid>
          </Grid>
          <DeleteAlert id="modal-modal-description" sx={{ mt: 2 }} handleClose={handleClose}/>
        </Box>
      </Modal>
    </div>
  );
}