import { useState, useEffect } from "react";
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
import Alert from "@mui/material/Alert";

const IsVerenForm = () => {
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
  let companyData = window.localStorage.getItem("company")
  companyData = companyData ? JSON.parse(companyData):null;
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

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [isLoading, setIsPending] = useState(false);
  const [ifControl, setIfControl] = useState(true);
  const [stakeholders, setStakeholders] = useState();
  const [isInputsDisabled, setIsInputsDisabled] = useState(false);

  const [lessonCode, setLessonCode] = useState("");
  const [isLoginFail, setIsLoginFail] = useState();
  const [successfulAlert, setSuccessfulAlert] = useState();
  const [failAlert, setFailAlert] = useState();
  const [display, setDisplay] = useState(true);

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
  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 5000);
  }, [display]);
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
    window.localStorage.setItem("company", JSON.stringify(selectedData));
  };

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
      fullName: decoded.fullName,
      studentBirth: decoded.birth,
      studentSchoolId: decoded.studentNo,
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
          setSuccessfulAlert(true);
          setDisplay(true);
          setTimeout(() => {
            setDisplay(false);
            history.push("/forms");
          }, 2000);
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
        {successfulAlert && display && (
          <Alert severity="success">
            Formunuz Başarılı Bir Şekilde Kayıt Edildi
          </Alert>
        )}
        {failAlert && display && <Alert severity="error">Bir hatayla karşılaşıldı. Tekrar Deneyiniz</Alert>}
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
                    value={companyData ? companyData.companyName: ""}
                  ></input>
                </div>
                <div className="isveren-company-row">
                  <label className="isveren-company-label">Adresi</label>
                  <input
                    disabled={isInputsDisabled}
                    type="text"
                    className="isveren-company-input input"
                    value={companyData ? companyData.companyAddress:""}
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
                    value={companyData ? companyData.companySector: ""}
                  ></input>
                </div>
                <div className="isveren-company-row">
                  <div className="isveren-company-row-left">
                    <label className="isveren-company-label">Telefon</label>
                    <input
                      disabled={isInputsDisabled}
                      type="text"
                      className="isveren-company-input input border"
                      value={companyData ? companyData.companyPhoneNo:""}
                    ></input>
                  </div>
                  <div className="isveren-company-row-right">
                    <label className="isveren-company-label">Faks</label>
                    <input
                      disabled={isInputsDisabled}
                      type="text"
                      className="isveren-company-input input"
                      value={companyData ? companyData.companyFaxNo:""}
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
                      value={companyData ? companyData.companyEmail:""}
                    ></input>
                  </div>
                  <div className="isveren-company-row-right">
                    <label className="isveren-company-label">Web Adresi</label>
                    <input
                      disabled={isInputsDisabled}
                      type="text"
                      className="isveren-company-input input"
                      value={companyData ? companyData.companyWebAddress:""}
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
                    value={companyData ? companyData.companyCompanyEmployeeNo:""}
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
                    value={companyData ? companyData.companyEmployeeName:""}
                  ></input>
                </div>
                <div className="isveren-part-row">
                  <label className="isveren-part-label">Görev ve Unvanı</label>
                  <input
                    disabled={isInputsDisabled}
                    type="text"
                    className="isveren-part-input input"
                    value={companyData ? companyData.title:""}
                  ></input>
                </div>
                <div className="isveren-part-row">
                  <label className="isveren-part-label">E-posta adresi</label>
                  <input
                    disabled={isInputsDisabled}
                    type="text"
                    className="isveren-part-input input"
                    value={companyData ? companyData.email:""}
                  ></input>
                </div>
                <div className="isveren-part-row">
                  <label className="isveren-part-label">Tarih</label>
                  <input
                    disabled={isInputsDisabled}
                    type="text"
                    className="isveren-part-input input"
                    disabled={true}
                    value={companyData ? companyPersonDate:""}
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
                    value={`${decoded.birth} - ${decoded.studentNo}`}
                  ></input>
                </div>
                <div className="isveren-student-row">
                  <label className="isveren-student-label">
                    ÖĞRENCİNİN STAJ TARİHLERİ
                  </label>
                  <input
                    type="date"
                    className="isveren-student-input input border"
                    placeholder="Başlangıç"
                    value={studentInternStart}
                    onChange={(e) => setStudentInternStart(e.target.value)}
                  ></input>
                  <input
                    type="date"
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
                    disabled={true}
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
                        onChange={(e) => setStudentGetWage(1)}
                      />
                      <FormControlLabel
                        style={{ marginLeft: 300 }}
                        value="evet"
                        control={<Radio />}
                        label="Evet"
                        onChange={(e) => setStudentGetWage(0)}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="isveren-student-row">
                  <label className="isveren-student-label border">
                    STAJ NO:
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
                    disabled={true}
                    onChange={(e) => setCompanyTitle(e.target.value)}
                  ></input>
                </div>
                <div className="isveren-company-row">
                  <label className="isveren-company-label">IBAN NO</label>
                  <input
                    type="text"
                    className="isveren-company-input input"
                    value={companyIBAN}
                    disabled={true}
                    onChange={(e) => setCompanyIBAN(e.target.value)}
                  ></input>
                </div>
                <div className="isveren-company-row">
                  <label className="isveren-company-label">HESAP NO</label>
                  <input
                    type="text"
                    className="isveren-company-input input"
                    value={companyAccountNo}
                    disabled={true}
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
                    disabled={true}
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
