import React from 'react';
import { Form, Button } from 'react-bootstrap';
import Spinner from '../Spinner/Spinner';
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

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            loading: false,
        };
    }

    handleSubmit = () => {
        const { name, email, message } = this.state;
        const formData = { name, email, message };
        this.setState({ loading: true });
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
            })
            .catch((err) => console.log(err))
            .finally(() => {
                this.setState({
                    name: '',
                    email: '',
                    message: '',
                    loading: false,
                });
            });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
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
                        value={this.state[item.name]}
                        onChange={this.handleChange}
                        placeholder={item.placeholder}
                        as={item.as ? item.as : undefined}
                    />
                </Form.Group>
            );
        });
        return (
            <Form onSubmit={(e) => e.preventDefault()} className={styles.form}>
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

export default ContactForm;
