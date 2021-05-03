import { useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { changeContactForm, sendContactFormThunk } from '../../Redux/action';
import styles from '../ContactForm/contactform.module.css';
import { withRouter } from 'react-router';

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

const ContactForm = (props) => {
    const { formData, changeContactForm, sendContactFormThunk } = props;
    const firstInput = useRef(null);
    useEffect(() => {
        firstInput.current.focus();
    }, []);
    const formJSX = forms.map((item, indx) => {
        return (
            <Form.Group key={indx}>
                <Form.Control
                    ref={indx === 0 ? firstInput : null}
                    className={styles.textarea}
                    name={item.name}
                    type={item.type}
                    value={formData[item.name].value}
                    onChange={(e) => changeContactForm(e.target)}
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
                    {/* <h4>{errorMessage}</h4> */}
                </Form.Text>
                {formJSX}
                <Button
                    variant="primary"
                    type="submit"
                    className={styles.addBtn}
                    onClick={() =>
                        sendContactFormThunk(formData, props.history)
                    }
                >
                    Add
                </Button>
            </Form>
            {/* {loading && <Spinner />} */}
        </>
    );
};

const mapStateToProps = (state) => {
    const { name, email, message } = state.contactState;
    return {
        formData: { name, email, message },
        loading: state.globalState.loading,
    };
};

const mapDispatchToProps = {
    changeContactForm,
    sendContactFormThunk,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ContactForm));
