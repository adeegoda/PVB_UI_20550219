import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import CoverUI from './Pages/Cover';
import EBallotUI from './Pages/EBallot';
import VerifyOTP from './Pages/VerifyOTP';
import GenerateOTP from './Pages/GenerateOTP';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = false;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/coverUI', state: { from: props.location } }} />
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
          <Route path="/generateOTP" component={GenerateOTP} />
          <Route path="/coverUI" component={CoverUI} />
          <Route path="/otpVerificationUI" component={VerifyOTP} />
          <PrivateRoute path="/votingUI" component={EBallotUI} />
        </Switch>
      </div>
    </Router>
  );
}

render(<PVB_MainUI />, document.querySelector('#root'));
