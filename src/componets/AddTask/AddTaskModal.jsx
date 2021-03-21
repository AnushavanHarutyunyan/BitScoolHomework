import React, { createRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

class AddTaskModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.inputRef = createRef();
        this.state = {
            title: '',
            description: '',
        };
    }

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value, [name]: value });
    };

    handleSave = ({ type, key }) => {
        const { title, description } = this.state;
        if (
            !this.state.title ||
            !this.state.description ||
            (type === 'keypress' && key !== 'Enter')
        )
            return;

        const formData = { title, description };
        this.props.onSubmit(formData);
        this.props.onHide();
    };

    componentDidMount() {
        this.inputRef.current.focus();
    }

    render() {
        const { title, description } = this.state;
        const { checkedTasks } = this.props;
        return (
            <>
                <Modal show={true} onHide={this.props.onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Task Modal</Modal.Title>
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
                        <Button variant="secondary" onClick={this.props.onHide}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSave}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

AddTaskModal.propTypes = {
    onHide: PropTypes.func,
    onSubmit: PropTypes.func,
    editedTask: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }),
};

export default AddTaskModal;
