import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import "../styles/Degerlendirme.css";
import Login from "./Login";
import formFoto from "../images/photo-forms.png";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

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

const Degerlendirme = () => {
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
  let companyData = window.localStorage.getItem("company");
  companyData = companyData ? JSON.parse(companyData) : null;

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [isLoading, setIsPending] = useState(false);
  const [stakeholders, setStakeholders] = useState();
  const [isInputsDisabled, setIsInputsDisabled] = useState(false);
  const [ifControl, setIfControl] = useState(true);
  const [isLoginFail, setIsLoginFail] = useState();
  const [failAlert, setFailAlert] = useState();
  const [display, setDisplay] = useState(true);
  const [lessonCode, setLessonCode] = useState("");

  //* Company Part
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companySector, setCompanySector] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyFax, setCompanyFax] = useState("");
  const [companyMail, setCompanyMail] = useState("");
  const [companyWeb, setCompanyWeb] = useState("");
  const [companyEmployeeNo, setCompanyEmployeeNo] = useState("");

  //* Company Person part
  const [companyPersonFullName, setCompanyPersonFullName] = useState("");
  const [companyPersonTitle, setCompanyPersonTitle] = useState("");
  const [companyPersonMail, setCompanyPersonMail] = useState("");
  const [companyPersonDate, setCompanyPersonDate] = useState("");

  //* Student Part
  const [studentName, setStudentName] = useState("");
  const [studentSurname, setStudentSurname] = useState("");
  const [studentBirth, setStudentBirth] = useState("");
  const [studentSchoolId, setStudentSchoolId] = useState("");
  const [studentInternStart, setStudentInternStart] = useState("");
  const [studentInternEnd, setStudentInternEnd] = useState("");
  const [studentGetWage, setStudentGetWage] = useState();
  const [studentFaculty, setStudentFaculty] = useState("");
  const [studentInternTotalDay, setStudentInternTotalDay] = useState("");
  const [studentsInternDays, setStudentsInternDays] = useState("");
  const [studentInternInfo, setStudentInternInfo] = useState("");

  //* Evaluation Part
  const [companyPersonQ1, setCompanyPersonQ1] = useState("");
  const [companyPersonQ2, setCompanyPersonQ2] = useState();
  const [companyPersonQ3, setCompanyPersonQ3] = useState("");
  const [companyPersonQ4, setCompanyPersonQ4] = useState("");
  const [companyPersonQ5, setCompanyPersonQ5] = useState("");
  const [companyPersonOpinion, setCompanyPersonOpinion] = useState("");
  const [isUserStudent, setIsUserStudent] = useState(null);


  if (isUserStudent === null) {
    if (decoded.role === 1) {
      setIsUserStudent(true);
    } else {
      setIsUserStudent(false);
      history.push('/login')
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
    var currentdate = new Date();
    var datetime =
      currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate();
    console.log("selected data is here:", selectedData);
    setCompanyName(selectedData.companyName);
    setCompanyAddress(selectedData.companyAddress);
    setCompanySector(selectedData.companySector);
    setCompanyPhone(selectedData.companyPhoneNo);
    setCompanyFax(selectedData.companyFaxNo);
    setCompanyMail(selectedData.companyEmail);
    setCompanyWeb(selectedData.companyWebAddress);
    setCompanyEmployeeNo(selectedData.companyCompanyEmployeeNo);
    setCompanyPersonFullName(selectedData.companyEmployeeName);
    setCompanyPersonTitle(selectedData.title);
    setCompanyPersonMail(selectedData.email);
    setCompanyPersonDate(datetime);
    window.localStorage.setItem("company", JSON.stringify(selectedData));
  };

  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 5000);
  }, [display]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      companyName:companyData.companyName,
      companyAddress:companyData.companyAddress,
      companySector: companyData.companySector,
      companyPhone : companyData.companyPhoneNo,
      companyFax: companyData.companyFaxNo,
      companyMail : companyData.companyEmail,
      companyWeb: companyData.companyWebAddress,
      companyEmployeeNo: companyData.companyCompanyEmployeeNo,
      companyPersonFullName: companyData.companyEmployeeName,
      companyPersonTitle: companyData.title,
      companyPersonMail: companyData.email,
      companyPersonDate,
      studentCitizenshipNo: decoded.citizenshipNo,
      fullName: decoded.fullName,
      studentSchoolId:  decoded.studentNo,
      studentDepartment:  decoded.department,
      lessonCode,
      studentEmail:  decoded.email,
      studentPhone: decoded.phone,
      studentAddress: decoded.address,
      studentInternInfo,
      studentInternStart,
      studentInternEnd,
      studentInternTotalDay,
      studentsInternDays,
      companyPersonQ1,
      companyPersonQ2,
      companyPersonQ3,
      companyPersonQ4,
      companyPersonQ5,
      companyPersonOpinion,
      formType: 6,
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
          history.push("/forms");
        } else {
          setIsLoginFail(data.message);
          setFailAlert(true);
          setDisplay(true);
        }
      })
      .catch((e) => {
        console.log("cannot logged:", e.message);
      });
  };

  return (
    <div className="degerlendirme-container">
      <div className="Navbar-Part">
        <Navbar token={decoded}></Navbar>
      </div>
      <div className="degerlendirme-content">
        <div className="degerlendirme-header">
          <h2>Staj Değerlendirme Belgesi</h2>
        </div>
        <div className="degerlendirme-students-part">
          <h3 className="label">Staj Çalışması Yapan Öğrenciye İlişkin Bilgiler:</h3>
          <div className="degerlendirme-student-details">
            <div className="degerlendirme-student-row">
              <label className="degerlendirme-student-label ">
                Adı ve Soyadı
              </label>
              <p className="degerlendirme-student">{decoded.fullName}</p>
            </div>
            <div className="degerlendirme-student-row">
              <label className="degerlendirme-student-label ">Numarası</label>
              <p className="degerlendirme-student">{decoded.studentNo}</p>
            </div>
            <div className="degerlendirme-student-row">
              <label className="degerlendirme-student-label ">
                Bölüm/Program
              </label>
              <p className="degerlendirme-student">{decoded.department}</p>
            </div>
            <div className="degerlendirme-student-row">
              <label className="degerlendirme-student-label ">Staj No</label>
              <div className="degerlendirme-radio">
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
            </div>
          </div>
        </div>
        <div className="degerlendirme-company-part">
          <h3 className="label">STAJ YAPILAN KURUMUN</h3>
          <div className="degerlendirme-company-details">
            <div className="degerlendirme-company-row">
              <label className="degerlendirme-company-label">Adı</label>
              <input
                disabled={true}
                type="text"
                className="degerlendirme-company-input input"
                value={companyData ? companyData.companyName : ""}
                onChange={(e) => setCompanyName(e.target.value)}
              ></input>
            </div>
            <div className="degerlendirme-company-row">
              <label className="degerlendirme-company-label">Adresi</label>
              <input
                disabled={true}
                type="text"
                className="degerlendirme-company-input input"
                value={companyData ? companyData.companyAddress : ""}
                onChange={(e) => setCompanyAddress(e.target.value)}
              ></input>
            </div>
            <div className="degerlendirme-company-row">
              <div className="degerlendirme-company-row-left">
                <label className="degerlendirme-company-label">
                  Staj Başlangıç Tarihi:
                </label>
                <input
                  disabled={false}
                  type={"date"}
                  className="degerlendirme-company-input input border"
                  placeholder="Başlangıç"
                  value={studentInternStart}
                  onChange={(e) => setStudentInternStart(e.target.value)}
                ></input>
              </div>
              <div className="degerlendirme-company-row-mid">
                <label className="degerlendirme-company-label">
                  Bitiş Tarihi:
                </label>
                <input
                  disabled={false}
                  type={"date"}
                  className="degerlendirme-company-input input"
                  placeholder="Bitiş"
                  value={studentInternEnd}
                  onChange={(e) => setStudentInternEnd(e.target.value)}
                ></input>
              </div>
              <div className="degerlendirme-company-row-right">
                <label className="degerlendirme-company-label">
                  Süresi (gün)
                </label>
                <input
                  disabled={false}
                  type="text"
                  className="degerlendirme-company-input input"
                  value={studentInternTotalDay}
                  onChange={(e) => setStudentInternTotalDay(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="degerlendirme-company-row">
              <label className="degerlendirme-company-label border">
                Cumartesi Günü Staj Yapıldı mı ?
              </label>
              <FormControl
                component="fieldset"
                className="degerlendirme-form-control"
              >
                <RadioGroup
                  row
                  aria-label="wage"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="evet"
                    control={<Radio />}
                    label="Evet"
                    onChange={(e) => setStudentInternInfo("Evet")}
                  />
                  <FormControlLabel
                    style={{ marginLeft: 300 }}
                    value="hayır"
                    control={<Radio />}
                    label="Hayır"
                    onChange={(e) => setStudentInternInfo("Hayır")}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="degerlendirme-evaluate-part">
          <div className="degerlendirme-evaluate-left-part">
            <div className="degerlendirme-evaluate-row">
              <label className="degerlendirme-evaluate-label ">
                Değerlendirme
              </label>
              <p className="degerlendirme-evaluate">Not(1-5)</p>
            </div>{" "}
            <div className="degerlendirme-evaluate-row">
              <label className="degerlendirme-evaluate-label ">
                Devam durumu
              </label>
              <input
                type="text"
                className="degerlendirme-evaluate input"
                disabled={true}
                value={companyPersonQ1}
                onChange={(e) => setCompanyPersonQ1(e.target.value)}
              ></input>
            </div>{" "}
            <div className="degerlendirme-evaluate-row">
              <label className="degerlendirme-evaluate-label ">
                Çalışma gayret ve disiplini
              </label>
              <input
                type="text"
                className="degerlendirme-evaluate input"
                disabled={true}
                value={companyPersonQ2}
                onChange={(e) => setCompanyPersonQ2(e.target.value)}
              ></input>
            </div>{" "}
            <div className="degerlendirme-evaluate-row">
              <label className="degerlendirme-evaluate-label ">
                Yeteneği ve başarı durumu
              </label>
              <input
                type="text"
                className="degerlendirme-evaluate input"
                disabled={true}
                value={companyPersonQ3}
                onChange={(e) => setCompanyPersonQ3(e.target.value)}
              ></input>
            </div>{" "}
            <div className="degerlendirme-evaluate-row">
              <label className="degerlendirme-evaluate-label ">
                Amirlerine karşı tutumu
              </label>
              <input
                type="text"
                className="degerlendirme-evaluate input"
                disabled={true}
                value={companyPersonQ4}
                onChange={(e) => setCompanyPersonQ4(e.target.value)}
              ></input>
            </div>
            <div className="degerlendirme-evaluate-row">
              <label className="degerlendirme-evaluate-label ">
                Arkadaşlarına davranışı
              </label>
              <input
                type="text"
                className="degerlendirme-evaluate input"
                disabled={true}
                value={companyPersonQ5}
                onChange={(e) => setCompanyPersonQ5(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="degerlendirme-evaluate-right-part">
            <h3 className="label">Stajyer hakkında görüşleriniz</h3>
            <div className="degerlendirme-evaluate-opinion">
            <input
                  type="text"
                  className="degerlendirme-evaluate input"
                  disabled={true}
                  value={companyPersonOpinion}
                  onChange={(e) => setCompanyPersonOpinion(e.target.value)}
                ></input>
            </div>
          </div>
        </div>
        <div className="company-person-part">
          <h3 className="label">İŞVEREN VEYA YETKİLİNİN</h3>
          <div className="company-person-part-details">
            <div className="company-person-part-row">
              <label className="company-person-part-label ">Adı Soyadı</label>
              <input
                disabled={true}
                type="text"
                className="company-person-part-input input"
                value={companyData ? companyData.companyEmployeeName : ""}
                onChange={(e) => setCompanyPersonFullName(e.target.value)}
              ></input>
            </div>
            <div className="company-person-part-row">
              <label className="company-person-part-label">
                Görev ve Unvanı
              </label>
              <input
                disabled={true}
                type="text"
                className="company-person-part-input input"
                value={companyData ? companyData.title : ""}
                onChange={(e) => setCompanyPersonTitle(e.target.value)}
              ></input>
            </div>
            <div className="company-person-part-row">
              <label className="company-person-part-label">
                E-posta adresi
              </label>
              <input
                disabled={true}
                type="text"
                className="company-person-part-input input"
                value={companyData ? companyData.email : ""}
                onChange={(e) => setCompanyPersonMail(e.target.value)}
              ></input>
            </div>
            <div className="company-person-part-row">
              <label className="company-person-part-label">Tarih</label>
              <input
                disabled={true}
                type="text"
                className="company-person-part-input input"
                value={companyPersonDate}
                onChange={(e) => setCompanyPersonDate(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <div className="company-button-part">
          <div className="company-dialog">
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
          <div className="staj-button">
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
            >
              Send For Approval
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Degerlendirme;
