import React, { useEffect } from 'react';
import Task from '../../Task/Task';
import Confirm from '../../Confirm';
import TaskModal from '../../TaskModal/TaskModal';
import SpinnerComp from '../../Spinner/Spinner';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import styles from './todo.module.css';
import {
    SetTaskThunk,
    addTaskThunk,
    deleteOneTaskThunk,
    deleteCheckedTasksThunk,
    editeTaskThunk,
} from '../../../Redux/action';
import types from '../../../Redux/acitonTypes';

const Todo = (props) => {
    const { setTasks, resetData } = props;
    useEffect(() => {
        setTasks();
        return () => resetData();
    }, [setTasks, resetData]);

    //redux state
    const {
        tasks,
        loading,
        isOpenAddTaskModal,
        isOpenConfirm,
        checkedTasks,
        toggleOpenAddTaskModal,
        toggleOpenConfirm,
        toggleCheckTask,
        editedTask,
    } = props;

    return (
        <Container>
            {loading && <SpinnerComp className={styles.spinner} />}
            <Row>
                <Col className={styles.addTaskBtn}>
                    <Button onClick={toggleOpenAddTaskModal}>
                        Add Task Modal
                    </Button>
                </Col>
            </Row>
            <Row className={styles.row}>
                {tasks.length === 0 ? (
                    <p>there are no taks</p>
                ) : (
                    tasks.map((item) => {
                        return (
                            <Col key={item._id} className={styles.col}>
                                <Task
                                    task={item}
                                    deletItem={props.deleteOneTask}
                                    handleCheked={toggleCheckTask}
                                    checkedTasks={checkedTasks}
                                    isChecked={checkedTasks.has(item._id)}
                                    EditedTask={props.setEditeTask}
                                    toggleAddEdite={
                                        props.toggleOpenAddTaskModal
                                    }
                                />
                            </Col>
                        );
                    })
                )}
            </Row>
            <Row>
                <Col>
                    <Button
                        variant="danger"
                        className={styles.delete_task}
                        onClick={toggleOpenConfirm}
                        disabled={!checkedTasks.size}
                    >
                        Delete Tasks
                    </Button>
                    <Button
                        className={styles.btn_checked_all_tasks}
                        variant="primary"
                        onClick={props.checkedAllTasks}
                        disabled={!tasks.length}
                    >
                        {tasks.length === checkedTasks.size &&
                        tasks.length !== 0
                            ? 'Remove Checked'
                            : 'Check All'}
                    </Button>
                </Col>
            </Row>
            {isOpenAddTaskModal ? (
                <TaskModal
                    onHide={toggleOpenAddTaskModal}
                    onSubmit={props.addTask}
                />
            ) : (
                false
            )}
            {isOpenConfirm && (
                <Confirm
                    onHide={toggleOpenConfirm}
                    onSubmit={() => {
                        props.deleteCheckedTask(checkedTasks);
                    }}
                    count={checkedTasks.size}
                />
            )}
            {editedTask && (
                <TaskModal
                    onHide={props.setEditeTask}
                    onSubmit={props.editTask}
                    editedTask={editedTask}
                />
            )}
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        tasks: state.todoState.tasks,
        loading: state.globalState.loading,
        checkedTasks: state.todoState.checkedTasks,
        isOpenAddTaskModal: state.todoState.isOpenAddTaskModal,
        isOpenConfirm: state.todoState.isOpenConfirm,
        editedTask: state.todoState.editedTask,
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        deleteOneTask: (_id) => {
            dispatch((dispatch) => deleteOneTaskThunk(dispatch, _id));
        },
        toggleOpenAddTaskModal: () => {
            dispatch({ type: types.TOGLE_ADD_TASK_MODAL });
        },
        addTask: (data) => {
            dispatch((dispatch) => addTaskThunk(dispatch, data));
        },
        toggleOpenConfirm: () => {
            dispatch({ type: types.TOGGLE_CONFIRM_MODAL });
        },
        toggleCheckTask: (_id) => {
            dispatch({ type: types.TOGGLE_CHECK_TASK, _id });
        },
        deleteCheckedTask: (checkedTasks) => {
            dispatch((dispatch) =>
                deleteCheckedTasksThunk(dispatch, checkedTasks)
            );
        },
        editeTask: (editedTask) => {
            dispatch((dispatch) => editeTaskThunk(dispatch));
        },
        setTasks: () => {
            dispatch(SetTaskThunk);
        },
        setEditeTask: (editedTask) => {
            dispatch({ type: types.SET_EDITE_TASK, editedTask });
        },
        editTask: (editedTask) => {
            dispatch((dispatch) => editeTaskThunk(dispatch, editedTask));
        },
        checkedAllTasks: () => {
            dispatch({ type: types.CHECKED_ALL_TAKS });
        },
        resetData: () => dispatch({ type: types.RESET_DATA }),
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Todo);
