import React from 'react';
import { Modal, Header, ModalContent, ModalActions, Button, Icon } from 'semantic-ui-react';

const VoteAtteptExceedModal = ({ open, onClose, voted, setOpenFinishVoting }) => (
    <Modal onOpen={() => setOpenFinishVoting(true)} open={open} size='small'>
        <Header>චන්දය වාර ඉක්මවා වී ඇත | Voting Attemped Exceeded | வாக்களிப்பதை முடிக்கவும்</Header>
        <ModalContent>
            <p>චන්ද ප්‍රකාශය අසාර්ථකයි!<br />Vote Process Failed!<br />வாக்களிப்பு செயல்முறை வெற்றி</p>
        </ModalContent>
        <ModalActions>
            <Button
                name='finishVote'
                disabled={voted}
                negative
                onClick={() => onClose()}
                primary>
                <Icon name='checkmark' />
                අවසානයි | Finish | முடிக்கவும்
            </Button>
        </ModalActions>
    </Modal>
);

export default VoteAtteptExceedModal;
