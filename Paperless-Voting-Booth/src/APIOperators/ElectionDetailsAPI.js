export const FetchElectionDetails = async () => {
    try {
        const response = await fetch("http://localhost:4000/pvb-api/election-details");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching election details:', error);
        return [];
    }
};
