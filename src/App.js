import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


// import Aux from './hoc/Auxiliary/Auxiliary';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './containers/Layout/Layout';
import HomePage from './containers/HomePage/HomePage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Layout />
      </Switch>
    </Router>
  );
}

export default App;
