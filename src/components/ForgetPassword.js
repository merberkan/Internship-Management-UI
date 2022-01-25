import { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../images/mesale.png";
import img from "../images/forgetpassword.svg";
import "../styles/ForgetPassword.css";

const ForgetPassword = () => {
  console.log("geldi");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passApprove, setPassApprove] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isLoginFail, setIsLoginFail] = useState();
  const [isNextPageAvaliable, setIsNextPageAvaliable] = useState();
  const [key, setKey] = useState("");
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    const data = { email: email };

    setIsPending(true);

    fetch("http://localhost:3001/api/forget-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          setIsNextPageAvaliable(true);
        } else {
          setIsLoginFail(true);
        }
      })
      .catch((e) => {
        console.log("cannot logged:", e.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      key: key,
      password: pass,
      passwordApprove: passApprove,
    };

    setIsPending(true);

    fetch("http://localhost:3001/api/forget-password-approve", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
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
    <div className="forget-password-container">
      <div className="forget-password-top-part">
        <div className="Header">
          <h2>Şifremi Unuttum</h2>
        </div>
        <div className="logo-part">
          <img src={logo}></img>
        </div>
      </div>
      <div className="forget-password-content-part">
        <div className="forget-password-photo">
          <img src={img}></img>
        </div>
        <div className="form-part">
          {!isNextPageAvaliable && (
            <form onSubmit={handleClick} className="form">
              {/* {isLoginFail && <p>Email veya Şifre Hatalı</p>} */}
              <label>Email</label>
              <input
                type={"email"}
                required
                className="forget-password-inputs"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <button type="submit">Kurtarma Kodu Gönder</button>
            </form>
          )}
          {isNextPageAvaliable && (
            <form onSubmit={handleSubmit} className="form">
              {isLoginFail && <p>Email veya Şifre Hatalı</p>}
              <label>Kurtarma Kodu</label>
              <input
                type="text"
                required
                value={key}
                className="forget-password-inputs"
                onChange={(e) => setKey(e.target.value)}
              ></input>
              <label>Password</label>
              <input
                type="password"
                required
                value={pass}
                className="forget-password-inputs"
                onChange={(e) => setPass(e.target.value)}
              ></input>
              <label>Password Confirm</label>
              <input
                type="password"
                required
                className="forget-password-inputs"
                value={passApprove}
                onChange={(e) => setPassApprove(e.target.value)}
              ></input>
              <button type="submit">Yeni Parolayı Oluştur</button>
            </form>
          )}
        </div>
      </div>
      <div className="forget-password-footer-part"></div>
    </div>
  );
};

export default ForgetPassword;
