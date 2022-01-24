import { useState } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import "../styles/BeyanForm.css";
import formFoto from "../images/photo-forms.png";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const BeyanForm = () => {
  const token = window.localStorage.getItem("token");
  var decoded = jwt_decode(token);
  const [fullName, setFullName] = useState("");
  const [id, setId] = useState("");
  const [department1, setDepartment1] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department2, setDepartment2] = useState("");
  const [company, setCompany] = useState("");
  const [lessonCode, setLessonCode] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("lesson code geldi:", lessonCode);
    const data = {
      fullName: decoded.fullName,
      id: decoded.citizenshipNo,
      department1: decoded.department,
      schoolId: decoded.studentNo,
      faculty: faculty,
      department2: decoded.department,
      company: company,
      formType: 3,
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
              <h2>BEYAN VE TAAHHÜTNAME (22)</h2>
            </div>
            <div className="form-detail-part">
              <p>
                &nbsp;&nbsp; Üniversitemizin{" "}
                <input
                  type="text"
                  required
                  className="desc-inputs"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                ></input>{" "}
                Fakültesi/Enstitüsü {decoded.department} Bölümü öğrencisiyim{" "}
                <input
                  type="text"
                  required
                  className="desc-inputs"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                ></input>{" "}
                biriminde/işyerinde Kısmi Zamanlı Öğrenci olarak / Stajyer
                Öğrenci olarak 5510 sayılı Kanunun 5/b maddesi uyarınca çalışmak
                istiyorum. Ailemden, annem / babam üzerinden genel sağlık
                sigortası kapsamında sağlık hizmeti alıyorum. Bu nedenle kısmi
                zamanlı çalışmam veya stajım boyunca genel sağlık sigortası
                kapsamında olmayı kabul etmiyorum. <br></br> &nbsp;&nbsp;
                Beyanımın doğruluğunu, durumumda değişiklik olması durumunda
                değişikliği hemen bildireceğimi kabul eder, beyanımın hatalı
                veya eksik olmasından kaynaklanacak prim, idari para cezası,
                gecikme zammı ve gecikme faizinin tarafımca ödeneceğini taahhüt
                ederim.
              </p>
            </div>
            <div className="form-student-inputs">
              <div className="input-part">
                <label>Adı Soyad: </label>
                <p>{decoded.fullName}</p>
              </div>
              <div className="input-part">
                <label>T.C.Kimlik No: </label>
                <p>{decoded.citizenshipNo}</p>
              </div>
              <div className="input-part">
                <label>Bölümü :</label>
                <p>{decoded.department}</p>
              </div>
              <div className="input-part">
                <label>Öğrenci No :</label>
                <p>{decoded.studentNo}</p>
              </div>
              <div className="input-part">
                <label>STAJ No:</label>
                <FormControl
                  component="fieldset"
                  className="student-info-inputs"
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
              <div className="send-button">
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

export default BeyanForm;
