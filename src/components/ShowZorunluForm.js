import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import "../styles/ZorunluForm.css";
import "../styles/ShowIsverenForm.css";
import formFoto from "../images/photo-forms.png";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import useFetch from "../helpers/useFetch";

import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";

const rejectReasons = [
  "Şirket Bilgileri Yetersiz",
  "Bu Şirkette Staj Kabul Edilemez",
  "Eksik Öğrenci Bilgisi",
];

const ShowZorunluForm = () => {
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
  const { key } = useParams();
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [isUserStudent, setIsUserStudent] = useState(null);

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const [ifControl, setIfControl] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController(); // we use abort controller to stop the fetch

    fetch("http://localhost:3001/api/user/form/" + key, {
      signal: abortCont.signal,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: null,
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setData(data.list[0]);
        setIsPending(false);
        setError(null);
        console.log("calisti");
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });
    //* cleans state for abort warnings while fetching for data
    return () => abortCont.abort();
  }, [ifControl]);

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
        <DialogTitle>Choose Reject Reason</DialogTitle>
        <List sx={{ pt: 0 }}>
          {rejectReasons.map((reason) => (
            <ListItem
              button
              onClick={() => handleListItemClick(reason)}
              key={reason}
            >
              <ListItemText primary={reason} />
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
    console.log("opened");
    setOpen(true);
  };

  const handleClose = (value) => {
    console.log("closed");
    setSelectedValue(value);
    setOpen(false);
    if (value != "") {
      const model = {
        uniqueKey: key,
        status: "0",
        rejectReason: value,
      };
      fetch("http://localhost:3001/api/form-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(model),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.ok) {
            window.location.reload();
          }
        })
        .catch((e) => {
          console.log("cannot logged:", e.message);
        });
      console.log("clicked reject");
    }
  };

  const handleApprove = () => {
    const model = {
      uniqueKey: key,
      status: "1",
      studentEmail: data.Value.studentEmail
    };
    fetch("http://localhost:3001/api/form-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(model),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.ok) {
          window.location.reload();
        }
      })
      .catch((e) => {
        console.log("cannot logged:", e.message);
      });
  };
  if (data && ifControl) {
    console.log("deneme", data);
    setIfControl(false);
  }

  const handleReject = () => {
    const model = {
      uniqueKey: key,
      status: "0",
    };
    fetch("http://localhost:3001/api/form-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(model),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.ok) {
          history.push("/studentforms");
        }
      })
      .catch((e) => {
        console.log("cannot logged:", e.message);
      });
    console.log("clicked reject");
  };

  if (isUserStudent === null) {
    if (decoded.role === 1) {
      setIsUserStudent(true);
    } else {
      setIsUserStudent(false);
    }
  }

  return (
    <div className="staj-container">
      <div className="Navbar-Part">
        <Navbar token={decoded}></Navbar>
      </div>
      {data && (
        <div className="staj-content">
          <div className="staj-logo-part">
            <div className="staj-content-logo">
              <img
                className="staj-content-logo-img"
                alt="logo"
                src={formFoto}
              ></img>
            </div>
            <div className="staj-header">
              <h1>Compulsory Internship Form</h1>
            </div>
          </div>
          <div className="staj-content-entry-part">
            <p>
              <h4>To the Relevant Authority,</h4>
              {data.Value.studentDepartment} &nbsp; Department/Program students
              are obliged to do internships in organizations and enterprises
              until the end of the study period. We would like to thank you for
              your interest in doing the internship of our student in your
              organization for {data.Value.studentInternTotalDay} days and wish
              you success in your studies.
            </p>
          </div>
          <div className="staj-student-info-part">
            <h3>STUDENT'S INFORMATION</h3>
            <div className="staj-company-row">
              <label className="staj-company-label">Citizenship No:</label>
              <input
                disabled={true}
                type="text"
                className="staj-company-input input"
                value={data.Value.studentCitizenshipNo}
              ></input>
            </div>
            <div className="staj-company-row">
              <div className="staj-company-row-left">
                <label className="staj-company-label">Full Name:</label>
                <input
                  disabled={true}
                  type="text"
                  className="staj-company-input input border"
                  value={data.Value.fullName}
                ></input>
              </div>
              <div className="staj-company-row-right">
                <label className="staj-company-label">School Id:</label>
                <input
                  disabled={true}
                  type="text"
                  className="staj-company-input input"
                  value={data.Value.studentSchoolId}
                ></input>
              </div>
            </div>
            <div className="staj-company-row">
              <div className="staj-company-row-left">
                <label className="staj-company-label">Department/Program</label>
                <input
                  disabled={true}
                  type="text"
                  className="staj-company-input input border"
                  value={data.Value.studentDepartment}
                ></input>
              </div>
              <div className="staj-company-row-right">
                <label className="staj-company-label border">
                Internship Course Code:
                </label>
                <input
                  disabled={true}
                  type="text"
                  className="staj-company-input input border"
                  value={data.Value.lessonCode}
                ></input>
              </div>
            </div>
            <div className="staj-company-row">
              <div className="staj-company-row-left">
                <label className="staj-company-label">E-Mail:</label>
                <input
                  disabled={true}
                  type="text"
                  className="staj-company-input input border"
                  value={data.Value.studentEmail}
                ></input>
              </div>
              <div className="staj-company-row-right">
                <label className="staj-company-label">Phone:</label>
                <input
                  disabled={true}
                  type="text"
                  className="staj-company-input input"
                  value={data.Value.studentPhone}
                ></input>
              </div>
            </div>
            <div className="staj-company-row">
              <label className="staj-company-label">Residence Address:</label>
              <input
                disabled={true}
                type="text"
                className="staj-company-input input"
                value={data.Value.studentAddress}
              ></input>
            </div>
          </div>
          <div className="staj-company-info-part">
            <h3>INTERNSHIP INSTITUTION</h3>
            <div className="staj-company-details">
              <div className="staj-company-row">
                <label className="staj-company-label">Name</label>
                <input
                  disabled={true}
                  type="text"
                  className="staj-company-input input"
                  value={data.Value.companyName}
                ></input>
              </div>
              <div className="staj-company-row">
                <label className="staj-company-label">Address</label>
                <input
                  disabled={true}
                  type="text"
                  className="staj-company-input input"
                  value={data.Value.companyAddress}
                ></input>
              </div>
              <div className="staj-company-row">
                <label className="staj-company-label">
                Production/Service Area
                </label>
                <input
                  disabled={true}
                  type="text"
                  className="staj-company-input input"
                  value={data.Value.companySector}
                ></input>
              </div>
              <div className="staj-company-row">
                <div className="staj-company-row-left">
                  <label className="staj-company-label">Phone</label>
                  <input
                    disabled={true}
                    type="text"
                    className="staj-company-input input border"
                    value={data.Value.companyPhone}
                  ></input>
                </div>
                <div className="staj-company-row-right">
                  <label className="staj-company-label">Fax</label>
                  <input
                    disabled={true}
                    type="text"
                    className="staj-company-input input"
                    value={data.Value.companyFax}
                  ></input>
                </div>
              </div>
              <div className="staj-company-row">
                <div className="staj-company-row-left">
                  <label className="staj-company-label">E-Mail</label>
                  <input
                    disabled={true}
                    type="text"
                    className="staj-company-input input border"
                    value={data.Value.companyMail}
                  ></input>
                </div>
                <div className="staj-company-row-right">
                  <label className="staj-company-label">Web Address</label>
                  <input
                    disabled={true}
                    type="text"
                    className="staj-company-input input"
                    value={data.Value.companyWeb}
                  ></input>
                </div>
              </div>
              <div className="staj-company-row">
                <div className="staj-company-row-left">
                  <label className="staj-company-label">
                  Internship Start Date:
                  </label>
                  <input
                    disabled={true}
                    type="text"
                    className="staj-company-input input border"
                    value={data.Value.studentInternStart}
                  ></input>
                </div>
                <div className="staj-company-row-mid">
                  <label className="staj-company-label">Internship End Date:</label>
                  <input
                    disabled={true}
                    type="text"
                    className="staj-company-input input"
                    value={data.Value.studentInternEnd}
                  ></input>
                </div>
                <div className="staj-company-row-right">
                  <label className="staj-company-label">Duration (days)</label>
                  <input
                    disabled={true}
                    type="text"
                    className="staj-company-input input"
                    value={data.Value.studentInternTotalDay}
                  ></input>
                </div>
              </div>
              <div className="staj-company-row">
                <label className="staj-company-label">
                Internship Days
                </label>
                <input
                  disabled={true}
                  type="text"
                  className="staj-company-input input"
                  value={data.Value.studentsInternDays}
                ></input>
              </div>
              <div className="staj-company-row">
                <label className="staj-company-label border">
                Internship Type:
                </label>
                <input
                  disabled={true}
                  type="text"
                  className="staj-company-input input"
                  value={data.Value.studentInternInfo}
                ></input>
              </div>
            </div>
          </div>
          <div className="staj-stakeholder-part">
            <h3>EMPLOYEE OF COMPANY</h3>
            <div className="staj-stakeholder-part-details">
              <div className="staj-stakeholder-part-row">
                <label className="staj-stakeholder-part-label ">
                Full Name
                </label>
                <input
                  disabled={true}
                  type="text"
                  className="staj-stakeholder-part-input input"
                  value={data.Value.companyPersonFullName}
                ></input>
              </div>
              <div className="staj-stakeholder-part-row">
                <label className="staj-stakeholder-part-label">
                Title
                </label>
                <input
                  disabled={true}
                  type="text"
                  className="staj-stakeholder-part-input input"
                  value={data.Value.companyPersonTitle}
                ></input>
              </div>
              <div className="staj-stakeholder-part-row">
                <label className="staj-stakeholder-part-label">
                E-Mail
                </label>
                <input
                  disabled={true}
                  type="text"
                  className="staj-stakeholder-part-input input"
                  value={data.Value.companyPersonMail}
                ></input>
              </div>
              <div className="staj-stakeholder-part-row">
                <label className="staj-stakeholder-part-label">Date</label>
                <input
                  disabled={true}
                  type="text"
                  className="staj-stakeholder-part-input input"
                  value={data.Value.companyPersonDate}
                ></input>
              </div>
            </div>
          </div>
          {!data.IsConfirmed && !isUserStudent && !data.IsRejected && (
            <div className="staj-button-part">
              <div className="show-staj-reject">
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleClickOpen}
                >
                  Reject
                </Button>
                {data && (
                  <SimpleDialog
                    selectedValue={selectedValue}
                    open={open}
                    onClose={handleClose}
                  />
                )}
              </div>
              <div className="show-staj-approve">
                <Button
                  variant="contained"
                  color="success"
                  endIcon={<ThumbUpIcon />}
                  onClick={handleApprove}
                >
                  Approve
                </Button>
              </div>
            </div>
          )}
          {data.IsConfirmed && !data.IsRejected && (
            <div className="show-staj-approved-info">
              <h2>Approved</h2>
            </div>
          )}
          {data.IsRejected && (
            <div className="show-staj-rejected-info">
              <h2>Rejected</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowZorunluForm;
