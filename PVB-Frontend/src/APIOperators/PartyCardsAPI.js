import axios from 'axios';

export const FetchPartyCards = (setCards, setLoading) => {
    const otptoken = localStorage.getItem('otp-token');
    axios.get("http://localhost:4000/pvb-api/party-cards", {
        headers: {
            'otp-authorization': `Bearer ${otptoken}`
        }
    })
        .then(response => {
            setCards(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
}