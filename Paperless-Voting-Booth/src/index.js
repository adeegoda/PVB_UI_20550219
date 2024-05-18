import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import CoverUI from './Pages/Cover';
import BackOfficeUI from './Pages/BackOffice';
import EBallotUI from './Pages/EBallot';
import VerifyOTP from './Pages/VerifyOTP';
import GenerateOTP from './Pages/GenerateOTP';
import DasboardUI from './Pages/ElectionDashboard';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = true;

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
          <Route exact path="/" component={CoverUI} />
          <Route path="/backOffice" component={BackOfficeUI} />
          <Route path="/verifyOTP" component={VerifyOTP} />
          <PrivateRoute path="/generateOTP" component={GenerateOTP} />
          <PrivateRoute path="/dashboard" component={DasboardUI} />
          <PrivateRoute path="/votingUI" component={EBallotUI} />
        </Switch>
      </div>
    </Router>
  );
}

render(<PVB_MainUI />, document.querySelector('#root'));
