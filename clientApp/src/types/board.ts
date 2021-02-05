import {
  ADD_BOARD,
  INIT_BOARDS,
  REMOVE_BOARD,
  SELECT_BOARD,
  EDIT_BOARD,
} from "../store/actionTypes";

export interface IBoard {
  _id: string;
  owner: string;
  isPublic: boolean;
  name: string;
  availableFor: string[];
  createdAt: string;
  canSave?: boolean;
}
export interface IBoardForm {
  isPublic: boolean;
  name: string;
  availableFor?: string[];
}

type BoardState = {
  boards: IBoard[];
  selectedBoard?: IBoard;
};

interface IInitBoard {
  type: typeof INIT_BOARDS;
  payload: {
    boards: IBoard[];
  };
}
interface ISelectBoard {
  type: typeof SELECT_BOARD;
  payload: {
    board: IBoard | undefined;
  };
}
interface IAddBoard {
  type: typeof ADD_BOARD;
  payload: IBoard;
}
interface IEditBoard {
  type: typeof EDIT_BOARD;
  payload: {
    board: IBoard;
  };
}

interface IRemoveBoard {
  type: typeof REMOVE_BOARD;
  payload: {
    id: string;
  };
}

export type BoardActionTypes =
  | IAddBoard
  | IRemoveBoard
  | IInitBoard
  | ISelectBoard
  | IEditBoard;
export type BoardStateType = BoardState;
