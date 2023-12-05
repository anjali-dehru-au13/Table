import React, { useEffect, useReducer, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditModal from "./Modal/EditModal";
import DeleteModal from "./Modal/DeleteModal";
const TableData = () => {
 const [savedData, setSavedData] = useState([]);
 const [showModal, setShowModal] = useState(false);

 const [selectedRow, setSelectedRow] = useState({});
 const [deleteModal, setDeleteModal] = useState(false);
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
  let newRow = { ...selectedRow };
  newRow[key] = change;
  setSelectedRow(newRow);
 };

 //  deleteing a row
 const handleDelete = (rowID) => {
  let newRows = savedData.filter((data) => {
   if (data.id == rowID) {
    return false;
   }
   return true;
  });
  setSavedData(newRows);
  setDeleteModal(false);
 };

 const handleCloseModal = () => {
  setShowModal(false);
 };

 const handleCloseDeleteModal = () => {
  setDeleteModal(false);
 };

 //  submit Edit changes
 const handleSubmit = (e) => {
  e.preventDefault();
  let newRows = savedData.map((data) => {
   if (data.id == selectedRow.id) {
    return selectedRow;
   }
   return data;
  });
  setSavedData(newRows);
  handleCloseModal();
 };

 //  columns
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
       setDeleteModal(true);
       setSelectedRow(params.row.id);
       //  handleDelete(params.row.id);
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
    {savedData ? (
     <DataGrid
      autoHeight
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
      disableColumnMenu
     />
    ) : (
     "Data fetch failed"
    )}
   </div>

   {/* EDIT MODAL  */}
   <EditModal
    open={showModal}
    onClose={handleCloseModal}
    selectedRow={selectedRow}
    handleChange={handleChange}
    handleSubmit={handleSubmit}
   />

   {/* DELETE MODAL */}
   <DeleteModal
    open={deleteModal}
    selectedRow={selectedRow}
    handleClose={handleCloseDeleteModal}
    handleDelete={handleDelete}
   />
  </React.Fragment>
 );
};

export default TableData;
