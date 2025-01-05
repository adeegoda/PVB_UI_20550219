import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FetchElectionDetails } from '../APIOperators/ElectionDetailsAPI';
import '../Resources/otpFraudPage.css';
import { Divider } from 'semantic-ui-react';

const OTPFraudDashboard = () => {
  const [electionDetails, setElectionDetails] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [nic, setNic] = useState('');
  const [data, setData] = useState([]);
  const [totalOTPFrauds, serTotalOTPFrauds] = useState([]);
  const [OTPFraudsPerID, serOTPFraudsPerID] = useState([]);

  const fetchTotalOTPFraudCount = async () => {
    const token = localStorage.getItem('token');
    const data = await FetchElectionDetails();
    setElectionDetails(data);
    const result = await axios('http://localhost:4000/pvb-api/fraud-attepmts',{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return result.data.totalNICFraudCount;
  };

  const fetchOTPFraudPerIDCount = async (nic) => {
    const token = localStorage.getItem('token');
    const result = await axios.post('http://localhost:4000/pvb-api/fraud-attepmts-perNIC', 
      { nic: nic }, 
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return result.data.perNICFraudCount;
  };

  const fetchOTPFraudData = async () => {
    const totalOTPFrauds = await fetchTotalOTPFraudCount();
    serTotalOTPFrauds(totalOTPFrauds);
  };

  const fetchOTPFraudPerIDData = async (nic) => {
    const OTPFraudsPerID = await fetchOTPFraudPerIDCount(nic);
    serOTPFraudsPerID(OTPFraudsPerID);
  };

  useEffect(() => {
    fetchOTPFraudData();
    fetchOTPFraudPerIDData();
    const totalOTPFraudRefreshIntervalId = setInterval(fetchOTPFraudData, 10000);
    const dateTimeIntervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => {
      clearInterval(dateTimeIntervalId);
      clearInterval(totalOTPFraudRefreshIntervalId);
    };
  }, []);

  const handleIDChange = (e) => {
    const inputVal = e.target.value;
    setNic(inputVal);
  };

  const handleOTPFraudCheck = async () => {
    await fetchOTPFraudPerIDData(nic);
  };

  return (
    <div className='generalStyle'>
      <div className="centered">
        <h1>
          {electionDetails.map(election => (
            <React.Fragment key={election._id}>
              {election.election_name_sinhala} | {election.election_name_english} | {election.election_name_tamil} - {election.election_year}
            </React.Fragment>
          ))}
        </h1>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <label className='timeDetails'>
            {currentDateTime.toLocaleString()}
          </label>
          <button className='backButton' name='backButton'>
            <Link className='backButtonLinks' to='/dashboard'>
              <p className='backButtonLabels'>
                ආපසු | Back | மீண்டும்
              </p>
            </Link>
          </button>
          <div>
            <button className='backButton' name='goToBackOfficePage'>
              <Link className='backButtonLinks' to='/backOffice'>
                <p className='backButtonLabels'>
                  ප්‍රධාන මෙනුවට | To Main Menu | முதன்மை மெனுவிற்கு
                </p>
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className='voteCounts'>
        <Divider />
        <h3>
          <div className='voteCountLabel' id='_totalValidVotes'>
            <p>
              මුළු OTP අවභාවිතා සංඛ්‍යාව <br />
              Total OTP Fraud Attempts <br />
              மொத்த OTP மோசடி முயற்சிகள் <br />
            </p>
            <label className='voteCountsDetails' style={{ color: '#EC7063' }}>{totalOTPFrauds}</label>
          </div>
        </h3>

      </div>
      <div className='voteCounts'>
        <h3>
          <div className='voteCountLabel' id='_totalValidVotes'>
            <div className="nic_input_field">
              <input type="text" value={nic} onChange={handleIDChange} />
            </div>
            <div>
              <button onClick={handleOTPFraudCheck} className='otp_input_button'>
                පරික්ෂා කරන්න <br />
                Verify<br />
                சரிபார்க்கவும்<br />
              </button>
            </div>
            <div>
              <p>
                ID අංකය OTP අවභාවිතා සංඛ්‍යාව <br />
                OTP Fraud Attempts for This ID <br />
                மொத்த OTP மோசடி முயற்சிகள் <br />
              </p>
              <label className='voteCountsDetails' style={{ color: '#EC7063' }}>{OTPFraudsPerID}</label>
            </div>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default OTPFraudDashboard;