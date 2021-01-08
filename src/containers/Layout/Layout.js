import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import classes from './Layout.module.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import Login from '../../components/auth/Login';
import Register from '../../components/auth/Register';
import ForgotPassword from '../../components/auth/ForgotPassword';
import Notes from '../../components/Notes/Notes';
import FocusTimer from '../../components/FocusTimer/FocusTimer';
import HabitTracker from '../../components/HabitTracker/HabitTracker';

import UserContext from '../../components/Context/UserContext';
// import PrivateRoute from '../../components/auth/PrivateRoute';

function App() {
  const [ userData, setUserData ] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "/users/tokenIsValid",
        null,
        { headers: {"x-auth-token": token}}
        );
      
      if (tokenRes.data) {
        const userRes = await axios.get("/users/", 
          {
            headers: {"x-auth-token": token}
          }
        );
        setUserData({
          token,
          user: userRes.data
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    // <div className="App">
    //   <Notes />
    // </div>
    <Router>
      <UserContext.Provider value={{ userData, setUserData}}>
        <Header />
        <Switch>
          <Aux>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/forgotpassword" exact component={ForgotPassword} />
            <Route path="/notes" exact component={Notes} />
            <Route path="/focustimer" exact component={FocusTimer} />
            <Route path="/habits" exact component={HabitTracker} />
          </Aux>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
