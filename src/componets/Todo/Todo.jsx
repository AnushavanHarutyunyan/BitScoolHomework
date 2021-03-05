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
        editedTaskIndx: null,
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
        }
        // checkedTasks = checkedTasks.delete((item) => item !== taskId);

        this.setState({ checkedTasks });
    };

    handleDeleteCheckedTasks = () => {
        let tasks = [...this.state.tasks];
        tasks = tasks.filter((task) => !this.state.checkedTasks.has(task._id));
        this.setState({ tasks, checkedTasks: new Set() });
    };

    showEditeComp = (show) => {
        if (!show) {
            this.setState({ editeComp: show });
        }
        this.setState({ editeComp: !show });
    };

    // TaskIndx = null;

    EditedTask = (taskId) => {
        let editedTask = this.state.tasks.find((item) => item._id === taskId);
        // let editedTaskIndx = this.state.tasks.findIndex(
        //     (item) => item._id === taskId
        // );
        this.setState({ editedTask });
        // this.TaskIndx = editedTaskIndx;
    };

    saveEditedValue = (editedValue) => {
        this.state.editedTask.value = editedValue;
        // this.setState({editedTask: 5})
        // let editedTask = this.state;
        // let changedTask = (editedTask.value = editedValue);
        // this.setState({ editedTask: changedTask });
    };

    renderTasks = (item) => {
        return (
            <Col key={item._id} className={styles.col}>
                <Task
                    task={item}
                    deletItem={this.handleDeleteItem}
                    handleCheked={this.handleCheked}
                    checkedTasks={this.state.checkedTasks}
                    isChecked={this.state.checkedTasks.has(item._id)}
                    EditedTask={this.EditedTask}
                    showEditeComp={this.showEditeComp}
                />
            </Col>
        );
    };

    render() {
        // console.log('render');
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
                            className="float-right"
                            onClick={this.handleDeleteCheckedTasks}
                            disabled={!this.state.checkedTasks.size}
                        >
                            Delete Tasks
                        </Button>
                    </Col>
                </Row>
                {this.state.editeComp ? (
                    <Edite
                        showEditeComp={this.showEditeComp}
                        saveEditedValue={this.saveEditedValue}
                    />
                ) : (
                    false
                )}
            </Container>
        );
    }
}
