import types from '../acitonTypes';
import {
    isRequired,
    maxLength,
    minLength,
    validateEmail,
} from '../../utils/validator';

const maxLength40 = maxLength(40);
const minLength3 = minLength(3);
const initialState = {
    name: {
        valid: false,
        error: null,
        value: '',
    },
    email: {
        valid: false,
        error: null,
        value: '',
    },
    message: {
        valid: false,
        error: null,
        value: '',
    },
};

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_CONTACT_FORM: {
            const { name, value } = action.target;
            let valid = true;

            let error =
                isRequired(value) ||
                maxLength40(value) ||
                minLength3(value) ||
                (name === 'email' && validateEmail(value));
            if (error) {
                valid = false;
            }
            return {
                ...state,
                [name]: {
                    valid,
                    error,
                    value,
                },
            };
        }
        default:
            return state;
    }
};

export default contactReducer;
