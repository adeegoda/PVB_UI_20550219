import React, { useState } from 'react';
import '../Resources/otpGenerationPage.css';

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
        <div className="container">
            <h2>
                <p>
                    OTP අංකයක් නිපදවන්න <br />
                    Generate OTP Number <br />
                    OTP எண்ணை உருவாக்கவும்<br />
                </p>
            </h2>
            <div className="centered">
                <label>{otp}</label>
                <div name="otp-generate" className='otp_label_field'>
                    <button onClick={generateOTP} className='otp_generate_button'>
                        නිපදවන්න<br />
                        Generate<br />
                        உருவாக்கு<br />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PVB_OTPGenerationUI;
