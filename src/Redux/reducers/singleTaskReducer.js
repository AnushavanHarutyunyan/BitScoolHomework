import types from '../acitonTypes';

const initialState = {
    singleTask: null,
    isEditeModal: false,
};

const singleTaskReducer = (state = initialState, action) => {
    switch (action.types) {
        case types.SET_SINGLE_TASK: {
            return {
                ...state,
                singleTask: action.data,
            };
        }
        default:
            return state;
    }
};

export default singleTaskReducer;
