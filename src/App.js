import React from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TodoItem from './componets/TodoItem';
import { v4 as uuidv4 } from 'uuid';
import '../src/App.css';
import '../src/SelectStyle.css';
import EditModal from './componets/EditModal';

class App extends React.Component {
    state = {
        inputValue: '',
        listItem: [],
        editedItem: null,
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

    onEdite = (itemId) => {
        //console.log(itemId)
        this.setState({
            editedItem: this.state.listItem.find((item) => item.id === itemId),
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
                onEdite={this.onEdite}
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
                    {this.state.listItem.map((item) => {
                        //console.log(item);
                        return this.renderItem(item);
                    })}
                    {!!this.state.editedItem && (
                        <EditModal data={this.state.editedItem} />
                    )}
                </div>
            </>
        );
    }
}

export default App;
