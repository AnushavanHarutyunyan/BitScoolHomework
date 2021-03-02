import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from 'react-bootstrap';

class Edite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editedValue: '',
            show: true,
        };
    }

    handleChange = ({ target }) => {
        const value = target.value;
        this.setState({ editedValue: value });
    };

    handleSave = () => {
        this.props.saveEditedValue(this.state.editedValue);
        this.setState({ editedValue: '' });
        this.handleClose();
    };

    handleClose = () => {
        this.setState({ show: false });
        this.props.showEditeComp(this.state.show);
    };

    render() {
        return (
            <>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edited Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup
                            className="mb-3"
                            onChange={this.handleChange}
                        >
                            <FormControl aria-label="Text input with checkbox" />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
export default Edite;
