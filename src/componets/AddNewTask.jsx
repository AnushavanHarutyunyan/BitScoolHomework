import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import '../componets/AddNewTask.css';

class AddNewTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: [1515],
            value: '',
        };
    }

    funcTodo = () => {
        const { todoF } = this.props;
        todoF(this.state.inputValue)
    };

    addBtn = () => {
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

    render() {
        return (
            <>
                <div>{this.state.isVisible}</div>
                <div className="inputDiv">
                    <Input
                        onChange={this.handleChange}
                        value={this.state.value}
                    />
                    <Button
                        onClick={this.addBtn}
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
