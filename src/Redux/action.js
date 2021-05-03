import types from './acitonTypes';
const API_HOST = 'http://localhost:3001';

export function SetTaskThunk(dispatch) {
    dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true });
    fetch(`${API_HOST}/task`)
        .then((res) => res.json())
        .then((data) => {
            if (data.error) throw data.error;
            dispatch({ type: types.SET_TASKS, data });
        })
        .catch((error) =>
            dispatch({ type: types.SET_ERROR_MESSAGE, error: error.message })
        )
        .finally(() =>
            dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false })
        );
}

export const addTaskThunk = (dispatch, formData) => {
    dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true });
    fetch(`${API_HOST}/task`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                throw data.error;
            }
            dispatch({ type: types.ADD_TASK, data });
            dispatch({
                type: types.SET_SUCCES_MESSAGE,
                successMessage: 'Task was added successfully',
            });
        })
        .catch((error) => {
            dispatch({ type: types.SET_ERROR_MESSAGE, error: error.message });
        })
        .finally(() => {
            dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false });
        });
};

export const deleteOneTaskThunk = (dispatch, _id, history = null) => {
    dispatch({ type: 'SET_DELETE_TASK_ID', _id });
    fetch(`${API_HOST}/task/${_id}`, {
        method: 'DELETE',
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) throw data.error;
            if (history) {
                history.push('/');
            } else {
                dispatch({ type: types.DELETE_ONE_TASK, _id });
                dispatch({
                    type: types.SET_SUCCES_MESSAGE,
                    successMessage: 'Task was deleted',
                });
            }
        })
        .catch((error) =>
            dispatch({ type: types.SET_ERROR_MESSAGE, error: error.message })
        )
        .finally(() => dispatch({ type: types.SET_DELETE_TASK_ID, _id: null }));
};

export const deleteCheckedTasksThunk = (dispatch, checkedTasks) => {
    dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true });
    fetch(`${API_HOST}/task`, {
        method: 'PATCH',
        body: JSON.stringify({
            tasks: Array.from(checkedTasks),
        }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) throw data.error;
            dispatch({ type: types.DELETE_CHECKED_TASK });
            dispatch({
                type: types.SET_SUCCES_MESSAGE,
                successMessage: 'Checked tasks were deleted',
            });
        })
        .catch((error) =>
            dispatch({ type: types.SET_ERROR_MESSAGE, error: error.message })
        )
        .finally(() =>
            dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false })
        );
};

export const editeTaskThunk = (dispatch, editedTask, page = 'todo') => {
    dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false });
    fetch(`${API_HOST}/task/${editedTask._id}`, {
        method: 'PUT',
        body: JSON.stringify(editedTask),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) throw data.error;
            if (page === 'todo') {
                dispatch({ type: types.EDIT_TASK, data });
                dispatch({
                    type: types.SET_SUCCES_MESSAGE,
                    successMessage: 'Task was edited successfully',
                });
            } else if (page === 'singleTask') {
                dispatch({ type: types.SET_SINGLE_TASKS, data });
                dispatch({
                    type: types.SET_SUCCES_MESSAGE,
                    successMessage: 'Task was edited successfully',
                });
            }
        })
        .catch((error) => {
            dispatch({ type: types.SET_ERROR_MESSAGE, error: error.message });
        })
        .finally(() => {
            dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false });
        });
};

export const setSingleTaskThunk = (dispatch, id, history) => {
    fetch(`${API_HOST}/task/${id}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.error) throw data.error;
            dispatch({ type: types.SET_SINGLE_TASK, data });
        })
        .catch((error) => {
            history.push('/404');
        });
};

export const sendContactFormThunk = (formData, history) => (dispatch) => {
    const formDataCopy = { ...formData };

    for (let key in formDataCopy) {
        if (
            typeof formDataCopy[key] === 'object' &&
            formDataCopy[key].hasOwnProperty('value')
        ) {
            formDataCopy[key] = formDataCopy[key].value;
        } else {
            delete formDataCopy[key];
        }
    }

    dispatch({
        type: types.SET_OR_REMOVE_LOADING,
        isLoading: true,
    });

    fetch(`${API_HOST}/form`, {
        method: 'POST',
        body: JSON.stringify(formDataCopy),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) throw data.error;
            dispatch({
                type: types.SET_SUCCES_MESSAGE,
                successMessage: 'Form sended successfuly',
            });
            history.push('/');
        })
        .catch((err) => {
            let errorMessage;
            if (err.status === 422) {
                errorMessage = err.message.slice(11);
            }
            dispatch({
                type: types.SET_OR_REMOVE_LOADING,
                isLoading: false,
            });

            dispatch({
                type: types.SET_ERROR_MESSAGE,
                error: errorMessage,
            });
        });
};

export const toggleStatusThunk = (task) => (dispatch) => {
    const status = task.status === 'done' ? 'active' : 'done';
    fetch(`${API_HOST}/task/${task._id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) throw data.error;
            dispatch({ type: types.EDIT_TASK, data });
        })
        .catch((error) => {
            dispatch({ type: types.SET_ERROR_MESSAGE, error: error.message });
        });
};

export const toggleSingleEditeModal = (dispatch) => {
    dispatch({ type: types.TOGGLE_SINGLE_TASK_EDIT_MODAL });
};

export const resetSingleTaskState = (dispatch) => {
    dispatch({ type: types.RESET_SINGLE_TASK_STATE });
};

export const changeContactForm = (target) => (dispatch) => {
    dispatch({ type: types.CHANGE_CONTACT_FORM, target });
};
