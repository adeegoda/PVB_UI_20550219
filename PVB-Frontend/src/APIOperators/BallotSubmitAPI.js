import axios from 'axios';

export const SubmitConfirmedVote = (selectedPartyCode) => {
    const otptoken = localStorage.getItem('otp-token');
    axios.post("http://localhost:4000/pvb-api/submitBallots",
        { party_code: selectedPartyCode },
        {
            headers: {
                'otp-authorization': `Bearer ${otptoken}`
            }
        }
    )
        .then(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
        );
};

export const SubmitCancelledVote = (status) => {
    const otptoken = localStorage.getItem('otp-token');
    axios.post("http://localhost:4000/pvb-api/cancelled-ballots",
        { voteCancelled: status },
        {
            headers: {
                'otp-authorization': `Bearer ${otptoken}`
            }
        }
    )
        .then(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
        );
};