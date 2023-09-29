import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function AlertDialog({ handleDeleteClickWrapper, taskId, isTrue }) {
   // console.log(taskId);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    console.log("true");
  };

  const handleClose = (x) => {
    setOpen(false);
    if(x==='Sure') handleDeleteClickWrapper(taskId,isTrue);


  };

  return (
    <div>
      <Button onClick={handleClickOpen} >
      <FontAwesomeIcon icon={faTrash} style={{ color: 'black' }}/>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure you want to delete?"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
         This action is irreversible
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => handleClose("Disagree")}>Cancel</Button>
        <Button onClick={() => handleClose("Sure")} autoFocus>Sure</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
