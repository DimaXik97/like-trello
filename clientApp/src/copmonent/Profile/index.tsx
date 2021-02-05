import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../store/actionCreators";
import { StateType } from "../../types";

import styles from "./Profile.module.css";

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const { user, checkedUser } = useSelector((state: StateType) => state.user);
  const logoutHandler = (event: React.MouseEvent) => {
    dispatch(logout());
  };
  return (
    <>
      {checkedUser && <div className={styles.name}>{user.name}</div>}
      <button onClick={logoutHandler} className={styles.logoutBtn}>
        Logout
      </button>
    </>
  );
};
export default Logout;
