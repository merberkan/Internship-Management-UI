import useFetch from "../helpers/useFetch";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import "../styles/Profile.css";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PreviewIcon from "@mui/icons-material/Preview";
import Alert from "@mui/material/Alert";

const CompanyUpdate = () => {
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
  const [data, setData] = useState(null);
  const [isPending2, setIsPending2] = useState(true);
  const [error2, setError2] = useState(null);
  const [ifControl, setIfControl] = useState(true);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [sector, setSector] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [email, setEmail] = useState("");
  const [web, setWeb] = useState("");
  const [employeeNo, setEmployeeNo] = useState("");
  const [successfulAlert, setSuccessfulAlert] = useState();
  const [failAlert, setFailAlert] = useState();
  const [display, setDisplay] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 5000);
  }, [display]);


  useEffect(() => {
    const abortCont = new AbortController(); // we use abort controller to stop the fetch

    fetch(
      "http://localhost:3001/api/company/detail/" +
        decoded.stakeholderCompanyUniqueKey,
      {
        signal: abortCont.signal,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: null,
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setData(data.data.company);
        setIsPending2(false);
        setError2(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending2(false);
          setError2(err.message);
        }
      });
    //* cleans state for abort warnings while fetching for data
    return () => abortCont.abort();
  }, [ifControl]);

  if (data && ifControl) {
    setName(data.name);
    setAddress(data.address);
    setSector(data.sector);
    setPhone(data.phone);
    setFax(data.fax);
    setEmail(data.email);
    setWeb(data.web);
    setEmployeeNo(data.employeeNo);
    setIfControl(false);
  }
  const handleUpdate = () => {
    let model = {
      companyUniqueKey: decoded.stakeholderCompanyUniqueKey,
      name: name,
      address: address,
      sector: sector,
      phone: phone,
      fax: fax,
      email: email,
      web: web,
      employeeNo: employeeNo,
    };
    fetch("http://localhost:3001/api/company/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(model),
    })
      .then((data) => {
        console.log("gelen response:", data);
        if (data.ok) {
          setIsPending2(false);
          setSuccessfulAlert(true);
          setDisplay(true);
          window.location.reload();
        } else {
          setFailAlert(true);
          setDisplay(true);
          window.location.reload();
        }
      })
      .catch((e) => {
        setFailAlert(true);
        setDisplay(true);
        window.location.reload();
      });
  };

  return (
    <div className="profile-container">
      <div className="Navbar-Part">
        <Navbar token={decoded}></Navbar>
      </div>
      <div className="profile-content">
        <div className="profile-user-detail">
          <div className="profile-header">
            <h3>User Information</h3>
          </div>
          <div className="profile-user-form">
            {data && (
              <div className="profile-user-form-detail">
                <div className="profile-user-form-left">
                  <div className="profile-form-row">
                    <label>Name:</label>
                    <input
                      type="text"
                      className="profile-form-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                  <div className="profile-form-row">
                    <label>Sector:</label>
                    <input
                      type="text"
                      className="profile-form-input"
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                    ></input>
                  </div>
                  <div className="profile-form-row">
                    <label>Phone No:</label>
                    <input
                      type="text"
                      className="profile-form-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    ></input>
                  </div>
                  <div className="profile-form-row">
                    <label>Fax No:</label>
                    <input
                      type="text"
                      className="profile-form-input"
                      value={fax}
                      onChange={(e) => setFax(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="profile-user-form-right">
                  <div className="profile-form-row">
                    <label>Email:</label>
                    <input
                      type="text"
                      required
                      className="profile-form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </div>
                  <div className="profile-form-row">
                    <label>Web Address:</label>
                    <input
                      type="text"
                      required
                      className="profile-form-input"
                      value={web}
                      onChange={(e) => setWeb(e.target.value)}
                    ></input>
                  </div>
                  <div className="profile-form-row">
                    <label>Company Employee No:</label>
                    <input
                      type="text"
                      required
                      className="profile-form-input"
                      value={employeeNo}
                      onChange={(e) => setEmployeeNo(e.target.value)}
                    ></input>
                  </div>
                  <div className="profile-form-row">
                    <label>Address:</label>
                    <textarea
                      className="profile-form-input textarea"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            )}
            <div className="profile-user-form-buttons">
              <Button type="submit" variant="contained" onClick={handleUpdate}>
                Güncelle
              </Button>
              {failAlert && display && (
                <Alert severity="error">
                  Bir Hata ile Karşılaşıldı. Bilgilerinizi Kontrol Ediniz
                </Alert>
              )}
              {successfulAlert && display && (
                <Alert severity="success">
                  Bilgileriniz Başarıyla Güncellendi
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyUpdate;
