import types from '../acitonTypes';

const initialState = {
    loading: false,
};

const globalReducer = (state = initialState, action) => {
    switch (action.types) {
        case types.SET_OR_REMOVE_LOADING: {
            return {
                ...state,
                loading: action.isloading,
            };
        }
        default:
            return state;
    }
};

export default globalReducer;
