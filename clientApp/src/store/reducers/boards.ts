import {
  ADD_BOARD,
  INIT_BOARDS,
  REMOVE_BOARD,
  SELECT_BOARD,
  EDIT_BOARD,
} from "../actionTypes";
import { BoardActionTypes, BoardStateType, IBoard } from "../../types";

const initialState: BoardStateType = {
  boards: [],
  selectedBoard: undefined,
};

const boards = (
  state = initialState,
  action: BoardActionTypes
): BoardStateType => {
  switch (action.type) {
    case INIT_BOARDS:
      return {
        ...state,
        boards: action.payload.boards,
      };
    case SELECT_BOARD:
      return {
        ...state,
        selectedBoard: action.payload.board,
      };
    case ADD_BOARD:
      return {
        ...state,
        boards: [
          ...state.boards,
          {
            _id: action.payload._id,
            owner: action.payload.owner,
            isPublic: action.payload.isPublic,
            name: action.payload.name,
            availableFor: action.payload.availableFor,
            createdAt: action.payload.createdAt,
          },
        ],
      };
    case EDIT_BOARD: {
      return {
        ...state,
        boards: state.boards.map((x: IBoard) => {
          if (x._id === action.payload.board._id) return action.payload.board;
          else return x;
        }),
      };
    }
    case REMOVE_BOARD:
      return {
        ...state,
        boards: state.boards.filter((x: IBoard) => x._id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default boards;
