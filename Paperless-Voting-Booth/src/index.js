import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CoverUI from './Pages/Cover';
import EBallotUI from './Pages/EBallot_New';
import IdVerificationUI from './Pages/IdVerification';

const PVB_MainUI = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={CoverUI} />
          <Route path="/coverUI" component={CoverUI} />
          <Route path="/idVerificationUI" component={IdVerificationUI}></Route>
          <Route path="/votingUI" component={EBallotUI} />
        </Switch>
      </div>
    </Router>
  );
}

render(<PVB_MainUI />, document.querySelector('#root'));
