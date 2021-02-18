import React from 'react';
import AddNewTask from './AddNewTask';

export default class Todo extends React.Component {
    state = {
        inputValue: '',
    };

    handleInput =(value)=>{
        
    }

    render() {
        return <AddNewTask todoF='this.handleInput'/>;
    }
}
