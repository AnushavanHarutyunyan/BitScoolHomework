import React from 'react';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Spinner from '../Spinner/Spinner';
import {
    isRequired,
    maxLength,
    minLength,
    validateEmail,
} from '../../utils/validator';
import styles from '../ContactForm/contactform.module.css';

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

const API_HOST = 'http://localhost:3001';
const maxLength40 = maxLength(40);
const minLength3 = minLength(3);

const ContactFormWithHooks = (props) => {
    const [formState, setFormState] = useState({
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
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = () => {
        const { name, email, message } = formState;
        const formData = { name, email, message };

        for (let key in formData) {
            if (
                typeof formData[key] === 'object' &&
                formData[key].hasOwnProperty('value')
            ) {
                formData[key] = formData[key].value;
            } else {
                delete formData[key];
            }
        }

        // if (!name.value.trim() || !email.value.trim() || !message.value.trim())
        //     return;

        setLoading(true);
        setErrorMessage(null);

        fetch(`${API_HOST}/form`, {
            method: 'POST',
            body: JSON.stringify(formData),
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
                console.log('naxqan eror');
                setLoading(false);
                setErrorMessage(errorMessage);
                console.log(err);
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
            ...formState,
            [name]: {
                valid,
                error,
                value,
            },
        });
    };

    const formJSX = forms.map((item, indx) => {
        return (
            <Form.Group key={indx}>
                <Form.Control
                    className={styles.textarea}
                    name={item.name}
                    type={item.type}
                    value={item.name.value}
                    onChange={handleChange}
                    placeholder={item.placeholder}
                    as={item.as ? item.as : undefined}
                />
                <Form.Text className={styles.validMessage}>
                    {formState[item.name].error}
                    <h4>{errorMessage}</h4>
                </Form.Text>
            </Form.Group>
        );
    });
    return (
        <Form
            onSubmit={(e) => e.preventDefault()}
            className={styles.form}
            noValidate
        >
            {loading && <Spinner />}
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
    );
};

export default withRouter(ContactFormWithHooks);
