import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Users from './components/Users';
import CreateStakeHolder from './components/Create-Stakeholder';
import RegisterCompleteStakeholder from './components/Register-Complete-Stakeholder';
import Forms from './components/Forms';


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
          <Route path="/forms">
            <Forms> </Forms>
          </Route>
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
