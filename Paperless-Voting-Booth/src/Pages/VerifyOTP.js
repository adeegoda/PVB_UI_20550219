import React, { useState } from 'react';
import '../Resources/idVerificationPage.css';

function App() {
    const [otp, setOtp] = useState('');
    const [verificationResult, setVerificationResult] = useState('');

    const handleOTPVerification = async () => {
        try {
            const response = await fetch('http://localhost:4000/validate-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ otp: otp })
            });

            const data = await response.json();
            setVerificationResult(data.message);
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
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
                    <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
                </div>
                <div className="otp_verification_button"></div>
                <button onClick={handleOTPVerification}>Verify OTP</button>
            </div>
            <p>{verificationResult}</p>
        </div>

    );
}

export default App;
