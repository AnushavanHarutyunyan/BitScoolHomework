import React from 'react';
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
class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        };
    }

    handleSubmit = () => {
        const { name, email, message } = this.state;
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

        if (!name.value.trim() || !email.value.trim() || !message.value.trim())
            return;

        this.setState({ loading: true, errorMessage: null });

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
                console.log(this.props);
                this.props.history.push('/');
            })
            .catch((err) => {
                let errorMessage;
                if (err.status === 422) {
                    errorMessage = err.message.slice(11);
                }
                this.setState({
                    loading: false,
                    errorMessage: errorMessage,
                });
                console.log(err);
            });
    };

    handleChange = (e) => {
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

        this.setState({
            [name]: {
                valid: valid,
                error: error,
                value: value,
            },
        });
    };

    render() {
        const { loading } = this.state;
        const formJSX = forms.map((item, indx) => {
            return (
                <Form.Group key={indx}>
                    <Form.Control
                        className={styles.textarea}
                        name={item.name}
                        type={item.type}
                        value={this.state[item.name].value}
                        onChange={this.handleChange}
                        placeholder={item.placeholder}
                        as={item.as ? item.as : undefined}
                    />
                    <Form.Text className={styles.validMessage}>
                        {this.state[item.name].error}
                        <h4>{this.state.errorMessage}</h4>
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
                    onClick={this.handleSubmit}
                >
                    Add
                </Button>
            </Form>
        );
    }
}

export default withRouter(ContactForm);
