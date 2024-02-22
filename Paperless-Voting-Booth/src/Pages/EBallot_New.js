import React, { useState } from 'react';
import _ from 'lodash';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import { CardGroup, Divider } from 'semantic-ui-react';
import VotingCard from '../Modals/votingCardModal';
import ConfirmationModal from '../Modals/confirmationModal';
import FinishModal from '../Modals/voteFinishingModal';

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
    // Add other card data
];

const PVB_EBallotUI = () => {
    const [voteForOption1, setVoteForOption1] = useState(0);
    const [voteForOption2, setVoteForOption2] = useState(0);
    const [voteForOption3, setVoteForOption3] = useState(0);
    const [voted, setVotedFlag] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [completed, setOpenFinishVoting] = useState(false);

    return (
        <>
            <Divider />
            <CardGroup doubling itemsPerRow={3} stackable>
                {_.map(cards, (card) => (
                    <VotingCard
                        key={card.id}
                        card={card}
                        voteForOption1={voteForOption1}
                        voteForOption2={voteForOption2}
                        voteForOption3={voteForOption3}
                        setVoteForOption1={setVoteForOption1}
                        setVoteForOption2={setVoteForOption2}
                        setVoteForOption3={setVoteForOption3}
                        setVotedFlag={setVotedFlag}
                        setOpenConfirmation={setOpenConfirmation}
                    />
                ))}
            </CardGroup>
            <ConfirmationModal
                open={openConfirmation}
                setOpenConfirmation={setOpenConfirmation}
                setOpenFinishVoting={setOpenFinishVoting}
                voted={voted}
                setVotedFlag={setVotedFlag}
                voteForOption1={voteForOption1}
                voteForOption2={voteForOption2}
                voteForOption3={voteForOption3}
            />
            <FinishModal
                open={completed}
                setOpenFinishVoting={setOpenFinishVoting}
            />
        </>
    );
};

export default PVB_EBallotUI;
