import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import '../AddTask/AddNewTask.css';

class AddNewTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: [],
            value: '',
        };
    }

    funcTodo = () => {
        const { todoF } = this.props;
        todoF(this.state.inputValue);
    };

    submitBtn = () => {
        if (this.state.value) {
            this.state.inputValue.push(this.state.value);
            this.funcTodo();
            this.setState({ value: '' });
        } else {
            // <CustomizedSnackbars handleSub={this.handleSubmit} />;
            // this.setState({ isVisible: <CustomizedSnackbars /> }); uzum em vor datarki jamanak snackbar bacvi
        }
    };

    handleChange = (event) => {
        const { value } = event.target;
        this.setState({ value });
    };

    onKeyPress = (event) => {
        if (event.charCode === 13) {
            this.submitBtn();
        }
    };

    render() {
        return (
            <>
                <h1>Todo-List</h1>
                <div className="inputDiv">
                    <Input
                        onChange={this.handleChange}
                        onKeyPress={this.onKeyPress}
                        value={this.state.value}
                    />
                    <Button
                        onClick={this.submitBtn}
                        variant="contained"
                        color="primary"
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
