import styles from '../css_modules/Nav.module.css';
import burger from '../images/18557012.png';

const Nav = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <nav>
            <h1>^NC games</h1>
            {/* <h1 className={styles.burger_icon} onClick={() => sidebarOpen ? setSidebarOpen(false) : setSidebarOpen(true)}>=</h1> */}
            <img src={burger} alt="burger_icon" className={styles.burger_icon} onClick={() => sidebarOpen ? setSidebarOpen(false) : setSidebarOpen(true)} />
        </nav>
    );
};

export default Nav;