import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { FetchElectionDetails } from '../APIOperators/ElectionDetailsAPI';
import '../Resources/dashboardPage.css';
import { Divider } from 'semantic-ui-react';

const Dashboard = () => {
  const [electionDetails, setElectionDetails] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [data, setData] = useState([]);
  const [totalValidVotes, setTotalValidVotes] = useState(0);
  const [cancelledVotes, setCancelledVotes] = useState(0);
  const [partyDetails, setPartyDetails] = useState([]);

  const fetchPartyDetails = async () => {
    const result = await axios('http://localhost:4000/pvb-api/party-cards');
    setPartyDetails(result.data);
  };

  const fetchPartyVotesData = async () => {
    const data = await FetchElectionDetails();
    setElectionDetails(data);
    const result = await axios('http://localhost:4000/pvb-api/votes-per-party');
    setData(result.data);
  };

  const fetchTotalValidVotesData = async () => {
    const result = await axios('http://localhost:4000/pvb-api/total-valid-votes');
    return result.data.totalValidVotes;
  };

  const fetchCancelledVotesData = async () => {
    const result = await axios('http://localhost:4000/pvb-api/total-cancelled-votes');
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
    return party ? party.party_color : '#000000';  // Default color if party not found
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
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)'
      }
    ]
  };

  const pieData = {
    labels: data.map(item => item._id),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: data.map(item => getColorByPartyCode(item._id)),
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
        <h2>
          {currentDateTime.toLocaleString()}
        </h2>
      </div>
      <div className="chartContainer">
        <div className="voteChart" >
          <Bar data={chartData} />
        </div>
        <div className="voteChart" >
          <Pie data={pieData} />
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
            <label className='voteCountsDetails' style={{ color: 'green' }}>{totalValidVotes}</label>
          </div>
        </h3>
        <h3>
          <div className='voteCountLabel' id='_totalCancelledVotes'>
            <p>
              මුළු අවලංගු චන්ද <br />
              Total Invalid Votes <br />
              மொத்த செல்லுபடியாகும் வாக்குகள் <br />
            </p>
            <label className='voteCountsDetails' style={{ color: 'red' }}>{cancelledVotes}</label>
          </div>
        </h3>
        <h3>
          <div className='voteCountLabel' id='_totalVotes'>
            <p>
              මුළු චන්ද <br />
              Total Votes <br />
              மொத்த செல்லுபடியாகும் வாக்குகள் <br />
            </p>
            <label className='voteCountsDetails' style={{ color: 'blue' }}>{totalValidVotes + cancelledVotes}</label>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default Dashboard;