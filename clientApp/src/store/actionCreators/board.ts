import {
  ADD_BOARD,
  INIT_BOARDS,
  REMOVE_BOARD,
  SELECT_BOARD,
  EDIT_BOARD,
} from "../actionTypes";
import { AppThunk, BoardActionTypes, IBoard, IBoardForm } from "../../types";
import axios from "axios";

export const addBoard = (board: IBoard): BoardActionTypes => ({
  type: ADD_BOARD,
  payload: {
    ...board,
  },
});

export const removeBoard = (id: string): BoardActionTypes => ({
  type: REMOVE_BOARD,
  payload: {
    id,
  },
});
export const initBoards = (boards: IBoard[]): BoardActionTypes => ({
  type: INIT_BOARDS,
  payload: {
    boards: boards,
  },
});
export const selectBoard = (board: IBoard | undefined): BoardActionTypes => ({
  type: SELECT_BOARD,
  payload: {
    board,
  },
});
export const editBoard = (board: IBoard): BoardActionTypes => ({
  type: EDIT_BOARD,
  payload: {
    board,
  },
});

export const findBoard = (id: string): AppThunk => async (
  dispatch,
  getState
) => {
  const {
    boards: { boards: userBoards },
    savedBoards: { saveBoards },
  } = getState();
  const selectedBoard: IBoard | undefined =
    userBoards.find((x: IBoard) => x._id === id) ||
    saveBoards.find((x: IBoard) => x._id === id);
  if (selectedBoard) {
    dispatch(selectBoard(selectedBoard));
  } else {
    const board = await axios.get<IBoard>(`/api/board/${id}`);
    if (board.data) dispatch(selectBoard(board.data));
  }
};

export const createNewBoard = (board: IBoardForm): AppThunk => async (
  dispatch
) => {
  try {
    const result = await axios.post<IBoard>("/api/board", { ...board });
    dispatch(addBoard(result.data));
  } catch (e) {
    console.log("error", e);
  }
};
export const deleteBoard = (id: string): AppThunk => async (dispatch) => {
  try {
    const result = await axios.delete<{ id: string }>(`/api/board/${id}`);
    if (result.data.id) {
      dispatch(removeBoard(result.data.id));
    }
    console.log("error", result.data);
  } catch (e) {
    console.log("error", e);
  }
};
export const changeBoard = (id: string, board: IBoardForm): AppThunk => async (
  dispatch
) => {
  try {
    const result = await axios.put<IBoard>(`/api/board/${id}`, board);
    if (result.data) {
      dispatch(editBoard(result.data));
    }
    console.log("error", result.data);
  } catch (e) {
    console.log("error", e);
  }
};
