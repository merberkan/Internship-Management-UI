import useFetch from "../helpers/useFetch";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import "../styles/Forms.css";
import { Link } from "react-router-dom";


const Forms = () => {
  const token = window.localStorage.getItem("token");
  var decoded = jwt_decode(token);

  return (
    <div className="forms-container">
      <div className="Navbar-Part">
        <Navbar token={decoded}></Navbar>
      </div>
      <div className="forms-content">
        <div className="forms-header">
          <h2>Doldurulması Gereken Belgeler</h2>
        </div>
        <div className="forms-list">
          <ul>
            <Link to={`/forms/beyan`}><li className="forms-item">Beyan Formu</li></Link>
            <Link to={`/forms/isveren`}><li className="forms-item">Is Veren Formu</li></Link>
            <Link to={`/forms/staj`}><li className="forms-item">Staj Formu</li></Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Forms;
