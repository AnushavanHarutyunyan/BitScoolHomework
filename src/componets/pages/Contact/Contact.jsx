// import ContactForm from '../../ContactForm/ContactForm';
import ContactFormWithHooks from '../../ContactForm/ContactFormWithHooks';
import ProviderContactPage from '../../Context/ContactProvider/ContactProvider';
const Contact = () => {
    // return <ContactForm />;
    return (
        <ProviderContactPage>
            <ContactFormWithHooks />
        </ProviderContactPage>
    );
};

export default Contact;
