export const generateOTP = async () => {
    try {
        const response = await fetch("http://localhost:4000/pvb-api/generate-otp", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data.otp;
    } catch (error) {
        console.error('Error generating OTP:', error);
    }
};