import types from '../acitonTypes';

const initialState = {
    tasks: [],
    deleteTaskId: null,
    checkedTasks: new Set(),
    isOpenAddTaskModal: false,
    isOpenConfirm: false,
    editedTask: null,
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_TASKS: {
            return {
                ...state,
                tasks: action.data,
            };
        }
        case types.DELETE_ONE_TASK: {
            let tasks = [...state.tasks];
            tasks = tasks.filter((tasks) => tasks._id !== action._id);
            return {
                ...state,
                tasks,
            };
        }
        case types.SET_DELETE_TASK_ID: {
            return {
                ...state,
                deleteTaskId: action._id,
            };
        }
        case types.TOGLE_ADD_TASK_MODAL: {
            return {
                ...state,
                isOpenAddTaskModal: !state.isOpenAddTaskModal,
            };
        }
        case types.ADD_TASK: {
            let tasks = [...state.tasks];
            tasks.push(action.data);
            return {
                ...state,
                tasks,
                isOpenAddTaskModal: false,
            };
        }
        case types.TOGGLE_CONFIRM_MODAL: {
            return {
                ...state,
                isOpenConfirm: !state.isOpenConfirm,
            };
        }
        case types.TOGGLE_CHECK_TASK: {
            const { _id } = action;
            let checkedTasks = new Set(state.checkedTasks);
            if (!checkedTasks.has(_id)) {
                checkedTasks.add(_id);
            } else {
                checkedTasks.delete(_id);
            }
            return {
                ...state,
                checkedTasks,
            };
        }
        case types.DELETE_CHECKED_TASK: {
            let tasks = [...state.tasks];
            tasks = tasks.filter((task) => !state.checkedTasks.has(task._id));
            return {
                ...state,
                checkedTasks: new Set(),
                tasks,
            };
        }
        case types.TOGGLE_EDITE_MODAL: {
            return {
                ...state,
                isEditeModal: action.isToggleEditModal,
            };
        }
        case types.SET_SINGGLE_TASKS: {
            return {
                ...state,
                singleTask: action.data,
            };
        }
        case types.SET_IS_OPEN_CONFIRM: {
            return {
                ...state,
                isOpenConfirm: false,
            };
        }
        case types.SET_EDITE_TASK: {
            return {
                ...state,
                editedTask: action.editedTask ?? null,
            };
        }
        case types.EDIT_TASK: {
            const { data } = action;
            const tasks = [...state.tasks];
            const indx = tasks.findIndex((task) => task._id === data._id);
            tasks[indx] = data;
            return {
                ...state,
                tasks,
                editedTask: null,
            };
        }
        case types.CHECKED_ALL_TAKS: {
            let { tasks } = state;
            let checkedTasks = new Set(state.checkedTasks);
            if (tasks.length === checkedTasks.size) {
                checkedTasks.clear();
            } else {
                tasks.forEach((task) => {
                    checkedTasks.add(task._id);
                });
            }
            return {
                ...state,
                checkedTasks,
            };
        }
        case types.RESET_DATA: {
            return {
                ...initialState,
            };
        }
        default:
            return state;
    }
};

export default todoReducer;
