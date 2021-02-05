import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./copmonent/Nav/index";
import Header from "./copmonent/Header/index";
import Main from "./copmonent/Main";
import Board from "./copmonent/Board";

import styles from "./App.module.css";
import { getToken } from "./store/actionCreators";

import "normalize.css";
const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getToken());
  }, []);
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Nav />
        <Switch>
          <Route path="/:id">
            <Board />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
