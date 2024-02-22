import React from 'react';
import { Modal, Header, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const FinishModal = ({ open, setOpenFinishVoting }) => {

    const handleFinish = () => {
        setOpenFinishVoting(false);
    };

    return (
        <Modal open={open} size='small'>
            <Header>
                චන්දය අවසාන කිරීම | Finish Vote Process | வாக்களிப்பதை முடிக்கவும்
            </Header>
            <Modal.Content>
                <p>
                    චන්ද ප්‍රකාශය සාර්ථකයි<br />Vote Process Success<br />வாக்களிப்பு செயல்முறை வெற்றி
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Link to='/coverUI'>
                    <Button name='finishVote' positive onClick={handleFinish}>
                        <Icon name='checkmark' />
                        අවසානයි | Finish | முடிக்கவும்
                    </Button>
                </Link>
            </Modal.Actions>
        </Modal>
    );
};

export default FinishModal;
