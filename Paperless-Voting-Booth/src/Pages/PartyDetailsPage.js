import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FetchElectionDetails } from '../APIOperators/ElectionDetailsAPI';
import '../Resources/partyDetailsPage.css';

const PartyDetailsPage = () => {
    const [partyDetails, setPartyDetails] = useState([]);
    const [electionDetails, setElectionDetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await FetchElectionDetails();
            setElectionDetails(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        axios.get('http://localhost:4000/pvb-api/party-cards')
            .then(response => {
                setPartyDetails(response.data);
            })
            .catch(error => {
                console.error(`There was an error retrieving the data: ${error}`);
            });
    }, []);

    return (
        <div>
            <div className="container">
                <h1>
                    {electionDetails.map(election => (
                        <React.Fragment key={election._id}>
                            {election.election_name_sinhala} | {election.election_name_english} | {election.election_name_tamil} - {election.election_year}
                        </React.Fragment>
                    ))}
                </h1>
            </div>
            <div>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Party Code</th>
                            <th>Logo</th>
                            <th>පක්ෂ නාමය</th>
                            <th>Party Name</th>
                            <th>கட்சியின் பெயர்</th>
                            <th>Party Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {partyDetails.map((party, index) => (
                            <tr key={index}>
                                <td>{party.party_code}</td>
                                <td><img src={party.avatar} alt={party.party_code} /></td>
                                <td>{party.header1}</td>
                                <td>{party.header2}</td>
                                <td>{party.header3}</td>
                                <td style={{ backgroundColor: party.party_color }}>{party.party_color}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PartyDetailsPage;
