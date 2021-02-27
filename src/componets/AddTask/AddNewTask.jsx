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
            // <CustomizedSnackbars handleSub={this.handleSubmit} />;
            // this.setState({ isVisible: <CustomizedSnackbars /> }); uzum em vor datarki jamanak snackbar bacvi
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
        return (
            <>
                <h1 className="h1Div">Todo-List-App</h1>

                <div className="inputDiv">
                    <Input
                        onChange={this.handleChange}
                        onKeyPress={this.onKeyPress}
                        value={this.state.inputValue}
                        placeholder="Add Task"
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
