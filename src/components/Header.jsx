import styles from "../css_modules/Header.module.css";
import burger from "../images/18557012.png";

const Nav = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header>
      <img
        src={burger}
        alt="burger_icon"
        className={styles.burger_icon}
        onClick={() =>
          sidebarOpen ? setSidebarOpen(false) : setSidebarOpen(true)
        }
      />
      <h1>^NC games</h1>
    </header>
  );
};

export default Nav;
