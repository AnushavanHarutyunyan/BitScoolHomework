import React from 'react';
import AddNewTask from '../AddTask/AddNewTask';
import Task from '../Task/Task';
import { v4 as uuidv4 } from 'uuid';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './todo.module.css';

export default class Todo extends React.Component {
    state = {
        tasks: [
            { _id: uuidv4(), value: 1 },
            { _id: uuidv4(), value: 2 },
            { _id: uuidv4(), value: 3 },
        ],
        checkedTasks: new Set(),
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

    renderTasks = (item) => {
        return (
            <Col key={item._id} className={styles.col}>
                <Task
                    task={item}
                    deletItem={this.handleDeleteItem}
                    handleCheked={this.handleCheked}
                    checkedTasks={this.state.checkedTasks}
                    isChecked={this.state.checkedTasks.has(item._id)}
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
                            className="float-right"
                            onClick={this.handleDeleteCheckedTasks}
                            disabled={!this.state.checkedTasks.size}
                        >
                            Delete All Task
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}
