import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from './components/BubblePage'
import PrivateRoute from './components/PrivateRoute'
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to='/'>Login</Link>
          <Link to='/protected'>Protected Page</Link>
        </nav>
        <Switch>
          <PrivateRoute exact path='/protected' component={BubblePage} />
          <Route path='/login' component={Login} />
          <Route component={Login} /> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;
