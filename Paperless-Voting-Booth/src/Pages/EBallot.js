import React, { useState } from 'react';
import _ from 'lodash';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { CardGroup } from 'semantic-ui-react';
import Card from '../Modals/Card';
import InvalidOperationMessage from '../Modals/InvalidOperationMessage';
import ConfirmationModal from '../Modals/ConfirmationModal';
import FinishVotingModal from '../Modals/FinishVotingModal';

const cards = [
    {
        party_code: 'NPP',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/NPP_Symbol.png/100px-NPP_Symbol.png',
        header1: "ජාතික ජන බලවේගය",
        header2: "National People's Power",
        header3: "தேசிய மக்கள் சக்தி",
    },
    {
        party_code: 'SJB',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Samagi_Jana_Balawegaya_-_Telephone_Symbol_-_Black.png/180px-Samagi_Jana_Balawegaya_-_Telephone_Symbol_-_Black.png',
        header1: "සමගි ජනබලවේගය",
        header2: "Samagi Jana Balawegaya",
        header3: "ஐக்கிய மக்கள் சக்தி",
    },
    {
        party_code: 'SLPP',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Sri_Lanka_Podujana_Peramuna_election_symbol.svg/125px-Sri_Lanka_Podujana_Peramuna_election_symbol.svg.png',
        header1: "ශ්‍රී ලංකා පොදුජන පෙරමුණ",
        header2: "Sri Lanka Podujana Peramuna",
        header3: "இலங்கை பொதுஜன முன்னணி",
    },
    {
        party_code: 'FPA',
        avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Logo_of_the_Freedom_People%27s_Alliance.png/180px-Logo_of_the_Freedom_People%27s_Alliance.png',
        header1: "නිදහස් ජනතා සන්ධානය",
        header2: "Freedom People's Alliance",
        header3: "சுதந்திர மக்கள் கூட்டணி",
    },
    {
        party_code: 'DTNA',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Election_Symbol_Demacratic_Tamila_Natinal_Aliance_Sri_Lanka.png/150px-Election_Symbol_Demacratic_Tamila_Natinal_Aliance_Sri_Lanka.png',
        header1: "දෙමළ ජාතික සන්ධානය",
        header2: "Democratic Tamil National Alliance",
        header3: "தமிழ்த் தேசியக் கூட்டமைப்பு",
    },
];

const PVB_EBallotUI = () => {
    const [loading] = useState(false);
    const [selectedPartyCode, setSelectedPartyCode] = useState('');
    const [voted, setVotedFlag] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [openFinishVoting, setOpenFinishVoting] = useState(false);

    const SubmitConfirmedVote = () => {
        axios.post("http://localhost:4000/api/submitBallots", {
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

    const CancelVote = () => {
        try {
            setSelectedPartyCode('');
        } catch (error) {
            InvalidOperationMessage();
        }
    };

    const SelectionVote = (card) => {
        try {
            setSelectedPartyCode(card.party_code);
        } catch (error) {
            InvalidOperationMessage();
        }
    };

    return (
        <>
            <CardGroup doubling itemsPerRow={3} stackable>
                {_.map(cards, (card) => (
                    <Card
                        key={card.id}
                        loading={loading}
                        card={card}
                        voted={voted}
                        onVote={SelectionVote}
                        setVotedFlag={setVotedFlag}
                        setOpenConfirmation={setOpenConfirmation}
                        setOpenFinishVoting={setOpenFinishVoting}
                    />
                ))}
            </CardGroup>

            <ConfirmationModal
                open={openConfirmation}
                onClose={() => setOpenConfirmation(false)}
                onConfirm={() => {
                    setOpenConfirmation(false);
                    SubmitConfirmedVote();
                    setVotedFlag(true);
                    setOpenFinishVoting(true);
                }}
                onCancel={() => {
                    CancelVote();
                    setVotedFlag(false);
                    setOpenConfirmation(false);
                }}
                voted={voted}
                setVotedFlag={setVotedFlag}
                setOpenFinishVoting={setOpenFinishVoting}
            />

            <FinishVotingModal
                open={openFinishVoting}
                onClose={() => setOpenFinishVoting(false)}
                voted={voted}
                setOpenFinishVoting={setOpenFinishVoting}
            />
        </>
    );
};

export default PVB_EBallotUI;
