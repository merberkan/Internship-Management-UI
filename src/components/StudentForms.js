import useFetch from "../helpers/useFetch";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "../styles/StudentForms.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { useHistory, Link } from "react-router-dom";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import PreviewIcon from "@mui/icons-material/Preview";
import ShowBeyanForm from "./ShowBeyanForm";

const Input = styled("input")({
  display: "none",
});

const studentColumns = [
  { field: "id", hide: true },
  { field: "FormName", headerName: "Student Name", width: 350 },
  { field: "FormType", headerName: "Form Type", width: 350 },
  { field: "LessonCode", headerName: "Lesson Code", width: 350 },
  { field: "InsertedDate", headerName: "Inserted Date", width: 350 },
];

const headColumns = [
  { field: "id", hide: true },
  { field: "FormName", headerName: "Student Name", width: 250 },
  { field: "FormType", headerName: "Form Type", width: 300 },
  { field: "LessonCode", headerName: "Lesson Code", width: 125 },
  { field: "InsertedDate", headerName: "Inserted Date", width: 150 },
  { field: "FormStatus", headerName: "Form Status", width: 350 },
  { field: "ApproveStatus", headerName: "Approval Status", width: 200 },
  { field: "RejectReason", headerName: "Reject Reason", width: 250 },
  { field: "SendedEmail", headerName: "Sended Email", width: 250, hide:true },

];

const StudentForms = () => {
  const history = useHistory();
  let token;
  try {
    token = window.localStorage.getItem("token");
  } catch (error) {
    history.push('/login')
  }
  const [isUserLogged, setIsUserLogged] = useState(null);

  if (isUserLogged === null) {
    if (token) {
      setIsUserLogged(true);
    } else {
      setIsUserLogged(false);
      history.push('/login')
    }
  }
  var decoded = jwt_decode(token);
  const {
    data: formList,
    isPending,
    error,
  } = useFetch("http://localhost:3001/api/forms/" + decoded.usercode, "GET");

  // const dataGridColumns = userList.data.columns;
  const [selectedRow, setSelectedRow] = React.useState();
  const [selectedRowFormTypeId, setSelectedRowFormTypeId ]= React.useState();
  const [isUserHead, setIsUserHead] = React.useState(null);
  const [isUserGrader, setIsUserGrader] = React.useState(null);


  

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
  const handleDisplay = () => {
    if(selectedRowFormTypeId === 3){
      history.push(`/user/beyanform/${selectedRow}`)
    }else if(selectedRowFormTypeId === 2){
      history.push(`/user/isverenform/${selectedRow}`)
    }else if(selectedRowFormTypeId === 1){
      history.push(`/user/zorunluform/${selectedRow}`)
    }else if(selectedRowFormTypeId === 5){
      history.push(`/user/rapor/${selectedRow}`)
    }else if(selectedRowFormTypeId === 6){
      history.push(`/user/degerlendirme/${selectedRow}`)
    }else if(selectedRowFormTypeId === 4){
      history.push(`/user/beyanform43/${selectedRow}`)
    }else{
      console.log("hop tıkladın:", selectedRow);
      console.log("tıklanan form type ıd:",selectedRowFormTypeId)
    }

  };

  if (isUserHead === null) {
    if (decoded.role === 3) {
      setIsUserHead(true);
    } else {
      setIsUserHead(false);
    }
  }

  if (isUserGrader === null) {
    if (decoded.role === 5) {
      setIsUserGrader(true);
    } else {
      setIsUserGrader(false);
    }
  }

  return (
    <div className="student-forms-container">
      <div className="Navbar-Part">
        <Navbar token={decoded}></Navbar>
      </div>
      <div className="student-forms-content">
        <div className="student-forms-content-top">
          <div className="student-forms-content-header">
            <h1>Student Form List</h1>
          </div>
          {isPending && <div>Loading...</div>}
          {formList && (!isUserHead && !isUserGrader) && (
            <div
              className="student-forms-datagrid-container"
              style={{ height: 600 }}
            >
              <DataGrid
                rows={formList.list}
                columns={studentColumns}
                components={{
                  Toolbar: GridToolbar,
                }}
                // checkboxSelection
                onSelectionModelChange={(ids) => {
                  const selectedIDs = new Set(ids);
                  const selectedRows = formList.list.filter((row) =>
                    selectedIDs.has(row.id)
                  );

                  Object.keys(selectedRows).forEach(function eachKey(key) {
                    setSelectedRow(selectedRows[key].id);
                    setSelectedRowFormTypeId(selectedRows[key].FormTypeId);
                  });
                }}
              ></DataGrid>
            </div>
          )}
          {formList && (isUserHead||isUserGrader) && (
            <div
              className="student-forms-datagrid-container"
              style={{ height: 600, width: "70%" }}
            >
              <DataGrid
                rows={formList.list}
                columns={headColumns}
                components={{
                  Toolbar: GridToolbar,
                }}
                // checkboxSelection
                onSelectionModelChange={(ids) => {
                  const selectedIDs = new Set(ids);
                  const selectedRows = formList.list.filter((row) =>
                    selectedIDs.has(row.id)
                  );

                  Object.keys(selectedRows).forEach(function eachKey(key) {
                    setSelectedRow(selectedRows[key].id);
                    setSelectedRowFormTypeId(selectedRows[key].FormTypeId);
                  });
                }}
              ></DataGrid>
            </div>
          )}
          <div className="student-forms-datagrid-button">
            <div className="btn-delete">
              <Button
                style={{ maxWidth: 100 }}
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
            <div className="btn-show">
              <Button
                style={{ maxWidth: 100 }}
                variant="contained"
                color="primary"
                startIcon={<PreviewIcon />}
                onClick={handleDisplay}
              >
                {" "}
                Show
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentForms;
