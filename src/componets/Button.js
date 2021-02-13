import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import CostomSnackbar from './SnackBar';

class ButtonComp extends React.Component {
    state = {
        corrent: 0,
        name: '',
    };

    increment = () => {
        if (this.state.corrent >= 0) {
            this.setState({ corrent: this.state.corrent + 1 });
        }
    };

    hover = () => {
        console.log('button hover');
    };

    decrement = () => {
        if (this.state.corrent > 0) {
            this.setState({ corrent: this.state.corrent - 1 });
        } else {
            return <CostomSnackbar />;
        }
    };

    onChangeValue = (e) => {
        this.setState({ name: e.target.value });
    };

    addBtn = () => {
        this.setState({ name: '' });
        console.log(this.state.name);
    };

    render() {
        return (
            <>
                <div>
                    <Input
                        placeholder="name"
                        onChange={this.onChangeValue}
                        value={this.state.name}
                    />
                    <CostomSnackbar />
                    <Button onClick={this.addBtn}>Add</Button>
                </div>
                <h1>{this.state.corrent}</h1>
                <div>
                    <Button
                        onClick={this.increment}
                        onMouseEnter={this.hover}
                        variant="contained"
                    >
                        +
                    </Button>
                    <Button
                        onClick={this.decrement}
                        onMouseEnter={this.hover}
                        variant="contained"
                    >
                        -
                    </Button>
                </div>
            </>
        );
    }
}

export default ButtonComp;
