import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { FetchElectionDetails } from '../APIOperators/ElectionDetailsAPI';

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

  return (<div>
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
    <div className="vote_chart" style={{ width: '700px', height: '500px' }}>
      <Bar data={chartData} />
      <h2>
        මුළු වලංගු චන්ද | Total Valid Votes | மொத்த செல்லுபடியாகும் வாக்குகள் : {totalVotes}
      </h2>
    </div>
  </div>
  );
};

export default Dashboard;