export const validateOTP = async (history, otp, setErrorMessage) => {
    if (!/^[0-9]{6}$/.test(otp)) {
        setErrorMessage('වලංගු නොවන OTP ආකෘතිය. කරුණාකර ඉලක්කම් 6ක සංඛ්‍යාත්මක OTP එකක් ඇතුළු කරන්න | Invalid OTP format. Please enter a 6-digit numeric OTP | தவறான OTP வடிவம். 6 இலக்க எண் OTP ஐ உள்ளிடவும்');
        return;
    }
    try {
        const response = await fetch("http://localhost:4000/pvb-api/validate-otp", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'voter-otp': otp,
            },
            body: JSON.stringify({ otp: otp })
        });
        const data = await response.json();
        if (response.status === 202) {
            return data.message;
        }
        return data.message;
    } catch (error) {
        console.error('Error verifying OTP:', error);
    }
}