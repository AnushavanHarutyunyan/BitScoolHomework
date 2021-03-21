import { memo } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import styles from './Task.module.css';
import { PropTypes } from 'prop-types';

const Task = ({
    task,
    deletItem,
    handleCheked,
    checkedTasks,
    isChecked,
    toggleAddEdite,
    EditedTask,
}) => {
    const handleDelet = () => {
        deletItem(task._id);
    };

    const checkedToggle = () => {
        handleCheked(task._id);
    };

    const handleClickEditer = () => {
        EditedTask(task._id);
    };

    return (
        <div className={isChecked ? styles.showBorderStyle : styles.task}>
            <p>Task - {task.title}</p>
            <p>Task - {task.description}</p>
            <Form.Check
                className={styles.checkBox}
                type={'checkbox'}
                id={`default-checkbox`}
                onChange={checkedToggle}
                checked={isChecked}
            />
            <Button
                variant="warning"
                className={styles.btn}
                disabled={checkedTasks.size}
                onClick={handleClickEditer}
            >
                <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button
                variant="danger"
                className={styles.btn}
                onClick={handleDelet}
                disabled={checkedTasks.size}
            >
                <FontAwesomeIcon icon={faTrash} />
            </Button>
        </div>
    );
};

Task.propTypes = {
    task: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }),
    deletItem: PropTypes.func,
    handleCheked: PropTypes.func.isRequired,
    checkedTasks: PropTypes.instanceOf(Set).isRequired,
    isChecked: PropTypes.bool.isRequired,
    EditedTask: PropTypes.func.isRequired,
};

export default memo(Task);
