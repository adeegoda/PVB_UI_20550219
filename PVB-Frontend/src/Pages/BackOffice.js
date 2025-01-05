import React, { useState, useEffect } from 'react';
import '../Resources/backOfficePage.css';
import { Link, useHistory } from 'react-router-dom';
import { FetchElectionDetails } from '../APIOperators/ElectionDetailsAPI';
import jwtDecode from 'jwt-decode';

const isTokenExpired = (token) => {
    if (!token) return true;
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
};

const PVB_CoverUI = () => {
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
            <div className="container">
                <div className="backOfficePages">
                    <button className='backOfficeButtons'>
                        <Link className='backOfficeLinks' to='/generateOTP'>
                            <p className='backOfficeLabels'>
                                OTP අංකයක් නිපදවන්න <br />
                                Generate OTP Number <br />
                                OTP எண்ணை உருவாக்கவும் <br />
                            </p>
                        </Link>
                    </button>
                    <button className='backOfficeButtons'>
                        <Link className='backOfficeLinks' to='/dashboard'>
                            <p className='backOfficeLabels'>
                                මැතිවරණ උපකරණ පුවරුව <br />
                                Election Dashboard <br />
                                தேர்தல் டாஷ்போர்டு <br />
                            </p>
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PVB_CoverUI;
