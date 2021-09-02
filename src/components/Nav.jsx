import styles from '../css_modules/Nav.module.css';

const Nav = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <nav>
            <h1>^NC games</h1>
            {/* <h1 className={styles.burger_icon} onClick={() => sidebarOpen ? setSidebarOpen(false) : setSidebarOpen(true)}>=</h1> */}
            <img src='https://cdn4.iconfinder.com/data/icons/circles-1/32/364-01-512.png' alt="burger_icon" className={styles.burger_icon} onClick={() => sidebarOpen ? setSidebarOpen(false) : setSidebarOpen(true)} />
        </nav>
    );
};

export default Nav;