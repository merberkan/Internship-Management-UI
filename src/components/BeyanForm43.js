import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import "../styles/BeyanForm.css";
import formFoto from "../images/photo-forms.png";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import useFetch from "../helpers/useFetch";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";

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

const BeyanForm43 = () => {
  const history = useHistory();
  let token;
  try {
    token = window.localStorage.getItem("token");
  } catch (error) {
    history.push("/login");
  }
  const [isUserLogged, setIsUserLogged] = useState(null);

  if (isUserLogged === null) {
    if (token) {
      setIsUserLogged(true);
    } else {
      setIsUserLogged(false);
      history.push("/login");
    }
  }
  var decoded = jwt_decode(token);
  let companyData = window.localStorage.getItem("company");
  companyData = companyData ? JSON.parse(companyData) : null;
  const [fullName, setFullName] = useState("");
  const [id, setId] = useState("");
  const [department1, setDepartment1] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [department2, setDepartment2] = useState("");
  const [company, setCompany] = useState("");
  const [lessonCode, setLessonCode] = useState("");
  const [successfulAlert, setSuccessfulAlert] = useState();
  const [failAlert, setFailAlert] = useState();
  const [display, setDisplay] = useState(true);
  const [stakeholders, setStakeholders] = useState();
  const [ifControl, setIfControl] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [isUserStudent, setIsUserStudent] = useState(null);

  if (isUserStudent === null) {
    if (decoded.role === 1) {
      setIsUserStudent(true);
    } else {
      setIsUserStudent(false);
      history.push("/login");
    }
  }

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
    setCompany(selectedData.companyName);
    window.localStorage.setItem("company", JSON.stringify(selectedData));
  };

  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
      setFailAlert(false);
      setSuccessfulAlert(false);
    }, 3000);
  }, [display]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      lessonCode === "" ||
      !companyData
    ) {
      setFailAlert(true);
      setDisplay(true);
    }else{
      console.log("lesson code geldi:", lessonCode);
      const data = {
        fullName: decoded.fullName,
        id: decoded.citizenshipNo,
        department1: decoded.department,
        schoolId: decoded.studentNo,
        faculty: decoded.faculty,
        department2: decoded.department,
        company: companyData.companyName,
        formType: 4,
        lessonCode: lessonCode,
      };
  
      console.log("giden model:", JSON.stringify(data));
  
      fetch("http://localhost:3001/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.ok) {
            //   window.localStorage.setItem("token", data.data.token);
            setSuccessfulAlert(true);
            setDisplay(true);
            setTimeout(() => {
              setDisplay(false);
              history.push("/forms");
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
    }
    
  };

  return (
    <div className="beyan-container">
      <div className="Navbar-Part">
        <Navbar token={decoded}></Navbar>
      </div>
      <div className="beyan-content">
        <div className="content-logo-part">
          <div className="content-logo">
            <img className="content-logo-img" alt="logo" src={formFoto}></img>
          </div>
        </div>
        <div className="content-form-part">
          <form onSubmit={handleSubmit}>
            <div className="form-header">
              <h2>DECLARATION AND COMMITMENT (43)</h2>
            </div>
            <div className="form-detail-part">
              <p>
                &nbsp;&nbsp; I am a student of {decoded.department} department
                of the Faculty of {decoded.faculty} of the University I would
                like to work as a Part-Time Student / Trainee Student in  &nbsp;&nbsp;
                <input
                  type="text"
                  required
                  className="desc-inputs"
                  disabled={true}
                  value={companyData ? companyData.companyName : ""}
                  onChange={(e) => setCompany(e.target.value)}
                ></input>{" "}unit/workplace in accordance with Article 5/b of
                the Law No. 5510. I don't get health care from my parents
                through general health insurance through my parents. Therefore,
                I agree to be covered by general health insurance during my
                part-time work or internship.<br></br> &nbsp;&nbsp;
                I agree that I will notify
                you immediately of the accuracy of my statement and if there is
                a change in my status, I undertake that I will pay the premium,
                administrative fine, delay increase and late interest resulting
                from the inaccurate or incompleteness of my statement.
              </p>
            </div>
            <div className="form-student-inputs">
              <div className="input-part">
                <label>Full Name: </label>
                <p className="form-student-text">{decoded.fullName}</p>
              </div>
              <div className="input-part">
                <label>Citizenship No: </label>
                <p className="form-student-text">{decoded.citizenshipNo}</p>
              </div>
              <div className="input-part">
                <label>Department:</label>
                <p className="form-student-text">{decoded.department}</p>
              </div>
              <div className="input-part">
                <label>School Id:</label>
                <p className="form-student-text">{decoded.studentNo}</p>
              </div>
              <div className="input-part">
                <label>Internship No:</label>
                <FormControl component="fieldset" required={true}>
                  <RadioGroup
                    row
                    aria-label="wage"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="190"
                      control={<Radio />}
                      label="190"
                      onChange={(e) => setLessonCode("190")}
                    />
                    <FormControlLabel
                      style={{ marginLeft: 100 }}
                      value="290"
                      control={<Radio />}
                      label="290"
                      onChange={(e) => setLessonCode("290")}
                    />
                    <FormControlLabel
                      style={{ marginLeft: 100 }}
                      value="390"
                      control={<Radio />}
                      label="390"
                      onChange={(e) => setLessonCode("390")}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="beyan-form-buttons">
                <div className="beyan-form-dialog">
                  <Button variant="contained" onClick={handleClickOpen}>
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
                <div className="beyan-send-button">
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                  >
                    Send For Approval
                  </Button>
                </div>
              </div>

              {failAlert && display && (
                <Alert severity="error">
                  Check the Missing Information Detected Form.
                </Alert>
              )}
              {successfulAlert && display && (
                <Alert severity="success">
                  Your Form Has Been Successfully Saved
                </Alert>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BeyanForm43;
