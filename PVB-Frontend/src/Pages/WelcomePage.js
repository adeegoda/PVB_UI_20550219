import React from 'react';
import { Link } from 'react-router-dom';

import '../Resources/welcomePage.css';

const PVB_WelcomeUI = () => {
  return (
    <div className="welcomeContainer">
      <h1 className="welcome">
        Welcome to Paperless Voting Booth<br />
      </h1>
      <Link to='/verifyOTP' className="button">
        <button type="button" className="welcomeButton">
          ඉදිරියට යන්න | Proceed | தொடரவும்
        </button>
      </Link>
    </div>
  );
};

export default PVB_WelcomeUI;
