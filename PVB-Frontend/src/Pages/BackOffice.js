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
        <div className="backOfficeContainer">
            <h1 className='backOfficeHeader'>
                {electionDetails.map(election => (
                    <React.Fragment key={election._id}>
                        {election.election_name_sinhala} | {election.election_name_english} | {election.election_name_tamil} - {election.election_year}
                    </React.Fragment>
                ))}
            </h1>
            <Link className='backOfficeLinks' to='/generateOTP'>
                <button className='backOfficeButtons'>
                        OTP අංකයක් නිපදවන්න <br />
                        Generate OTP Number <br />
                        OTP எண்ணை உருவாக்கவும் <br />
                </button>
            </Link>
            <Link className='backOfficeLinks' to='/dashboard'>
                <button className='backOfficeButtons'>
                        මැතිවරණ උපකරණ පුවරුව <br />
                        Election Dashboard <br />
                        தேர்தல் டாஷ்போர்டு <br />
                </button>
            </Link>
            <Link className='backOfficeLinks' to='/selectOperation'>
                <button className='backOfficeButtons'>
                        ප්‍රධාන මෙනුවට <br />
                        To Main Menu <br />
                        முதன்மை மெனுவிற்கு <br />
                </button>
            </Link>
        </div>
    );
}

export default PVB_CoverUI;
