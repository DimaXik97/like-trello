import React from "react";
import moment from "moment";

import { IBoard } from "../../types";
import styles from "./BoardInformation.module.css";

interface BoardInformationProps {
  curentBoard: IBoard;
}
const BoardInformation: React.FC<BoardInformationProps> = ({ curentBoard }) => {
  const { owner, createdAt, isPublic } = curentBoard;
  return (
    <div className={styles.container}>
      <div>Owner: {owner}</div>
      <div>Created at: {moment(createdAt).format("DD.MM.YYYY HH:mm:ss")}</div>
      <div>Status: {isPublic ? "Public" : "Private"}</div>
    </div>
  );
};

export default BoardInformation;
