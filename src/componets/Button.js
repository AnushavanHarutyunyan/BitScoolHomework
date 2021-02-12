import React from 'react';
import Button from '@material-ui/core/Button';

class ButtonComp extends React.Component {
    state = {
        corrent: 0,
    };

    increment = () => {
        if (this.state.corrent >= 0) {
            this.setState({ corrent: this.state.corrent + 1 });
        }
    };

    decrement = () => {
        if (this.state.corrent > 0) {
            this.setState({ corrent: this.state.corrent - 1 });
        }
    };
    render() {
        return (
            <>
                <h1>{this.state.corrent}</h1>
                <div>
                    <Button onClick={this.increment} variant="contained">
                        +
                    </Button>
                    <Button onClick={this.decrement} variant="contained">
                        -
                    </Button>
                </div>
            </>
        );
    }
}

export default ButtonComp;
