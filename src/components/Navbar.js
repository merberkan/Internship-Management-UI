import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../images/logo.png";
import { IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from "react-router-dom";


const Navbar = (props) => {
  const usercode = props.token.usercode;
  const fullName = props.token.fullName;
  const email = props.token.email;
  let role = props.token.role;
  const history = useHistory();


  if (role === 1) {
    role = "Student";
  } else if (role === 2) {
    role = "Dean";
  } else if (role === 3) {
    role = "Head Of Department";
  } else if (role === 4) {
    role = "Coordinator";
  } else if (role === 5) {
    role = "Grader";
  } else if (role === 6) {
    role = "Stakeholder";
  }

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.clear();
    history.push("/login");
  }

  return (
    <div>
      <div className="navbar">
        <div className="logo-part">
          <div className="logo">
            <img className="logo-img" alt="logo" src={logo}></img>
          </div>
        </div>
        <div className="menu-items">
          <div className="item">
            <Link to={`/forms`}>
              <p>Forms</p>
            </Link>
          </div>
          <div className="item">
            <Link to={`/users`}>
              <p>Users</p>
            </Link>
          </div>
          <div className="item">
            <Link to={`/stakeholder`}>
              <p>Invite Stakeholder</p>
            </Link>
          </div>
        </div>
        <div className="user-info">
          <div className="username">
            <p>{fullName}</p>
          </div>
          <div className="role-logout">
            <div className="role-part">
              <p>{role}</p>
            </div>
            <div className="logout">
              <IconButton onClick={handleLogout} aria-label="logout" size="small">
                <LogoutIcon htmlColor="#ffffff" fontSize="medium" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
