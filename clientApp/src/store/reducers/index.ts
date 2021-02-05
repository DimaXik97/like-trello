import { combineReducers } from "redux";
import boards from "./boards";
import user from "./user";
import savedBoards from "./savedBoard";

const rootReducer = combineReducers({ boards, user, savedBoards });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
