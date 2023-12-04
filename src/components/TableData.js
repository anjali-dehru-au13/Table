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

 const handleSubmit = (e) => {
  e.preventDefault();
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
  { field: "id", headerName: "SLNO", width: 100 },

  { field: "age", headerName: "AGE", width: 100 },
  { field: "city", headerName: "CITY", width: 200 },
  { field: "name", headerName: "NAME", width: 200 },
  { field: "pinCode", headerName: "PINCODE", width: 200 },
  {
   field: "actions",
   width: 200,
   textAlign: "center",
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
   <div style={{ width: "80vw", textAlign: "center" }}>
    <DataGrid
     rows={savedData}
     columns={columns}
     sx={{
      m: 6,
      boxShadow: 2,
      border: 2,
      borderColor: "primary.light",
      "& .MuiDataGrid-cell:hover": {
       color: "primary.main",
      },
     }}
    />
   </div>
   <Dialog open={showModal} onClose={() => setShowModal(false)}>
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
      <Button onClick={() => setShowModal(false)}>Cancel</Button>
     </DialogActions>
    </form>
   </Dialog>
  </React.Fragment>
 );
};

export default TableData;
