import { createStore } from 'redux';
const initialState = {
    todoState: {
        tasks: [],
        checkedTasks: new Set(),
        isOpenAddTaskModal: false,
        isOpenConfirm: false,
    },
    singleTask: {
        singgleTasks: null,
        isEditeModal: false,
        isOpenConfirm: false,
    },
    loading: false,
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TASKS': {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks: action.data,
                },
            };
        }
        case 'DELETE_ONE_TASK': {
            let tasks = [...state.todoState.tasks];
            tasks = tasks.filter((tasks) => tasks._id !== action._id);
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks,
                },
            };
        }
        case 'SET_OR_REMOVE_LOADING': {
            return {
                ...state,
                loading: action.isLoading,
            };
        }
        case 'TOGLE_ADD_TASK_MODAL': {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    isOpenAddTaskModal: !state.todoState.isOpenAddTaskModal,
                },
            };
        }
        case 'ADD_TASK': {
            let tasks = [...state.todoState.tasks];
            tasks.push(action.data);
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks,
                    isOpenAddTaskModal: false,
                },
            };
        }
        case 'TOGGLE_CONFIRM_MODAL': {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    isOpenConfirm: !state.todoState.isOpenConfirm,
                },
            };
        }
        case 'TOGGLE_CHECK_TASK': {
            const { _id } = action;
            let checkedTasks = new Set(state.todoState.checkedTasks);
            if (!checkedTasks.has(_id)) {
                checkedTasks.add(_id);
            } else {
                checkedTasks.delete(_id);
            }

            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    checkedTasks,
                },
            };
        }
        case 'DELETE_CHECKED_TASK': {
            let tasks = [...state.todoState.tasks];
            tasks = tasks.filter(
                (task) => !state.todoState.checkedTasks.has(task._id)
            );
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    checkedTasks: new Set(),
                    tasks,
                },
            };
        }
        case 'TOGGLE_EDITE_MODAL': {
            return {
                ...state,
                singgleTasks: {
                    ...state.singleTask,
                    isEditeModal: action.isToggleEditModal,
                },
            };
        }
        case 'SET_SINGGLE_TASKS': {
            return {
                ...state,
                singgleTasks: {
                    ...state.singleTask,
                    singleTask: action.data,
                },
            };
        }
        case 'SET_IS_OPEN_CONFIRM': {
            return {
                ...state,
                singgleTasks: {
                    ...state.singleTask,
                    isOpenConfirm: false,
                },
            };
        }
        default:
            return state;
    }
};

const store = createStore(reducer);
window.store = store;

export default store;
