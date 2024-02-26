import axios from 'axios';

export const FetchPartyCards = (setCards, setLoading) => {
    axios.get("http://localhost:4000/pvb-api/party-cards")
        .then(response => {
            setCards(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
}