import { useContext, useEffect } from 'react';
import { contextSignleTask } from '../Context/context';
import { Button } from 'react-bootstrap';
import TaskModal from '../TaskModal/TaskModal';
import SpinnerComp from '../Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './singletask.module.css';

const SingleTask = (props) => {
    const context = useContext(contextSignleTask);
    const {
        singgleTasks,
        isEditeModal,
        loading,
        toggleEditModal,
        handleDelet,
        handleEditeTask,
        getSingleTask,
    } = context;

    useEffect(() => {
        getSingleTask();
    }, []);

    if (!singgleTasks || loading) return <SpinnerComp />;

    return (
        <>
            <div className={styles.signgleTask}>
                <h1>Single Task</h1>
                <div>
                    <p>Title: {singgleTasks.title}</p>
                    <p>Description: {singgleTasks.description}</p>
                </div>
                <div className={styles.btn_div}>
                    <Button variant="warning" className={styles.btn}>
                        <FontAwesomeIcon
                            icon={faEdit}
                            onClick={() => toggleEditModal(true)}
                        />
                    </Button>
                    <Button
                        variant="danger"
                        className={styles.btn}
                        onClick={handleDelet}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>
            </div>
            {isEditeModal && (
                <TaskModal
                    onHide={() => toggleEditModal(false)}
                    onSubmit={handleEditeTask}
                    editedTask={singgleTasks}
                />
            )}
            {loading && <SpinnerComp />}
        </>
    );
};

export default SingleTask;
