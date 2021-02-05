import { INIT_USER, LOGOUT_USER, CHECKED_USER } from "../actionTypes";
import { UserActionTypes, UserStateType } from "../../types";

const initialState: UserStateType = {
  checkedUser: false,
  user: {
    email: undefined,
    name: undefined,
    picture: undefined,
    givenName: undefined,
    familyName: undefined,
    locale: "ru",
  },
};

const boards = (
  state = initialState,
  action: UserActionTypes
): UserStateType => {
  switch (action.type) {
    case INIT_USER:
      return { ...state, user: { ...action.payload } };
    case CHECKED_USER: {
      return { ...state, checkedUser: true };
    }
    case LOGOUT_USER:
      return { ...initialState };
    default:
      return state;
  }
};

export default boards;
