import useFetch from "../helpers/useFetch";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "../styles/Users.css";
import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";

const Input = styled("input")({
  display: "none",
});

const Users = () => {
  const {
    data: userList,
    isPending,
    error,
  } = useFetch("http://localhost:3001/api/users");
  const token = window.localStorage.getItem("token");
  var decoded = jwt_decode(token);
  // const dataGridColumns = userList.data.columns;
  if (userList) {
    userList.data.columns.push({
      field: "edit",
      headerName: "Detail",
      sortable: false,
      width: 130,
      disableClickEventBubbling: true,
      renderCell: () => {
        return (
          <Button
            style={{ maxWidth: 20 }}
            variant="contained"
            color="primary"
            startIcon={<SettingsIcon />}
          ></Button>
        );
      },
    });
  }

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
              style={{ height: 400, width: "51%" }}
            >
              <DataGrid
                rows={userList.data.rows}
                columns={userList.data.columns}
                components={{
                  Toolbar: GridToolbar,
                }}
                // checkboxSelection
              ></DataGrid>
            </div>
          )}
        </div>
        <div className="user-content-bottom">
          <div className="bottom-header">
            <h2>User Add</h2>
          </div>
          <div className="upload-file-part">
            <label htmlFor="icon-button-file">
              <label htmlFor="icon-button-file">
                <Input id="icon-button-file" type="file" />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <DriveFolderUploadRoundedIcon />
                </IconButton>
              </label>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
