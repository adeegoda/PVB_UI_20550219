import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './Resources/coverPage.css';
import CoverUI from './Pages/Cover';
import BackOfficeUI from './Pages/BackOffice';
import EBallotUI from './Pages/EBallot';
import VerifyOTP from './Pages/VerifyOTP';
import GenerateOTP from './Pages/GenerateOTP';
import DashboardUI from './Pages/ElectionDashboard';
import PartyDetailsUI from './Pages/PartyDetailsPage';
import OTPFraudDetailsUI from './Pages/OTPFraudPage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Welcome from './Pages/WelcomePage'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

const PVB_MainUI = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path='/selectOperation' component={CoverUI}/>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} /> {/* Add the registration route */}
          <PrivateRoute path="/backOffice" component={BackOfficeUI} />
          <PrivateRoute path="/verifyOTP" component={VerifyOTP} />
          <PrivateRoute path="/generateOTP" component={GenerateOTP} />
          <PrivateRoute path="/dashboard" component={DashboardUI} />
          <PrivateRoute path="/partyDetails" component={PartyDetailsUI} />
          <PrivateRoute path="/votingUI" component={EBallotUI} />
          <PrivateRoute path="/OTPFraudUI" component={OTPFraudDetailsUI} />
        </Switch>
      </div>
    </Router>
  );
};

render(<PVB_MainUI />, document.getElementById('root'));
