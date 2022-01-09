import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import logo from "../images/mesale.png";
import loginImg from "../images/login.svg";
import "../styles/Register-Complete-Stakeholder.css";
import useFetch from "../helpers/useFetch";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";

const RegisterCompleteStakeholder = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companySector, setCompanySector] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyFax, setCompanyFax] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyEmployeeNumber, setCompanyEmployeeNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsPending] = useState(false);
  const history = useHistory();
  const [isLoginFail, setIsLoginFail] = useState(true);
  const [ifControl, setIfControl] = useState(true);
  const [companyList, setCompanyList] = useState("");
  const [successfulAlert, setSuccessfulAlert] = useState();
  const [failAlert, setFailfulAlert] = useState();
  const [display, setDisplay] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [isInputsDisabled, setIsInputsDisabled] = useState(false);

  const { key } = useParams();

  const {
    data: companies,
    isPending,
    error,
  } = useFetch("http://localhost:3001/api/company", "GET");
  if (companies && ifControl) {
    setCompanyList(companies.data.companies);
    setIfControl(false);
  }

  const handleChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleUpdate = () => {
    console.log("selected company:", selectedCompany);
    const companyData = companies.data.companies.find(
      (w) => w.companyName === selectedCompany
    );
    console.log(companyData);
    setCompanyName(companyData.companyName);
    setCompanyAddress(companyData.companyAddress);
    setCompanySector(companyData.companySector);
    setCompanyPhone(companyData.companyPhoneNo);
    setCompanyFax(companyData.companyFaxNo);
    setCompanyEmail(companyData.companyEmail);
    setCompanyWebsite(companyData.companyWebAddress);
    setCompanyEmployeeNumber(companyData.companyCompanyEmployeeNo);
    setIsInputsDisabled(true);
  };

  const handleClear = () => {
    setCompanyName("");
    setCompanyAddress("");
    setCompanySector("");
    setCompanyPhone("");
    setCompanyFax("");
    setCompanyEmail("");
    setCompanyWebsite("");
    setCompanyEmployeeNumber("");
    setIsInputsDisabled(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const companyControl = selectedCompany === "" ? false : true;
    console.log(companyControl);
    const model = {
      uniqueKey: key,
      password: password,
      passwordApprove: passwordConfirm,
      jobTitle,
      companyName,
      companyAddress,
      companySector,
      companyPhone,
      companyFax,
      companyEmail,
      companyWebsite,
      companyEmployeeNumber,
      companyControl,
    };
    console.log("sending model:", model);
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
    <div className="register-complete-container">
      <div className="register-complete-top-part">
        <div className="register-complete-Header">
          <h2>Create Password</h2>
        </div>
        <div className="register-complete-logo-part">
          <img src={logo}></img>
        </div>
      </div>
      <div className="register-complete-content-part">
        <div className="register-complete-photo">
          <Box
            className="box register-complete-company-box"
            sx={{ minWidth: 120 }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Companies</InputLabel>
              {isPending && <div>Loading...</div>}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCompany}
                label="Stakeholders"
                onChange={handleChange}
              >
                {/* {console.log(stakeholders)} */}
                {companyList &&
                  companyList.map((company) => (
                    <MenuItem
                      value={company.companyName}
                      key={company.companyEmail}
                    >
                      {company.companyName}
                    </MenuItem>
                  ))}
              </Select>
              <button className="update-button" onClick={handleUpdate}>
                Select
              </button>
            </FormControl>
            {successfulAlert && display && (
              <Alert severity="success">Selected Successfully!</Alert>
            )}
            {failAlert && display && (
              <Alert severity="error">Selection Failed!</Alert>
            )}
          </Box>
        </div>
        <div className="register-complete-form-part">
          <form className="register-complete-form" onSubmit={handleSubmit}>
            <label>Job Title:</label>
            <input
              type="text"
              required={true}
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            ></input>
            <label>Company Name:</label>
            <input
              disabled={isInputsDisabled}
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            ></input>
            <label>Company Address:</label>
            <input
              disabled={isInputsDisabled}
              type="text"
              required
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
            ></input>
            <label>Company Sector:</label>
            <input
              disabled={isInputsDisabled}
              type="text"
              required
              value={companySector}
              onChange={(e) => setCompanySector(e.target.value)}
            ></input>
            <label>Company Phone:</label>
            <input
              disabled={isInputsDisabled}
              type="text"
              required
              value={companyPhone}
              onChange={(e) => setCompanyPhone(e.target.value)}
            ></input>
            <label>Company Fax:</label>
            <input
              disabled={isInputsDisabled}
              type="text"
              required
              value={companyFax}
              onChange={(e) => setCompanyFax(e.target.value)}
            ></input>
            <label>Company Email:</label>
            <input
              disabled={isInputsDisabled}
              type="text"
              required
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
            ></input>
            <label>Company Website Address:</label>
            <input
              disabled={isInputsDisabled}
              type="text"
              required
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
            ></input>
            <label>Company Employee Number:</label>
            <input
              disabled={isInputsDisabled}
              type="text"
              required
              value={companyEmployeeNumber}
              onChange={(e) => setCompanyEmployeeNumber(e.target.value)}
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
              <div className="register-complete-buttons">
                <button className="register-complete-clear-button" onClick={handleClear}>Clear</button>
                <button type="submit" className="register-complete-submit-button">Create Password</button>
              </div>
            )}
            {isPending && <button className="register-complete-submit-button" disabled>Creating Password...</button>}
          </form>
        </div>
      </div>
      <div className="register-complete-footer-part"></div>
    </div>
  );
};

export default RegisterCompleteStakeholder;
