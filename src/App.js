import React from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TodoItem from './componets/TodoItem';
import { v4 as uuidv4 } from 'uuid';
import '../src/App.css';
import '../src/SelectStyle.css';

class App extends React.Component {
    state = {
        inputValue: '',
        listItem: [],
    };

    onInputChange = (event) => {
        this.setState({ inputValue: event.target.value });
    };

    deleteItem = (deletedItemId) => {
        
        console.log(deletedItemId);
        this.setState({
            listItem: this.state.listItem.filter(
                (item) => item.id !== deletedItemId
            ),
        });
    };

    onAddItem = () => {
        const item = {
            id: uuidv4(),
            value: this.state.inputValue,
        };

        this.setState({
            listItem: [...this.state.listItem, item],
            inputValue: '',
        });
    };

    renderItem = (item) => {
        this.item = item;
        return (
            <TodoItem
                key={`${item.id}_${item.value}`}
                data={item}
                state={this.state.listItem}
                onDelete={this.deleteItem}
            />
        );
    };

    onKeyDown = (event) => {
        if (event.keyCode === 13) {
            this.onAddItem();
        }
    };

    render() {
        return (
            <>
                <div className="selectStyle">
                    <TextField
                        value={this.state.inputValue}
                        onChange={this.onInputChange}
                        InputProps={{ onKeyDown: this.onKeyDown }}
                        variant="outlined"
                        id="standard-basic"
                        label="Standard"
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={this.onAddItem}
                        //className={classes.button}
                        startIcon={<SaveIcon />}
                    >
                        Add
                    </Button>
                </div>
                <div>
                    {this.state.listItem.map((item) => this.renderItem(item))}
                </div>
            </>
        );
    }
}

export default App;
