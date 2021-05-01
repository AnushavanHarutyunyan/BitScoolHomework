import types from '../acitonTypes';

const initialState = {
    singleTask: null,
    isEditeModal: false,
};

const singleTaskReducer = (state = initialState, action) => {
    console.log('sigleReducer', action);
    switch (action.type) {
        case types.SET_SINGLE_TASK: {
            return {
                ...state,
                singleTask: action.data,
                isEditeModal: false,
            };
        }
        case types.TOGGLE_SINGLE_TASK_EDIT_MODAL: {
            return {
                ...state,
                isEditeModal: !state.isEditeModal,
            };
        }
        case types.RESET_SINGLE_TASK_STATE: {
            return {
                ...initialState,
            };
        }
        default:
            return state;
    }
};

export default singleTaskReducer;
