import React from 'react';
import AddNewTask from '../AddTask/AddNewTask';
import Task from '../Task/Task';
import { v4 as uuidv4 } from 'uuid';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './todo.module.css';

export default class Todo extends React.Component {
    state = {
        tasks: [
            { _id: uuidv4(), value: 1 },
            { _id: uuidv4(), value: 2 },
            { _id: uuidv4(), value: 3 },
        ],
    };

    handleInput = (value) => {
        this.setState(
            {
                tasks: [...this.state.tasks, { _id: uuidv4(), value }],
            }
            // () => console.log(this.state.tasks)
        );
    };
    handleDeleteItem = (idItem) => {
        const tasks = this.state.tasks;
        const deletedItem = tasks.findIndex((item) => item._id === idItem);
        tasks.splice(deletedItem, 1);
        this.setState({ tasks });
    };
    renderTasks = (item) => {
        return (
            <Col key={item._id} className={styles.col}>
                <Task task={item} deletItem={this.handleDeleteItem} />
            </Col>
        );
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <AddNewTask todoF={this.handleInput} />
                    </Col>
                </Row>

                <Row className={styles.row}>
                    {this.state.tasks.map((item) => {
                        return this.renderTasks(item);
                    })}
                </Row>
            </Container>
        );
    }
}
