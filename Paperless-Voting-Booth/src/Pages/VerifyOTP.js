import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../Resources/otpVerificationPage.css';
import { validateOTP } from '../APIOperators/OTPValidationAPI';
import { FetchElectionDetails } from '../APIOperators/ElectionDetailsAPI';

function VerifyOTP() {
    const [otp, setOtp] = useState('');
    const [verificationResult, setVerificationResult] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [otpValidated, setOTPValidated] = useState(false);
    const history = useHistory();
    const [electionDetails, setElectionDetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await FetchElectionDetails();
            setElectionDetails(data);
        };

        fetchData();
    }, []);

    const handleOTPVerification = async () => {
        const validatedResult = await validateOTP(history, otp, setErrorMessage);
        if (validatedResult === 'OTP is valid') {
            setOTPValidated(true);
        }
        setVerificationResult(validatedResult);
    };

    const handleOTPChange = (e) => {
        const inputVal = e.target.value;
        setOtp(inputVal);
        setErrorMessage('');
    };

    useEffect(() => {
        if (otpValidated) {
            history.replace('/votingUI');
        }
    }, [otpValidated, history]);

    return (
        <div>
            <div className="centered">
                <h2>
                    {electionDetails.map(election => (
                        <React.Fragment key={election._id}>
                            {election.election_name_sinhala} | {election.election_name_english} | {election.election_name_tamil} - {election.election_year}
                        </React.Fragment>
                    ))}
                </h2>
            </div>
            <div className="container">
                <h2>
                    <p>
                        OTP අංකය ඇතුලත් කරන්න <br />
                        Enter OTP Number <br />
                        OTP எண்ணை உள்ளிடவும்<br />
                    </p>
                </h2>
                <div className="centered">
                    <div className="otp_input_field">
                        <input type="text" value={otp} onChange={handleOTPChange} />
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </div>
                    <div className="otp_verification_button"></div>
                    <button onClick={handleOTPVerification} className='otp_input_button'>
                        තහවුරු කරන්න <br />
                        Verify<br />
                        சரிபார்க்கவும்<br />
                    </button>
                </div>
                <p>{verificationResult}</p>
            </div>
        </div>
    );
}

export default VerifyOTP;
