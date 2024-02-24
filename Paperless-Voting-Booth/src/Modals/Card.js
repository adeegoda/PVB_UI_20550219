import React from 'react';
import { Card as SemanticCard, Image, Placeholder, Header, Button, Divider } from 'semantic-ui-react';

const Card = ({ loading, card, voted, onVote, setVotedFlag, setOpenConfirmation }) => (
    <SemanticCard>
        {loading ? (
            <Placeholder>
                <Placeholder.Image square />
            </Placeholder>
        ) : (
            <Image src={card.avatar} style={{ height: 75, width: 75 }} />
        )}

        <SemanticCard.Content>
            {loading ? (
                <Placeholder>
                    <Placeholder.Header>
                        <Placeholder.Line length='medium' />
                        <Placeholder.Line length='medium' />
                    </Placeholder.Header>
                </Placeholder>
            ) : (
                <>
                    <Header>{card.header1}</Header>
                    <Header>{card.header2}</Header>
                    <Header>{card.header3}</Header>
                </>
            )}
        </SemanticCard.Content>

        <SemanticCard.Content extra>
            <SemanticCard.Description>
                <Button
                    name='castVote'
                    disabled={voted}
                    onClick={() => {
                        onVote(card);
                        setVotedFlag(true);
                        setOpenConfirmation(true);
                    }}
                    primary>
                    චන්දය ප්‍රකාශ කරන්න | Cast Vote | ஓட்டு போடுங்கள்
                </Button>
                <Divider />
            </SemanticCard.Description>
        </SemanticCard.Content>
    </SemanticCard>
);

export default Card;
