import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { FetchElectionDetails } from '../APIOperators/ElectionDetailsAPI';
import '../Resources/dashboardPage.css';

const Dashboard = () => {
  const [electionDetails, setElectionDetails] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [data, setData] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);

  const fetchPartyVotesData = async () => {
    const data = await FetchElectionDetails();
    setElectionDetails(data);
    const result = await axios('http://localhost:4000/pvb-api/votes-per-party');
    setData(result.data);
  };

  const fetchTotalVotesData = async () => {
    const result = await axios('http://localhost:4000/pvb-api/total-votes');
    return result.data.totalVotes;
  };

  const fetchData = async () => {
    const totalVotesData = await fetchTotalVotesData();
    setTotalVotes(totalVotesData);
  };

  useEffect(() => {
    fetchPartyVotesData();
    fetchData();
    const voteRefreshIntervalId = setInterval(fetchPartyVotesData, 30000);
    const totalVoteRefreshIntervalId = setInterval(fetchData, 30000);
    const dateTimeIntervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => {
      clearInterval(voteRefreshIntervalId);
      clearInterval(dateTimeIntervalId);
      clearInterval(totalVoteRefreshIntervalId);
    };
  }, []);

  const chartData = {
    labels: data.map(item => item._id),
    datasets: [
      {
        label: 'Votes per party',
        data: data.map(item => item.count),
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)'
      }
    ]
  };

  if (!chartData) {
    return <p style={{ color: 'red', fontSize: '20px' }}>Loading chart data...</p>;
  }

  return (<div className='generalStyle'>
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
    <div className="voteChart">
      <Bar data={chartData} />
    </div>
    <div class='voteCounts'>
      <h2>
        <div className='voteCountsDetails'>
          <div>මුළු වලංගු චන්ද | Total Valid Votes | மொத்த செல்லுபடியாகும் வாக்குகள்</div>
          <div><label style={{ color: 'green' }}>{totalVotes}</label></div>
        </div>
      </h2>
    </div>
    <div class='voteCounts'>
      <h2>
        <div className='voteCountsDetails'>
          <div>මුළු අවලංගු චන්ද | Total Invalid Votes | மொத்த செல்லுபடியாகும் வாக்குகள்</div>
          <div><label style={{ color: 'red' }}>{totalVotes}</label></div>
        </div>
      </h2>
    </div>
    <div class='voteCounts'>
      <h2>
        <div className='voteCountsDetails'>
          <div>මුළු චන්ද | Total Votes | மொத்த செல்லுபடியாகும் வாக்குகள்</div>
          <div><label style={{ color: 'blue' }}>{totalVotes}</label></div>
        </div>
      </h2>
    </div>
  </div>
  );
};

export default Dashboard;