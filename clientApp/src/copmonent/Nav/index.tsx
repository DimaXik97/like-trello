import React from "react";
import styles from './Nav.module.css'

const Nav:React.FC=()=>{
    return(
        <nav className={styles.navBar}>
            <div className={styles.logo}>
                <p className={styles.logoAnimation1}>Like</p>
                <p className={styles.logoAnimation2}>Trello</p>
            </div>
            <footer>
                Last update: 22.01.2021
            </footer>
        </nav>
    )
}

export default Nav;