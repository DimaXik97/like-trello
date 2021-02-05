import React, { useState } from "react";
import classnames from "classnames";
import { IconContext } from "react-icons";

import { CgClose } from "react-icons/cg";

import styles from "./Modal.module.css";

type UsersProps = {
  addUser: (user: string) => void;
  removeUser: (user: string) => void;
  users: string[];
};

const Users: React.FC<UsersProps> = ({ addUser, removeUser, users }) => {
  const [user, setUser] = useState("");
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };
  const addHendler = (event: React.MouseEvent) => {
    if (user) {
      addUser(user);
      setUser("");
    }
  };
  const removeUserHandler = (user: string) => (event: React.MouseEvent) => {
    removeUser(user);
  };
  return (
    <div>
      <input
        type="email"
        value={user}
        onChange={inputHandler}
        className={styles.inputText}
      />
      <button
        className={classnames([styles.footerBtn], [styles.save], {
          [styles.disableBtn]: !/\S+@\S+\.\S+/.test(user),
        })}
        disabled={!/\S+@\S+\.\S+/.test(user)}
        onClick={addHendler}
      >
        Add user
      </button>
      <>
        {users.length > 0 ? (
          users.map((x: string) => (
            <div>
              {x}
              <IconContext.Provider value={{ className: styles.removeIcon }}>
                <CgClose onClick={removeUserHandler(x)} />
              </IconContext.Provider>
            </div>
          ))
        ) : (
          <div>No users</div>
        )}
      </>
    </div>
  );
};

export default Users;
