import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.data.value,
        };
    }

    onChange = (event) => {
        this.setState({
            value: event.target.value,
        });
    };

    handleClose = () => {};

    handleSave = () => {};

    render() {
        return (
            <Dialog
                ref={this.wrapper}
                open={true}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please edited text.</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Todo Item"
                        fullWidth
                        value={this.state.value}
                        onChange={this.onChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default EditModal;
