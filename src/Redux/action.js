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
        .catch((error) => console.log('Get all tasks', error))
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
        })
        .catch((err) => {
            console.log('Adding Tasks', err);
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
            }
        })
        .catch((error) => console.log(error))
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
        })
        .catch((err) => console.log('error', err))
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
            } else if (page === 'singleTask') {
                dispatch({ type: types.SET_SINGLE_TASKS, data });
            }
        })
        .catch((error) => console.log('Editeing error', error))
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
            console.log('Single Task Get request', error.message);
            history.push('/404');
        });
};

export const toggleSingleEditeModal = (dispatch) => {
    dispatch({ type: types.TOGGLE_SINGLE_TASK_EDIT_MODAL });
};

export const resetSingleTaskState = (dispatch) => {
    dispatch({ type: types.RESET_SINGLE_TASK_STATE });
};
