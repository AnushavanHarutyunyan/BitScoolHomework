import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import styles from '../NavBar/navbar.module.css';

const navItemsParam = [
    {
        to: '/',
        value: 'Home',
    },
    {
        to: '/contact',
        value: 'Contact',
    },
    {
        to: '/about',
        value: 'About Us',
    },
];

const NavBar = () => {
    const navItemsJSX = navItemsParam.map((item, indx) => {
        return (
            <Nav.Item key={indx}>
                <NavLink
                    to={item.to}
                    activeStyle={{ color: 'rgba(214, 122, 60, 0.8)' }}
                    className="nav-link"
                    exact={true}
                >
                    {item.value}
                </NavLink>
            </Nav.Item>
        );
    });
    return <Nav className={styles.nav}>{navItemsJSX}</Nav>;
};

export default NavBar;
