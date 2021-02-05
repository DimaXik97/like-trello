import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { selectBoard } from "../../store/actionCreators";

import styles from "./Main.module.css";

const Board: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(selectBoard(undefined));
  }, [dispatch]);

  return <h1 className={styles.title}>Hello World</h1>;
};
export default Board;
