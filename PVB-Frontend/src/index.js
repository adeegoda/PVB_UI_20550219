import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import './Resources/operationsPage.css';
import Operations from './Pages/OperationsPage';
import BackOfficeUI from './Pages/BackOffice';
import EBallotUI from './Pages/EBallot';
import VerifyOTP from './Pages/VerifyOTP';
import GenerateOTP from './Pages/GenerateOTP';
import DashboardUI from './Pages/ElectionDashboard';
import PartyDetailsUI from './Pages/PartyDetailsPage';
import OTPFraudDetailsUI from './Pages/OTPFraudPage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Welcome from './Pages/WelcomePage';

const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

const PrivateRoute = ({ component: Component, requiresOTP, ...rest }) => {
  const token = localStorage.getItem('token');
  const otptoken = localStorage.getItem('otp-token');
  const isAuthenticated = token && !isTokenExpired(token);
  const isOTPAuthenticated = otptoken && !isTokenExpired(otptoken);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated && (!requiresOTP || isOTPAuthenticated)) {
          return <Component {...props} />;
        } else if (requiresOTP && (!otptoken || isTokenExpired(otptoken))) {
          return <Redirect to={{ pathname: '/welcome', state: { from: props.location } }} />;
        } else {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        }
      }}
    />
  );
};

const PVB_MainUI = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/selectOperation" component={Operations} />
          <PrivateRoute path="/backOffice" component={BackOfficeUI} />
          <PrivateRoute path="/verifyOTP" component={VerifyOTP} />
          <PrivateRoute path="/generateOTP" component={GenerateOTP} />
          <PrivateRoute path="/dashboard" component={DashboardUI} />
          <PrivateRoute path="/partyDetails" component={PartyDetailsUI} />
          <PrivateRoute path="/votingUI" component={EBallotUI} requiresOTP={true} />
          <PrivateRoute path="/OTPFraudUI" component={OTPFraudDetailsUI} />
        </Switch>
      </div>
    </Router>
  );
};

render(<PVB_MainUI />, document.getElementById('root'));
