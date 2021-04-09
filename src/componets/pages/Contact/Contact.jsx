// import ContactForm from '../../ContactForm/ContactForm';
// import ContactFormWithHooks from '../../ContactForm/ContactFormWithHooks';
// import ProviderContactPage from '../../Context/ContactProvider/ContactProvider';
import ContactFormWithReducer from '../../ContactForm/ContactFormWithReducer';

const Contact = () => {
    // return <ContactForm />;
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Contact Page</h1>
            <ContactFormWithReducer />
            {/* <ProviderContactPage>
                <ContactFormWithHooks />
                </ProviderContactPage> */}
        </div>
    );
};

export default Contact;
