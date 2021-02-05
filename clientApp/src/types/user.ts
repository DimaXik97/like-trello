import { INIT_USER, LOGOUT_USER, CHECKED_USER } from "../store/actionTypes";

export interface IUser {
  email?: string;
  name?: string;
  picture?: string;
  givenName?: string;
  familyName?: string;
  locale: string;
}

type UserState = {
  checkedUser: boolean;
  user: IUser;
};

interface IInitUser {
  type: typeof INIT_USER;
  payload: IUser;
}

interface ICheckedUser {
  type: typeof CHECKED_USER;
  payload: undefined;
}

interface ILogoutUser {
  type: typeof LOGOUT_USER;
}
export interface LoginResponse {
  token: string;
}
export type UserActionTypes = IInitUser | ILogoutUser | ICheckedUser;
export type UserStateType = UserState;
