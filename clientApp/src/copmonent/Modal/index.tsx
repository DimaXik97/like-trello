import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";

import Users from "./Users";
import { IBoardForm, IBoard } from "../../types";
import styles from "./Modal.module.css";

type ModalProps = {
  initValue?: IBoard;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IBoardForm) => void;
  onEdit: (id: string, data: IBoardForm) => void;
  onDelete: (id: string) => void;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onSubmit,
  onClose,
  onEdit,
  onDelete,
  initValue,
}) => {
  const [isPublic, setIsPublic] = useState(true);
  const [name, setName] = useState("");
  const [availableFor, setAvailableFor] = useState<string[]>([]);

  const el = useRef(document.createElement("div"));

  useEffect(() => {
    const current = el.current;
    document.body!.appendChild(current);
    return () => void document.body!.removeChild(current);
  }, []);
  useEffect(() => {
    setIsPublic(initValue ? initValue.isPublic : true);
    setName(initValue?.name || "");
    setAvailableFor(initValue?.availableFor || []);
  }, [initValue]);

  const swithHandler = (event: React.ChangeEvent) => {
    setIsPublic(!isPublic);
  };
  const textHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const addUserHandler = (user: string) => {
    setAvailableFor((users: string[]) => [user, ...users]);
  };
  const removeUserHandler = (user: string) => {
    setAvailableFor((users: string[]) =>
      users.filter((u: string) => u !== user)
    );
  };
  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const newBoard: IBoardForm = {
      name,
      isPublic,
      availableFor,
    };
    if (initValue?._id) {
      onEdit(initValue._id, newBoard);
    } else {
      onSubmit(newBoard);
    }
    clearForm();
  };
  const onDeleteHandler = (id: string) => (event: React.MouseEvent) => {
    onDelete(id);
    clearForm();
  };
  const clearForm = () => {
    setName("");
    setIsPublic(true);
    setAvailableFor([]);
  };
  const onCloseHandler = (event: React.MouseEvent) => {
    clearForm();
    onClose();
  };

  return isOpen ? (
    ReactDOM.createPortal(
      <div className={styles.modal}>
        <div className={styles.main}>
          <div className={styles.header}>Create new board</div>
          <div className={styles.content}>
            <form onSubmit={onSubmitHandler} id="createBoard">
              <div className={styles.inputRow}>
                <span className={styles.label}>Board name:</span>
                <input
                  type="text"
                  className={styles.inputText}
                  value={name}
                  onChange={textHandler}
                />
              </div>
              <div className={styles.inputRow}>
                <span className={styles.label}>Is publick?</span>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={swithHandler}
                  />
                  <span className={`${styles.slider} ${styles.round}`}></span>
                </label>
              </div>
            </form>
            {!isPublic && (
              <Users
                users={availableFor}
                addUser={addUserHandler}
                removeUser={removeUserHandler}
              />
            )}
          </div>
          <div className={styles.footer}>
            <button
              onClick={onCloseHandler}
              className={`${styles.footerBtn} ${styles.cansel}`}
            >
              Cansel
            </button>
            <button
              type="submit"
              form="createBoard"
              className={classnames([styles.footerBtn], {
                [styles.save]: name,
                [styles.disableBtn]: !name,
              })}
              disabled={!name}
            >
              Save
            </button>
            {initValue?._id && (
              <button
                onClick={onDeleteHandler(initValue._id)}
                className={`${styles.footerBtn} ${styles.delete}`}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>,
      el.current
    )
  ) : (
    <></>
  );
};

export default Modal;
