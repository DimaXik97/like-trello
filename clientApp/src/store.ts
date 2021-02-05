import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducer from "./store/reducers";

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
/* eslint-enable */

const configureStore = (preloadedState: any) =>
  createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk))
  );

const store = configureStore({});
export default store;
