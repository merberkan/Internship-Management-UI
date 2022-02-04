import useFetch from "../helpers/useFetch";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import "../styles/Profile.css";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PreviewIcon from "@mui/icons-material/Preview";
import Alert from "@mui/material/Alert";

const studentColumns = [
  { field: "id", hide: true },
  { field: "FormName", headerName: "Student", width: 250 },
  { field: "FormType", headerName: "Form Name", width: 250 },
  { field: "LessonCode", headerName: "Lesson Code", width: 200 },
  { field: "InsertedDate", headerName: "Inserted Date", width: 150 },
  { field: "FormStatus", headerName: "Form Status", width: 350 },
  { field: "ApproveStatus", headerName: "Approval Status", width: 200 },
  { field: "RejectReason", headerName: "Reject Reason", width: 250 },
];

const Profile = () => {
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
  console.log(decoded);
  const [selectedRow, setSelectedRow] = React.useState();
  const [selectedRowFormTypeId, setSelectedRowFormTypeId] = React.useState();

  const [users, setUsers] = useState(null);
  const [isPending2, setIsPending2] = useState(true);
  const [error2, setError2] = useState(null);
  const [ifControl, setIfControl] = useState(true);
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [address, setAddress] = useState("");
  const [successfulAlert, setSuccessfulAlert] = useState();
  const [failAlert, setFailAlert] = useState();
  const [display, setDisplay] = useState(true);
  const [isUpdateFail, setIsUpdateFail] = useState();
  const [isUserStudent, setIsUserStudent] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 3000);
  }, [display]);

  const {
    data: formList,
    isPending,
    error,
  } = useFetch("http://localhost:3001/api/forms/" + decoded.usercode, "GET");

  useEffect(() => {
    const abortCont = new AbortController(); // we use abort controller to stop the fetch

    fetch("http://localhost:3001/api/user/detail", {
      signal: abortCont.signal,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: null,
    })
      .then((res) => {
        console.log("res:", res);
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data.data.user);
        setIsPending2(false);
        setError2(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending2(false);
          setError2(err.message);
        }
      });
    //* cleans state for abort warnings while fetching for data
    return () => abortCont.abort();
  }, [ifControl]);

  if (users && ifControl) {
    console.log("hop");
    setName(users.Name);
    setSurName(users.Surname);
    setAddress(users.Address);
    setIfControl(false);
  }

  if (isUserStudent === null) {
    if (decoded.role === 1) {
        setIsUserStudent(true);
    } else {
      setIsUserStudent(false);
    }
  }

  const handleDisplay = () => {
    if (selectedRowFormTypeId === 3) {
      history.push(`/user/beyanform/${selectedRow}`);
    } else if (selectedRowFormTypeId === 2) {
      history.push(`/user/isverenform/${selectedRow}`);
    } else if (selectedRowFormTypeId === 1) {
      history.push(`/user/zorunluform/${selectedRow}`);
    } else if (selectedRowFormTypeId === 5) {
      history.push(`/user/rapor/${selectedRow}`);
    }else if(selectedRowFormTypeId === 6){
      console.log("girdi şu an")
      history.push(`/user/degerlendirme/${selectedRow}`)
    } else {
      console.log("hop tıkladın:", selectedRow);
      console.log("tıklanan form type ıd:", selectedRowFormTypeId);
    }
  };

  const handleUpdate = () => {
    let model = users;
    model.Name = name;
    model.Surname = surname;
    model.Address = address;
    model.password2 = password;
    model.password2Confirm = passwordConfirm;

    fetch("http://localhost:3001/api/user/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(model),
    })
      .then((data) => {
        console.log("gelen response:", data);
        if (data.ok) {
          setIsPending2(false);
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

  return (
    <div className="profile-container">
      <div className="Navbar-Part">
        <Navbar token={decoded}></Navbar>
      </div>
      <div className="profile-content">
        <div className="profile-user-detail">
          <div className="profile-header">
            <h3>User Information</h3>
          </div>
          <div className="profile-user-form">
            {users && (
              <div className="profile-user-form-detail">
                <div className="profile-user-form-left">
                  <div className="profile-form-row">
                    <label>Name:</label>
                    <input
                      type="text"
                      className="profile-form-input"
                      placeholder={users.Name}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                  <div className="profile-form-row">
                    <label>Surname:</label>
                    <input
                      type="text"
                      required
                      className="profile-form-input"
                      placeholder={users.Surname}
                      onChange={(e) => setSurName(e.target.value)}
                    ></input>
                  </div>
                  <div className="profile-form-row">
                    <label>Email:</label>
                    <input
                      type="text"
                      required
                      disabled={true}
                      className="profile-form-input"
                      value={users.Email}
                    ></input>
                  </div>
                  <div className="profile-form-row">
                    <label>School Id:</label>
                    <input
                      type="text"
                      required
                      disabled={true}
                      className="profile-form-input"
                      value={users.SchoolId}
                    ></input>
                  </div>
                </div>
                <div className="profile-user-form-right">
                  <div className="profile-form-row">
                    <label>Citizenship No:</label>
                    <input
                      type="text"
                      required
                      disabled={true}
                      className="profile-form-input"
                      value={users.CitizenshipNo}
                    ></input>
                  </div>
                  <div className="profile-form-row">
                    <label>Password:</label>
                    <input
                      type="password"
                      required
                      className="profile-form-input"
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>
                  <div className="profile-form-row">
                    <label>PasswordConfirm:</label>
                    <input
                      type="password"
                      required
                      className="profile-form-input"
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    ></input>
                  </div>
                  <div className="profile-form-row">
                    <label>Address:</label>
                    <textarea
                      className="profile-form-input textarea"
                      placeholder={users.Address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            )}
            <div className="profile-user-form-buttons">
              <Button type="submit" variant="contained" onClick={handleUpdate}>
                Update
              </Button>
              {failAlert && display && (
                <Alert severity="error">
                  An Error was Encountered. Please Check Your Information
                </Alert>
              )}
              {successfulAlert && display && (
                <Alert severity="success">
                  Your Information Has Been Successfully Updated
                </Alert>
              )}
            </div>
          </div>
        </div>
        {isUserStudent && (
          <div className="user-forms-detail-part">
            <div className="user-forms-content-top">
              <div className="user-forms-content-header">
                <h1>Student Form List</h1>
              </div>
              {isPending && <div>Loading...</div>}
              {formList && (
                <div
                  className="user-forms-datagrid-container"
                  style={{ height: 600, width: "80%" }}
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
              <div className="user-forms-datagrid-button">
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
        )}
      </div>
    </div>
  );
};

export default Profile;
