import { useState } from 'react';
import { withRouter } from 'react-router';
import { contextContactPage } from '../context';
import {
    isRequired,
    maxLength,
    minLength,
    validateEmail,
} from '../../../utils/validator';

const API_HOST = 'http://localhost:3001';
const maxLength40 = maxLength(40);
const minLength3 = minLength(3);

const ProviderContactPage = (props) => {
    const [formData, setFormState] = useState({
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
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = () => {
        const formDataCopy = { ...formData };

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

        setLoading(true);
        setErrorMessage('');

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
                setLoading(false);
                setErrorMessage(errorMessage);
                console.log('Contact Form request error', err);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let valid = true;

        let error =
            isRequired(value) ||
            maxLength40(value) ||
            minLength3(value) ||
            (name === 'email' && validateEmail(value));
        if (error) {
            valid = false;
        }

        setFormState({
            ...formData,
            [name]: {
                valid,
                error,
                value,
            },
        });
    };

    return (
        <contextContactPage.Provider
            value={{
                formData,
                loading,
                errorMessage,
                handleChange,
                handleSubmit,
            }}
        >
            {props.children}
        </contextContactPage.Provider>
    );
};

export default withRouter(ProviderContactPage);
