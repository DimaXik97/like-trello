import boards from "../store/reducers/boards";

import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { UserStateType } from "./user";
import { SavedBoardStateType } from "./savedBoard";
import { BoardStateType } from "./board";

export * from "./board";
export * from "./user";
export * from "./savedBoard";

export type StateType = {
  boards: BoardStateType;
  user: UserStateType;
  savedBoards: SavedBoardStateType;
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  StateType,
  {},
  Action<string>
>;
