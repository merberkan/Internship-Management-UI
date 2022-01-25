import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Users from './components/Users';
import CreateStakeHolder from './components/Create-Stakeholder';
import RegisterCompleteStakeholder from './components/Register-Complete-Stakeholder';
import Forms from './components/Forms';
import BeyanForm from './components/BeyanForm';
import IsVerenForm from './components/IsVerenForm';
import StudentForms from './components/StudentForms';
import NotFound from './components/NotFound';
import ShowBeyanForm from './components/ShowBeyanForm';
import ShowIsVerenForm from './components/ShowIsVerenForm';
import ZorunluForm from './components/ZorunluForm';
import ShowZorunluForm from './components/ShowZorunluForm';
import Rapor from './components/Rapor';
import ShowRapor from './components/ShowRapor';
import Profile from './components/Profile';
import ForgetPassword from './components/ForgetPassword';


function App() {
  return (
    <Router>
    <div className="App">
      <div className='content'>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/users">
            <Users></Users>
          </Route>
          <Route path="/stakeholder">
            <CreateStakeHolder></CreateStakeHolder>
          </Route>
          <Route path="/user/stakeholder/:key">
            <RegisterCompleteStakeholder></RegisterCompleteStakeholder>
          </Route>
          <Route exact path="/forms">
            <Forms> </Forms>
          </Route>
          <Route path="/forms/beyan">
            <BeyanForm></BeyanForm>
          </Route>
          <Route path="/forms/isveren">
            <IsVerenForm></IsVerenForm>
          </Route>
          <Route path="/forms/staj">
            <ZorunluForm></ZorunluForm>
          </Route>
          <Route path="/rapor">
            <Rapor></Rapor>
          </Route>
          <Route path="/studentforms">
            <StudentForms></StudentForms>
          </Route>
          <Route path="/user/beyanform/:key">
            <ShowBeyanForm></ShowBeyanForm>
          </Route>
          <Route path="/user/isverenform/:key">
            <ShowIsVerenForm></ShowIsVerenForm>
          </Route>
          <Route path="/user/zorunluform/:key">
            <ShowZorunluForm></ShowZorunluForm>
          </Route>
          <Route path="/user/rapor/:key">
            <ShowRapor></ShowRapor>
          </Route>
          <Route path="/profile">
            <Profile></Profile>
          </Route>
          <Route path="/forgetPassword">
            <ForgetPassword></ForgetPassword>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
