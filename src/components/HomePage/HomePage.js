import React from 'react';
import { Link } from 'react-router-dom';
// import UserContext from '../Context/UserContext';
// import Header from './Header/Header';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function HomePage() {
    // const {userData} = useContext(UserContext);

    // useEffect(() => {
    //     if(!userData.user) {
    //         window.location = "/login";
    //     } else {
    //         window.location = "/notes";
    //     }
    // }, [userData]);

    let linkTo = "/login";

    if (localStorage.getItem('auth-token')) {
        linkTo = "/notes";
    }

    return (
        <div className="jumbotron text-center" style={{position: 'fixed', width: '100%', height: '100%'}}>
            <div className="h-25"></div>
            <h1 className="display-3">Welcome to UPLIFT</h1>
            <p className="lead">Make your day more productive!</p>
            <Link to={linkTo}><button className="btn btn-info btn-lg">Get Started</button></Link>
        </div>
    );
}

export default HomePage;