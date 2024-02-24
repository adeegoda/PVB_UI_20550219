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
        id: 'option_1',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/NPP_Symbol.png/100px-NPP_Symbol.png',
        header1: "ජාතික ජන බලවේගය",
        header2: "National People's Power",
        header3: "தேசிய மக்கள் சக்தி",
    },
    {
        id: 'option_2',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Samagi_Jana_Balawegaya_-_Telephone_Symbol_-_Black.png/180px-Samagi_Jana_Balawegaya_-_Telephone_Symbol_-_Black.png',
        header1: "සමගි ජනබලවේගය",
        header2: "Samagi Jana Balawegaya",
        header3: "ஐக்கிய மக்கள் சக்தி",
    },
    {
        id: 'option_3',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Sri_Lanka_Podujana_Peramuna_election_symbol.svg/125px-Sri_Lanka_Podujana_Peramuna_election_symbol.svg.png',
        header1: "ශ්‍රී ලංකා පොදුජන පෙරමුණ",
        header2: "Sri Lanka Podujana Peramuna ",
        header3: "இலங்கை பொதுஜன முன்னணி",
    },
];

const PVB_EBallotUI = () => {
    const [loading] = useState(false);
    const [voteForOption1, setVoteForOption1] = useState(0);
    const [voteForOption2, setVoteForOption2] = useState(0);
    const [voteForOption3, setVoteForOption3] = useState(0);
    const [voted, setVotedFlag] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [openFinishVoting, setOpenFinishVoting] = useState(false);

    const SubmitConfirmedVote = () => {
        axios.post("http://localhost:4000/api/submitBallots", {
            option_1: voteForOption1,
            option_2: voteForOption2,
            option_3: voteForOption3
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
        voteForOption1 > 0 ?
            setVoteForOption1(voteForOption1 - 1)
            : voteForOption2 > 0 ?
                setVoteForOption2(voteForOption2 - 1)
                : voteForOption3 > 0 ?
                    setVoteForOption3(voteForOption3 - 1)
                    : InvalidOperationMessage();
    };

    const SelectionVote = (card) => {
        card.id === 'option_1' && voteForOption1 < 1 ?
            setVoteForOption1(voteForOption1 + 1)
            : card.id === 'option_2' && voteForOption2 < 1 ?
                setVoteForOption2(voteForOption2 + 1)
                : card.id === 'option_3' && voteForOption3 < 1 ?
                    setVoteForOption3(voteForOption3 + 1)
                    : InvalidOperationMessage();
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
