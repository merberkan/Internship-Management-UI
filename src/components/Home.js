import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import '../styles/Home.css'

const Home = () => {
  const token = window.localStorage.getItem("token");
  var decoded = jwt_decode(token);
  console.log("token geldi:", decoded.email);
  return (
    <div className="Home-Container">
      <div className="Navbar-Part">
        <Navbar token={decoded}></Navbar>
      </div>
      <div className="Home-Content">
        <h1>Home Page</h1>
      </div>
    </div>
  );
};

export default Home;
