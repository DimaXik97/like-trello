import jwt_decode from "jwt-decode";
import axios from "axios";

import { INIT_USER, LOGOUT_USER, CHECKED_USER } from "../actionTypes";
import { IUser, UserActionTypes, AppThunk, LoginResponse } from "../../types";
import setAuthToken, { getLocalToken } from "../../utils/setAuthToken";
import { initBoards } from "./board";
import { initSavedBoards } from "./savedBoard";

export const initUser = (token: string): UserActionTypes => {
  setAuthToken(token);
  const decoded: any = jwt_decode(token);
  const user: IUser = {
    email: decoded.email,
    name: decoded.name,
    picture: decoded.picture,
    givenName: decoded["given_name"],
    familyName: decoded["family_name"],
    locale: decoded.locale,
  };
  return {
    type: INIT_USER,
    payload: {
      ...user,
    },
  };
};
const checkedUser = (): UserActionTypes => {
  return {
    type: CHECKED_USER,
    payload: undefined,
  };
};

export const logoutUser = (): UserActionTypes => {
  return {
    type: LOGOUT_USER,
  };
};

export const getToken = (googleTokenId?: string): AppThunk => async (
  dispatch
) => {
  let token: string | null = null;
  if (googleTokenId) {
    try {
      const response = await axios.post<LoginResponse>("/api/auth/login", {
        token: googleTokenId,
      });
      token = response.data.token;
    } catch (e) {
      console.log(e);
    }
  } else {
    token = getLocalToken();
  }
  if (token) {
    dispatch(initUser(token));
    dispatch(getProfile());
  } else {
    setAuthToken(null);
  }
  dispatch(checkedUser());
};
export const logout = (): AppThunk => (dispatch) => {
  setAuthToken(null);
  dispatch(logoutUser());
};

export const getProfile = (): AppThunk => async (dispatch) => {
  const boards = await Promise.all([
    axios.get("/api/board"),
    axios.get("/api/board/saved"),
  ]);
  dispatch(initBoards(boards[0].data));
  dispatch(initSavedBoards(boards[1].data));
};
