import {
  INIT_SAVED_BOARDS,
  ADD_SAVED_BOARD,
  REMOVE_SAVED_BOARD,
} from "../actionTypes";
import {
  SavedBoardActionTypes,
  SavedBoardStateType,
  IBoard,
} from "../../types";

const initialState: SavedBoardStateType = {
  saveBoards: [],
};

const boards = (
  state = initialState,
  action: SavedBoardActionTypes
): SavedBoardStateType => {
  switch (action.type) {
    case INIT_SAVED_BOARDS:
      return {
        saveBoards: action.payload.savedBoards,
      };
    case ADD_SAVED_BOARD: {
      return {
        saveBoards: [...state.saveBoards, action.payload],
      };
    }
    case REMOVE_SAVED_BOARD:
      return {
        saveBoards: state.saveBoards.filter(
          (x: IBoard) => x._id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default boards;
