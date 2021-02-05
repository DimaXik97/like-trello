import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

import BoardInformation from "../BoardInformation";
import Login from "../Login";
import Logout from "../Profile";
import { editSavedBoards } from "../../store/actionCreators";
import { StateType } from "../../types";

import { CgClose } from "react-icons/cg";
import { AiOutlineSave } from "react-icons/ai";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const user = useSelector((state: StateType) => state.user);
  const dispath = useDispatch();
  const curentBoard = useSelector(
    (state: StateType) => state.boards.selectedBoard
  );
  const isAuth = !!user.user.email;
  const onSaveHandler = (event: React.MouseEvent) => {
    if (curentBoard) {
      dispath(editSavedBoards(curentBoard._id));
    }
  };
  return (
    <header className={styles.header}>
      {curentBoard ? <BoardInformation curentBoard={curentBoard} /> : <div />}
      <div className={styles.title}>
        {curentBoard ? (
          <div>
            {curentBoard.name}
            {curentBoard.canSave && (
              <IconContext.Provider value={{ className: styles.icon }}>
                <AiOutlineSave onClick={onSaveHandler} />
              </IconContext.Provider>
            )}
            <IconContext.Provider value={{ className: styles.icon }}>
              <Link to="/">
                <CgClose />
              </Link>
            </IconContext.Provider>
          </div>
        ) : (
          "No board selected"
        )}
      </div>
      <div className={styles.login}>{isAuth ? <Logout /> : <Login />}</div>
    </header>
  );
};

export default Header;
