import axios from 'axios';

export const SubmitConfirmedVote = (selectedPartyCode) => {
    axios.post("http://localhost:4000/pvb-api/submitBallots", {
        party_code: selectedPartyCode
    })
        .then(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
        );
};