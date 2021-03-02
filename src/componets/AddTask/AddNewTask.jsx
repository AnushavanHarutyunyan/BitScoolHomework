import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import '../AddTask/AddNewTask.css';

class AddNewTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
        };
    }

    funcTodo = () => {
        const { todoF } = this.props;
        todoF(this.state.inputValue);
    };

    submitBtn = () => {
        if (this.state.inputValue) {
            this.funcTodo();
            this.setState({ inputValue: '' });
        } else {
        }
    };

    handleChange = (event) => {
        const { value } = event.target;
        this.setState({ inputValue: value });
    };

    onKeyPress = (event) => {
        if (event.charCode === 13) {
            this.submitBtn();
        }
    };

    render() {
        const { checkedTasks } = this.props;
        return (
            <>
                <h1 className="h1Div">Todo-List-App</h1>
                <div className="inputDiv">
                    <Input
                        onChange={this.handleChange}
                        onKeyPress={this.onKeyPress}
                        value={this.state.inputValue}
                        placeholder="Add Task"
                        disabled={!!checkedTasks}
                    />
                    <Button
                        onClick={this.submitBtn}
                        variant="contained"
                        color="primary"
                        disabled={!!checkedTasks}
                    >
                        Subbmit
                    </Button>
                </div>
                {/* <A /> */}
            </>
        );
    }
}

export default AddNewTask;
