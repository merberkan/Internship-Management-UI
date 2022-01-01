import useFetch from "../helpers/useFetch";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";

const Forms = () => {
  const token = window.localStorage.getItem("token");
  var decoded = jwt_decode(token);

  return (
    <div className="forms-container">
      <div className="Navbar-Part">
        <Navbar token={decoded}></Navbar>
      </div>
      <div className="forms-content">
          <h2>Forms Page</h2>
      </div>
    </div>
  );
};

export default Forms;
