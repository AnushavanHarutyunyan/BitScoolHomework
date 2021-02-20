import React from 'react';
import AddNewTask from './AddNewTask';

export default class Todo extends React.Component {
    state = {
        inputValue: '',
    };

    handleInput = (value) => {
        this.setState({ inputValue: value });
    };

    render() {
        return (
            <>
                <AddNewTask todoF={this.handleInput} />
                {this.state.inputValue && <h3>{this.state.inputValue}</h3>}
            </>
        );
    }
}
