import types from '../acitonTypes';

const initialState = {
    sort: null,
    search: '',
    status: null,
    create_lte: null,
    create_gte: null,
    complete_lte: null,
    complete_gte: null,
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_DROPDOWN_VARIANT: {
            const { dropDown, value } = action;
            return {
                ...state,
                [dropDown]: value,
            };
        }
        case types.CHANGE_SEARCH_VALUE: {
            const { target } = action;
            return {
                ...state,
                [target.name]: target.value,
            };
        }
        case types.SET_DATE: {
            const { name, date } = action;
            return {
                ...state,
                [name]: date,
            };
        }
        case types.RESET_SEARCH_STATE: {
            return {
                ...initialState,
            };
        }
        default:
            return state;
    }
};

export default searchReducer;
