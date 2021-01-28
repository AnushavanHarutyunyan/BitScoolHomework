import React from 'react';
import Button from '@material-ui/core/Button';
import '../componets/LiStyle.css';
import DeleteIcon from '@material-ui/icons/Delete';

class TodoItem extends React.Component {
    
    delete = () =>{

        this.props.onDelete(this.props.data.id)
    }
    
    render() {
        //console.log(this.props)
        return (
            <div>
                <li className="liStyle">
                    {this.props.data.value}
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={this.delete}
                    ></Button>
                </li>
            </div>
        );
    }
}

//export {indx}
export default TodoItem;
