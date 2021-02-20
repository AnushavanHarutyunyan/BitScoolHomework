import React from 'react';
import AddNewTask from '../AddTask/AddNewTask';
import Task from '../Task/Task';
import { v4 as uuidv4 } from 'uuid';

export default class Todo extends React.Component {
    state = {
        tasks: [1,2,3],
        active: false,
    };

    handleInput = (value) => {
        this.setState({ tasks: [...this.state.tasks, value] });
    };
    onClickChangeStyle = (target) => {
        this.setState({ active: !this.state.active });
    };
    renderTasks = (item) => {
        return (
            <Task
                onClick={this.onClickChangeStyle}
                key={uuidv4()}
                tasks={item}
                active={this.state.active}
            />
        );
    };

    render() {
        return (
            <>
                <AddNewTask todoF={this.handleInput} />
                {this.state.tasks &&
                    this.state.tasks.map((item) => {
                        return this.renderTasks(item);
                    })}
            </>
        );
    }
}
