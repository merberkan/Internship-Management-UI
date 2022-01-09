import Navbar from "./Navbar";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/Create-Stakeholder.css";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useFetch from "../helpers/useFetch";
import Alert from '@mui/material/Alert';

const CreateStakeHolder = () => {
  // const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [stakeholder, setStakeholder] = useState('');
  const [isLoading, setIsPending] = useState(false);
  const history = useHistory();
  const token = window.localStorage.getItem("token");
  var decoded = jwt_decode(token);
  const [stakeholders, setStakeholders] = useState();
  const [ifControl, setIfControl] = useState(true);
  const [successfulAlert, setSuccessfulAlert] = useState();
  const [failAlert, setFailfulAlert] = useState();
  const [display, setDisplay] = useState(true);
  const [currentStakeholder, setCurrentStakeholder] = useState();


  const {
    data: stakeholdersList,
    isPending,
    error,
  } = useFetch("http://localhost:3001/api/stakeholder/list/"+decoded.usercode,"GET");
  if(stakeholdersList && ifControl){
    setStakeholders(stakeholdersList.data.data);
    setCurrentStakeholder("");
    console.log(stakeholdersList.data.cu)
    if(stakeholdersList.data.currentStakeholder.length > 0){
      setCurrentStakeholder(stakeholdersList.data.currentStakeholder[0].fullname);
    }
    setIfControl(false);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 5000);
  }, [display])

  const handleChange = (event) => {
    setStakeholder(event.target.value);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const model = {
      // companyName: companyName,
      email: email,
      name: name,
      surname: surname,
    };
    console.log(JSON.stringify(model));
    setIsPending(true);

    fetch("http://localhost:3001/api/user/add-stakeholder/"+decoded.usercode, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(model),
    }).then(() => {
      console.log("new stakeholder has been created");
      setIsPending(false);
      history.push("/"); // send the home page
    });
  };

  const handleUpdate = () => {
    fetch("http://localhost:3001/api/stakeholder/update/"+decoded.usercode, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email: stakeholder}),
    }).then((data) => {
      if(data.ok){
        console.log("new stakeholder has been updated",data);
        setIsPending(false);
        const updatedStakeholder = stakeholders.find( w => w.email === stakeholder);
        setCurrentStakeholder(updatedStakeholder.fullname);
        history.push("/stakeholder"); // send the home page
        setSuccessfulAlert(true)
        setDisplay(true);
      }else{
        console.log("ok false catched")
        setFailfulAlert(true);
        setDisplay(true);
      }
    })
    .catch((e) => {
      setFailfulAlert(true);
      setDisplay(true);
    });
  }

  return (
    <div className="stakeholder-container">
      <div className="Navbar-Part">
        <Navbar token={decoded}></Navbar>
      </div>
      <div className="stakeholder-content">
        <div className="stakeholder-form-part">
          <h2>Invite a New Stakeholder</h2>
          <form onSubmit={handleCreateSubmit}>
            <label>Stakeholder Name:</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <label>Stakeholder Surname:</label>
            <input
              type="text"
              required
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            ></input>
            <label>Stakeholder Email:</label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            {!isPending && <button>Add Stakeholder</button>}
            {isPending && <button disabled>Adding Stakeholder...</button>}
          </form>
        </div>
        <div className="stakeholder-update-part">
          <h2>Choose Stakeholder</h2>
          {currentStakeholder && <h5>Current Stakeholder: {currentStakeholder}</h5>}
          <Box className="box" sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Stakeholders</InputLabel>
              {isPending && <div>Loading...</div>}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={stakeholder}
                label="Stakeholders"
                onChange={handleChange}
              >
                {/* {console.log(stakeholders)} */}
                {stakeholders && stakeholders.map((stakeholder) => (   
                  <MenuItem value={stakeholder.email} key={stakeholder.fullname}>{stakeholder.fullname}</MenuItem>
                   ))}                
              </Select>
              <button className="update-button" onClick={handleUpdate}>Update</button>
            </FormControl>
            {successfulAlert && display&& <Alert severity="success">Updated Successfully!</Alert>}
            {failAlert && display && <Alert severity="error">Cannot be updated!</Alert>}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default CreateStakeHolder;
