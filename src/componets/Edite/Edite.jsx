import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from 'react-bootstrap';

class Edite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            show: false,
        };
    }

    handleClose = () => {};
    handleShow = () => {
        console.log('exav');
        this.setState({ show: !this.state.show });
    };

    funcProps = () => {
        this.props.handleEditModal(this.handleShow);
    };
    render() {
        return (
            <>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <FormControl aria-label="Text input with checkbox" />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
export default Edite;
