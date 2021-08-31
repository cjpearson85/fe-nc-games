import styles from '../css_modules/Nav.module.css';

const Nav = ({loggedInAs: {username}, sidebarOpen, setSidebarOpen}) => {
    return (
        <nav>
            <h1>^NC Games</h1>
            <h1 className={styles.burger_icon} onClick={() => sidebarOpen ? setSidebarOpen(false) : setSidebarOpen(true)}>=</h1>
            {/* <img src='../../public/1855701.png' alt="burger_icon" className={styles.burger_icon} /> */}
        </nav>
    );
};

export default Nav;