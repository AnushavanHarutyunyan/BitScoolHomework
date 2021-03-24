import Nav from 'react-bootstrap/Nav';
import styles from '../NavBar/navbar.module.css';

const NavBar = () => {
    return (
        <Nav className={styles.nav}>
            <Nav.Item>
                <Nav.Link href="/home">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default NavBar;
