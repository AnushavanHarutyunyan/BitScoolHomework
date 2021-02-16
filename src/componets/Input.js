import React from 'react';
import Input from '@material-ui/core/Input';
import '../componets/Input.css';

export default function InputGroup(props) {
    //console.log(props);
    return (
        <div>
            <div>
                <h1>{props.name}</h1>
            </div>
            <form className="div">
                <Input
                    placeholder="name"
                    //onChange={this.onChangeValue}
                    onChange={props.onChange}
                    //value={this.state.name}
                    value={props.value.name}
                />
                <Input
                    placeholder="firsName"
                    //onChange={this.onChangeValue}
                    onChange={props.onChange}
                    //value={this.state.name}
                    value={props.value.firstName}
                />
                <Input
                    placeholder="age"
                    //onChange={this.onChangeValue}
                    onChange={props.onChange}
                    //value={this.state.name}
                    value={props.value.age}
                />
            </form>
        </div>
    );
}
