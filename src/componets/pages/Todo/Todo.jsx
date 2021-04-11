import React from 'react';
import Task from '../../Task/Task';
import Confirm from '../../Confirm';
import TaskModal from '../../TaskModal/TaskModal';
import SpinnerComp from '../../Spinner/Spinner';
import { v4 as uuidv4 } from 'uuid';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import styles from './todo.module.css';

const API_HOST = 'http://localhost:3001';

class Todo extends React.Component {
    state = {
        editedTask: null,
    };

    toggleSetEditTask = (editedTask = null) => {
        this.setState({ editedTask });
    };

    handleInput = (value) => {
        this.setState({
            tasks: [...this.state.tasks, { _id: uuidv4(), value }],
        });
    };

    handleDeleteItem = (idItem) => {
        this.props.setOrRemoveLoading(true);
        fetch(`${API_HOST}/task/${idItem}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw data.error;
                this.props.deleteOneTask(idItem);
            })
            .catch((error) => console.log(error))
            .finally(() => this.props.setOrRemoveLoading(false));
    };

    handleDeleteCheckedTasks = () => {
        const { checkedTasks } = this.props;
        const { setOrRemoveLoading, deleteCheckedTask } = this.props;
        setOrRemoveLoading(true);
        fetch(`${API_HOST}/task`, {
            method: 'PATCH',
            body: JSON.stringify({
                tasks: Array.from(checkedTasks),
            }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw data.error;
                deleteCheckedTask();
            })
            .catch((err) => console.log('error', err))
            .finally(() => setOrRemoveLoading(false));
    };

    handleEditeTask = (editedTask) => {
        this.props.setOrRemoveLoading(true);
        fetch(`${API_HOST}/task/${editedTask._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedTask),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw data.error;

                const tasks = [...this.props.tasks];
                const indx = tasks.findIndex(
                    (item) => item._id === editedTask._id
                );
                tasks[indx] = editedTask;
                this.setState({ editedTask: null });
            })
            .catch((error) => console.log('Editeing error', error))
            .finally(() => {
                this.props.setOrRemoveLoading(false);
            });
    };

    handleAddTask = (formData) => {
        this.props.setOrRemoveLoading(true);
        fetch(`${API_HOST}/task`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    throw data.error;
                }
                this.props.addTask(data);
                this.props.setOrRemoveLoading(false);
                this.setState({ isOpenAddTaskModal: false });
            })
            .catch((err) => {
                console.log('Adding Tasks', err);
            })
            .finally(() => {
                this.props.setOrRemoveLoading(false);
            });
    };

    handleCheckedAllTasks = () => {
        let { checkedTasks } = this.props;
        let { tasks } = this.props;
        const allTasks = tasks;
        if (tasks.length !== checkedTasks.size) {
            allTasks.forEach((item) =>
                this.setState({
                    checkedTasks: checkedTasks.add(item._id),
                })
            );
        } else {
            checkedTasks.clear();
            this.setState({ checkedTasks });
        }
    };

    componentDidMount() {
        this.props.setOrRemoveLoading(true);
        fetch(`${API_HOST}/task`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw data.error;
                this.props.setTasks(data);
            })
            .catch((error) => console.log(error))
            .finally(() => this.props.setOrRemoveLoading(false));
    }

    render() {
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
        } = this.props;
        const {
            // tasks,
            // isOpenConfirm,
            editedTask,
            // loading,
        } = this.state;

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
                                        deletItem={this.handleDeleteItem}
                                        handleCheked={toggleCheckTask}
                                        checkedTasks={checkedTasks}
                                        isChecked={checkedTasks.has(item._id)}
                                        EditedTask={this.toggleSetEditTask}
                                        toggleAddEdite={
                                            this.props.toggleOpenAddTaskModal
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
                            onClick={this.handleCheckedAllTasks}
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
                        onSubmit={this.handleAddTask}
                        todoF={this.handleInput}
                    />
                ) : (
                    false
                )}
                {isOpenConfirm && (
                    <Confirm
                        onHide={toggleOpenConfirm}
                        onSubmit={this.handleDeleteCheckedTasks}
                        count={checkedTasks.size}
                    />
                )}
                {editedTask && (
                    <TaskModal
                        editedTask={editedTask}
                        onHide={this.toggleSetEditTask}
                        onSubmit={this.handleEditeTask}
                    />
                )}
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.todoState.tasks,
        loading: state.loading,
        checkedTasks: state.todoState.checkedTasks,
        isOpenAddTaskModal: state.todoState.isOpenAddTaskModal,
        isOpenConfirm: state.todoState.isOpenConfirm,
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        setTasks: (data) => {
            dispatch({ type: 'SET_TASKS', data });
        },
        deleteOneTask: (_id) => {
            dispatch({ type: 'DELETE_ONE_TASK', _id });
        },
        setOrRemoveLoading: (isLoading) => {
            dispatch({ type: 'SET_OR_REMOVE_LOADING', isLoading });
        },
        toggleOpenAddTaskModal: () => {
            dispatch({ type: 'TOGLE_ADD_TASK_MODAL' });
        },
        addTask: (data) => {
            dispatch({ type: 'ADD_TASK', data });
        },
        toggleOpenConfirm: () => {
            dispatch({ type: 'TOGGLE_CONFIRM_MODAL' });
        },
        toggleCheckTask: (_id) => {
            dispatch({ type: 'TOGGLE_CHECK_TASK', _id });
        },
        deleteCheckedTask: () => {
            dispatch({ type: 'DELETE_CHECKED_TASK' });
        },
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Todo);
