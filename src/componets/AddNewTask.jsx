import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import A from './a';
import '../componets/AddNewTask.css';
import Todo from './Todo';

class AddNewTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: [],
            value: '',
        };
    }

    funcTodo = () => {
        const { handleInput } = this.props;
        console.log(this.props);
    };

    addBtn = () => {
        if (this.state.value) {
            this.state.inputValue.push(this.state.value);
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
        console.log(this.props);
        
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
