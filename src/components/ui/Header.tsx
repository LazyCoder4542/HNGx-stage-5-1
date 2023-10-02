import Icon from "../../assets/icons/icon.svg?react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import styles from "./Header.module.sass"
import ProfileI from "./../../assets/icons/profile-circle.svg?react"
import ArrDI from "./../../assets/icons/arrow-down.svg?react"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function Header() {
  const toggleMenu = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] =  useState(true)
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      user ? setLoggedIn(true) : setLoggedIn(false)
      setIsLoading(false)
    })
  }, [])
  return (
    <header className={styles.header} id="site-header">
      <Link to="landing">
        <div className="logo">
          <span className="svg-wrapper">
            <Icon />
          </span>
          <span>HelpMeOut</span>
        </div>
      </Link>
      {
        !isLoading && loggedIn ?
          <div className={styles.user}>
            <span className="svg-wrapper">
              <ProfileI />
            </span>
            <Link to="/">{auth.currentUser?.displayName}</Link>
            <div className={styles.menu}>
              <span className="svg-wrapper" onClick={() => toggleMenu[1](!toggleMenu[0])}>
                <ArrDI />
              </span>
              <div hidden={!toggleMenu[0]}>
                <ul>
                  <li onClick={() => {
                    toggleMenu[1](!toggleMenu[0])
                    signOut(auth)
                    window.location.reload()
                  }}>
                    Log Out
                  </li>
                </ul>
              </div>
            </div>
          </div>
        :
        <>
          <div className={styles.nav}>
            <span>Features</span>
            <span>How It Works</span>
          </div>
          <div>
            <span>Get Started</span>
          </div>
        </>
      }
    </header>
  );
}

export default Header;