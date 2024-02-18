import React from 'react';
import '../Resources/idVerificationPage.css';
import { Link } from 'react-router-dom';


const PVB_IdVerificationUI = () => {
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
                <div className="nic_input_field">
                    <input name="nic_number" placeholder="Enter NIC Number" />
                </div>
                <div className="nic_verification_button">
                    <Link to='/votingUI'>
                        <button name="verify_nic_number">
                            තහවුරු කරන්න <br />
                            Verify<br />
                            சரிபார்க்கவும்<br />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PVB_IdVerificationUI;
