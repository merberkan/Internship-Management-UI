import { useState } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import "../styles/IsVerenForm.css";
import formFoto from "../images/photo-forms.png";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
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
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";

const IsVerenForm = () => {
  const token = window.localStorage.getItem("token");
  var decoded = jwt_decode(token);
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

  //* Company Bank Infos
  const [companyTitle, setCompanyTitle] = useState("");
  const [companyIBAN, setCompanyIBAN] = useState("");
  const [companyAccountNo, setCompanyAccountNo] = useState("");
  const [companyBankName, setCompanyBankName] = useState("");
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [isLoading, setIsPending] = useState(false);
  const [ifControl, setIfControl] = useState(true);
  const [stakeholders, setStakeholders] = useState();
  const [isInputsDisabled, setIsInputsDisabled] = useState(false);

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
    setCompanyPersonDate("09/01/2022");
    setIsInputsDisabled(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      companyName,
      companyAddress,
      companySector,
      companyPhone,
      companyFax,
      companyMail,
      companyWeb,
      companyEmployeeNo,
      companyPersonFullName,
      companyPersonTitle,
      companyPersonMail,
      companyPersonDate,
      studentName,
      studentSurname,
      studentBirth,
      studentSchoolId,
      studentInternStart,
      studentInternEnd,
      studentGetWage,
      companyTitle,
      companyIBAN,
      companyAccountNo,
      companyBankName,
      formType: 2,
      lessonCode,
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
          console.log(data.message);
        }
      })
      .catch((e) => {
        console.log("cannot logged:", e.message);
      });
  };

  return (
    <div className="isveren-container">
      <div className="Navbar-Part">
        <Navbar token={decoded}></Navbar>
      </div>
      <div className="isveren-content">
        <div className="isveren-content-logo-part">
          <div className="isveren-content-logo">
            <img
              className="isveren-content-logo-img"
              alt="logo"
              src={formFoto}
            ></img>
          </div>
          <div className="isveren-dialog-part"></div>
        </div>
        <div className="isveren-header-part">
          <p>
            T.C. <br></br> FMV IŞIK ÜNİVERSİTESİ <br></br> İŞVEREN BİLGİ FORMU
          </p>
        </div>
        <div className="isveren-form-part">
          <form className="isveren-form" onSubmit={handleSubmit}>
            <div className="isveren-company-part">
              <h3>STAJ YAPILAN KURUMUN</h3>
              <div className="isveren-company-details">
                <div className="isveren-company-row">
                  <label className="isveren-company-label">Adı</label>
                  <input
                    disabled={isInputsDisabled}
                    type="text"
                    className="isveren-company-input input"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  ></input>
                </div>
                <div className="isveren-company-row">
                  <label className="isveren-company-label">Adresi</label>
                  <input
                    disabled={isInputsDisabled}
                    type="text"
                    className="isveren-company-input input"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                  ></input>
                </div>
                <div className="isveren-company-row">
                  <label className="isveren-company-label">
                    Üretim/Hizmet Alanı
                  </label>
                  <input
                    disabled={isInputsDisabled}
                    type="text"
                    className="isveren-company-input input"
                    value={companySector}
                    onChange={(e) => setCompanySector(e.target.value)}
                  ></input>
                </div>
                <div className="isveren-company-row">
                  <div className="isveren-company-row-left">
                    <label className="isveren-company-label">Telefon</label>
                    <input
                      disabled={isInputsDisabled}
                      type="text"
                      className="isveren-company-input input border"
                      value={companyPhone}
                      onChange={(e) => setCompanyPhone(e.target.value)}
                    ></input>
                  </div>
                  <div className="isveren-company-row-right">
                    <label className="isveren-company-label">Faks</label>
                    <input
                      disabled={isInputsDisabled}
                      type="text"
                      className="isveren-company-input input"
                      value={companyFax}
                      onChange={(e) => setCompanyFax(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="isveren-company-row">
                  <div className="isveren-company-row-left">
                    <label className="isveren-company-label">
                      E-posta adresi
                    </label>
                    <input
                      disabled={isInputsDisabled}
                      type="text"
                      className="isveren-company-input input border"
                      value={companyMail}
                      onChange={(e) => setCompanyMail(e.target.value)}
                    ></input>
                  </div>
                  <div className="isveren-company-row-right">
                    <label className="isveren-company-label">Web Adresi</label>
                    <input
                      disabled={isInputsDisabled}
                      type="text"
                      className="isveren-company-input input"
                      value={companyWeb}
                      onChange={(e) => setCompanyWeb(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="isveren-company-row">
                  <label className="isveren-company-label">
                    Kurumda Çalışan Personel Sayısı
                  </label>
                  <input
                    disabled={isInputsDisabled}
                    type="text"
                    className="isveren-company-input input"
                    value={companyEmployeeNo}
                    onChange={(e) => setCompanyEmployeeNo(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>
            <div className="isveren-part">
              <h3>İŞVEREN VEYA YETKİLİNİN</h3>
              <div className="isveren-part-details">
                <div className="isveren-part-row">
                  <label className="isveren-part-label ">Adı Soyadı</label>
                  <input
                    disabled={isInputsDisabled}
                    type="text"
                    className="isveren-part-input input"
                    value={companyPersonFullName}
                    onChange={(e) => setCompanyPersonFullName(e.target.value)}
                  ></input>
                </div>
                <div className="isveren-part-row">
                  <label className="isveren-part-label">Görev ve Unvanı</label>
                  <input
                    disabled={isInputsDisabled}
                    type="text"
                    className="isveren-part-input input"
                    value={companyPersonTitle}
                    onChange={(e) => setCompanyPersonTitle(e.target.value)}
                  ></input>
                </div>
                <div className="isveren-part-row">
                  <label className="isveren-part-label">E-posta adresi</label>
                  <input
                    disabled={isInputsDisabled}
                    type="text"
                    className="isveren-part-input input"
                    value={companyPersonMail}
                    onChange={(e) => setCompanyPersonMail(e.target.value)}
                  ></input>
                </div>
                <div className="isveren-part-row">
                  <label className="isveren-part-label">Tarih</label>
                  <input
                    disabled={isInputsDisabled}
                    type="text"
                    className="isveren-part-input input"
                    value={companyPersonDate}
                    onChange={(e) => setCompanyPersonDate(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>
            <div className="isveren-student-detail-part">
              <div className="isveren-student-details">
                <div className="isveren-student-row">
                  <label className="isveren-student-label">
                    STAJYER ÖĞRENCİNİN ADI - SOYADI
                  </label>
                  <input
                    disabled={true}
                    type="text"
                    className="isveren-student-input input"
                    value={decoded.fullName}
                  ></input>
                </div>
                <div className="isveren-student-row">
                  <label className="isveren-student-label">
                    ÖĞRENCİNİN DOĞUM TARİHİ - ÖĞRENCİ NO
                  </label>
                  <input
                    type="text"
                    className="isveren-student-input input"
                    disabled={true}
                    value={`28/07/1999 - ${decoded.studentNo}`} 
                  ></input>
                </div>
                <div className="isveren-student-row">
                  <label className="isveren-student-label">
                    ÖĞRENCİNİN STAJ TARİHLERİ
                  </label>
                  <input
                    type="text"
                    className="isveren-student-input input border"
                    placeholder="Başlangıç"
                    value={studentInternStart}
                    onChange={(e) => setStudentInternStart(e.target.value)}
                  ></input>
                  <input
                    type="text"
                    className="isveren-student-input input"
                    placeholder="Bitiş"
                    value={studentInternEnd}
                    onChange={(e) => setStudentInternEnd(e.target.value)}
                  ></input>
                </div>
                <div className="isveren-student-row">
                  <label className="isveren-student-label border">
                    STAJYER ÖĞRENCİYE ÜCRET ÖDENECEK Mİ?
                  </label>
                  <FormControl
                    component="fieldset"
                    className="isveren-form-control"
                  >
                    <RadioGroup
                      row
                      aria-label="wage"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                        onChange={(e) => setStudentGetWage(1)}
                      />
                      <FormControlLabel
                        style={{ marginLeft: 300 }}
                        value="no"
                        control={<Radio />}
                        label="No"
                        onChange={(e) => setStudentGetWage(0)}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="isveren-student-row">
                  <label className="isveren-student-label border">
                    STAJ No:
                  </label>
                  <FormControl
                    component="fieldset"
                    className="isveren-form-control"
                  >
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
            <div className="isveren-company-detail-part">
              <div className="isveren-company-details">
                <div className="isveren-company-row">
                  <label className="isveren-company-label">
                    KURUMUN UNVANI
                  </label>
                  <input
                    type="text"
                    className="isveren-company-input input"
                    value={companyTitle}
                    onChange={(e) => setCompanyTitle(e.target.value)}
                  ></input>
                </div>
                <div className="isveren-company-row">
                  <label className="isveren-company-label">IBAN NO</label>
                  <input
                    type="text"
                    className="isveren-company-input input"
                    value={companyIBAN}
                    onChange={(e) => setCompanyIBAN(e.target.value)}
                  ></input>
                </div>
                <div className="isveren-company-row">
                  <label className="isveren-company-label">HESAP NO</label>
                  <input
                    type="text"
                    className="isveren-company-input input"
                    value={companyAccountNo}
                    onChange={(e) => setCompanyAccountNo(e.target.value)}
                  ></input>
                </div>
                <div className="isveren-company-row">
                  <label className="isveren-company-label">
                    BANKA ADI - ŞUBE KODU
                  </label>
                  <input
                    type="text"
                    className="isveren-company-input input"
                    value={companyBankName}
                    onChange={(e) => setCompanyBankName(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>
            <div className="isveren-send-button-part">
              <div className="isveren-dialog">
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
              <div className="isveren-button">
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  Send For Approval
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IsVerenForm;
