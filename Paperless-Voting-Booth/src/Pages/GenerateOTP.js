import React, { useState, useEffect } from 'react';
import '../Resources/otpGenerationPage.css';
import { generateOTP } from '../APIOperators/OTPGenerationAPI';
import { FetchElectionDetails } from '../APIOperators/ElectionDetailsAPI';


const PVB_OTPGenerationUI = () => {
    const [otp, setOtp] = useState('');
    const [electionDetails, setElectionDetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await FetchElectionDetails();
            setElectionDetails(data);
        };

        fetchData();
    }, []);

    const handleGenerateOTP = async () => {
        const generatedOTP = await generateOTP();
        setOtp(generatedOTP);
    };

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
        </div>
    );
}

export default PVB_OTPGenerationUI;
