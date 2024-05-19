import React from 'react';
import { Modal, Header, ModalContent, ModalActions, Button, Icon } from 'semantic-ui-react';

const ConfirmationModal = ({ open, onClose, onConfirm, onCancel, voted, setVotedFlag, setOpenFinishVoting, selectedPartyNameSinhala, selectedPartyNameEnglish, selectedPartyNameTamil }) => (
    <Modal open={open} size='small'>
        <Header>චන්දය තහවුරු කිරීම | Confirming Vote | வாக்கை உறுதிப்படுத்துகிறது</Header>
        <ModalContent>
            <p>ඔබගේ චන්දය <b>{selectedPartyNameSinhala}</b> සදහා තහවුරු කරන්නේද? | Do You Confirm Your Vote for <b>{selectedPartyNameEnglish}</b>? | <b>{selectedPartyNameTamil}</b> க்கு உங்கள் வாக்கை உறுதிப்படுத்துகிறீர்களா?</p>
        </ModalContent>
        <ModalActions>
            <Button
                name='confirmVote'
                disabled={!voted}
                positive
                onClick={() => [onClose(), onConfirm(), setVotedFlag(true), setOpenFinishVoting(true)]}
                primary
            >
                <Icon name='checkmark' />
                ඔව් | Yes | ஆம்
            </Button>
            <Button
                name='cancelVote'
                disabled={!voted}
                negative
                onClick={() => [onCancel(), setVotedFlag(false), onClose()]}
                primary>
                <Icon name='remove' />
                නැත | No | இல்லை
            </Button>
        </ModalActions>
    </Modal>
);

export default ConfirmationModal;
