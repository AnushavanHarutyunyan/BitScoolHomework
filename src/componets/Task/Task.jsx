import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import styles from './Task.module.css';

const Task = ({
    task,
    deletItem,
    handleCheked,
    checkedTasks,
    isChecked,
    showEditeComp,
    EditedTask,
}) => {
    const handleDelet = () => {
        deletItem(task._id);
    };

    const checkedToggle = () => {
        handleCheked(task._id);
    };

    const handleClickEditer = () => {
        showEditeComp();
        EditedTask(task._id);
    };

    return (
        <div className={isChecked ? styles.showBorderStyle : styles.task}>
            <p>Task - {task.value}</p>
            <Form.Check
                className={styles.checkBox}
                type={'checkbox'}
                id={`default-checkbox`}
                onChange={checkedToggle}
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

export default Task;
