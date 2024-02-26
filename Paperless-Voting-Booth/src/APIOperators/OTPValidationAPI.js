export const validateOTP = async (history, otp, setErrorMessage) => {
    if (!/^[0-9]{6}$/.test(otp)) {
        setErrorMessage('Invalid OTP format. Please enter a 6-digit numeric OTP.');
        return;
    }
    try {
        const response = await fetch("http://localhost:4000/pvb-api/validate-otp", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ otp: otp })
        });
        const data = await response.json();
        if (response.status === 202) {
            history.push('/votingUI');
        }
        return data.message;
    } catch (error) {
        console.error('Error verifying OTP:', error);
    }
}