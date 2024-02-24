import React from 'react';
import { Modal, Header, ModalContent, ModalActions, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const FinishVotingModal = ({ open, onClose, voted, setOpenFinishVoting }) => (
    <Modal onOpen={() => setOpenFinishVoting(true)} open={open} size='small'>
        <Header>චන්දය අවසාන කිරීම | Finish Vote Process | வாக்களிப்பதை முடிக்கவும்</Header>
        <ModalContent>
            <p>චන්ද ප්‍රකාශය සාර්ථකයි<br />Vote Process Success<br />வாக்களிப்பு செயல்முறை வெற்றி</p>
        </ModalContent>
        <ModalActions>
            <Link to='/coverUI'>
                <Button
                    name='finishVote'
                    disabled={!voted}
                    positive
                    onClick={() => onClose()}
                    primary>
                    <Icon name='checkmark' />
                    අවසානයි | Finish | முடிக்கவும்
                </Button>
            </Link>
        </ModalActions>
    </Modal>
);

export default FinishVotingModal;
