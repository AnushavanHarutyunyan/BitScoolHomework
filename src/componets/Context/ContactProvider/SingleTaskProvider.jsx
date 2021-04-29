import { useState } from 'react';
import { contextSignleTask } from '../context';

const API_HOST = 'http://localhost:3001';

const ProviderSingleTask = (props) => {
    const [singgleTask, setSinggleTask] = useState(null);
    const [isEditeModal, toggleEditModal] = useState(false);
    const [isOpenConfirm, setisOpenConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEditeTask = (editTask) => {
        setLoading(true);
        fetch(`${API_HOST}/task/${editTask._id}`, {
            method: 'PUT',
            body: JSON.stringify(editTask),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw data.error;
                setSinggleTask(data);
                toggleEditModal(false);
            })
            .catch((error) => console.log('Single Task edited', error))
            .finally(() => setLoading(false));
    };

    const handleDelet = () => {
        const { _id } = singgleTask;
        setLoading(true);
        fetch(`${API_HOST}/task/${_id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw console.log(data.error);
                setisOpenConfirm(false);
                setLoading(false);
                props.history.push('/');
            })
            .catch((err) => console.log('Single Task Deleting error', err));
    };

    const getSingleTask = () => {
        const { id } = props.match.params;
        fetch(`${API_HOST}/task/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw data.error;
                setSinggleTask(data);
            })
            .catch((error) => {
                console.log('Single Task Get request', error.message);
                props.history.push('/404');
            });
    };

    return (
        <contextSignleTask.Provider
            value={{
                singgleTask,
                isEditeModal,
                isOpenConfirm,
                loading,
                toggleEditModal,
                handleEditeTask,
                handleDelet,
                getSingleTask,
            }}
        >
            {props.children}
        </contextSignleTask.Provider>
    );
};

export default ProviderSingleTask;
