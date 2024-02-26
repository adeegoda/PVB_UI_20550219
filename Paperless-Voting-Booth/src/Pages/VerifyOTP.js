import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Resources/otpVerificationPage.css';
import { validateOTP } from '../APIOperators/OTPValidationAPI';

function VerifyOTP() {
    const [otp, setOtp] = useState('');
    const [verificationResult, setVerificationResult] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();

    const handleOTPVerification = async () => {
        const validatedResult = await validateOTP(history, otp, setErrorMessage);
        setVerificationResult(validatedResult);
    };

    const handleOTPChange = (e) => {
        const inputVal = e.target.value;
        setOtp(inputVal);
        setErrorMessage('');
    };

    return (
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
    );
}

export default VerifyOTP;
