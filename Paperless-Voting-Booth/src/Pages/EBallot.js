import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import _, { set } from 'lodash';
import 'semantic-ui-css/semantic.min.css';
import { CardGroup } from 'semantic-ui-react';
import '../Resources/eballotPage.css'
import Card from '../Modals/Card';
import InvalidOperationMessage from '../Modals/InvalidOperationMessage';
import ConfirmationModal from '../Modals/ConfirmationModal';
import FinishVotingModal from '../Modals/FinishVotingModal';
import VoteAtteptExceedModal from '../Modals/VoteAtteptExceedModal';
import { SubmitConfirmedVote } from '../APIOperators/BallotSubmitAPI';
import { FetchPartyCards } from '../APIOperators/PartyCardsAPI';
import { FetchElectionDetails } from '../APIOperators/ElectionDetailsAPI';
import { SubmitCancelledVote } from '../APIOperators/BallotSubmitAPI';

const PVB_EBallotUI = () => {
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState([]);
    const [electionDetails, setElectionDetails] = useState([]);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const fetchData = async () => {
            const data = await FetchElectionDetails();
            setElectionDetails(data);
        };

        fetchData();

        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        FetchPartyCards(setCards, setLoading)
    }, []); // Empty dependency array ensures useEffect runs only once on mount

    const [selectedPartyCode, setSelectedPartyCode] = useState('');
    const [voteCancelled, setVoteCancelled] = useState(true);
    const [voted, setVotedFlag] = useState(false);
    const [attepmted, setAttempt] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [openFinishVoting, setOpenFinishVoting] = useState(false);
    const [openVotingFailed, setOpenVotingFailed] = useState(false);
    const [votingCompleted, setVotingCompleted] = useState(false);
    const history = useHistory();

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

    useEffect(() => {
        if (votingCompleted) {
            history.replace('/');
        }
    }, [votingCompleted, history]);

    return (
        <>
            <div className="centered">
                <h1>
                    {electionDetails.map(election => (
                        <React.Fragment key={election._id}>
                            {election.election_name_sinhala} | {election.election_name_english} | {election.election_name_tamil} - {election.election_year}
                        </React.Fragment>
                    ))}
                </h1>
                <h2>
                    {currentDateTime.toLocaleString()}
                </h2>
            </div>
            <div className='container'>
                <CardGroup doubling itemsPerRow={3} stackable>
                    {cards.map((card, index) => (
                        <Card
                            key={index}
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
            </div>
            <ConfirmationModal
                open={openConfirmation}
                onClose={() => setOpenConfirmation(false)}
                onConfirm={() => {
                    setOpenConfirmation(false);
                    SubmitConfirmedVote(selectedPartyCode);
                    setVotedFlag(true);
                    setOpenFinishVoting(true);
                }}
                onCancel={() => {
                    CancelVote();
                    setAttempt(true);
                    SubmitCancelledVote(voteCancelled);
                    if (!attepmted) {
                        setOpenConfirmation(false);
                        setOpenVotingFailed(true);
                    } else {
                        setVotedFlag(false);
                        setOpenConfirmation(false);
                    }
                }}
                voted={voted}
                setVotedFlag={setVotedFlag}
                setOpenFinishVoting={setOpenFinishVoting}
                selectedOption={selectedPartyCode}
            />
            <FinishVotingModal
                open={openFinishVoting}
                onClose={() => { setOpenFinishVoting(false); setVotingCompleted(true); }}
                voted={voted}
                setOpenFinishVoting={setOpenFinishVoting}
            />
            <VoteAtteptExceedModal
                open={openVotingFailed}
                onClose={() => { setOpenFinishVoting(false); setVotingCompleted(true); }}
                voted={voted}
                setOpenFinishVoting={setOpenFinishVoting}
            />
        </>
    );
};

export default PVB_EBallotUI;
