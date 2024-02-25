import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Resources/idVerificationPage.css';

function VerifyOTP() {
    const [otp, setOtp] = useState('');
    const [verificationResult, setVerificationResult] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();

    const handleOTPVerification = async () => {
        if (!/^[0-9]{6}$/.test(otp)) {
            setErrorMessage('Invalid OTP format. Please enter a 6-digit numeric OTP.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/pvb-api/validate-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ otp: otp })
            });
            const data = await response.json();
            setVerificationResult(data.message);
            if (response.status === 202) {
                history.push('/votingUI');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
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
                <button onClick={handleOTPVerification}>
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
