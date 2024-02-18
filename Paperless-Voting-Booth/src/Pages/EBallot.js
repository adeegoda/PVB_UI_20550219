import React, { useState } from 'react';
import _ from 'lodash';
import './index.css';
import axios from 'axios';

import 'semantic-ui-css/semantic.min.css';
import {
    Button,
    Card,
    CardContent,
    CardGroup,
    CardHeader,
    Divider,
    Image,
    Placeholder,
    PlaceholderHeader,
    PlaceholderImage,
    PlaceholderLine,
    MessageHeader,
    Message,
    ModalContent,
    ModalActions,
    Header,
    Icon,
    Modal,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
]

const InvalidOperationMessage = () => (
    <Message>
        <MessageHeader>වලංගු නොවන මෙහෙයුම | Invalid Operation | தவறான செயல்பாடு</MessageHeader>
        <p>
            ඔබ වලංගු නොවන මෙහෙයුමක් සිදු කර ඇත කරුණාකර නිවැරදි විකල්පය තෝරන්න!
        </p>
        <p>
            You have performed an invalid operation please click on the correct option!
        </p>
        <p>
            நீங்கள் தவறான செயலைச் செய்துள்ளீர்கள், சரியான விருப்பத்தைத் தேர்வுசெய்க!
        </p>
    </Message>
)

const PVB_EBallotUI = () => {
    const [loading] = useState(false);
    const [voteForOption1, setVoteForOption1] = useState(0);
    const [voteForOption2, setVoteForOption2] = useState(0);
    const [voteForOption3, setVoteForOption3] = useState(0);
    const [voted, setVotedFlag] = useState(false);
    const [open, setOpenConfirmation] = useState(false);
    const [completed, setOpenFinishVoting] = useState(false);

    const SubmitConfirmedVote = () => {
        axios
            .post("http://localhost:4000/api/submitBallots", {
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
                    : InvalidOperationMessage()
    };

    const SelectionVote = (card) => {
        card.id === 'option_1' && voteForOption1 < 1 ?
            setVoteForOption1(voteForOption1 + 1)
            : card.id === 'option_2' && voteForOption2 < 1 ?
                setVoteForOption2(voteForOption2 + 1)
                : card.id === 'option_3' && voteForOption3 < 1 ?
                    setVoteForOption3(voteForOption3 + 1)
                    : InvalidOperationMessage()
    };

    return (
        <>
            <Divider />
            {voteForOption1} - {voteForOption2} - {voteForOption3}
            <Divider />
            <CardGroup doubling itemsPerRow={3} stackable>
                {_.map(cards, (card) => (
                    <Card>
                        {loading ? (
                            <Placeholder>
                                <PlaceholderImage square />
                            </Placeholder>
                        ) : (
                            <Image src={card.avatar} style={{ height: 75, width: 75 }} />
                        )}

                        <CardContent>
                            {loading ? (
                                <Placeholder>
                                    <PlaceholderHeader>
                                        <PlaceholderLine length='medium' />
                                        <PlaceholderLine length='medium' />
                                    </PlaceholderHeader>
                                </Placeholder>
                            ) : (
                                <>
                                    <CardHeader>{card.header1}</CardHeader>
                                    <CardHeader>{card.header2}</CardHeader>
                                    <CardHeader>{card.header3}</CardHeader>
                                </>
                            )}
                        </CardContent>

                        <CardContent extra>
                            <Button name='castVote' disabled={voted}
                                onClick={() => [
                                    SelectionVote(card),
                                    setVotedFlag(true),
                                    setOpenConfirmation(true)
                                ]}
                                primary>
                                චන්දය ප්‍රකාශ කරන්න | Cast Vote | ஓட்டு போடுங்கள்

                            </Button>
                            <Divider />
                        </CardContent>
                    </Card>
                ))}
            </CardGroup>
            <Modal
                onOpen={() => setOpenConfirmation(true)}
                open={open}
                size='small'
            >
                <Header>
                    චන්දය තහවුරු කිරීම | Confirming Vote | வாக்கை உறுதிப்படுத்துகிறது
                </Header>
                <ModalContent>
                    <p>
                        ඔබගේ චන්දය තහවුරු කරන්නේද? | Do You Confirm Your Vote? | உங்கள் வாக்கை உறுதிப்படுத்துகிறீர்களா?
                    </p>
                </ModalContent>
                <ModalActions>
                    <Button name='confirmVote' disabled={!voted} positive
                        onClick={() => [
                            setOpenConfirmation(false),
                            SubmitConfirmedVote(),
                            setVotedFlag(true),
                            setOpenFinishVoting(true)
                        ]}
                        primary>
                        <Icon name='checkmark' />
                        ඔව් | Yes | ஆம்
                    </Button>
                    <Button name='cancelVote' disabled={!voted} negative
                        onClick={() => [
                            CancelVote(),
                            setVotedFlag(false),
                            setOpenConfirmation(false)
                        ]}
                        primary>
                        <Icon name='remove' />
                        නැත | No | இல்லை
                    </Button>
                </ModalActions>
            </Modal>
            <Modal
                onOpen={() => setOpenFinishVoting(true)}
                open={completed}
                size='small'
            >
                <Header>
                    චන්දය අවසාන කිරීම | Finish Vote Process | வாக்களிப்பதை முடிக்கவும்
                </Header>
                <ModalContent>
                    <p>
                        චන්ද ප්‍රකාශය සාර්ථකයි<br />Vote Process Success<br />வாக்களிப்பு செயல்முறை வெற்றி
                    </p>
                </ModalContent>
                <ModalActions>
                    <Link to='/coverUI'>
                        <Button name='finishVote' disabled={!voted} positive
                            onClick={() => [
                                setOpenFinishVoting(false)
                            ]}
                            primary>
                            <Icon name='checkmark' />
                            අවසානයි | Finish | முடிக்கவும்
                        </Button>
                    </Link>
                </ModalActions>
            </Modal>
        </>
    );
};

export default PVB_EBallotUI;
