import React, { useState } from 'react';

const PVB_OTPGenerationUI = () => {
    const [otp, setOtp] = useState('');
    const generateOTP = async () => {
        try {
            const response = await fetch("http://localhost:4000/pvb-api/generate-otp", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            setOtp(data.otp);
        } catch (error) {
            console.error('Error generating OTP:', error);
        }
    };

    return (
        <div>
            <h1>OTP: {otp}</h1>
            <button onClick={generateOTP}>Generate OTP</button>
        </div>
    );
}

export default PVB_OTPGenerationUI;
