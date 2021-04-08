import React from 'react';
import { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import Spinner from '../Spinner/Spinner';
import { contextContactPage } from '../Context/context';
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

const ContactFormWithHooks = (props) => {
    const context = useContext(contextContactPage);
    const {
        formData,
        loading,
        errorMessage,
        handleChange,
        handleSubmit,
    } = context;

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
                    {formData[item.name].error}
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
                    <h4>{errorMessage}</h4>
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

export default ContactFormWithHooks;
