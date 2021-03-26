import styles from './spinner.module.css';
import { Spinner } from 'react-bootstrap';

const SpinnerComp = () => {
    return (
        <div className={styles.wrapper}>
            <Spinner
                animation="border"
                role="status"
                className={styles.spinner_border}
            />
        </div>
    );
};

export default SpinnerComp;
