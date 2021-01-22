import React from "react";

import BoardInformation from "../BoardInformation"
import Login from "../Login"
import Logout from "../Profile"

import styles from './Header.module.css'


interface HeaderProps{
    isAuth?: boolean;
    title?: string;
}
const Header:React.FC<HeaderProps>=({isAuth=true, title="Test title"})=>{
    return(
        <header className={styles.header}>
            <BoardInformation/>
            <div className={styles.title}>{title}</div>
            <div className={styles.login}>
                {isAuth? <Logout/>:<Login/>}
            </div>
        </header>
    )
}

export default Header;