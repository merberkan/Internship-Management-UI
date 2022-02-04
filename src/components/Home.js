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
  const [isUserStudent, setIsUserStudent] = useState(null);
  const [isUserUniversityPerson, setIsUserUniversityPerson] = useState(null);
  const [isUserStakeholder, setIsUserStakeholder] = useState(null);

  var decoded;
  if (!token) {
    history.push("/login");
  }
  if (token && ifControl) {
    decoded = jwt_decode(token);
    setTokenData(decoded);
    setIfControl(false);

    if (isUserStudent === null) {
      if (decoded.role === 1) {
        setIsUserStudent(true);
      } else {
        setIsUserStudent(false);
      }
    }
    if (isUserUniversityPerson === null) {
      if (
        decoded.role === 2 ||
        decoded.role === 3 ||
        decoded.role === 4 ||
        decoded.role === 5
      ) {
        setIsUserUniversityPerson(true);
      } else {
        setIsUserUniversityPerson(false);
      }
    }
    if (isUserStakeholder === null) {
      if (decoded.role === 6) {
        setIsUserStakeholder(true);
      } else {
        setIsUserStakeholder(false);
      }
    }
  }
  return (
    <div className="home-container">
      {tokenData && (
        <div className="home-container">
          <div className="Navbar-Part">
            <Navbar token={tokenData}></Navbar>
          </div>
          <div className="home-content">
            <h1 className="home-content-header">Home Page</h1>
            <div className="home-description">
              {isUserStudent && (
                <div className="home-student-description">
                  <p>
                    <h4>Welcome To The Internship Application System </h4>
                    {"->"} There are 6 documents under the heading Forms and you
                    are obliged to fill out the Employer Information Form and
                    Compulsory Internship Form for each of your internships
                    prior to the placement.<br></br>
                    <br></br>
                    {"->"} When you enter the form you want to fill out, you can
                    use the choose stakeholder button to select the company
                    stakeholders registered in the system görüntüleyebilir.ve.
                    As a result of your selection, information about the company
                    stakeholder will be added to your form. You don't need to
                    add to your company stakeholder's sections.<br></br>
                    <br></br>
                    {"->"} After filling out the necessary additions and sending
                    your form for approval, your company stakeholder will fill
                    in and approve the empty fields belonging to the company
                    stakeholder.<br></br>
                    <br></br>
                    {"->"} You can view the status of your completed documents
                    in detail on the my profile page.
                    <br></br>
                    <br></br>
                    {"->"} As a result of the approval of the required
                    internship documents, your internship has been accepted.
                    <br></br>
                    <br></br>
                    {"->"} You can create and submit a new document for your
                    rejected documents for the re-rejected document.
                    <br></br>
                    <br></br>
                    <h4>After The End of The Internship</h4>
                    {"->"} You can upload your internship report to the system
                    by selecting the Internship Report under the forms page.
                    <br></br>
                    <br></br>
                    {"->"} When uploading your internship report to the system,
                    you need to select a company stakeholder to go to the
                    approval of your company stakeholder.
                    <br></br>
                    <br></br>
                    After uploading your internship report to the system,
                    <br></br>
                    <br></br>
                    {"->"} You are expected to complete the evaluation document.
                    After the company has made your stakeholder selection, you
                    can fill in the open areas in the system and submit it for
                    the approval of your company stakeholder.<br></br>
                    <br></br>
                  </p>
                </div>
              )}
              {isUserUniversityPerson && (
                <div className="home-university-description">
                  <p>
                    <h4>Welcome to the internship application system </h4>
                    {"->"} Under the heading Student forms, you can reach the
                    list of documents that have completed the internship
                    documents and passed the necessary approvals<br></br>
                    <br></br>
                    {"->"} Under student forms page, you can select the form you
                    want to examine from the list and press the show button and
                    examine the form that the student has filled out<br></br>
                    <br></br>
                    {"->"} If sufficient requirements are met on the form, you
                    can confirm the form by pressing the approve button<br></br>
                    <br></br>
                    {"->"} If the form does not meet sufficient requirements,
                    you can reject the form by selecting which requirement it
                    does not meet from the pop-up that opens by pressing the
                    reject button<br></br>
                    <br></br>
                    {"->"} If you want to update your personal information, you
                    can change the interchangeable areas under the profile title
                    and press the update button.<br></br>
                    <br></br>
                  </p>
                </div>
              )}
              {isUserStakeholder && (
                <div className="home-university-description">
                  <p>
                    <h4>Welcome to the internship application system </h4>
                    {"->"} Under the heading Student forms, you can reach the
                    list of documents that have completed the internship
                    documents and passed the necessary approvals<br></br>
                    <br></br>
                    {"->"} Under student forms page, you can select the form you
                    want to examine from the list and press the show button and
                    examine the form that the student has filled out<br></br>
                    <br></br>
                    {"->"} For forms that do not have the Approve button, you
                    are expected to fill in the blank fields. After filling in
                    the required fields, you can click send for approval button.
                    <br></br>
                    <br></br>
                    {"->"} If sufficient requirements are met on the form, you
                    can confirm the form by pressing the approve button<br></br>
                    <br></br>
                    {"->"} If the form does not meet sufficient requirements,
                    you can reject the form by selecting which requirement it
                    does not meet from the pop-up that opens by pressing the
                    reject button<br></br>
                    <br></br>
                    {"->"} If you want to update your personal information, you
                    can change the interchangeable areas under the profile title
                    and press the update button.<br></br>
                    <br></br>
                    {"->"} In addition, you can update your company information
                    by pressing the Update Company button in the sidebar.
                    <br></br>
                    <br></br>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {!tokenData && <Login></Login>}
    </div>
  );
};

export default Home;
