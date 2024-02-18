import React, { useState } from 'react';
import { Modal, Header, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import InvalidOperationMessage from '../ErrorHandlers/invalidOperationsMessage';

const ConfirmationModal = ({
    open,
    setOpenConfirmation,
    setOpenFinishVoting,
    voted,
    setVotedFlag,
    voteForOption1,
    voteForOption2,
    voteForOption3,
    setVoteForOption1,
    setVoteForOption2,
    setVoteForOption3
}) => {
    const SubmitConfirmedVote = () => {
        axios
            .post("http://localhost:4000/api/submitBallots", {
                voter_id: "151352198415V",
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
        // .get('http://localhost:4000/');
        console.log('Votes submitted!');
        setOpenConfirmation(false);
        setOpenFinishVoting(true);
    };

    const CancelVote = () => {
        voteForOption1 > 0 ?
            voteForOption1 = voteForOption1 - 1
            : voteForOption2 > 0 ?
                voteForOption2 = voteForOption2 - 1
                : voteForOption3 > 0 ?
                    voteForOption3 = voteForOption3 - 1
                    : InvalidOperationMessage()
        setVotedFlag(false);
        setOpenConfirmation(false);
    };

    return (
        <Modal open={open} size='small'>
            <Header>
                චන්දය තහවුරු කිරන්න | Confirming Vote | வாக்கை உறுதிப்படுத்துகிறது
            </Header>
            <Modal.Content>
                <p>
                    ඔබගේ චන්දය තහවුරු කරන්නේද? | Do You Confirm Your Vote? | உங்கள் வாக்கை உறுதிப்படுத்துகிறீர்களா?
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button name='confirmVote' disabled={!voted} positive onClick={SubmitConfirmedVote}>
                    <Icon name='checkmark' />
                    ඔව් | Yes | ஆம்
                </Button>
                <Button name='cancelVote' disabled={!voted} negative onClick={CancelVote}>
                    <Icon name='remove' />
                    නැත | No | இல்லை
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ConfirmationModal;
