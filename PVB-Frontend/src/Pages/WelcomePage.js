import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Resources/welcomePage.css';
import { FetchElectionDetails } from '../APIOperators/ElectionDetailsAPI';

const PVB_WelcomeUI = () => {
  const [electionDetails, setElectionDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchElectionDetails();
      setElectionDetails(data);
    };

    fetchData();
  }, []);

  return (
    <div className="welcomeContainer">
      <h1 className="welcome">
        {electionDetails.map(election => (
          <React.Fragment key={election._id}>
            {election.election_name_sinhala} | {election.election_name_english} | {election.election_name_tamil} - {election.election_year}
          </React.Fragment>
        ))}
      </h1>
      <h1 className="welcome">
        Welcome to Paperless Voting Booth<br />
      </h1>
      <Link to='/selectOperation'  className="button">
        <button type="button" className="welcomeButton"> 
          ඉදිරියට යන්න | Proceed | தொடரவும்
        </button>
      </Link>
    </div>
  );
};

export default PVB_WelcomeUI;
