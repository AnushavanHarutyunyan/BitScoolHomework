import React from 'react';
import AddNewTask from '../AddTask/AddNewTask';
import Task from '../Task/Task';
import { v4 as uuidv4 } from 'uuid';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './todo.module.css';
import Edite from '../Edite/Edite';

export default class Todo extends React.Component {
    state = {
        tasks: [
            { _id: uuidv4(), value: 1 },
            { _id: uuidv4(), value: 2 },
            { _id: uuidv4(), value: 3 },
        ],
        checkedTasks: new Set(),
        editeComp: false,
        editedTask: null,
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

    showEditeComp = (show) => {
        if (!show) {
            this.setState({ editeComp: show });
        }
        this.setState({ editeComp: !show });
    };

    EditedTask = (taskId) => {
        let editedTask = this.state.tasks.find((item) => item._id === taskId);
        //indexnem gtnum
        // let editedTaskIndx = this.state.tasks.findIndex(
        //     (item) => item._id === taskId
        // );
        // this.TaskIndx = editedTaskIndx;
        this.setState({ editedTask });
    };

    saveEditedValue = (editedValue) => {
        let { tasks, editedTask } = this.state;
        if (editedValue) {
            this.setState({
                tasks: [
                    ...tasks.slice(0, tasks.indexOf(editedTask)),
                    { ...editedTask, value: editedValue },
                    ...tasks.slice(tasks.indexOf(editedTask) + 1),
                ],
            });
        } else {
        }
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
                    EditedTask={this.EditedTask}
                    showEditeComp={this.showEditeComp}
                    checked={checkedTasks.has(item._id) ? 'checked' : false}
                />
            </Col>
        );
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <AddNewTask
                            todoF={this.handleInput}
                            checkedTasks={this.state.checkedTasks.size}
                        />
                    </Col>
                </Row>

                <Row className={styles.row}>
                    {this.state.tasks.length === 0 ? (
                        <p>there are no taks</p>
                    ) : (
                        this.state.tasks.map((item) => {
                            return this.renderTasks(item);
                        })
                    )}
                </Row>
                <Row>
                    <Col>
                        <Button
                            variant="danger"
                            className={styles.delete_task}
                            onClick={this.handleDeleteCheckedTasks}
                            disabled={!this.state.checkedTasks.size}
                        >
                            Delete Tasks
                        </Button>
                        <Button
                            className={styles.btn_checked_all_tasks}
                            variant="primary"
                            onClick={this.handleCheckedAllTasks}
                            disabled={!this.state.tasks.length}
                        >
                            {this.state.tasks.length ===
                                this.state.checkedTasks.size &&
                            this.state.tasks.length !== 0
                                ? 'Remove Checked'
                                : 'Check All'}
                        </Button>
                    </Col>
                </Row>
                {this.state.editeComp ? (
                    <Edite
                        showEditeComp={this.showEditeComp}
                        saveEditedValue={this.saveEditedValue}
                        editedTask={this.state.editedTask}
                    />
                ) : (
                    false
                )}
            </Container>
        );
    }
}
