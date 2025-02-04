import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import jwtDecode from 'jwt-decode';
import { FetchElectionDetails } from '../APIOperators/ElectionDetailsAPI';
import '../Resources/dashboardPage.css';
import { Divider } from 'semantic-ui-react';

const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

const Dashboard = () => {
  const history = useHistory();
  const [electionDetails, setElectionDetails] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [data, setData] = useState([]);
  const [totalValidVotes, setTotalValidVotes] = useState(0);
  const [cancelledVotes, setCancelledVotes] = useState(0);
  const [partyDetails, setPartyDetails] = useState([]);
  const [barChartDataUpdated, setBarChartDataUpdated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
      history.push('/login');
    } else {
      fetchPartyDetails();
      fetchPartyVotesData();
    }
  }, [history]);

  const fetchPartyDetails = async () => {
    const token = localStorage.getItem('token');
    const result = await axios.get('http://localhost:4000/pvb-api/party-cards', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    setPartyDetails(result.data);
  };

  const fetchPartyVotesData = async () => {
    const token = localStorage.getItem('token');
    const data = await FetchElectionDetails();
    setElectionDetails(data);
    const result = await axios.get('http://localhost:4000/pvb-api/votes-per-party', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    setData(result.data);
    setBarChartDataUpdated(true);
    setTimeout(() => setBarChartDataUpdated(false), 200);
  };

  const fetchTotalValidVotesData = async () => {
    const token = localStorage.getItem('token');
    const result = await axios('http://localhost:4000/pvb-api/total-valid-votes', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return result.data.totalValidVotes;
  };

  const fetchCancelledVotesData = async () => {
    const token = localStorage.getItem('token');
    const result = await axios('http://localhost:4000/pvb-api/total-cancelled-votes', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return result.data.totalCancelledVotes;
  };

  const fetchVotesData = async () => {
    const totalValidVotesData = await fetchTotalValidVotesData();
    setTotalValidVotes(totalValidVotesData);
    const totalCanceledVotesData = await fetchCancelledVotesData();
    setCancelledVotes(totalCanceledVotesData);
  };

  useEffect(() => {
    fetchPartyVotesData();
    fetchVotesData();
    fetchPartyDetails();
    const voteRefreshIntervalId = setInterval(fetchPartyVotesData, 30000);
    const totalVoteRefreshIntervalId = setInterval(fetchVotesData, 30000);
    const dateTimeIntervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => {
      clearInterval(voteRefreshIntervalId);
      clearInterval(dateTimeIntervalId);
      clearInterval(totalVoteRefreshIntervalId);
    };
  }, []);

  const getColorByPartyCode = (partyCode) => {
    const party = partyDetails.find(p => p.party_code === partyCode);
    return party ? party.party_color : '#000000';
  };

  const chartData = {
    labels: data.map(item => item._id),
    datasets: [
      {
        label: 'Votes Per Party',
        data: data.map(item => item.count),
        backgroundColor: data.map(item => getColorByPartyCode(item._id)),
        borderColor: data.map(item => getColorByPartyCode(item._id)),
        borderWidth: 1,
        hoverBackgroundColor: data.map(item => getColorByPartyCode(item._id)),
        hoverBorderColor: '#313338'
      }
    ]
  };

  const totalVotes = data.reduce((total, item) => total + item.count, 0);

  const pieData = {
    labels: data.map(item => item._id),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: data.map(item => getColorByPartyCode(item._id)),
        hoverBorderColor: '#313338'
      }
    ]
  };

  if (!chartData) {
    return <p style={{ color: 'red', fontSize: '20px' }}>Loading chart data...</p>;
  }

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
            <Link className='backButtonLinks' to='/backOffice'>
              <p className='backButtonLabels'>
                ආපසු | Back | மீண்டும்
              </p>
            </Link>
          </button>
          <div>
            <button className='backButton' name='goTOPartyDetails'>
              <Link className='backButtonLinks' to='/partyDetails'>
                <p className='backButtonLabels'>
                  පක්ෂ විස්තර | Party Details | கட்சி விவரங்கள்
                </p>
              </Link>
            </button>
            <div>
              <button className='backButton' name='backButton'>
                <Link className='backButtonLinks' to='/OTPFraudUI'>
                  <p className='backButtonLabels'>
                    OTP අවභාවිත | OTP Frauds | OTP மோசடிகள்
                  </p>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="chartContainer">
        <div className="voteChart" >
          <Bar data={chartData} />
        </div>
        <div className="voteChart" >
          <Pie
            data={pieData}
            options={{
              tooltips: {
                callbacks: {
                  label: function (tooltipItem, data) {
                    const party = data.labels[tooltipItem.index];
                    const voteCount = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    const percentage = ((voteCount / totalVotes) * 100).toFixed(2);
                    return `${party}: ${percentage}%`;
                  }
                }
              }
            }}
            key={barChartDataUpdated}
          />
        </div>
      </div>
      <div className='voteCounts'>
        <Divider />
        <h3>
          <div className='voteCountLabel' id='_totalValidVotes'>
            <p>
              මුළු වලංගු චන්ද <br />
              Total Valid Votes <br />
              மொத்த செல்லுபடியாகும் வாக்குகள் <br />
            </p>
            <label className='voteCountsDetails' style={{ color: '#82E0AA' }}>{totalValidVotes}</label>
          </div>
        </h3>
        <h3>
          <div className='voteCountLabel' id='_totalCancelledVotes'>
            <p>
              මුළු අවලංගු චන්ද <br />
              Total Invalid Votes <br />
              மொத்த செல்லாத வாக்குகள் <br />
            </p>
            <label className='voteCountsDetails' style={{ color: '#EC7063' }}>{cancelledVotes}</label>
          </div>
        </h3>
        <h3>
          <div className='voteCountLabel' id='_totalVotes'>
            <p>
              මුළු ප්‍රකාශිත චන්ද <br />
              Total Casted Votes <br />
              போடப்பட்ட மொத்த வாக்குகள் <br />
            </p>
            <label className='voteCountsDetails' style={{ color: '#85C1E9' }}>{totalValidVotes + cancelledVotes}</label>
          </div>
        </h3>
      </div>

    </div>
  );
};

export default Dashboard;