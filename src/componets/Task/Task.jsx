import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import styles from './Task.module.css';

const Task = ({ task, deletItem }) => {
    const handleDelet = () => {
        deletItem(task._id);
    };
    return (
        <div className={styles.task}>
            <p>Task - {task.value}</p>
            <Form.Check
                className={styles.checkBox}
                type={'checkbox'}
                id={`default-checkbox`}
            />
            <Button variant="warning" className={styles.btn}>
                <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button
                variant="danger"
                className={styles.btn}
                onClick={handleDelet}
            >
                <FontAwesomeIcon icon={faTrash} />
            </Button>
            <div key={`default-checkbox`}></div>
        </div>
    );
};

export default Task;
