import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import logo from "../images/mesale.png";
import loginImg from "../images/login.svg";
import "../styles/Login.css";

const Login = () => {
  console.log("geldi");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isLoginFail, setIsLoginFail] = useState();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email: email, password: pass };

    setIsPending(true);

    fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          window.localStorage.setItem("token", data.data.token);
          history.push("/");
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
          <h2>Login</h2>
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
          <form onSubmit={handleSubmit} className="form">
            {isLoginFail && <p>Email veya Şifre Hatalı</p>}
            <label>Email</label>
            <input
              type={"email"}
              required
              value={email}
              className="login-inputs"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label>Password</label>
            <input
              type="password"
              required
              value={pass}
              className="login-inputs"
              onChange={(e) => setPass(e.target.value)}
            ></input>
            <button>Login</button>
            <p>
              Şifrenizi mi unuttunuz? {" "}
              <Link to={`/forgetPassword`}>
                  buraya
              </Link>
              {" "}
              tıklayınız
            </p>
            
          </form>
        </div>
      </div>
      <div className="login-footer-part"></div>
    </div>
  );
};

export default Login;
