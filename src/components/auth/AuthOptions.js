import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import UserContext from '../Context/UserContext';
import {useHistory} from 'react-router-dom';

function AuthOptions() {
    const { userData, setUserData } = useContext(UserContext);

    let history = useHistory();

    // const handleRegister = () => {
    //     history.push("/register");
    // }

    // const handleLogin = () => {
    //     history.push("/login");
    // }

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");

        history.push("/");
    };

    return (
        <Aux>
            {
                userData.user ? 
                <Aux>
                    <li className="nav-item">
                        <span className="nav-link">Hi, {userData.user.username}</span>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-light" onClick={logout}>Exit</button> 
                    </li> 
                </Aux>
                :
                <Aux>
                    <li className="nav-item mb-2">
                        <Link to="/register" style={{textDecoration: 'none'}}><button className="nav-link btn btn-outline-dark btn-sm">Register</button></Link>
                    </li>
                    <li className="nav-item ml-2 mb-2">
                        <Link to="/login" style={{textDecoration: 'none'}}><button className="nav-link btn btn-outline-dark btn-sm">Login</button></Link>
                    </li>
                </Aux>
            }
        </Aux>
    );
}

export default AuthOptions;