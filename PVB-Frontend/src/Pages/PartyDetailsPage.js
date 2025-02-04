import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FetchElectionDetails } from '../APIOperators/ElectionDetailsAPI';
import '../Resources/partyDetailsPage.css';
import '../Resources/responsiveContents.css';
import { Link, useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const isTokenExpired = (token) => {
    if (!token) return true;
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
};

const PartyDetailsPage = () => {
    const history = useHistory();
    const [partyDetails, setPartyDetails] = useState([]);
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

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || isTokenExpired(token)) {
            history.push('/login');
        } else {
            axios.get('http://localhost:4000/pvb-api/party-cards', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setPartyDetails(response.data);
                })
                .catch(error => {
                    console.error(`There was an error retrieving the data: ${error}`);
                });
        }
    }, []);

    return (
        <div className="page-container">
            <div>
                <div className="centered" style={{ marginTop: '200px' }}>
                    <h1>
                        {electionDetails.map(election => (
                            <React.Fragment key={election._id}>
                                {election.election_name_sinhala} | {election.election_name_english} | {election.election_name_tamil} - {election.election_year}
                            </React.Fragment>
                        ))}
                    </h1>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
                                    <td><img className="party-logo" src={party.avatar} alt={party.party_code} /></td>
                                    <td>{party.header1}</td>
                                    <td>{party.header2}</td>
                                    <td>{party.header3}</td>
                                    <td style={{ backgroundColor: party.party_color }}></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default PartyDetailsPage;
