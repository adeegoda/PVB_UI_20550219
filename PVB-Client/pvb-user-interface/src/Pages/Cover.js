import React, { useState } from 'react';
import '../Resources/coverPage.css';
import { Link } from 'react-router-dom';
import EBallotUI from './EBallot';

const PVB_CoverUI = () => {
    return (
        <div>
            <h1>
                <Link to='/votingUI'>
                    <p>
                        චන්ද ප්‍රකාශය ආරම්භ කරන්න<br />
                        Start Casting Vote<br />
                        வாக்களிக்கத் தொடங்குங்கள்<br />
                    </p>
                </Link>
            </h1>
        </div>
    );
}

export default PVB_CoverUI;
