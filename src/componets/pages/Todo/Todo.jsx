import React from 'react';
import Task from '../../Task/Task';
import Confirm from '../../Confirm';
import TaskModal from '../../TaskModal/TaskModal';
import SpinnerComp from '../../Spinner/Spinner';
import { v4 as uuidv4 } from 'uuid';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './todo.module.css';

const API_HOST = 'http://localhost:3001';

export default class Todo extends React.Component {
    state = {
        tasks: [],
        checkedTasks: new Set(),
        show: false,
        editedTask: null,
        isOpenConfirm: false,
        loading: false,
    };

    toggleOpenConfirm = () => {
        this.setState({ isOpenConfirm: !this.state.isOpenConfirm });
    };

    toggleAddEdite = () => {
        this.setState({ show: !this.state.show });
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
        this.setState({ loading: true });
        fetch(`${API_HOST}/task/${idItem}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw data.error;
                const tasks = this.state.tasks;
                const deletedItem = tasks.findIndex(
                    (item) => item._id === idItem
                );
                tasks.splice(deletedItem, 1);
                this.setState({ tasks, loading: false });
            })
            .catch((error) => console.log(error));
    };

    handleCheked = (taskId) => {
        let checkedTasks = new Set(this.state.checkedTasks);
        if (!checkedTasks.has(taskId)) {
            checkedTasks.add(taskId);
        } else {
            checkedTasks.delete(taskId);
            this.setState({ checked: '' });
        }

        this.setState({ checkedTasks });
    };

    handleDeleteCheckedTasks = () => {
        const { checkedTasks } = this.state;
        this.setState({ loading: true });
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
                let tasks = [...this.state.tasks];
                tasks = tasks.filter(
                    (task) => !this.state.checkedTasks.has(task._id)
                );
                this.setState({
                    tasks,
                    loading: false,
                    checkedTasks: new Set(),
                });
            })
            .catch((err) => console.log('error', err));
    };

    handleEditeTask = (editedTask) => {
        this.setState({ loading: true });
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

                const tasks = [...this.state.tasks];
                const indx = tasks.findIndex(
                    (item) => item._id === editedTask._id
                );
                tasks[indx] = editedTask;
                this.setState({ tasks, editedTask: null });
            })
            .catch((error) => console.log('Editeing error', error))
            .finally(() => {
                this.setState({ loading: false });
            });
    };

    handleAddTask = (formData) => {
        this.setState({ loading: true });
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

                const tasks = [...this.state.tasks];
                tasks.push(data);
                this.setState({ tasks, show: false, loading: false });
            })
            .catch((err) => {
                console.log('Adding Tasks', err);
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    };

    handleCheckedAllTasks = () => {
        let { tasks, checkedTasks } = this.state;
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

    renderTasks = (item) => {
        let { checkedTasks } = this.state;
        return (
            <Col key={item._id} className={styles.col}>
                <Task
                    task={item}
                    deletItem={this.handleDeleteItem}
                    handleCheked={this.handleCheked}
                    checkedTasks={checkedTasks}
                    isChecked={checkedTasks.has(item._id)}
                    EditedTask={this.toggleSetEditTask}
                    toggleAddEdite={this.toggleAddEdite}
                />
            </Col>
        );
    };
    componentDidMount() {
        this.setState({ loading: true });
        fetch(`${API_HOST}/task`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw data.error;
                this.setState({
                    tasks: data,
                    loading: false,
                });
            })
            .catch((error) => console.log(error));
    }
    render() {
        const {
            isOpenConfirm,
            tasks,
            checkedTasks,
            show,
            editedTask,
            loading,
        } = this.state;
        return (
            <Container>
                {loading && <SpinnerComp className={styles.spinner} />}
                <Row>
                    <Col className={styles.addTaskBtn}>
                        <Button onClick={this.toggleAddEdite}>
                            Add Task Modal
                        </Button>
                    </Col>
                </Row>

                <Row className={styles.row}>
                    {tasks.length === 0 ? (
                        <p>there are no taks</p>
                    ) : (
                        tasks.map((item) => {
                            return this.renderTasks(item);
                        })
                    )}
                </Row>
                <Row>
                    <Col>
                        <Button
                            variant="danger"
                            className={styles.delete_task}
                            onClick={this.toggleOpenConfirm}
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
                {show ? (
                    <TaskModal
                        onHide={this.toggleAddEdite}
                        onSubmit={this.handleAddTask}
                        todoF={this.handleInput}
                    />
                ) : (
                    false
                )}
                {isOpenConfirm && (
                    <Confirm
                        onHide={this.toggleOpenConfirm}
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
