import { useReducer } from 'react';
import { Form, Button } from 'react-bootstrap';
import Spinner from '../Spinner/Spinner';
import styles from '../ContactForm/contactform.module.css';
import {
    isRequired,
    maxLength,
    minLength,
    validateEmail,
} from '../../utils/validator';
import { withRouter } from 'react-router';

const API_HOST = 'http://localhost:3001';
const maxLength40 = maxLength(40);
const minLength3 = minLength(3);
const forms = [
    {
        name: 'name',
        type: 'text',
        placeholder: 'name',
    },
    {
        name: 'email',
        type: 'email',
        placeholder: 'email',
    },
    {
        name: 'message',
        type: null,
        placeholder: 'message',
        as: 'textarea',
    },
];

const initialState = {
    formData: {
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
        loading: false,
        errorMessage: '',
    },
    loading: false,
    errorMessage: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case '+': {
            return {
                count: state.count + 1,
            };
        }
        case '-': {
            return {
                count: state.count - 1,
            };
        }
        case 'onChange': {
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
                formData: {
                    ...state.formData,
                    [name]: {
                        valid,
                        error,
                        value,
                    },
                },
            };
        }
        case 'SET_LOADING': {
            return {
                ...state,
                loading: true,
                errorMessage: '',
            };
        }
        case 'REMOVE_LOADING': {
            return {
                ...state,
                loading: false,
            };
        }
        case 'SET_ERR_MESS': {
            return {
                ...state,
                errorMessage: action.error,
            };
        }
        default: {
            return state;
        }
    }
};

const ContactFormWithReducer = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        formData,
        loading,
        // handleChange,
        // handleSubmit,
    } = state;

    const handleChange = ({ target }) => {
        const action = {
            type: 'onChange',
            target: target,
        };
        dispatch(action);
    };

    const handleSubmit = () => {
        const formDataCopy = { ...state.formData };

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

        dispatch({ type: 'SET_LOADING' });

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
                props.history.push('/');
            })
            .catch((err) => {
                let errorMessage;
                if (err.status === 422) {
                    errorMessage = err.message.slice(11);
                }
                dispatch({ type: 'REMOVE_LOADING' });
                dispatch({
                    type: 'SET_ERR_MESS',
                    error: errorMessage,
                });
                console.log('Contact Form request error', err);
            });
    };

    const formJSX = forms.map((item, indx) => {
        return (
            <Form.Group key={indx}>
                <Form.Control
                    className={styles.textarea}
                    name={item.name}
                    type={item.type}
                    value={formData[item.name].value}
                    onChange={handleChange}
                    placeholder={item.placeholder}
                    as={item.as ? item.as : undefined}
                />
                <Form.Text className={styles.validMessage}>
                    {state.formData[item.name].error}
                </Form.Text>
            </Form.Group>
        );
    });

    return (
        <>
            <Form
                onSubmit={(e) => e.preventDefault()}
                className={styles.form}
                noValidate
            >
                <Form.Text className={styles.validMessage}>
                    <h4>{state.errorMessage}</h4>
                </Form.Text>
                {formJSX}
                <Button
                    variant="primary"
                    type="submit"
                    className={styles.addBtn}
                    onClick={handleSubmit}
                >
                    Add
                </Button>
            </Form>
            {loading && <Spinner />}
        </>
    );
};

export default withRouter(ContactFormWithReducer);
