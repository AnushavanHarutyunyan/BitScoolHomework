import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import TaskModal from '../TaskModal/TaskModal';
import SpinnerComp from '../Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { setSingleTaskThunk } from '../../Redux/action';
import styles from './singletask.module.css';

const API_HOST = 'http://localhost:3001';

const SingleTask = (props) => {
    const {
        singleTask,
        isEditeModal,
        toggleEditModal,
        setOrRemoveLoading,
        setSinggleTasks,
        setisOpenConfirm,
        loading,
    } = props;

    useEffect(() => {
        props.setSingleTaskThunk(props.match.params.id, props.history);
    }, []);

    const handleEditeTask = (editTask) => {
        setOrRemoveLoading(true);
        fetch(`${API_HOST}/task/${editTask._id}`, {
            method: 'PUT',
            body: JSON.stringify(editTask),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw data.error;
                setSinggleTasks(data);
                toggleEditModal(false);
            })
            .catch((error) => console.log('Single Task edited', error))
            .finally(() => setOrRemoveLoading(false));
    };

    const handleDelet = () => {
        const { _id } = singleTask;
        setOrRemoveLoading(true);
        fetch(`${API_HOST}/task/${_id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw console.log(data.error);
                setisOpenConfirm(false);
                setOrRemoveLoading(false);
                props.history.push('/');
            })
            .catch((err) => console.log('Single Task Deleting error', err));
    };

    // if (!singgleTasks || loading) return <SpinnerComp />;
    console.log(props);
    return (
        <>
            <div className={styles.signgleTask}>
                <h1>Single Task</h1>
                <div>
                    <p>Title: {singleTask.title}</p>
                    <p>Description: {singleTask.description}</p>
                </div>
                <div className={styles.btn_div}>
                    <Button
                        variant="warning"
                        className={styles.btn}
                        onClick={() => toggleEditModal(true)}
                    >
                        <FontAwesomeIcon icon={faEdit} />
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
                    editedTask={singleTask}
                />
            )}
            {loading && <SpinnerComp />}
        </>
    );
};

const mapStattoProps = (state) => {
    const { singleTask, isEditeModal } = state.singleTaskState;
    return {
        singleTask,
        isEditeModal,
        loading: state.globalState.loading,
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        setSingleTaskThunk,
    };
};

export default connect(mapStattoProps, mapDispatchtoProps)(SingleTask);
