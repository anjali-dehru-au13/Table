import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const TableData = () => {
 const [savedData, setSavedData] = useState([]);
 const [showModal, setShowModal] = useState(false);

 const [selectedRow, setSelectedRow] = useState({});

 useEffect(() => {
  fetch("https://assets.alippo.com/catalog/static/data.json")
   .then((response) => {
    response
     .json()
     .then((data) => {
      let newData = data.map((d, i) => {
       d["id"] = i + 1;
       return d;
      });
      // console.log(data);
      setSavedData(newData);
     })
     .catch((error) => {
      console.log(error);
     });
   })
   .catch((err) => {
    console.log(err);
   });
 }, []);

 const handleChange = (key, change) => {
  console.log(key, change);
  let newRow = { ...selectedRow };
  newRow[key] = change;
  setSelectedRow(newRow);
 };

 const handleDelete = (rowID) => {
  let newRows = savedData.filter((data) => {
   if (data.id == rowID) {
    return false;
   }
   return true;
  });
  setSavedData(newRows);
 };

 const handleSubmit = () => {
  let newRows = savedData.map((data) => {
   if (data.id == selectedRow.id) {
    return selectedRow;
   }
   return data;
  });
  setSavedData(newRows);
  setShowModal(false);
 };

 console.log(savedData);
 // const rows = [{ id: 1, colum1: "title", col2: "Name" }];
 const columns = [
  { field: "id", headerName: "SLNO" },

  { field: "age", headerName: "AGE" },
  { field: "city", headerName: "CITY", width: 200 },
  { field: "name", headerName: "NAME", width: 200 },
  { field: "pinCode", headerName: "PINCODE" },
  {
   field: "actions",
   width: 200,
   headerName: "Actions",
   renderCell: (params) => (
    <strong>
     <Button
      variant="contained"
      size="small"
      style={{ marginLeft: 16 }}
      tabIndex={params.hasFocus ? 0 : -1}
      onClick={() => {
       setShowModal(true);
       setSelectedRow(params.row);
      }}
     >
      Edit
     </Button>
     <Button
      variant="contained"
      size="small"
      style={{ marginLeft: 16, backgroundColor: "red", color: "#fff" }}
      tabIndex={params.hasFocus ? 0 : -1}
      onClick={() => {
       handleDelete(params.row.id);
      }}
     >
      Delete
     </Button>
    </strong>
   ),
  },
 ];
 return (
  <React.Fragment>
   <div style={{ width: "100vw" }}>
    <DataGrid rows={savedData} columns={columns} />
   </div>
   <Dialog open={showModal} onClose={() => setShowModal(false)}>
    <DialogTitle>Subscribe</DialogTitle>
    <DialogContent>
     <DialogContentText>
      To subscribe to this website, please enter your email address here. We
      will send updates occasionally.
     </DialogContentText>
     <TextField
      autoFocus
      margin="dense"
      id="name"
      label="Name"
      value={selectedRow.name}
      onChange={(e) => handleChange("name", e.target.value)}
      type="text"
      fullWidth
      variant="standard"
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
      variant="standard"
     />
     <TextField
      autoFocus
      margin="dense"
      id="city"
      label="City"
      value={selectedRow.city}
      onChange={(e) => handleChange("city", e.target.value)}
      type="text"
      fullWidth
      variant="standard"
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
      variant="standard"
     />
    </DialogContent>
    <DialogActions>
     <Button onClick={handleSubmit}>Submit</Button>
     <Button onClick={() => setShowModal(false)}>Cancel</Button>
    </DialogActions>
   </Dialog>
  </React.Fragment>
 );
};

export default TableData;
