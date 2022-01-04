import { useState } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import "../styles/BeyanForm.css";
import formFoto from "../images/photo-forms.png";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";


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
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      fullName: fullName,
      id: id,
      department1: department1,
      schoolId: schoolId,
      faculty: faculty,
      department2: department2,
      company: company,
      formType: 3,
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
          console.log("something happened wrong");
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
                Fakültesi/Enstitüsü{" "}
                <input
                  type="text"
                  required
                  className="desc-inputs"
                  value={department1}
                  onChange={(e) => setDepartment1(e.target.value)}
                ></input>{" "}
                Bölümü öğrencisiyim{" "}
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
              <p></p>
            </div>
            <div className="form-student-inputs">
              <div className="input-part">
                <label>Adı Soyad: </label>
                <input
                  type="text"
                  required
                  className="student-info-inputs"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                ></input>
              </div>
              <div className="input-part">
                <label>T.C.Kimlik No: </label>
                <input
                  type="text"
                  required
                  className="student-info-inputs"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                ></input>
              </div>
              <div className="input-part">
                <label>Bölümü :</label>
                <input
                  type="text"
                  required
                  className="student-info-inputs"
                  value={department2}
                  onChange={(e) => setDepartment2(e.target.value)}
                ></input>
              </div>
              <div className="input-part">
                <label>Öğrenci No :</label>
                <input
                  type="text"
                  required
                  className="student-info-inputs"
                  value={schoolId}
                  onChange={(e) => setSchoolId(e.target.value)}
                ></input>
              </div>
              <div className="send-button">
                <Button type="submit" variant="contained" endIcon={<SendIcon />}>
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
