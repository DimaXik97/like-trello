import {
  INIT_SAVED_BOARDS,
  ADD_SAVED_BOARD,
  REMOVE_SAVED_BOARD,
} from "../store/actionTypes";

import { IBoard } from "./index";

interface IInitSavedBoard {
  type: typeof INIT_SAVED_BOARDS;
  payload: {
    savedBoards: IBoard[];
  };
}

type SavedBoardState = {
  saveBoards: IBoard[];
};

interface IAddSavedBoard {
  type: typeof ADD_SAVED_BOARD;
  payload: IBoard;
}

interface IRemoveSavedBoard {
  type: typeof REMOVE_SAVED_BOARD;
  payload: {
    id: string;
  };
}

export type SavedBoardActionTypes =
  | IAddSavedBoard
  | IRemoveSavedBoard
  | IInitSavedBoard;
export type SavedBoardStateType = SavedBoardState;
