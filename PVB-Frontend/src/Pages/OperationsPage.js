import React, { useState, useEffect } from 'react';
import '../Resources/operationsPage.css';
import { Link, useHistory } from 'react-router-dom';
import { FetchElectionDetails } from '../APIOperators/ElectionDetailsAPI';
import jwtDecode from 'jwt-decode';

const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

const PVB_OperationsUI = () => {
  const history = useHistory();
  const [electionDetails, setElectionDetails] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
      history.push('/login');
    } else {
      const fetchData = async () => {
        const data = await FetchElectionDetails();
        setElectionDetails(data);
      };
      fetchData();
    }
  }, []);

  return (
    <div className="operationsContainer">
      <h1 className="operations">
        {electionDetails.map(election => (
          <React.Fragment key={election._id}>
            {election.election_name_sinhala} | {election.election_name_english} | {election.election_name_tamil} - {election.election_year}
          </React.Fragment>
        ))}
      </h1>
      <Link to='/verifyOTP'>
        <button className="operationsPage">
          චන්ද ප්‍රකාශය ආරම්භ කරන්න <br />
          Start Casting Vote <br />
          வாக்களிக்கத் தொடங்குங்கள் <br />
        </button>
      </Link>
      <Link to='/backOffice'>
        <button className="operationsPage">
          කාර්යාල භාවිතය සඳහා <br />
          For Office Use <br />
          அலுவலக பயன்பாட்டிற்கு <br />
        </button>
      </Link>
    </div>
  );
};

export default PVB_OperationsUI;
