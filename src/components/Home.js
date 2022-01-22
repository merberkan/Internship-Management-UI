import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/Home.css";
import Login from "./Login";

const Home = () => {
  const history = useHistory();
  const token = window.localStorage.getItem("token");
  const [tokenData, setTokenData] = useState(null);
  const [ifControl, setIfControl] = useState(true);
  var decoded;
  if (!token) {
    history.push("/login");
  } 
  if(token && ifControl){
    decoded = jwt_decode(token);
    setTokenData(decoded);
    setIfControl(false)
  }
  return (
    <div className="Home-Container">
      {tokenData && (
        <div>
          <div className="Navbar-Part">
            <Navbar token={tokenData}></Navbar>
          </div>
          <div className="Home-Content">
            <h1>Home Page</h1>
          </div>
        </div>
      )}
      {!tokenData &&
      <Login></Login>
      }
    </div>
  );
};

export default Home;
