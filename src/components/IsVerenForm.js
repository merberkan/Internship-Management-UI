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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("studentGetWage Value:",studentGetWage)
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
    };

    console.log("giden model:",JSON.stringify(data))
    fetch("http://localhost:3001/api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
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
                    type="text"
                    className="isveren-company-input input"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  ></input>
                </div>
                <div className="isveren-company-row">
                  <label className="isveren-company-label">Adresi</label>
                  <input
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
                      type="text"
                      className="isveren-company-input input border"
                      value={companyPhone}
                      onChange={(e) => setCompanyPhone(e.target.value)}
                    ></input>
                  </div>
                  <div className="isveren-company-row-right">
                    <label className="isveren-company-label">Faks</label>
                    <input
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
                      type="text"
                      className="isveren-company-input input border"
                      value={companyMail}
                      onChange={(e) => setCompanyMail(e.target.value)}
                    ></input>
                  </div>
                  <div className="isveren-company-row-right">
                    <label className="isveren-company-label">Web Adresi</label>
                    <input
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
                    type="text"
                    className="isveren-part-input input"
                    value={companyPersonFullName}
                    onChange={(e) => setCompanyPersonFullName(e.target.value)}
                  ></input>
                </div>
                <div className="isveren-part-row">
                  <label className="isveren-part-label">Görev ve Unvanı</label>
                  <input
                    type="text"
                    className="isveren-part-input input"
                    value={companyPersonTitle}
                    onChange={(e) => setCompanyPersonTitle(e.target.value)}
                  ></input>
                </div>
                <div className="isveren-part-row">
                  <label className="isveren-part-label">E-posta adresi</label>
                  <input
                    type="text"
                    className="isveren-part-input input"
                    value={companyPersonMail}
                    onChange={(e) => setCompanyPersonMail(e.target.value)}
                  ></input>
                </div>
                <div className="isveren-part-row">
                  <label className="isveren-part-label">Tarih</label>
                  <input
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
                    type="text"
                    className="isveren-student-input input border"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  ></input>
                  <input
                    type="text"
                    className="isveren-student-input input"
                    value={studentSurname}
                    onChange={(e) => setStudentSurname(e.target.value)}
                  ></input>
                </div>
                <div className="isveren-student-row">
                  <label className="isveren-student-label">
                    ÖĞRENCİNİN DOĞUM TARİHİ - ÖĞRENCİ NO
                  </label>
                  <input
                    type="text"
                    className="isveren-student-input input border"
                    value={studentBirth}
                    onChange={(e) => setStudentBirth(e.target.value)}
                  ></input>
                  <input
                    type="text"
                    className="isveren-student-input input"
                    value={studentSchoolId}
                    onChange={(e) => setStudentSchoolId(e.target.value)}
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
            <div className="isveren-send-button">
              <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                Send For Approval
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IsVerenForm;
