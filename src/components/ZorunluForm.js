import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import "../styles/ZorunluForm.css";
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
import Alert from '@mui/material/Alert';

import useFetch from "../helpers/useFetch";

const ZorunluForm = () => {
  let companyData = window.localStorage.getItem("company")
  companyData = companyData ? JSON.parse(companyData):null;
  const history = useHistory();
  const [tokenData, setTokenData] = useState(null);
  const [ifControl, setIfControl] = useState(true);
  const [isLoginFail, setIsLoginFail] = useState();
  const [failAlert, setFailAlert] = useState();
  const [display, setDisplay] = useState(true);



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

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [isLoading, setIsPending] = useState(false);
  const [stakeholders, setStakeholders] = useState();
  const [isInputsDisabled, setIsInputsDisabled] = useState(false);
  const token = window.localStorage.getItem("token");
  var decoded = jwt_decode(token);

  const [lessonCode, setLessonCode] = useState("");

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
    // setCompanyName(selectedData.companyName);
    // setCompanyAddress(selectedData.companyAddress);
    // setCompanySector(selectedData.companySector);
    // setCompanyPhone(selectedData.companyPhoneNo);
    // setCompanyFax(selectedData.companyFaxNo);
    // setCompanyMail(selectedData.companyEmail);
    // setCompanyWeb(selectedData.companyWebAddress);
    // setCompanyEmployeeNo(selectedData.companyCompanyEmployeeNo);
    // setCompanyPersonFullName(selectedData.companyEmployeeName);
    // setCompanyPersonTitle(selectedData.title);
    // setCompanyPersonMail(selectedData.email);
    // setCompanyPersonDate("");
    // setIsInputsDisabled(true);
    window.localStorage.setItem("company", JSON.stringify(selectedData));
  };

  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 5000);
  }, [display])

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("studentGetWage Value:", studentGetWage);
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
      formType: 1,
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
    <div className="staj-container">
      <div className="Navbar-Part">
        <Navbar token={decoded}></Navbar>
      </div>
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
            <h1>Zorunlu Staj Formu</h1>
          </div>
          {failAlert && display && <Alert severity="error">{isLoginFail}</Alert>}
        </div>
        <div className="staj-content-entry-part">
          <p>
            <h4>İlgili Makam’a,</h4>
            {decoded.department} &nbsp; Bölümü/Programı öğrencilerinin öğrenim
            süresi sonuna kadar kuruluş ve işletmelerde staj yapma zorunluluğu
            vardır. Aşağıda bilgileri yer alan öğrencimizin stajını{" "}
            <input
              type="text"
              required
              className="entry-inputs2 input"
              value={studentInternTotalDay}
              onChange={(e) => setStudentInternTotalDay(e.target.value)}
            ></input>{" "}
            gün süreyle kuruluşunuzda yapmasında göstereceğiniz ilgiye teşekkür
            eder, çalışmalarınızda başarılar dileriz.
          </p>
        </div>
        <div className="staj-student-info-part">
          <h3>ÖĞRENCİNİN BİLGİLERİ</h3>
          <div className="staj-company-row">
            <label className="staj-company-label">T.C Kimlik No:</label>
            <p className="staj-company-input input">{decoded.citizenshipNo}</p>
          </div>
          <div className="staj-company-row">
            <div className="staj-company-row-left">
              <label className="staj-company-label">Adı Soyadı:</label>
              <p className="staj-company-input input">{decoded.fullName}</p>
            </div>
            <div className="staj-company-row-right">
              <label className="staj-company-label">Öğrenci No:</label>
              <p className="staj-company-input input">{decoded.studentNo}</p>
            </div>
          </div>
          <div className="staj-company-row">
            <div className="staj-company-row-left">
              <label className="staj-company-label">Bölüm/Program</label>
              <p className="staj-company-input input">{decoded.department}</p>
            </div>
            <div className="staj-company-row-right">
              <label className="staj-company-label border">
                Staj Uygulama Türü:
              </label>
              <FormControl component="fieldset" className="staj-form-control">
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
          <div className="staj-company-row">
            <div className="staj-company-row-left">
              <label className="staj-company-label">E-Posta Adresi:</label>
              <p className="staj-company-input input">{decoded.email}</p>
            </div>
            <div className="staj-company-row-right">
              <label className="staj-company-label">Telefon No:</label>
              <p className="staj-company-input input">{decoded.phone}</p>
            </div>
          </div>
          <div className="staj-company-row">
            <label className="staj-company-label">İkametgah Adresi:</label>
            <p className="staj-company-input input">{decoded.address}</p>
          </div>
        </div>
        <div className="staj-company-info-part">
          <h3>STAJ YAPILAN KURUMUN</h3>
          <div className="staj-company-details">
            <div className="staj-company-row">
              <label className="staj-company-label">Adı</label>
              <input
                disabled={isInputsDisabled}
                type="text"
                className="staj-company-input input"
                value={companyData ? companyData.companyName:""}
                onChange={(e) => setCompanyName(e.target.value)}
              ></input>
            </div>
            <div className="staj-company-row">
              <label className="staj-company-label">Adresi</label>
              <input
                disabled={isInputsDisabled}
                type="text"
                className="staj-company-input input"
                value={companyData ? companyData.companyAddress:""}
                onChange={(e) => setCompanyAddress(e.target.value)}
              ></input>
            </div>
            <div className="staj-company-row">
              <label className="staj-company-label">Üretim/Hizmet Alanı</label>
              <input
                disabled={isInputsDisabled}
                type="text"
                className="staj-company-input input"
                value={companyData ? companyData.companySector:""}
                onChange={(e) => setCompanySector(e.target.value)}
              ></input>
            </div>
            <div className="staj-company-row">
              <div className="staj-company-row-left">
                <label className="staj-company-label">Telefon</label>
                <input
                  disabled={isInputsDisabled}
                  type="text"
                  className="staj-company-input input border"
                  value={companyData ? companyData.companyPhoneNo:""}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                ></input>
              </div>
              <div className="staj-company-row-right">
                <label className="staj-company-label">Faks</label>
                <input
                  disabled={isInputsDisabled}
                  type="text"
                  className="staj-company-input input"
                  value={companyData ? companyData.companyFaxNo:""}
                  onChange={(e) => setCompanyFax(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="staj-company-row">
              <div className="staj-company-row-left">
                <label className="staj-company-label">E-posta adresi</label>
                <input
                  disabled={isInputsDisabled}
                  type="text"
                  className="staj-company-input input border"
                  value={companyData ? companyData.companyEmail : ""}
                  onChange={(e) => setCompanyMail(e.target.value)}
                ></input>
              </div>
              <div className="staj-company-row-right">
                <label className="staj-company-label">Web Adresi</label>
                <input
                  disabled={isInputsDisabled}
                  type="text"
                  className="staj-company-input input"
                  value={companyData ? companyData.companyWebAddress:""}
                  onChange={(e) => setCompanyWeb(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="staj-company-row">
              <div className="staj-company-row-left">
                <label className="staj-company-label">
                  Staj Başlangıç Tarihi:
                </label>
                <input
                  disabled={false}
                  type={'date'}
                  className="staj-company-input input border"
                  placeholder="Başlangıç"
                  value={studentInternStart}
                  onChange={(e) => setStudentInternStart(e.target.value)}
                ></input>
              </div>
              <div className="staj-company-row-mid">
                <label className="staj-company-label">Bitiş Tarihi:</label>
                <input
                  disabled={false}
                  type={'date'}
                  className="staj-company-input input"
                  placeholder="Bitiş"
                  value={studentInternEnd}
                  onChange={(e) => setStudentInternEnd(e.target.value)}
                ></input>
              </div>
              <div className="staj-company-row-right">
                <label className="staj-company-label">Süresi (gün)</label>
                <input
                  disabled={false}
                  type="text"
                  className="staj-company-input input"
                  value={studentInternTotalDay}
                  onChange={(e) => setStudentInternTotalDay(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="staj-company-row">
              <label className="staj-company-label">
                Staja Çıkılacak Günler
              </label>
              <input
                disabled={false}
                type="text"
                className="staj-company-input input"
                value={studentsInternDays}
                onChange={(e) => setStudentsInternDays(e.target.value)}
              ></input>
            </div>
            <div className="staj-company-row">
              <label className="staj-company-label border">
                Staj Uygulama Türü:
              </label>
              <FormControl component="fieldset" className="staj-form-control">
                <RadioGroup
                  row
                  aria-label="wage"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="zorunlu"
                    control={<Radio />}
                    label="Zorunlu"
                    onChange={(e) => setStudentInternInfo("Zorunlu")}
                  />
                  <FormControlLabel
                    style={{ marginLeft: 300 }}
                    value="gonullu"
                    control={<Radio />}
                    label="Gönüllü"
                    onChange={(e) => setStudentInternInfo("Gönüllü")}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="staj-stakeholder-part">
          <h3>İŞVEREN VEYA YETKİLİNİN</h3>
          <div className="staj-stakeholder-part-details">
            <div className="staj-stakeholder-part-row">
              <label className="staj-stakeholder-part-label ">Adı Soyadı</label>
              <input
                disabled={isInputsDisabled}
                type="text"
                className="staj-stakeholder-part-input input"
                value={companyData ? companyData.companyEmployeeName:""}
                onChange={(e) => setCompanyPersonFullName(e.target.value)}
              ></input>
            </div>
            <div className="staj-stakeholder-part-row">
              <label className="staj-stakeholder-part-label">
                Görev ve Unvanı
              </label>
              <input
                disabled={isInputsDisabled}
                type="text"
                className="staj-stakeholder-part-input input"
                value={companyData ? companyData.title:""}
                onChange={(e) => setCompanyPersonTitle(e.target.value)}
              ></input>
            </div>
            <div className="staj-stakeholder-part-row">
              <label className="staj-stakeholder-part-label">
                E-posta adresi
              </label>
              <input
                disabled={isInputsDisabled}
                type="text"
                className="staj-stakeholder-part-input input"
                value={companyData ? companyData.email:""}
                onChange={(e) => setCompanyPersonMail(e.target.value)}
              ></input>
            </div>
            <div className="staj-stakeholder-part-row">
              <label className="staj-stakeholder-part-label">Tarih</label>
              <input
                disabled={isInputsDisabled}
                type="text"
                className="staj-stakeholder-part-input input"
                value={companyPersonDate}
                onChange={(e) => setCompanyPersonDate(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <div className="staj-button-part">
          <div className="staj-dialog">
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
            <Button onClick={handleSubmit} type="submit" variant="contained" endIcon={<SendIcon />}>
              Send For Approval
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZorunluForm;
