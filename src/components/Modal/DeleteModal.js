import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";

const DeleteModal = (props) => {
 const { open, handleClose, handleDelete, selectedRow } = props;
 return (
  <div>
   <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Delete Data {selectedRow}</DialogTitle>
    <DialogActions>
     <Button onClick={() => handleDelete(selectedRow)}> Confirm</Button>
     <Button onClick={handleClose}>Cancel</Button>
    </DialogActions>
   </Dialog>
  </div>
 );
};

export default DeleteModal;
