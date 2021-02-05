import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import navIMG from "../../assets/navImage.jpg";
import ListBoards from "../ListBoards";
import { StateType } from "../../types";
import styles from "./Nav.module.css";

moment.updateLocale("ru", {});

const Nav: React.FC = () => {
  const {
    checkedUser,
    user: { email },
  } = useSelector((state: StateType) => state.user);
  return (
    <nav className={styles.navBar}>
      <div className={styles.logo}>
        <p className={styles.logoAnimation1}>Like</p>
        <p className={styles.logoAnimation2}>Trello</p>
      </div>
      {checkedUser && !!email ? (
        <ListBoards />
      ) : (
        <img className={styles.navImg} src={navIMG} alt="img" />
      )}
      <footer>{moment().format("[Last update: ]DD.MM.YYYY")}</footer>
    </nav>
  );
};

export default Nav;
