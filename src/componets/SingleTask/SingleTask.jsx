import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './singletask.module.css';

const API_HOST = 'http://localhost:3001';

class SingleTask extends React.Component {
    state = {
        singgleTasks: null,
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        fetch(`${API_HOST}/task/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw data.error;
                this.setState({ singgleTasks: data });
            })
            .catch((error) => console.log(error));
    }

    render() {
        const { singgleTasks } = this.state;
        if (!singgleTasks) return <p>'Loading'</p>;
        return (
            <div className={styles.signgleTask}>
                <h1>Single Task</h1>
                <div>
                    <p>Title: {singgleTasks.title}</p>
                    <p>Description: {singgleTasks.description}</p>
                </div>
                <div className={styles.btn_div}>
                    <Button variant="warning" className={styles.btn}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button variant="danger" className={styles.btn}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>
            </div>
        );
    }
}

export default SingleTask;
