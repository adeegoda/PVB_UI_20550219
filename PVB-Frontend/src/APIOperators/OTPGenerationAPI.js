export const generateOTP = async (nic, setNicErrorMessage, setOtpErrorMessage) => {
  if (nic !== '') {
    if (!/^[0-9]{9}V$/.test(nic)) {
      setNicErrorMessage('වලංගු නොවන NIC ආකෘතියකි | Invalid NIC format | தவறான NIC வடிவம்');
      return;
    }
  } else {
    setNicErrorMessage('NIC අංකය ඇතුලත් කර නොමැත | NIC field is empty | NIC புலம் காலியாக உள்ளது');
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await fetch("http://localhost:4000/pvb-api/generate-otp", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'voter-nic': nic,
      },
      body: JSON.stringify({ nic: nic })
    });
    const data = await response.json();
    if (response.status === 201) {
      return data.otp;
    } else {
      setOtpErrorMessage(data.message);
      return;
    }
  } catch (error) {
    setOtpErrorMessage('Error generating OTP');
    console.error('Error generating OTP:', error);
  }
};