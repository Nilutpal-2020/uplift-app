import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// import "./App.css";

import Header from './components/HomePage/Header/Header';
import HomePage from './components/HomePage/HomePage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Notes from './components/Notes/Notes';
import ForgotPassword from './components/auth/ForgotPassword';

import UserContext from './components/Context/UserContext';
import PrivateRoute from './components/auth/PrivateRoute';

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
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: {"x-auth-token": token}}
        );
      
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/users/", 
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
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/forgot-password" exact component={ForgotPassword} />
          <PrivateRoute path="/notes" exact component={Notes} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
