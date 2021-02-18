import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import CustomizedSnackbars from './Snackbar';
import A from './a';
import '../componets/AddNewTask.css';

class AddNewTask extends React.Component {
    state = {
        inputValue: [],
        value: '',
        isVisible: null,
    };

    handleSubmit = (openSnackbar, closeSnackbar) => {
        console.log(openSnackbar);
        //openSnackbar();
    };

    addBtn = () => {
        if (this.state.value) {
            this.state.inputValue.push(this.state.value);
            this.setState({ value: '' });
        } else {
            <CustomizedSnackbars handleSub={this.handleSubmit} />;
            this.setState({ isVisible: <CustomizedSnackbars /> });
        }
    };

    handleChange = (event) => {
        const { value } = event.target;
        this.setState({ value });
    };

    render() {
        console.log(this.state);
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
                <A />
            </>
        );
    }
}

export default AddNewTask;
