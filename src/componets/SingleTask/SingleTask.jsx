import React from 'react';
import { Button } from 'react-bootstrap';
import TaskModal from '../TaskModal/TaskModal';
import SpinnerComp from '../Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './singletask.module.css';

const API_HOST = 'http://localhost:3001';

class SingleTask extends React.Component {
    state = {
        singgleTasks: null,
        isEditeModal: false,
        isOpenConfirm: false,
        loading: false,
    };

    toggleEditModal = () => {
        this.setState({ isEditeModal: !this.state.isEditeModal });
    };

    handleEditeTask = (editTask) => {
        this.setState({ loading: true });
        fetch(`${API_HOST}/task/${editTask._id}`, {
            method: 'PUT',
            body: JSON.stringify(editTask),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw data.error;
                this.setState({
                    singgleTasks: data,
                    isEditeModal: false,
                    loading: false,
                });
            })
            .catch((error) => console.log(error));
    };
    handleDelet = () => {
        const { _id } = this.state.singgleTasks;
        this.setState({ loading: true });
        fetch(`${API_HOST}/task/${_id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw console.log(data.error);
                this.setState({
                    isOpenConfirm: false,
                    loading: false,
                });
                this.props.history.push('/');
            })
            .catch((err) => console.log('Single Task Deleting error', err));
    };

    componentDidMount() {
        console.log('componetn Did mount');
        const { id } = this.props.match.params;
        this.setState({ loading: true });
        fetch(`${API_HOST}/task/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw data.error;
                console.log('if mtav');
                this.setState({ singgleTasks: data });
            })
            .catch((error) => this.props.history.push('/404'))
            .finally(() => {
                this.setState({ loading: false });
            });
    }

    render() {
        const { singgleTasks, isEditeModal, loading } = this.state;
        if (!singgleTasks || loading) return <SpinnerComp />;
        return (
            <>
                <div className={styles.signgleTask}>
                    <h1>Single Task</h1>
                    <div>
                        <p>Title: {singgleTasks.title}</p>
                        <p>Description: {singgleTasks.description}</p>
                    </div>
                    <div className={styles.btn_div}>
                        <Button variant="warning" className={styles.btn}>
                            <FontAwesomeIcon
                                icon={faEdit}
                                onClick={this.toggleEditModal}
                            />
                        </Button>
                        <Button
                            variant="danger"
                            className={styles.btn}
                            onClick={this.handleDelet}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div>
                </div>
                {isEditeModal && (
                    <TaskModal
                        onHide={this.toggleEditModal}
                        onSubmit={this.handleEditeTask}
                        editedTask={singgleTasks}
                    />
                )}
                {/* {loading && <SpinnerComp />} */}
            </>
        );
    }
}

export default SingleTask;
