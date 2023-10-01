import IconWhite from "../../assets/icons/icon_white.svg?react";
import styles from "./Footer.module.sass"
function Footer() {
  return (
    <footer className={styles.footer} id="site-footer">
      <div className="logo logo-white">
        <span className="svg-wrapper">
          <IconWhite />
        </span>
        <span>HelpMeOut</span>
      </div>
      <div className={styles.nav}>
        <div>
          <span>Menu</span>
          <ul>
            <li>Home</li>
            <li>Converter</li>
            <li>How it Works</li>
          </ul>
        </div>
        <div>
          <span>About Us</span>
          <ul>
            <li>About</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <span>Screen Record</span>
          <ul>
            <li>Browser Window</li>
            <li>Desktop</li>
            <li>Application</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;