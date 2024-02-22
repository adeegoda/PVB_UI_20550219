import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Resources/idVerificationPage.css';
import axios from 'axios';


const PVB_IdVerificationUI = () => {
    // State to store the NIC number entered by the user
    const [nicNumber, setNicNumber] = useState('');
    // State to manage error message
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle changes in the input field
    const handleNicNumberChange = (event) => {
        const inputVal = event.target.value;
        // Perform character validation
        if ((inputVal.length <= 9 && /^[0-9]*$/.test(inputVal)) || (inputVal.length === 10 && inputVal[9].toUpperCase() === 'V')) {
            setNicNumber(inputVal);
            setErrorMessage('');
        } else {
            setErrorMessage('Invalid NIC number format');
        }
    };

    const validateNICInput = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        try {
            const response = await axios.post('/validateNIC', { nicNumber });
            console.log(response.data);
        } catch (error) {
            console.error('Error validating NIC number:', error);
        }
    };

    return (
        <div className="container">
            <h2>
                <p>
                    ජාතික හැදුනුම්ත් අංකය තහවුරු කිරීම <br />
                    Verify National Identification Card Number<br />
                    தேசிய அடையாள அட்டை எண்ணைச் சரிபார்க்கவும்<br />
                </p>
            </h2>
            <div className="centered">
                <form onSubmit={validateNICInput}>
                    <div className="nic_input_field">
                        <input
                            name="nic_number"
                            placeholder="Enter NIC Number"
                            value={nicNumber}
                            onChange={handleNicNumberChange}
                        />
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </div>
                    <div className="nic_verification_button">
                        <Link to={{ pathname: '/votingUI', state: { nicNumber } }} className="votingUILink">
                            <button name="verify_nic_number">
                                තහවුරු කරන්න <br />
                                Verify<br />
                                சரிபார்க்கவும்<br />
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PVB_IdVerificationUI;
