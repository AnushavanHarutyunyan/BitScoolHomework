import React from 'react';
import Button from '@material-ui/core/Button';
import InputGroup from './Input';
// import CostomSnackbar from './SnackBar';

class ButtonComp extends React.Component {
    state = {
        corrent: 0,
        name: '',
        firstName: '',
        age: '',
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
        }
    };

    onChangeValue = (e) => {
        console.log(e);
        this.setState({ name: e.target.value });
        //console.log(this.state);
    };

    addBtn = () => {
        this.setState({ name: '' });
    };

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts').then((response) =>
            console.log(response.json())
        );
    }

    render() {
        return (
            <>
                <div>
                    {/* <Input
                        placeholder="name"
                        onChange={this.onChangeValue}
                        value={this.state.name}
                    /> */}
                    <InputGroup
                        onChange={this.onChangeValue}
                        value={this.state}
                    />
                    <Button
                        onClick={this.addBtn}
                        variant="contained"
                        color="primary"
                    >
                        Subbmit
                    </Button>
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
