import React from 'react';
import Nav from "./copmonent/Nav/index"
import Header from "./copmonent/Header/index"
import styles from './App.module.css'

import "normalize.css";

const App:React.FC=()=> {
  return (
    <React.Fragment>
      <Nav/>
      <Header/>
      <h1 className={styles.title}>Hello world</h1>
    </React.Fragment>
  );
}

export default App;
