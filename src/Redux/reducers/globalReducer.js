import types from '../acitonTypes';

const initialState = {
    loading: false,
    errorMessage: '',
    successMessage: '',
};

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_OR_REMOVE_LOADING: {
            return {
                ...state,
                loading: action.isLoading,
                errorMessage: action.isLoading ? '' : state.errorMessage,
                successMessage: action.isLoading ? '' : state.successMessage,
            };
        }
        case types.SET_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.error,
            };
        }
        case types.SET_SUCCES_MESSAGE: {
            return {
                ...state,
                successMessage: action.successMessage,
            };
        }
        default:
            return state;
    }
};

export default globalReducer;
