import React, { useState, useEffect } from 'react';
import '../Resources/otpGenerationPage.css';
import { Link, useHistory } from 'react-router-dom';
import { generateOTP } from '../APIOperators/OTPGenerationAPI';
import { FetchElectionDetails } from '../APIOperators/ElectionDetailsAPI';
import jwtDecode from 'jwt-decode';

const isTokenExpired = (token) => {
    if (!token) return true;
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
};

const PVB_OTPGenerationUI = () => {
    const history = useHistory();
    const [otp, setOtp] = useState('');
    const [nic, setNic] = useState('');
    const [nicErrorMessage, setNicErrorMessage] = useState('');
    const [otpErrorMessage, setOtpErrorMessage] = useState('');
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

    const handleGenerateOTP = async () => {
        setOtpErrorMessage('');
        const generatedOTP = await generateOTP(nic, setNicErrorMessage, setOtpErrorMessage);
        setOtp(generatedOTP);
    };

    const handleNICChange = (e) => {
        const inputVal = e.target.value;
        setNic(inputVal);
        setNicErrorMessage('');
        setOtpErrorMessage('');
    };

    return (
        <div>
            <div className="centered">
                <h1>
                    {electionDetails.map(election => (
                        <React.Fragment key={election._id}>
                            {election.election_name_sinhala} | {election.election_name_english} | {election.election_name_tamil} - {election.election_year}
                        </React.Fragment>
                    ))}
                </h1>
                <div>
                    <button className='backButton' name='backButton'>
                        <Link className='backButtonLinks' to='/backOffice'>
                            <p className='backButtonLabels'>
                                ආපසු | Back | மீண்டும்
                            </p>
                        </Link>
                    </button>
                </div>
            </div>
            <div className="container">
                <h2>
                    <p>
                        NIC අංකය ඇතුලත් කරන්න <br />
                        Input NIC Number <br />
                        NIC எண்ணை உள்ளிடவும்<br />
                    </p>
                </h2>
                <div className="nic_input_field">
                    <input type="text" value={nic} onChange={handleNICChange} />
                    {nicErrorMessage && <div className="error-message">{nicErrorMessage}</div>}
                </div>

                <h2>
                    <p>
                        OTP අංකයක් නිපදවන්න <br />
                        Generate OTP Number <br />
                        OTP எண்ணை உருவாக்கவும்<br />
                    </p>
                </h2>
                <div className="centered">
                    <label>{otp}</label>
                    <div>
                        {otpErrorMessage && <div className="error-message">{otpErrorMessage}</div>}
                    </div>
                    <div name="otp-generate" className='otp_label_field'>
                        <button onClick={handleGenerateOTP} className='otp_generate_button'>
                            නිපදවන්න<br />
                            Generate<br />
                            உருவாக்கு<br />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PVB_OTPGenerationUI;
