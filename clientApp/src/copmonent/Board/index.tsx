import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { findBoard } from "../../store/actionCreators";
import { StateType } from "../../types";

import styles from "./Board.module.css";

const Board: React.FC = () => {
  const { id: boardId }: { id: string } = useParams();
  const dispatch = useDispatch();
  const checkedUser = useSelector((state: StateType) => state.user.checkedUser);
  useEffect(() => {
    if (checkedUser) dispatch(findBoard(boardId));
  }, [boardId, checkedUser, dispatch]);

  return <h1 className={styles.title}>ID</h1>;
};
export default Board;
