import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import logo from "../images/mesale.png";
import loginImg from "../images/login.svg";
import "../styles/Login.css";

const RegisterCompleteStakeholder = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  const [isLoginFail, setIsLoginFail] = useState(true);

  const { key } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const model = {
      uniqueKey: key,
      password: password,
      passwordApprove: passwordConfirm,
    };

    setIsPending(true);

    fetch("http://localhost:3001/api/user/stakeholder-register-complete", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(model),
    })
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
        if (data.data.ok) {
          setIsPending(false);
          history.push("/login");
        } else {
          setIsLoginFail(true);
        }
      })
      .catch((e) => {
        console.log("cannot logged:", e.message);
      });
  };

  return (
    <div className="login-container">
      <div className="login-top-part">
        <div className="Header">
          <h2>Create Password</h2>
        </div>
        <div className="logo-part">
          <img src={logo}></img>
        </div>
      </div>
      <div className="login-content-part">
        <div className="login-photo">
          <img src={loginImg}></img>
        </div>
        <div className="form-part">
          <form className="form" onSubmit={handleSubmit}>
          <label>Job Title:</label>
            <input
              type="text"
              required
            ></input>
            <label>Company Name:</label>
            <input
              type="text"
              required
            ></input>
            <label>Company Address:</label>
            <input
              type="text"
              required
            ></input>
            <label>Company Sector:</label>
            <input
              type="text"
              required
            ></input>
            <label>Company Phone:</label>
            <input
              type="text"
              required
            ></input>
            <label>Company Fax:</label>
            <input
              type="text"
              required
            ></input>
            <label>Company Email:</label>
            <input
              type="text"
              required
            ></input>
            <label>Company Website Address:</label>
            <input
              type="text"
              required
            ></input>
            <label>Company Employee Number:</label>
            <input
              type="text"
              required
            ></input>
            <label>Password:</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <label>Password Confirm:</label>
            <input
              type="password"
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            ></input>
            {!isLoginFail && <p>Password Not Matched</p>}
            {!isPending && (
              <button onClick={handleSubmit}>Create Password</button>
            )}
            {isPending && <button disabled>Creating Password...</button>}
          </form>
        </div>
      </div>
      <div className="login-footer-part"></div>
    </div>
  );
};

export default RegisterCompleteStakeholder;
