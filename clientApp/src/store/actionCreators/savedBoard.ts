import {
  INIT_SAVED_BOARDS,
  ADD_SAVED_BOARD,
  REMOVE_SAVED_BOARD,
} from "../actionTypes";
import { selectBoard } from "./board";
import { AppThunk, SavedBoardActionTypes, IBoard } from "../../types";
import axios from "axios";

export const initSavedBoards = (
  savedBoard: IBoard[]
): SavedBoardActionTypes => ({
  type: INIT_SAVED_BOARDS,
  payload: {
    savedBoards: savedBoard,
  },
});
export const addSavedBoard = (board: IBoard): SavedBoardActionTypes => ({
  type: ADD_SAVED_BOARD,
  payload: board,
});

export const removeSavedBoard = (id: string): SavedBoardActionTypes => ({
  type: REMOVE_SAVED_BOARD,
  payload: { id },
});

export const editSavedBoards = (id: string): AppThunk => async (dispatch) => {
  try {
    const result = await axios.put<IBoard>(`/api/board/saved/${id}`);
    const board = { ...result.data };
    dispatch(addSavedBoard(board));
    dispatch(selectBoard(board));
  } catch (e) {
    console.log("error", e);
  }
};

export const deleteSavedBoard = (id: string): AppThunk => async (
  dispatch,
  getState
) => {
  const {
    boards: { selectedBoard },
  } = getState();
  try {
    const result = await axios.delete<IBoard>(`/api/board/saved/${id}`);
    const board = { ...result.data };
    dispatch(removeSavedBoard(id));
    if (selectedBoard?._id === id) {
      dispatch(selectBoard(board));
    }
  } catch (e) {
    console.log("error", e);
  }
};
