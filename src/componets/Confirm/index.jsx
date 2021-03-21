import { Modal, Button } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

const Confirm = ({ onHide, onSubmit, count }) => {
    const handleSubmit = () => {
        onSubmit();
        onHide();
    };
    return (
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Do you want to delete {count} of tasks
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleSubmit}>
                    Delete All
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

Confirm.propTypes = {
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    count: PropTypes.number,
};

export default Confirm;
