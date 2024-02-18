import React from 'react';
import { Card, CardContent, Button, Divider } from 'semantic-ui-react';
import InvalidOperationMessage from '../ErrorHandlers/invalidOperationsMessage';

const VotingCard = ({
    card,
    voteForOption1,
    voteForOption2,
    voteForOption3,
    setVoteForOption1,
    setVoteForOption2,
    setVoteForOption3,
    setVotedFlag,
    setOpenConfirmation
}) => {

    const SelectionVote = () => {
        if (card.id === 'option_1' && voteForOption1 < 1) {
            setVoteForOption1(voteForOption1 + 1);
        } else if (card.id === 'option_2' && voteForOption2 < 1) {
            setVoteForOption2(voteForOption2 + 1);
        } else if (card.id === 'option_3' && voteForOption3 < 1) {
            setVoteForOption3(voteForOption3 + 1);
        } else {
            InvalidOperationMessage();
        }
        setVotedFlag(true);
        setOpenConfirmation(true);
    };

    return (
        <>
            <Card>
                <Card.Content>
                    <img src={card.avatar} alt="avatar" style={{ height: 75, width: 75 }} />
                    <CardContent>
                        <Card.Header>{card.header1}</Card.Header>
                        <Card.Header>{card.header2}</Card.Header>
                        <Card.Header>{card.header3}</Card.Header>
                    </CardContent>
                    <Divider />
                    <Button
                        name='castVote'
                        disabled={voteForOption1 > 0 || voteForOption2 > 0 || voteForOption3 > 0}
                        onClick={SelectionVote}
                        primary>
                        චන්දය ප්‍රකාශ කරන්න | Cast Vote | ஓட்டு போடுங்கள்
                    </Button>
                </Card.Content>
            </Card>
        </>
    );
};

export default VotingCard;
