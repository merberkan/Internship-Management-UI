import { useState } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import "../styles/ShowBeyanForm.css";
import formFoto from "../images/photo-forms.png";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useParams } from "react-router-dom";

const ShowBeyanForm = () => {
  let token = window.localStorage.getItem("token");
  const [detailData, setDetailData] = useState(null);
  var decoded = jwt_decode(token);
  const { key } = useParams();
  const history = useHistory();

  console.log("token:", token);
  console.log("geldi");
  if (!detailData) {
    fetch("http://localhost:3001/api/user/form/" + key, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: null,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          setDetailData(data.list[0].Value);
        } else {
          console.log(data.message);
        }
      })
      .catch((e) => {
        console.log("cannot logged:", e.message);
      });
  } else {
    console.log("data geldi", detailData);
  }

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const data = {
  //       fullName: fullName,
  //       id: id,
  //       department1: department1,
  //       schoolId: schoolId,
  //       faculty: faculty,
  //       department2: department2,
  //       company: company,
  //       formType: 3,
  //     };

  //     console.log("giden model:", JSON.stringify(data));

  //     fetch("http://localhost:3001/api/form", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + token,
  //       },
  //       body: JSON.stringify(data),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data.ok) {
  //           //   window.localStorage.setItem("token", data.data.token);
  //           history.push("/forms");
  //         } else {
  //           console.log(data.message);
  //         }
  //       })
  //       .catch((e) => {
  //         console.log("cannot logged:", e.message);
  //       });
  //   };

  //   company: "Koçsistem"
  //   department1: "Bilgisayar Mühendisliği"
  //   department2: "Bilgisayar Mühendisliği"
  //   faculty: "Mühendislik"
  //   formType: 3
  //   fullName: "Mert Berkan Akdeniz"
  //   id: "53068195782"
  //   schoolId: "217CS2014"

  const handleApprove = () => {
      const model = {
          uniqueKey: key,
          status: "1"
      };
    fetch("http://localhost:3001/api/form-status", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token, },
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
  }

  const handleReject = () => {
    const model = {
        uniqueKey: key,
        status: "0"
    };
  fetch("http://localhost:3001/api/form-status", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token, },
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
    console.log("clicked reject")
}

  return (
    <div className="show-beyan-container">
      <div className="Navbar-Part">
        <Navbar token={decoded}></Navbar>
      </div>
      {detailData && (
        <div className="show-beyan-content">
          <div className="show-beyan-content-logo-part">
            <div className="show-beyan-content-logo">
              <img
                className="show-beyan-content-logo-img"
                alt="logo"
                src={formFoto}
              ></img>
            </div>
          </div>
          <div className="show-beyan-content-form-part">
            <form>
              <div className="show-beyan-form-header">
                <h2>BEYAN VE TAAHHÜTNAME (22)</h2>
              </div>
              <div className="show-beyan-form-detail-part">
                <p>
                  &nbsp;&nbsp; Üniversitemizin &nbsp;
                  <span>{detailData.faculty}</span>
                  &nbsp; Fakültesi/Enstitüsü &nbsp;
                  <span>{detailData.department1}</span> &nbsp; Bölümü
                  öğrencisiyim &nbsp;
                  <span>{detailData.company}</span> &nbsp; biriminde/işyerinde
                  Kısmi Zamanlı Öğrenci olarak / Stajyer Öğrenci olarak 5510
                  sayılı Kanunun 5/b maddesi uyarınca çalışmak istiyorum.
                  Ailemden, annem / babam üzerinden genel sağlık sigortası
                  kapsamında sağlık hizmeti alıyorum. Bu nedenle kısmi zamanlı
                  çalışmam veya stajım boyunca genel sağlık sigortası kapsamında
                  olmayı kabul etmiyorum. <br></br> &nbsp;&nbsp; Beyanımın
                  doğruluğunu, durumumda değişiklik olması durumunda değişikliği
                  hemen bildireceğimi kabul eder, beyanımın hatalı veya eksik
                  olmasından kaynaklanacak prim, idari para cezası, gecikme
                  zammı ve gecikme faizinin tarafımca ödeneceğini taahhüt
                  ederim.
                </p>
                <p></p>
              </div>
              <div className="show-beyan-form-student-inputs">
                <div className="show-beyan-input-part">
                  <label>Adı Soyad: </label>
                  <span>{detailData.fullName}</span>
                </div>
                <div className="show-beyan-input-part">
                  <label>T.C.Kimlik No: </label>
                  <span>{detailData.id}</span>
                </div>
                <div className="show-beyan-input-part">
                  <label>Bölümü :</label>
                  <span>{detailData.department2}</span>
                </div>
                <div className="show-beyan-input-part">
                  <label>Öğrenci No :</label>
                  <span>{detailData.schoolId}</span>
                </div>
              </div>
            </form>
          </div>
          <div className="show-beyan-content-buttons-part">
            <div className="show-beyan-reject">
              <Button
                variant="contained"
                color="error"
                endIcon={<ThumbDownIcon />}
                onClick={handleReject}
              >
                Reject
              </Button>
            </div>
            <div className="show-beyan-approve">
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
        </div>
      )}
    </div>
  );
};

export default ShowBeyanForm;
