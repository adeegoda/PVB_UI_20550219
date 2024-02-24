import React from 'react';
import { Message, MessageHeader } from 'semantic-ui-react';

const InvalidOperationMessage = () => (
    <Message>
        <MessageHeader>වලංගු නොවන මෙහෙයුම | Invalid Operation | தவறான செயல்பாடு</MessageHeader>
        <p>ඔබ වලංගු නොවන මෙහෙයුමක් සිදු කර ඇත කරුණාකර නිවැරදි විකල්පය තෝරන්න!</p>
        <p>You have performed an invalid operation please click on the correct option!</p>
        <p>நீங்கள் தவறான செயலைச் செய்துள்ளீர்கள், சரியான விருப்பத்தைத் தேர்வுசெய்க!</p>
    </Message>
);

export default InvalidOperationMessage;
