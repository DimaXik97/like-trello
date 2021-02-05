import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";

import { FiSettings } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

import {
  createNewBoard,
  deleteBoard,
  changeBoard,
  deleteSavedBoard,
} from "../../store/actionCreators";
import { IBoard, IBoardForm, StateType } from "../../types";
import Modal from "../Modal";

import styles from "./ListBoards.module.css";

const ListBoards: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBoard, setEditBoard] = useState<IBoard | undefined>(undefined);
  const dispatch = useDispatch();
  const boards: IBoard[] = useSelector(
    (state: StateType) => state.boards.boards
  );
  const savedBoards: IBoard[] = useSelector(
    (state: StateType) => state.savedBoards.saveBoards
  );
  const selectedBoard: IBoard | undefined = useSelector(
    (state: StateType) => state.boards.selectedBoard
  );

  const onOpenModal = (event: React.MouseEvent) => {
    setIsModalOpen(true);
  };
  const onCloseModal = () => {
    setIsModalOpen(false);
    setEditBoard(undefined);
  };
  const submitHandler = (data: IBoardForm) => {
    dispatch(createNewBoard(data));
    onCloseModal();
  };
  const setEditBoardHandler = (id: string) => (event: React.MouseEvent) => {
    const board = boards.find((x: IBoard) => x._id === id);
    if (board) {
      setEditBoard(board);
      setIsModalOpen(true);
    }
  };
  const onDeleteHandler = (id: string) => {
    const result: boolean = window.confirm("Are you sure?");
    if (result) {
      dispatch(deleteBoard(id));
    }
    onCloseModal();
  };
  const onEditHandler = (id: string, data: IBoardForm) => {
    dispatch(changeBoard(id, data));
    onCloseModal();
  };
  const deleteSavedBoardHandler = (id: string) => (event: React.MouseEvent) => {
    const isDelete = window.confirm("Are you sure?");
    if (isDelete) {
      dispatch(deleteSavedBoard(id));
    }
  };
  return (
    <div className={styles.list}>
      <div>My boards:</div>
      {boards.map((b: IBoard, i: number) => (
        <div className={styles.item}>
          <Link
            key={i}
            to={`/${b._id}`}
            className={classNames(styles.link, {
              [styles.active]: selectedBoard && b._id === selectedBoard._id,
            })}
          >
            {b.name}
          </Link>
          <IconContext.Provider value={{ className: styles.settingsIcon }}>
            <FiSettings onClick={setEditBoardHandler(b._id)} />
          </IconContext.Provider>
        </div>
      ))}
      <button onClick={onOpenModal} className={styles.newBtn}>
        Add new
      </button>
      <Modal
        initValue={editBoard}
        isOpen={isModalOpen}
        onClose={onCloseModal}
        onEdit={onEditHandler}
        onDelete={onDeleteHandler}
        onSubmit={submitHandler}
      >
        <div />
      </Modal>
      <hr className={styles.line} />
      <div>Saved boards:</div>

      {savedBoards.map((b: IBoard, i: number) => (
        <div className={styles.item}>
          <Link
            key={i}
            to={`/${b._id}`}
            className={classNames(styles.link, {
              [styles.active]: selectedBoard && b._id === selectedBoard._id,
            })}
          >
            {b.name}
          </Link>
          <IconContext.Provider value={{ className: styles.settingsIcon }}>
            <CgClose onClick={deleteSavedBoardHandler(b._id)} />
          </IconContext.Provider>
        </div>
      ))}
    </div>
  );
};
export default ListBoards;
