import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
const EditModal = (props) => {
 const { open, onClose, handleChange, selectedRow, handleSubmit } = props;
 return (
  <div>
   <Dialog open={open} onClose={onClose}>
    <DialogTitle>Edit Data</DialogTitle>
    <form onSubmit={handleSubmit}>
     <DialogContent>
      {/* <DialogContentText>Edit the details below</DialogContentText> */}

      <TextField
       autoFocus
       margin="dense"
       id="name"
       label="Name"
       value={selectedRow.name}
       onChange={(e) => handleChange("name", e.target.value)}
       type="text"
       fullWidth
       required
       variant="filled"
      />
      <TextField
       autoFocus
       margin="dense"
       id="age"
       label="Age"
       value={selectedRow.age}
       onChange={(e) => handleChange("age", e.target.value)}
       type="number"
       fullWidth
       required
       variant="filled"
      />
      <TextField
       autoFocus
       margin="dense"
       id="city"
       label="City"
       required
       value={selectedRow.city}
       onChange={(e) => handleChange("city", e.target.value)}
       type="text"
       fullWidth
       variant="filled"
      />
      <TextField
       autoFocus
       margin="dense"
       id="pinCode"
       label="Pincode"
       value={selectedRow.pinCode}
       onChange={(e) => handleChange("pinCode", e.target.value)}
       type="number"
       fullWidth
       required
       variant="filled"
      />
     </DialogContent>
     <DialogActions>
      <Button type="submit"> Submit</Button>
      <Button onClick={onClose}>Cancel</Button>
     </DialogActions>
    </form>
   </Dialog>
  </div>
 );
};

export default EditModal;
