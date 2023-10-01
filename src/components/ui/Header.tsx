import Icon from "../../assets/icons/icon.svg?react";
import styles from "./Header.module.sass"
function Header() {
  return (
    <header className={styles.header} id="site-header">
      <div className="logo">
        <span className="svg-wrapper">
          <Icon />
        </span>
        <span>HelpMeOut</span>
      </div>
      <div className={styles.nav}>
        <span>Features</span>
        <span>How It Works</span>
      </div>
      <div>
        <span>Get Started</span>
      </div>
    </header>
  );
}

export default Header;