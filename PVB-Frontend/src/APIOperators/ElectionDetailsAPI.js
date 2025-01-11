export const FetchElectionDetails = async () => {
  try {
    const response = await fetch('http://localhost:4000/pvb-api/election-details', {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
    const data = await response.json();
    return Array.isArray(data) ? data : []; // Ensure the returned data is an array
  } catch (error) {
    console.error('Error fetching election details:', error);
    return [];
  }
};
