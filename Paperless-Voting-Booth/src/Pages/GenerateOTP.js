import React, { useState } from 'react';
import '../Resources/otpGenerationPage.css';
import { generateOTP } from '../APIOperators/OTPGenerationAPI';

const PVB_OTPGenerationUI = () => {
    const [otp, setOtp] = useState('');
    const handleGenerateOTP = async () => {
        const generatedOTP = await generateOTP();
        setOtp(generatedOTP);
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
                    <button onClick={handleGenerateOTP} className='otp_generate_button'>
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
