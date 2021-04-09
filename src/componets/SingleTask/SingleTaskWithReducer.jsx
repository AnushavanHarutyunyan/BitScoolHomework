import { useEffect, useReducer } from 'react';
import { Button } from 'react-bootstrap';
import TaskModal from '../TaskModal/TaskModal';
import SpinnerComp from '../Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './singletask.module.css';

const API_HOST = 'http://localhost:3001';

const initialState = {
    singgleTasks: null,
    toggleEditeModal: false,
    loading: false,
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SINGLE_TASK': {
            return {
                ...state,
                singgleTasks: action.data,
            };
        }
        case 'SET_LOADING': {
            return {
                ...state,
                loading: true,
            };
        }
        case 'REMOVE_LOADING': {
            return {
                ...state,
                loading: false,
            };
        }
        case 'TOGGLE_EDITE_MODAL': {
            return {
                ...state,
                toggleEditeModal: action.isEditeModal,
            };
        }
        default:
            return state;
    }
};

const SingleTaskWithReduce = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { singgleTasks, toggleEditeModal, loading } = state;

    useEffect(() => {
        const { id } = props.match.params;
        fetch(`${API_HOST}/task/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw data.error;
                dispatch({ type: 'SET_SINGLE_TASK', data });
            })
            .catch((error) => {
                console.log('Single Task Get request', error.message);
                props.history.push('/404');
            });
    }, []);

    if (!singgleTasks || loading) return <SpinnerComp />;

    const handleDelet = () => {
        const { _id } = singgleTasks;
        dispatch({ type: 'SET_LOADING' });
        fetch(`${API_HOST}/task/${_id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw console.log(data.error);
                dispatch({ type: 'REMOVE_LOADING' });
                props.history.push('/');
            })
            .catch((err) => console.log('Single Task Deleting error', err));
    };

    const handleEditeTask = (editTask) => {
        dispatch({ type: 'SET_LOADING' });
        fetch(`${API_HOST}/task/${editTask._id}`, {
            method: 'PUT',
            body: JSON.stringify(editTask),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw data.error;
                dispatch({ type: 'SET_SINGLE_TASK', data });
                dispatch({ type: 'TOGGLE_EDITE_MODAL', isEditeModal: false });
            })
            .catch((error) => console.log('Single Task edited', error))
            .finally(() => dispatch({ type: 'REMOVE_LOADING' }));
    };

    return (
        <>
            <div className={styles.signgleTask}>
                <h1>Single Task</h1>
                <div>
                    <p>Title: {singgleTasks && singgleTasks.title}</p>
                    <p>
                        Description: {singgleTasks && singgleTasks.description}
                    </p>
                </div>
                <div className={styles.btn_div}>
                    <Button
                        variant="warning"
                        className={styles.btn}
                        onClick={() =>
                            dispatch({
                                type: 'TOGGLE_EDITE_MODAL',
                                isEditeModal: true,
                            })
                        }
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
            {toggleEditeModal && (
                <TaskModal
                    onHide={() =>
                        dispatch({
                            type: 'TOGGLE_EDITE_MODAL',
                            isEditeModal: false,
                        })
                    }
                    onSubmit={handleEditeTask}
                    editedTask={singgleTasks}
                />
            )}
            {loading && <SpinnerComp />}
        </>
    );
};

export default SingleTaskWithReduce;
