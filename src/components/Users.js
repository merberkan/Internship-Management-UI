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
import { useHistory, Link } from "react-router-dom";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Alert from "@mui/material/Alert";

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
  const history = useHistory();
  let token = null;
  try {
    token = window.localStorage.getItem("token");
    console.log("errorsüz geçti")
  } catch (error) {
    history.push('/notfound')
  }
  const [isUserLogged, setIsUserLogged] = useState(null);

  if (isUserLogged === null) {
    if (token) {
      setIsUserLogged(true);
    } else {
      setIsUserLogged(false);
      history.push('/notfound')
    }
  }
  var decoded = jwt_decode(token);

  const {
    data: userList,
    isPending,
    error,
  } = useFetch("http://localhost:3001/api/users");

  console.log("decoded code:", decoded);
  const [isFileSubmitted, setIsFileSubmitted] = React.useState(false);
  // const dataGridColumns = userList.data.columns;
  const [selectedRow, setSelectedRow] = React.useState();

  const [successfulAlert, setSuccessfulAlert] = React.useState();
  const [failAlert, setFailAlert] = React.useState();
  const [display, setDisplay] = React.useState(true);

  const [successfulAlert2, setSuccessfulAlert2] = React.useState();
  const [failAlert2, setFailAlert2] = React.useState();
  const [display2, setDisplay2] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 5000);
  }, [display]);

  React.useEffect(() => {
    setTimeout(() => {
      setDisplay2(false);
    }, 5000);
  }, [display2]);

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
          setSuccessfulAlert(true);
          setDisplay(true);
          window.location.reload();
        } else {
          setFailAlert(true);
          setDisplay(true);
          window.location.reload();
        }
      })
      .catch((e) => {
        setFailAlert(true);
        setDisplay(true);
        window.location.reload();
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
          setSuccessfulAlert2(true);
          setDisplay2(true);
          window.location.reload();
        } else {
          setFailAlert2(true);
          setDisplay2(true);
          window.location.reload();
        }
      })
      .catch((e) => {
        setFailAlert2(true);
        setDisplay2(true);
        window.location.reload();
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
          {failAlert && display && (
            <Alert severity="error">
              Bir Hata ile Karşılaşıldı. Tekrar Deneyiniz
            </Alert>
          )}
          {successfulAlert && display && (
            <Alert severity="success">Kullanıcı Başarıyla Silindi</Alert>
          )}
        </div>
        <div className="user-content-mid">
          <p>
            Örnek Exceli indirmek için
            <a
              href="http://localhost:3001/api/download"
              _blank
              style={{ color: "black" }}
            >
              {" "}
              buraya{" "}
            </a>
            tıklayınız
          </p>
        </div>
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
            {failAlert2 && display2 && (
            <Alert severity="error">
              Bir Hata ile Karşılaşıldı. Tekrar Deneyiniz
            </Alert>
          )}
          {successfulAlert2 && display2 && (
            <Alert severity="success">İşleminiz Başarıyla Tamamlandı</Alert>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
