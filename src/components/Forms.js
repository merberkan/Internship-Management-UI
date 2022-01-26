import useFetch from "../helpers/useFetch";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import "../styles/Forms.css";
import { Link } from "react-router-dom";
import beyan from "../images/BeyanVeTaahhutname.png";
import isveren from "../images/IsVeren.png";
import rapor from "../images/rapor.png";
import staj from "../images/ZorunluStaj.png";
import degerlendirme from "../images/Degerlendirme.png";
import { useHistory } from "react-router-dom";
import { useState } from "react";


const Forms = () => {
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

  return (
    <div className="forms-page-container">
      <div className="Navbar-Part">
        <Navbar token={decoded}></Navbar>
      </div>
      <div className="forms-page-content">
        <div className="forms-page-header">Formlar</div>
        <div className="forms-page-part">
          <div className="forms-page-part-top">
            <div className="forms-page-item">
            <Link to={`/forms/beyan`} className="forms-page-box">
                  <img
                    className="forms-page-box-img"
                    alt="beyan_img"
                    src={beyan}
                  ></img>
              </Link>
              <div className="forms-page-text">Beyan(22)</div>
            </div>
            <div className="forms-page-item">
            <Link to={`/forms/isveren`} className="forms-page-box">
                  <img
                    className="forms-page-box-img"
                    alt="isveren_img"
                    src={isveren}
                  ></img>
              </Link>
              <div className="forms-page-text">İs Veren Bilgi Formu</div>
            </div>
          </div>
          <div className="forms-page-part-mid">
            <div className="forms-page-item">
            <Link to={`/forms/staj`} className="forms-page-box">
                  <img
                    className="forms-page-box-img"
                    alt="staj_img"
                    src={staj}
                  ></img>
              </Link>
              <div className="forms-page-text">Zorunlu Staj Formu</div>
            </div>
            <div className="forms-page-item">
              <Link to={`/rapor`} className="forms-page-box">
                  <img
                    className="forms-page-box-img"
                    alt="rapor_img"
                    src={rapor}
                  ></img>
              </Link>
              <div className="forms-page-text">Staj Raporu</div>
            </div>
          </div>
          <div className="forms-page-part-bottom">
            <div className="forms-page-item">
            <Link to={`/forms/beyan43`} className="forms-page-box">
                  <img
                    className="forms-page-box-img"
                    alt="beyan_img"
                    src={beyan}
                  ></img>
              </Link>
              <div className="forms-page-text">Beyan(43)</div>
            </div>
            <div className="forms-page-item">
              <Link to={`/forms/degerlendirme`} className="forms-page-box">
                  <img
                    className="forms-page-box-img"
                    alt="rapor_img"
                    src={degerlendirme}
                  ></img>
              </Link>
              <div className="forms-page-text">Degerlendirme Belgesi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forms;
