import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import styles from '../NavBar/navbar.module.css';

const NavBar = () => {
    return (
        <Nav className={styles.nav}>
            <Nav.Item>
                <NavLink
                    to="/"
                    activeStyle={{ color: 'rgba(214, 122, 60, 0.8)' }}
                    className="nav-link"
                    exact={true}
                >
                    Home
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink
                    to="/contact"
                    activeStyle={{ color: 'rgba(214, 122, 60, 0.8)' }}
                    className="nav-link"
                    exact={true}
                >
                    Contact
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink
                    to="/about"
                    activeStyle={{ color: 'rgba(214, 122, 60, 0.8)' }}
                    className="nav-link"
                    exact={true}
                >
                    About us
                </NavLink>
            </Nav.Item>
        </Nav>
    );
};

export default NavBar;
