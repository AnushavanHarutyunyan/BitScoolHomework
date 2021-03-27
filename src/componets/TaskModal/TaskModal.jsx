import React, { createRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import DatePicker from 'react-datepicker';
import formatDate from '../../utils/dateFormater';

class TaskModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.inputRef = createRef();
        this.state = {
            title: '',
            description: '',
            ...props.editedTask,
            date: props.editedTask
                ? new Date(props.editedTask.date)
                : new Date(),
        };
    }

    setDate = (date) => {
        this.setState({
            date,
        });
    };

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value, [name]: value });
    };

    handleSave = ({ type, key }) => {
        const { title, description } = this.state;
        if (!title || !description || (type === 'keypress' && key !== 'Enter'))
            return;
        if (!title.trim() || !description.trim())
            return console.log('you can not make a blank line SUBMIT');
        const formData = { ...this.state, date: formatDate(this.state.date) };
        this.props.onSubmit(formData);
        // this.props.onHide();
    };

    componentDidMount() {
        this.inputRef.current.focus();
    }

    render() {
        const { title, description, date } = this.state;
        const { editedTask, onHide } = this.props;
        return (
            <>
                <Modal show={true} onHide={this.props.onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {editedTask ? 'Edit Task Modal' : 'Add Task Modal'}
                        </Modal.Title>
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
                        <InputGroup>
                            <DatePicker
                                selected={date}
                                onChange={(date) => this.setDate(date)}
                            />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => onHide()}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={this.handleSave}
                            disabled={!title || !description}
                        >
                            {editedTask ? 'Save' : 'Add Task'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

TaskModal.propTypes = {
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    editedTask: PropTypes.object,
};

export default TaskModal;
