import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import TaskModal from '../TaskModal/TaskModal';
import SpinnerComp from '../Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import {
    setSingleTaskThunk,
    deleteOneTaskThunk,
    editeTaskThunk,
    toggleSingleEditeModal,
    resetSingleTaskState,
} from '../../Redux/action';
import styles from './singletask.module.css';

const API_HOST = 'http://localhost:3001';

const SingleTask = (props) => {
    const { id } = props.match.params;
    const { history, setSingleTaskThunk, resetSingleTaskState } = props;

    useEffect(() => {
        setSingleTaskThunk(id, history);
        return function () {
            resetSingleTaskState();
        };
    }, []);

    const { singleTask, isEditeModal, loading } = props;

    if (!singleTask || loading) return <SpinnerComp />;
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
                        onClick={props.toggleSingleEditeModal}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                        variant="danger"
                        className={styles.btn}
                        onClick={() =>
                            deleteOneTaskThunk(singleTask._id, history)
                        }
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>
            </div>
            {isEditeModal && (
                <TaskModal
                    onHide={props.toggleSingleEditeModal}
                    onSubmit={(editedTask) =>
                        props.editeTaskThunk(editedTask, 'singleTask')
                    }
                    editedTask={singleTask}
                />
            )}
            {loading && <SpinnerComp />}
        </>
    );
};

const mapStateToProps = (state) => {
    const { singleTask, isEditeModal } = state.singleTaskState;
    return {
        singleTask,
        isEditeModal,
        loading: state.globalState.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSingleTaskThunk: (id, history) =>
            dispatch((dispatch) => setSingleTaskThunk(dispatch, id, history)),
        deleteOneTaskThunk: (id, history) =>
            dispatch((dispatch) => deleteOneTaskThunk(dispatch, id, history)),
        editeTaskThunk: (editedTask, page) =>
            dispatch((dispatch) =>
                editeTaskThunk(dispatch, editedTask, (page = 'singleTask'))
            ),
        toggleSingleEditeModal: () =>
            dispatch((dispatch) => toggleSingleEditeModal(dispatch)),
        resetSingleTaskState: () =>
            dispatch((dispatch) => resetSingleTaskState(dispatch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);
