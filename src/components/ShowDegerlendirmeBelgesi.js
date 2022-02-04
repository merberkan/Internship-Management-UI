import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import "../styles/Degerlendirme.css";
import Login from "./Login";
import formFoto from "../images/photo-forms.png";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

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
import useFetch from "../helpers/useFetch";

const rejectReasons = [
  "Şirket Bilgileri Yetersiz",
  "Bu Şirkette Staj Kabul Edilemez",
  "Eksik Öğrenci Bilgisi",
];

const ShowDegerlendirme = () => {
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
  const { key } = useParams();

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [stakeholders, setStakeholders] = useState();
  const [isInputsDisabled, setIsInputsDisabled] = useState(false);
  const [ifControl, setIfControl] = useState(true);
  const [isLoginFail, setIsLoginFail] = useState();
  const [failAlert, setFailAlert] = useState();
  const [display, setDisplay] = useState(true);

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [isUserGrader, setIsUserGrader] = useState(null);

  const [isUserStakeholder, setIsUserStakeholder] = useState(null);

  //* Evaluation Part
  const [companyPersonQ1, setCompanyPersonQ1] = useState("");
  const [companyPersonQ2, setCompanyPersonQ2] = useState();
  const [companyPersonQ3, setCompanyPersonQ3] = useState("");
  const [companyPersonQ4, setCompanyPersonQ4] = useState("");
  const [companyPersonQ5, setCompanyPersonQ5] = useState("");
  const [companyPersonOpinion, setCompanyPersonOpinion] = useState("");

  const [companyPersonDate, setCompanyPersonDate] = useState("");

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
        console.log(data.list[0]);
        setData(data.list[0]);
        setIsPending(false);
        setError(null);
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

  if (isUserStakeholder === null && data) {
    console.log("data", data);
    if (decoded.role === 6 && data.IsConfirmed ) {
        setIsUserStakeholder(true);
        setIsInputsDisabled(false);
        var currentdate = new Date();
        var datetime =
          currentdate.getFullYear() +
          "-" +
          (currentdate.getMonth() + 1) +
          "-" +
          currentdate.getDate();
        setCompanyPersonDate(datetime);
      }else if (decoded.role === 6 ) {
      setIsUserStakeholder(true);
      setIsInputsDisabled(false);
      var currentdate = new Date();
      var datetime =
        currentdate.getFullYear() +
        "-" +
        (currentdate.getMonth() + 1) +
        "-" +
        currentdate.getDate();
      setCompanyPersonDate(datetime);
    } else {
      setIsUserStakeholder(false);
      setIsInputsDisabled(true);
    }
    console.log(data.Value.IsConfirmed);
    console.log(isInputsDisabled);
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

  const handleUpdate = (e) => {
    e.preventDefault();
    const model = {
      companyName: data.Value.companyName,
      companyAddress: data.Value.companyAddress,
      companySector: data.Value.companySector,
      companyPhone: data.Value.companyPhone,
      companyFax: data.Value.companyFax,
      companyMail: data.Value.companyMail,
      companyWeb: data.Value.companyWeb,
      companyEmployeeNo: data.Value.companyEmployeeNo,
      companyPersonFullName: data.Value.companyPersonFullName,
      companyPersonTitle: data.Value.companyPersonTitle,
      companyPersonMail: data.Value.companyPersonMail,
      fullName: data.Value.fullName,
      studentSurname: data.Value.studentSurname,
      studentBirth: data.Value.studentBirth,
      studentDepartment: data.Value.studentDepartment,
      studentSchoolId: data.Value.studentSchoolId,
      studentInternStart: data.Value.studentInternStart,
      studentInternEnd: data.Value.studentInternEnd,
      studentInternInfo: data.Value.studentInternInfo,
      studentInternTotalDay: data.Value.studentInternTotalDay,
      lessonCode: data.Value.lessonCode,
      companyPersonDate,
      companyPersonQ1,
      companyPersonQ2,
      companyPersonQ3,
      companyPersonQ4,
      companyPersonQ5,
      companyPersonOpinion,
      formType: 6,
    };

    console.log("giden örnek model:", model);

    fetch("http://localhost:3001/api/user/form-update/" + key, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(model),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          //   window.localStorage.setItem("token", data.data.token);
          history.push("/studentforms");
        } else {
          console.log(data.message);
        }
      })
      .catch((e) => {
        console.log("cannot logged:", e.message);
      });
  };

  const handleApprove = () => {
    const model = {
      uniqueKey: key,
      status: "1",
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

  if (isUserGrader === null) {
    if (decoded.role === 5) {
      setIsUserGrader(true);
    } else {
      setIsUserGrader(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 5000);
  }, [display]);

  return (
    <div className="degerlendirme-container">
      <div className="Navbar-Part">
        <Navbar token={decoded}></Navbar>
      </div>
      {data && (
        <div className="degerlendirme-content">
          <div className="degerlendirme-header">
            <h2>Internship Evaluation Form</h2>
          </div>
          <div className="degerlendirme-students-part">
            <h3 className="label">
            Information about the Student Doing Internship Work:
            </h3>
            <div className="degerlendirme-student-details">
              <div className="degerlendirme-student-row">
                <label className="degerlendirme-student-label ">
                Full Name
                </label>
                <p className="degerlendirme-student">{data.Value.fullName}</p>
              </div>
              <div className="degerlendirme-student-row">
                <label className="degerlendirme-student-label ">Phone</label>
                <p className="degerlendirme-student">
                  {data.Value.studentSchoolId}
                </p>
              </div>
              <div className="degerlendirme-student-row">
                <label className="degerlendirme-student-label ">
                Department/Program
                </label>
                <p className="degerlendirme-student">
                  {data.Value.studentDepartment}
                </p>
              </div>
              <div className="degerlendirme-student-row">
                <label className="degerlendirme-student-label ">Internship No</label>
                <div className="degerlendirme-radio">
                  <p className="degerlendirme-student-center">
                    {data.Value.lessonCode}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="degerlendirme-company-part">
            <h3 className="label">INTERNSHIP INSTITUTION</h3>
            <div className="degerlendirme-company-details">
              <div className="degerlendirme-company-row">
                <label className="degerlendirme-company-label">Name</label>
                <p className="degerlendirme-company-center">
                  {data.Value.companyName}
                </p>
              </div>
              <div className="degerlendirme-company-row">
                <label className="degerlendirme-company-label">Address</label>
                <p className="degerlendirme-company-center">
                  {data.Value.companyAddress}
                </p>
              </div>
              <div className="degerlendirme-company-row">
                <div className="degerlendirme-company-row-left">
                  <label className="degerlendirme-company-label">
                  Internship Start Date:
                  </label>
                  <p className="degerlendirme-company-center">
                    {data.Value.studentInternStart}
                  </p>
                </div>
                <div className="degerlendirme-company-row-mid">
                  <label className="degerlendirme-company-label">
                  Internship End Date:
                  </label>
                  <p className="degerlendirme-company-center">
                    {data.Value.studentInternEnd}
                  </p>
                </div>
                <div className="degerlendirme-company-row-right">
                  <label className="degerlendirme-company-label">
                  Duration (days)
                  </label>
                  <p className="degerlendirme-company-center">
                    {data.Value.studentInternTotalDay}
                  </p>
                </div>
              </div>
              <div className="degerlendirme-company-row">
                <label className="degerlendirme-company-label border">
                Was there an internship on Saturday?
                </label>
                <p className="degerlendirme-company-center">
                  {data.Value.studentInternInfo}
                </p>
              </div>
            </div>
          </div>
          <div className="degerlendirme-evaluate-part">
            <div className="degerlendirme-evaluate-left-part">
              <div className="degerlendirme-evaluate-row">
                <label className="degerlendirme-evaluate-label ">
                Evaluations
                </label>
                <p className="degerlendirme-evaluate">Grade(1-5)</p>
              </div>{" "}
              <div className="degerlendirme-evaluate-row">
                <label className="degerlendirme-evaluate-label ">
                Continuation Status
                </label>
                {!isUserGrader && (
                  <input
                    type="text"
                    className="degerlendirme-evaluate input"
                    disabled={isInputsDisabled}
                    value={
                      data.IsConfirmed === true
                        ? data.Value.companyPersonQ1
                        : companyPersonQ1
                    }
                    onChange={(e) => setCompanyPersonQ1(e.target.value)}
                  ></input>
                )}

                {isUserGrader && (
                  <input
                    type="text"
                    className="degerlendirme-evaluate input"
                    disabled={isInputsDisabled}
                    value={data.Value.companyPersonQ1}
                    onChange={(e) => setCompanyPersonQ1(e.target.value)}
                  ></input>
                )}
              </div>{" "}
              <div className="degerlendirme-evaluate-row">
                <label className="degerlendirme-evaluate-label ">
                Work Diligence and Discipline
                </label>
                {!isUserGrader && (
                  <input
                    type="text"
                    className="degerlendirme-evaluate input"
                    disabled={isInputsDisabled}
                    value={
                      data.IsConfirmed === true
                        ? data.Value.companyPersonQ2
                        : companyPersonQ2
                    }
                    onChange={(e) => setCompanyPersonQ2(e.target.value)}
                  ></input>
                )}

                {isUserGrader && (
                  <input
                    type="text"
                    className="degerlendirme-evaluate input"
                    disabled={isInputsDisabled}
                    value={data.Value.companyPersonQ2}
                    onChange={(e) => setCompanyPersonQ2(e.target.value)}
                  ></input>
                )}
              </div>{" "}
              <div className="degerlendirme-evaluate-row">
                <label className="degerlendirme-evaluate-label ">
                Ability and Success
                </label>
                {!isUserGrader && (
                  <input
                    type="text"
                    className="degerlendirme-evaluate input"
                    disabled={isInputsDisabled}
                    value={
                      data.IsConfirmed === true
                        ? data.Value.companyPersonQ3
                        : companyPersonQ3
                    }
                    onChange={(e) => setCompanyPersonQ3(e.target.value)}
                  ></input>
                )}

                {isUserGrader && (
                  <input
                    type="text"
                    className="degerlendirme-evaluate input"
                    disabled={isInputsDisabled}
                    value={data.Value.companyPersonQ3}
                    onChange={(e) => setCompanyPersonQ3(e.target.value)}
                  ></input>
                )}
              </div>{" "}
              <div className="degerlendirme-evaluate-row">
                <label className="degerlendirme-evaluate-label ">
                Attitude Towards His Superiors
                </label>
                {!isUserGrader && (
                  <input
                    type="text"
                    className="degerlendirme-evaluate input"
                    disabled={isInputsDisabled}
                    value={
                      data.IsConfirmed === true
                        ? data.Value.companyPersonQ4
                        : companyPersonQ4
                    }
                    onChange={(e) => setCompanyPersonQ4(e.target.value)}
                  ></input>
                )}

                {isUserGrader && (
                  <input
                    type="text"
                    className="degerlendirme-evaluate input"
                    disabled={isInputsDisabled}
                    value={data.Value.companyPersonQ4}
                    onChange={(e) => setCompanyPersonQ4(e.target.value)}
                  ></input>
                )}
              </div>
              <div className="degerlendirme-evaluate-row">
                <label className="degerlendirme-evaluate-label ">
                Behavior Status of Colleague
                </label>
                {!isUserGrader && (
                  <input
                    type="text"
                    className="degerlendirme-evaluate input"
                    disabled={isInputsDisabled}
                    value={
                      data.IsConfirmed === true
                        ? data.Value.companyPersonQ5
                        : companyPersonQ5
                    }
                    onChange={(e) => setCompanyPersonQ5(e.target.value)}
                  ></input>
                )}

                {isUserGrader && (
                  <input
                    type="text"
                    className="degerlendirme-evaluate input"
                    disabled={isInputsDisabled}
                    value={data.Value.companyPersonQ5}
                    onChange={(e) => setCompanyPersonQ5(e.target.value)}
                  ></input>
                )}
              </div>
            </div>
            <div className="degerlendirme-evaluate-right-part">
              <h3 style={{ borderBottom: "1px solid black" }} className="label">
              Your Views on The Interner
              </h3>
              <div className="degerlendirme-evaluate-opinion">
                {!isUserGrader && (
                  <textarea
                    placeholder="Önerileriniz"
                    value={
                      data.IsConfirmed === true
                        ? data.Value.companyPersonOpinion
                        : companyPersonOpinion
                    }
                    disabled={isInputsDisabled}
                    onChange={(e) => setCompanyPersonOpinion(e.target.value)}
                    className="degerlendirme-evalueate-textarea"
                  ></textarea>
                )}

                {isUserGrader && (
                  <textarea
                    placeholder="Önerileriniz"
                    value={data.Value.companyPersonOpinion}
                    disabled={isInputsDisabled}
                    onChange={(e) => setCompanyPersonOpinion(e.target.value)}
                    className="degerlendirme-evalueate-textarea"
                  ></textarea>
                )}
              </div>
            </div>
          </div>
          <div className="company-person-part">
            <h3 className="label">EMPLOYER</h3>
            <div className="company-person-part-details">
              <div className="company-person-part-row">
                <label className="company-person-part-label ">Full Name</label>
                <p className="degerlendirme-company-center">
                  {data.Value.companyPersonFullName}
                </p>
              </div>
              <div className="company-person-part-row">
                <label className="company-person-part-label">
                Title
                </label>
                <p className="degerlendirme-company-center">
                  {data.Value.companyPersonTitle}
                </p>
              </div>
              <div className="company-person-part-row">
                <label className="company-person-part-label">
                E-Mail
                </label>
                <p className="degerlendirme-company-center">
                  {data.Value.companyPersonMail}
                </p>
              </div>
              <div className="company-person-part-row">
                <label className="company-person-part-label">Date</label>
                <p className="degerlendirme-company-center">
                  {data.Value.companyPersonDate}
                </p>
              </div>
            </div>
          </div>
          <div className="company-button-part">
            {isUserStakeholder && !data.IsConfirmed && (
              <div className="isveren-button">
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleUpdate}
                >
                  Send For Approval
                </Button>
              </div>
            )}
            {!data.IsConfirmed && isUserGrader && !isUserStakeholder && (
              <div className="show-isveren-buttons-part">
                <div className="show-isveren-reject">
                  <div className="isveren-dialog">
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
                </div>
                <div className="show-isveren-approve">
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
              <div className="show-isveren-approved-info">
                <h2>Approved</h2>
              </div>
            )}
            {data.IsRejected && (
              <div className="show-isveren-rejected-info">
                <h2>Rejected</h2>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowDegerlendirme;
