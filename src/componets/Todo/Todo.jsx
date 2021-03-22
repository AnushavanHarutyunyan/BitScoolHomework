import React from 'react';
import Task from '../Task/Task';
import Confirm from '../Confirm';
import TaskModal from '../TaskModal/TaskModal';
import { v4 as uuidv4 } from 'uuid';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './todo.module.css';

export default class Todo extends React.Component {
    state = {
        tasks: [
            { _id: uuidv4(), title: '1', description: '1' },
            { _id: uuidv4(), title: '2', description: '2' },
            { _id: uuidv4(), title: '3', description: '3' },
        ],
        checkedTasks: new Set(),
        show: false,
        editedTask: null,
        isOpenConfirm: false,
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
        const tasks = this.state.tasks;
        const deletedItem = tasks.findIndex((item) => item._id === idItem);
        tasks.splice(deletedItem, 1);
        this.setState({ tasks });
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
        let tasks = [...this.state.tasks];
        tasks = tasks.filter((task) => !this.state.checkedTasks.has(task._id));
        this.setState({
            tasks,
            checkedTasks: new Set(),
        });
    };

    handleEditeTask = (editedTask) => {
        const tasks = [...this.state.tasks];
        const indx = tasks.findIndex((item) => item._id === editedTask._id);
        tasks[indx] = editedTask;
        this.setState({ tasks });
    };

    handleSubmit = (formData) => {
        const tasks = [...this.state.tasks];
        tasks.push({ ...formData, _id: uuidv4() });
        this.setState({ tasks });
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

    render() {
        const {
            isOpenConfirm,
            tasks,
            checkedTasks,
            show,
            editedTask,
        } = this.state;
        return (
            <Container>
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
                        onSubmit={this.handleSubmit}
                        editedTask={editedTask}
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
