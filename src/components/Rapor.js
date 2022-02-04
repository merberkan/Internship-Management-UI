import useFetch from "../helpers/useFetch";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "../styles/Rapor.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import AllPagesPDFViewer from "./all-pages";

import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import Alert from "@mui/material/Alert";


const Input = styled("input")({
  display: "none",
});

const Rapor = () => {
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
  console.log("decoded code:", decoded);
  const [isFileSubmitted, setIsFileSubmitted] = React.useState(false);
  // const dataGridColumns = userList.data.columns;
  const [selectedRow, setSelectedRow] = React.useState();
  const [fileName, setFileName] = useState();
  const [ifControl, setIfControl] = useState(true);
  const [stakeholders, setStakeholders] = useState();
  //* Company Person part
  const [companyPersonFullName, setCompanyPersonFullName] = useState("");
  const [companyPersonTitle, setCompanyPersonTitle] = useState("");
  const [companyPersonMail, setCompanyPersonMail] = useState("");
  const [companyPersonDate, setCompanyPersonDate] = useState("");
  const [companyPersonId, setCompanyPersonId] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [successfulAlert, setSuccessfulAlert] = useState();
  const [failAlert, setFailAlert] = useState();
  const [display, setDisplay] = useState(true);
  const [successfulAlert2, setSuccessfulAlert2] = useState();
  const [isUserStudent, setIsUserStudent] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");


  if (isUserStudent === null) {
    if (decoded.role === 1) {
      setIsUserStudent(true);
    } else {
      setIsUserStudent(false);
      history.push('/login')
    }
  }




  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
      setFailAlert(false);
      setSuccessfulAlert(false);
    }, 3000);
  }, [display]);

  const {
    data: stakeholdersList,
    isPending,
    error,
  } = useFetch(
    "http://localhost:3001/api/stakeholder/list/" + decoded.usercode,
    "GET"
  );

  if (stakeholdersList && ifControl) {
    console.log("deneme", stakeholdersList.data.data);
    setStakeholders(stakeholdersList.data.data);
    setIfControl(false);
  }

  function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
      onClose(value);
    };

    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Choose Stakeholder</DialogTitle>
        <List sx={{ pt: 0 }}>
          {stakeholders.map((stakeholder) => (
            <ListItem
              button
              onClick={() => handleListItemClick(stakeholder.fullname)}
              key={stakeholder.fullname}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={stakeholder.fullname} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    );
  }
  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setSelectedValue(value);
    setOpen(false);
    const selectedData = stakeholders.find((w) => w.fullname === value);
    console.log("selected data is here:", selectedData);
    setCompanyPersonFullName(selectedData.companyEmployeeName);
    setCompanyPersonTitle(selectedData.title);
    setCompanyPersonMail(selectedData.email);
    setCompanyPersonId(selectedData.id);
  };

  const setFileInfo = (file) => {
    setUploadedFileName(file.name);
  }

  let formData = new FormData();
  const onFileChange = (e) => {
    if (e.target && e.target.files[0]) {
      formData.append("file", e.target.files[0]);
    }
    console.log("after:",formData)
  };

  const handleFileSubmit = () => {

    fetch("http://localhost:3001/api/upload/report/"+companyPersonId, {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("gelen response data:", data);
        if (data.ok) {
          setSuccessfulAlert(true);
          setDisplay(true);
          setTimeout(() => {
            setDisplay(false);
            window.location.reload();
          }, 2000);
        } else {
          setFailAlert(true);
          setDisplay(true);
        }
      })
      .catch((e) => {
        setFailAlert(true);
        setDisplay(true);
      });
  };

  return (
    <div className="rapor-container">
      <div className="rapor-container">
        <div className="Navbar-Part">
          <Navbar token={decoded}></Navbar>
        </div>
        <div className="rapor-content">
          <div className="rapor-dialog">
          <label>Selected Stakeholder: {companyPersonFullName} </label>
            <Button style={{marginTop:'1rem'}} variant="contained" className="dialog-button" onClick={handleClickOpen}>
              Choose Stakeholder
            </Button>
            {stakeholders && (
              <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
              />
            )}
          </div>
          <div className="rapor-upload-name-part">
            <h3 style={{marginBottom:'1rem'}}>Uploaded File Name:{uploadedFileName}</h3>
          </div>
          <div className="rapor-upload-file-part">
            {/* <label style={{marginBottom:'1rem'}}>Uploaded File Name: {fileName}</label> */}
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
            {failAlert && display && (
                <Alert severity="error">
                  An Error was Encountered. Please Check Your Information
                </Alert>
              )}
              {successfulAlert && display && (
                <Alert severity="success">
                  Your Form Has Been Successfully Saved
                </Alert>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rapor;
