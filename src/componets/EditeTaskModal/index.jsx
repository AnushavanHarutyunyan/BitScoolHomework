import React, { createRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

class EditeTaskModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.inputRef = createRef();
        this.state = {
            ...this.props.editedTask,
        };
    }

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value, [name]: value });
    };

    handleSave = ({ type, key }) => {
        const { title, description } = this.state;
        if (!title || !description || (type === 'keypress' && key !== 'Enter'))
            return;

        this.props.onSubmit(this.state);
        this.props.onHide();
    };

    componentDidMount() {
        this.inputRef.current.focus();
    }

    render() {
        const { onHide } = this.props;
        const { title, description } = this.state;
        return (
            <>
                <Modal show={true} onHide={onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edited Task Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup
                            className="mb-3"
                            onKeyPress={this.handleSave}
                        >
                            <FormControl
                                name="title"
                                aria-label="Text input with checkbox"
                                onChange={this.handleChange}
                                value={title}
                                placeholder="title"
                                ref={this.inputRef}
                            />
                            <FormControl
                                name="description"
                                aria-label="Text input with checkbox"
                                onChange={this.handleChange}
                                value={description}
                                placeholder="description"
                            />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSave}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

EditeTaskModal.propTypes = {
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    editedTask: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }),
};

export default EditeTaskModal;
