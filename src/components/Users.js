import useFetch from "../helpers/useFetch";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "../styles/Users.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

const Input = styled("input")({
  display: "none",
});

const columns = [
  { field: "id", hide: true },
  { field: "schoolId", headerName: "School Id", width: 110 },
  { field: "fullName", headerName: "Full Name", width: 250 },
  { field: "email", headerName: "Email", width: 300 },
  { field: "role", headerName: "Role", width: 180 },
];

const Users = () => {
  const {
    data: userList,
    isPending,
    error,
  } = useFetch("http://localhost:3001/api/users");
  const token = window.localStorage.getItem("token");
  var decoded = jwt_decode(token);
  console.log("decoded code:",decoded)
  const history = useHistory();
  const [isFileSubmitted, setIsFileSubmitted] = React.useState(false);
  // const dataGridColumns = userList.data.columns;
  const [selectedRow, setSelectedRow] = React.useState();

  let formData = new FormData();
  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    if (e.target && e.target.files[0]) {
      formData.append("file", e.target.files[0]);
    }
  };

  const handleDelete = () => {
    console.log("geliyor mu?", selectedRow);
    const data = { email: selectedRow };
    fetch("http://localhost:3001/api/admin/delete-user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("gelen response data:", data);
        if (data.data.ok) {
          // setIsFileSubmitted(true);
          // history.push("/users");
          window.location.reload();
        } else {
          console.log("aceyip birsey oldu");
        }
      })
      .catch((e) => {
        console.log("cannot logged:", e.message);
      });
  };

  const handleFileSubmit = () => {
    fetch("http://localhost:3001/api/upload", {
      method: "POST",
      // headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("gelen response data:", data);
        if (data.ok) {
          // setIsFileSubmitted(true);
          // history.push("/users");
          window.location.reload();
        } else {
        }
      })
      .catch((e) => {
        console.log("cannot logged:", e.message);
      });
  };

  return (
    <div className="users-container">
      <div className="Navbar-Part">
        <Navbar token={decoded}></Navbar>
      </div>
      <div className="user-content">
        <div className="user-content-top">
          <div className="content-header">
            <h1>User List</h1>
          </div>
          {isPending && <div>Loading...</div>}
          {userList && (
            <div
              className="datagrid-container"
              style={{ height: 400, width: "50%" }}
            >
              <DataGrid
                rows={userList.data.rows}
                columns={columns}
                components={{
                  Toolbar: GridToolbar,
                }}
                // checkboxSelection
                onSelectionModelChange={(ids) => {
                  const selectedIDs = new Set(ids);
                  const selectedRows = userList.data.rows.filter((row) =>
                    selectedIDs.has(row.id)
                  );

                  Object.keys(selectedRows).forEach(function eachKey(key) {
                    setSelectedRow(selectedRows[key].email);
                  });
                }}
              ></DataGrid>
            </div>
          )}
          <div className="datagrid-button">
            <Button
              style={{ maxWidth: 20 }}
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            ></Button>
          </div>
        </div>
        {selectedRow && <h4>{selectedRow}</h4>}
        <div className="user-content-bottom">
          <div className="bottom-header">
            <h2>User Add</h2>
          </div>
          <div className="upload-file-part">
            <label className="user-file" htmlFor="icon-button-file">
              <label htmlFor="icon-button-file">
                <Input
                  id="icon-button-file"
                  type="file"
                  onChange={onFileChange}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <AttachFileIcon fontSize="large" />
                </IconButton>
              </label>
            </label>
            <div className="user-file-button">
            <Button
              onClick={handleFileSubmit}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Submit
            </Button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
