import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import "../styles/ShowIsverenForm.css";
import formFoto from "../images/photo-forms.png";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import SendIcon from "@mui/icons-material/Send";

const ShowIsverenForm = () => {
  const token = window.localStorage.getItem("token");
  var decoded = jwt_decode(token);
  const { key } = useParams();
  const history = useHistory();
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [isUserStakeholder, setIsUserStakeholder] = useState(null);

  //* Company Bank Infos
  const [companyTitle, setCompanyTitle] = useState("");
  const [companyIBAN, setCompanyIBAN] = useState("");
  const [companyAccountNo, setCompanyAccountNo] = useState("");
  const [companyBankName, setCompanyBankName] = useState("");

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
  if (data && ifControl) {
    console.log("deneme", data.Value);
    setIfControl(false);
  }
  if (!isUserStakeholder === null) {
    if (decoded.role === 6) {
      setIsUserStakeholder(true);
    } else {
      setIsUserStakeholder(false);
    }
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
      companyPersonDate: data.Value.companyPersonDate,
      studentName: data.Value.studentName,
      studentSurname: data.Value.studentSurname,
      studentBirth: data.Value.studentBirth,
      studentSchoolId: data.Value.studentSchoolId,
      studentInternStart: data.Value.studentInternStart,
      studentInternEnd: data.Value.studentInternEnd,
      studentGetWage: data.Value.studentGetWage,
      companyTitle,
      companyIBAN,
      companyAccountNo,
      companyBankName,
      formType: data.Value.formType,
      lessonCode: data.Value.lessonCode,
    };

    fetch("http://localhost:3001/api/user/form-update/"+key, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify(model),
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
    <div className="show-isveren-container">
      <div className="Navbar-Part">
        <Navbar token={decoded}></Navbar>
      </div>
      <div className="show-isveren-content">
        <div className="show-isveren-content-logo-part">
          <div className="show-isveren-content-logo">
            <img
              className="show-isveren-content-logo-img"
              alt="logo"
              src={formFoto}
            ></img>
          </div>
          <div className="show-isveren-dialog-part"></div>
        </div>
        <div className="show-isveren-header-part">
          <p>
            T.C. <br></br> FMV IŞIK ÜNİVERSİTESİ <br></br> İŞVEREN BİLGİ FORMU
          </p>
        </div>
        {data && (
          <div className="show-isveren-form-part">
            <form className="show-isveren-form">
              <div className="show-isveren-company-part">
                <h3>STAJ YAPILAN KURUMUN</h3>
                <div className="show-isveren-company-details">
                  <div className="show-isveren-company-row">
                    <label className="show-isveren-company-label">Adı</label>
                    <p>{data.Value.companyName}</p>
                  </div>
                  <div className="show-isveren-company-row">
                    <label className="show-isveren-company-label">Adresi</label>
                    <p>{data.Value.companyAddress}</p>
                  </div>
                  <div className="show-isveren-company-row">
                    <label className="show-isveren-company-label">
                      Üretim/Hizmet Alanı
                    </label>
                    <p>{data.Value.companySector}</p>
                  </div>
                  <div className="show-isveren-company-row">
                    <div className="show-isveren-company-row-left">
                      <label className="show-isveren-company-label">
                        Telefon
                      </label>
                      <p>{data.Value.companyPhone}</p>
                    </div>
                    <div className="show-isveren-company-row-right">
                      <label className="show-isveren-company-label">Faks</label>
                      <p>{data.Value.companyFax}</p>
                    </div>
                  </div>
                  <div className="show-isveren-company-row">
                    <div className="show-isveren-company-row-left">
                      <label className="show-isveren-company-label">
                        E-posta adresi
                      </label>
                      <p>{data.Value.companyMail}</p>
                    </div>
                    <div className="show-isveren-company-row-right">
                      <label className="show-isveren-company-label">
                        Web Adresi
                      </label>
                      <p>{data.Value.companyWeb}</p>
                    </div>
                  </div>
                  <div className="show-isveren-company-row">
                    <label className="show-isveren-company-label">
                      Kurumda Çalışan Personel Sayısı
                    </label>
                    <p>{data.Value.companyEmployeeNo}</p>
                  </div>
                </div>
              </div>
              <div className="show-isveren-part">
                <h3>İŞVEREN VEYA YETKİLİNİN</h3>
                <div className="show-isveren-part-details">
                  <div className="show-isveren-part-row">
                    <label className="show-isveren-part-label ">
                      Adı Soyadı
                    </label>
                    <p>{data.Value.companyPersonFullName}</p>
                  </div>
                  <div className="show-isveren-part-row">
                    <label className="show-isveren-part-label">
                      Görev ve Unvanı
                    </label>
                    <p>{data.Value.companyPersonTitle}</p>
                  </div>
                  <div className="show-isveren-part-row">
                    <label className="show-isveren-part-label">
                      E-posta adresi
                    </label>
                    <p>{data.Value.companyPersonMail}</p>
                  </div>
                  <div className="show-isveren-part-row">
                    <label className="show-isveren-part-label">Tarih</label>
                    <p>{data.Value.companyPersonDate}</p>
                  </div>
                </div>
              </div>
              <div className="show-isveren-student-detail-part">
                <div className="show-isveren-student-details">
                  <div className="show-isveren-student-row">
                    <label className="show-isveren-student-label">
                      STAJYER ÖĞRENCİNİN ADI - SOYADI
                    </label>
                    <p>{data.Value.studentName}</p>
                  </div>
                  <div className="show-isveren-student-row">
                    <label className="show-isveren-student-label">
                      ÖĞRENCİNİN DOĞUM TARİHİ - ÖĞRENCİ NO
                    </label>
                    <p>{data.Value.studentBirth}</p>
                    <p>{data.Value.studentSchoolId}</p>
                  </div>
                  <div className="show-isveren-student-row">
                    <label className="show-isveren-student-label">
                      ÖĞRENCİNİN STAJ TARİHLERİ
                    </label>
                    <p>{data.Value.studentInternStart}</p>
                    <p>{data.Value.studentInternEnd}</p>
                  </div>
                  <div className="show-isveren-student-row">
                    <label className="show-isveren-student-label border">
                      STAJYER ÖĞRENCİYE ÜCRET ÖDENECEK Mİ?
                    </label>
                    <p>{data.Value.studentGetWage === 1 ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>
              <div className="show-isveren-company-detail-part">
                <div className="show-isveren-company-details">
                  <div className="show-isveren-company-row">
                    <label className="show-isveren-company-label">
                      KURUMUN UNVANI
                    </label>
                    {isUserStakeholder && (
                      <input
                        type="text"
                        className="isveren-company-input input"
                        value={companyTitle}
                        onChange={(e) => setCompanyTitle(e.target.value)}
                      ></input>
                    )}
                    {!isUserStakeholder && <p>{data.Value.companyTitle}</p>}
                  </div>
                  <div className="show-isveren-company-row">
                    <label className="show-isveren-company-label">
                      IBAN NO
                    </label>
                    {isUserStakeholder && (
                      <input
                        type="text"
                        className="isveren-company-input input"
                        value={companyIBAN}
                        onChange={(e) => setCompanyIBAN(e.target.value)}
                      ></input>
                    )}
                    {!isUserStakeholder && <p>{data.Value.companyIBAN}</p>}
                  </div>
                  <div className="show-isveren-company-row">
                    <label className="show-isveren-company-label">
                      HESAP NO
                    </label>
                    {isUserStakeholder && (
                      <input
                        type="text"
                        className="isveren-company-input input"
                        value={companyAccountNo}
                        onChange={(e) => setCompanyAccountNo(e.target.value)}
                      ></input>
                    )}
                    {!isUserStakeholder && <p>{data.Value.companyAccountNo}</p>}
                  </div>
                  <div className="show-isveren-company-row">
                    <label className="show-isveren-company-label">
                      BANKA ADI - ŞUBE KODU
                    </label>
                    <p>
                      {isUserStakeholder && (
                        <input
                          type="text"
                          className="isveren-company-input input"
                          value={companyBankName}
                          onChange={(e) => setCompanyBankName(e.target.value)}
                        ></input>
                      )}
                      {!isUserStakeholder && (
                        <p>
                          {data.Value.companyBankName} -{" "}
                          {data.Value.companyBankName}
                        </p>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </form>
            {isUserStakeholder && (
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
            {!data.IsConfirmed && !isUserStakeholder && (
              <div className="show-isveren-buttons-part">
                <div className="show-isveren-reject">
                  <Button
                    variant="contained"
                    color="error"
                    endIcon={<ThumbDownIcon />}
                    onClick={handleReject}
                  >
                    Reject
                  </Button>
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
        )}
      </div>
    </div>
  );
};

export default ShowIsverenForm;
