import React from 'react';
import Button from '@material-ui/core/Button';
import '../componets/LiStyle.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

class TodoItem extends React.Component {
    delete = () => {
        this.props.onDelete(this.props.data.id);
    };

    // handleEdit = () => {
        
    //     //console.log(this.props);
    //     this.props.onEdite(this.props.data.id);
    // };

    render() {
        //console.log(this.props)
        return (
            <div>
                <li className="liStyle">
                    {this.props.data.value}
                    <div>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                            onClick={this.delete}
                        ></Button>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<EditIcon />}
                            onClick={() => this.props.onEdite(this.props.data.id)}
                        ></Button>
                    </div>
                </li>
            </div>
        );
    }
}

//export {indx}
export default TodoItem;
