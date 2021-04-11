import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import TaskModal from '../TaskModal/TaskModal';
import SpinnerComp from '../Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './singletask.module.css';

const API_HOST = 'http://localhost:3001';

const SingleTask = (props) => {
    const {
        singgleTasks,
        isEditeModal,
        toggleEditModal,
        setOrRemoveLoading,
        setSinggleTasks,
        setisOpenConfirm,
        loading,
    } = props;

    useEffect(() => {
        getSingleTask();
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
        const { _id } = singgleTasks;
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

    const getSingleTask = () => {
        const { id } = props.match.params;
        fetch(`${API_HOST}/task/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw data.error;
                setSinggleTasks(data);
            })
            .catch((error) => {
                console.log('Single Task Get request', error.message);
                props.history.push('/404');
            });
    };

    // if (!singgleTasks || loading) return <SpinnerComp />;

    return (
        <>
            <div className={styles.signgleTask}>
                <h1>Single Task</h1>
                <div>
                    <p>Title: {singgleTasks.title}</p>
                    <p>Description: {singgleTasks.description}</p>
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
                    editedTask={singgleTasks}
                />
            )}
            {loading && <SpinnerComp />}
        </>
    );
};
const mapStattoProps = (state) => {
    return {
        singleTask: state.singleTask.singgleTasks,
        isEditeModal: state.singgleTasks.isEditeModal,
        isOpenConfirm: state.singgleTasks.isOpenConfirm,
    };
};
const mapDispatchtoProps = (dispatch) => {
    return {
        setOrRemoveLoading: (isLoading) => {
            dispatch({ type: 'SET_OR_REMOVE_LOADING', isLoading });
        },
        toggleEditModal: (isToggleEditModal) => {
            dispatch({ type: 'TOGGLE_EDITE_MODAL', isToggleEditModal });
        },
        setSinggleTasks: (data) => {
            dispatch({ type: 'SET_SINGGLE_TASKS', data });
        },
        setisOpenConfirm: () => {
            dispatch({ type: 'SET_IS_OPEN_CONFIRM' });
        },
    };
};
export default connect(mapStattoProps, mapDispatchtoProps)(SingleTask);
