import React, { useState } from 'react';
import { memo } from 'react';
// import Spinner from '../Spinner/Spinner';
import { Button } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
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
    EditedTask,
    history,
}) => {
    // const [loading, setLoading] = useState(false);

    const handleDelet = () => {
        deletItem(task._id);
    };

    const checkedToggle = () => {
        handleCheked(task._id);
    };

    const handleClickEditer = () => {
        EditedTask(task);
    };

    return (
        <div className={isChecked ? styles.showBorderStyle : styles.task}>
            {/* <div>{{ loading } && <Spinner />}</div> */}
            <div className={styles.task_p}>
                <p>
                    <Link to={'/task/'}>Task - {task.title}</Link>
                </p>
                <p>Description - {task.description}</p>
                <p>Date - {task.date.slice(0, 10)}</p>
            </div>
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

export default withRouter(memo(Task));
